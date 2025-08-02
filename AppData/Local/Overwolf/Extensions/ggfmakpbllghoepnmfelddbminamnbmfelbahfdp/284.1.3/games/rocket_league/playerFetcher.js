'use strict';

define([
  '/games/rocket_league/supported_features.js',
  '/utils/io_plugin.js'
], function (
  SUPPORTED_FEATURES,
  IOPlugin) {

  let FETCHER_INTERVAL_MS = 200;
  let FETCHER_MAX_RETRIES = 20;
  let FETCHER_FILE_LISTENER_ID = "rocketLeaguePlayerFetcher";
  let _steamIdRegexp = /DevOnline: Steam ID: (\d+)$/;
  let _timerId = null;
  let _retries = 0;

  let _infoDB = null;
  let _featuresHandler = null;
  let _playerFound = false;
  let _fileClosing = false;
  let _listeningOnFile = false;
  let _registerListeningOnFile = false;
  let _ioPlugin;

  function start(infoDB, featuresHandler) {
    console.log('getting player steam id');

    if (!infoDB) {
      console.error('missing infoDB');
      return false;
    }

    if (!featuresHandler) {
      console.error('missing featuresHandler');
      return false;
    }

    _infoDB = infoDB;
    _featuresHandler = featuresHandler;
    _retries = 0;
    _ioPlugin = IOPlugin.get();

    _timerId = setTimeout(listenOnFile, 1);
  }

  function listenOnFile() {
    _retries++;
    if (_retries === FETCHER_MAX_RETRIES) {
      console.error("Player Fetcher - reached max retries");
      stop();
      return;
    }

    if (!_ioPlugin) {
      console.error('no IO plugin');
      _timerId = setTimeout(
        listenOnFile,
        FETCHER_INTERVAL_MS);
      return;
    }

    _playerFound = false;
    _fileClosing = false;
    _listeningOnFile = false;

    if (!_registerListeningOnFile) {
      _ioPlugin.onFileListenerChanged.addListener(_playerFetcherLogListener);
      _registerListeningOnFile =true;
    }

    return _ioPlugin.listenOnFile(
      FETCHER_FILE_LISTENER_ID,
      _ioPlugin.MYDOCUMENTS + '/my games/Rocket League/TAGame/Logs/Launch.log',
      false,
      function(id, status, error) {
        if (!status) {
          if (_fileClosing) {
            return;
          }
          console.error("Error listening on match log file: " + error);
          console.log("Retrying...");
          _timerId = setTimeout(listenOnFile, FETCHER_INTERVAL_MS);
        } else {
          console.log("Listen Started: ", id);
        }
      });
  }

  function _playerFetcherLogListener(id, status, data) {
    if (id !== FETCHER_FILE_LISTENER_ID) {
      return;
    }

    _listeningOnFile = true;

    if (!status) {
      if (_fileClosing) {
        return;
      }


      console.error("Error listening on match log file: " + data);
      console.log("Retrying...");
      _timerId = setTimeout(
        listenOnFile,
        FETCHER_INTERVAL_MS);
      return;
    }

    _tryParseSteamId(data);
  }


  function _tryParseSteamId(data) {
    if (!data) {
      return;
    }

    let steamId, result;

    result = data.match(_steamIdRegexp);

    if (result && result[1]) {
      steamId = result[1];
      _infoDB.set(SUPPORTED_FEATURES.me.name,
                  SUPPORTED_FEATURES.me.info.steamId.category,
                  SUPPORTED_FEATURES.me.info.steamId.key,
                  steamId);
      stop();
    }
  }

  function stop(force) {
    if (_timerId) {
      clearTimeout(_timerId);
      _timerId = null;
    }

    if (force) {
      _closeLogFile();
    } else {
      setTimeout(_closeLogFile, 1000);
    }
  }

  function _closeLogFile() {
    if (!_fileClosing && _listeningOnFile) {
      _fileClosing = true;
      console.log("Closing player fetcher file in 2 seconds...");

      setTimeout(function () {
        if (!_ioPlugin) {
          console.error("no IO plugin");
          _fileClosing = false;
          _listeningOnFile = false;
          return;
        }
        _ioPlugin.onFileListenerChanged.removeListener(_playerFetcherLogListener);
        _registerListeningOnFile = false;
        _ioPlugin.stopFileListen(FETCHER_FILE_LISTENER_ID);
        console.log("Player fetcher file closed.");
        _fileClosing = false;
        _listeningOnFile = false;
      }, 2000);
    }
  }

  return {
    start: start,
    stop: stop
  };
});
