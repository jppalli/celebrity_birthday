define([
  "/games/lol/plugin.js",
  "/games/lol/monitoring/monitoring_util.js",
  "/utils/io_plugin.js",
], function (_lolPlugin, LoLMonitoringUtility, IOPlugin) {
  const LOL_CRASH_DUMP_LISTENER = "lolDmpListener";
  const LISTENER_EXTENSION_FILTER = "*.DMP";
  const LOL_PATH_GAME = "/Game/";
  const LOL_PATH_REPORTS_SUFFIX = "/Logs/GameCrashes/reports";
  const LISTENER_INTERVAL_MS = 200;
  const STOP_LISTENER_INTERVAL = 10000
  const LISTENER_MAX_RETRIES = 10;
  const LOG_PREFIX = `[CRASH DUMP MONITOR]`;

  let _timerId = null;
  let _stopTimer = null;
  let _retries;
  let _registerListeningOnDirectory = false;
  let _ioPlugin;
  let _started;
  let _monitoring;
  let _reportsPath;
  let _lolVariant;
  let _gameVersion;

  const FolderListenerTypes = {
    Created: 0,
    Deleted: 1,
    Changed: 2
  }

  function start(gameInfo, ioPlugin, monitoring, gameVersion) {
    if (gameInfo == null) {
      console.error(`${LOG_PREFIX} received null gameInfo`);
      return false;
    }

    if (monitoring == null) {
      console.error(`${LOG_PREFIX} received null monitoring`);
      return false;
    }

    if (_stopTimer != null) {
      clearTimeout(_stopTimer)
    }

    if (gameVersion != null) {
      _setGameVersion(gameVersion);
    }

    _monitoring = monitoring;
    _gameInfo = gameInfo;
    _ioPlugin = ioPlugin;
    _retries = 0;
    _started = true;

    _parseReportsDirectory();

    _timerId = setTimeout(_registerDirectoryListener, 1);

    return true;
  }

  function stop() {
    _started = false;
    if (_timerId != null) {
      clearTimeout(_timerId);
      _timerId = null;
    }

    if (!_ioPlugin) {
      return;
    }

    _stopTimer = setTimeout(() => {
      if (!_ioPlugin.stopFolderListen) {
        return;
      }

      _ioPlugin.stopFolderListen(LOL_CRASH_DUMP_LISTENER);
    },
      STOP_LISTENER_INTERVAL
    );
  }

  function _setGameVersion(version) {
    _gameVersion = version;
  }

  function _registerDirectoryListener() {
    try {
      _retries++;
      if (_retries >= LISTENER_MAX_RETRIES) {
        console.error(`${LOG_PREFIX} reached max retries`);
        stop();
        return;
      }

      if (!_reportsPath) {
        _timerId = setTimeout(_registerDirectoryListener, LISTENER_INTERVAL_MS);
      }

      if (!_registerListeningOnDirectory) {
        _ioPlugin.onFolderListenerChanged.addListener(_onNewDmpFile);
        _registerListeningOnDirectory = true;
      }

      _ioPlugin.listenOnDirectory(
        LOL_CRASH_DUMP_LISTENER,
        _reportsPath,
        LISTENER_EXTENSION_FILTER,
        [FolderListenerTypes.Created],
        function (id, status, error) {
          if (!status) {
            console.log(
              `${LOG_PREFIX}Error listening on directory ${_reportsPath} ` +
              `Reason: ${error}`
            );
            console.log("LOG_PREFIX Retrying...");
            _timerId = setTimeout(
              _registerDirectoryListener,
              LISTENER_INTERVAL_MS
            );
            return;
          } else {
            console.log(`${LOG_PREFIX} Directory Listen Started: ${_reportsPath}`);
          }
        }
      );
    } catch (error) {
      console.error(`${LOG_PREFIX} Exception ${error}`);
    }
  }

  function _onNewDmpFile(id, status, data) {
    if (id !== LOL_CRASH_DUMP_LISTENER) {
      return;
    }

    if (!status) {
      console.error(`${LOG_PREFIX} Error while getting dump file ${data}`);
    }

    console.info(`${LOG_PREFIX} New CrashDumpFile ${data}`);

    _handleNewCrashDump();
  }

  function _handleNewCrashDump() {
    _sentryReport("lolCrashDump", _lolVariant);
    _trackCrashEvent();
    _uploadClientLogs();
  }

  function _trackCrashEvent() {
    const appVersion = (localStorage.getItem("appVersion") || "").replaceAll('.', '_') || "0_0_0_0";
    const gameVersion = (_gameVersion || "").replaceAll('.', '_');
    const owVersion = overwolf.version.replaceAll('.', '_') || "0_0_0_0";
    const extra = `${appVersion}.${gameVersion}.${_lolVariant}.${owVersion}`;
    _monitoring.sendCrashDumpEvent(extra);
  }

  function _sentryReport(eventName, variant) {
    try {
      Sentry.withScope((scope) => {
        scope.setExtra("variant", variant);
        Sentry.captureMessage(eventName);
      });
    } catch (ex) {
      console.error("Error while Sending sentry event: " + ex);
    }
  }

  function _uploadClientLogs() {
    overwolf.utils.uploadClientLogs({
      filePrefix: 'lol_crash_dump' + (_lolVariant || '')
    }, (e) => {
      if (!e.success) {
        console.error(`Error sending client logs ${JSON.stringify(e)}`);
      }
    });
  }

  function _parseReportsDirectory() {
    try {
      let path = _gameInfo.executionPath;
      console.log(
        `${LOG_PREFIX} parsing reports dir from execution path: ${path}`
      );
      if (!path || path === "") {
        return;
      }

      _lolVariant = path.includes("(PBE)") ? "PBE" : "Regular";

      path = path.slice(0, path.indexOf(LOL_PATH_GAME));
      path += LOL_PATH_REPORTS_SUFFIX;
      _reportsPath = path;
    } catch {
      console.error(`${LOG_PREFIX} error parsing ${path}`);
    }
  }

  return {
    start: start,
    stop: stop,
  };
});
