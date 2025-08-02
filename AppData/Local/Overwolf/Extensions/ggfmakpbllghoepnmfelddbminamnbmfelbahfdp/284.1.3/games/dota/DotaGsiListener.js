
define([
  '/utils/GSI/gsi_client.js',
  '/games/dota/gsi_checks.js',
  '/games/dota/DotaGsiEvents.js',
  '/games/dota/hero_detection.js',
], function (GsiClient,
  GsiChecks,
  dotaEvents,
  HeroDetection) {

  let _gsiClient = GsiClient;
  const DOTA_GAME_NAME = "dota";
  const DOTA_GAME_ID = 7314;
  const DEFAULT_GSI_PORT = 59874;
  let _killsInRow = 0;
  let _lastKillCount = 0;
  let _killsTimeout = null;
  let _infoDB, _featuresHandler;

  let fileContents = '"Overwolf Dota Integration v0.1"\n' +
    '{\n' +
    `\t"uri"        "http://localhost:${DEFAULT_GSI_PORT}"\n` +
    '\t"timeout" 	"5.0"\n' +
    '\t"buffer"  	"0.1"\n' +
    '\t"throttle" 	"0.1"\n' +
    '\t"heartbeat" 	"30.0"\n' +
    '\t"data"\n' +
    '\t{\n' +
    '\t\t"provider"     "1"\n' +
    '\t\t"map"          "1"\n' +
    '\t\t"player"       "1"\n' +
    '\t\t"hero"         "1"\n' +
    '\t\t"abilities"    "1"\n' +
    '\t\t"items"        "1"\n' +
    '\t}\n' +
    '}\n';

  async function init(infoDB, featuresHandler) {
    _infoDB = infoDB;
    _featuresHandler = featuresHandler;
  }

  function addSupportedFeatures(supportedFeaturesArray) {
    let supportedFeatures = Object.keys(dotaEvents);
    return supportedFeaturesArray.concat(supportedFeatures);
  }

  async function start() {
    let port = await _gsiClient.getGamePort(DOTA_GAME_ID, DEFAULT_GSI_PORT);
    if (port) {
      await _writeGSIFilesForCurrentRunningGame(port);
    }

    _gsiClient.addListener(defaultListener);
    _gsiClient.start(DOTA_GAME_NAME, dotaEvents, new GsiChecks(), port);
  }

  function stop() {
    if (_gsiClient) {
      _gsiClient.removeListener(defaultListener);
      _gsiClient.stop();
    }

  }

  async function _writeGSIFilesForCurrentRunningGame(port) {
    return new Promise(resolve => {
      overwolf.games.getRunningGameInfo(async function (info) {
        if (!info || !info.isRunning) {
          console.log('[DOTA] service started but no game is running');
          resolve();
          return;
        }

        let gameId = parseInt(info.id / 10);
        if (gameId !== DOTA_GAME_ID) {
          console.log('[DOTA] service started but DOTA is not running');
          resolve();
          return;
        }

        console.log('[DOTA] DOTA is running - creating/replacing GSI file...');
        await modifyFileAndWrite(info.executionPath, port);
        resolve();
      });
    });
  }

  async function modifyFileAndWrite(processPath, port) {
    let isWin32 = processPath.indexOf("bin/win32") > -1;
    let replaceString = isWin32 ? "bin/win32/dota2.exe" : "bin/win64/dota2.exe";

    let filePath = processPath.replace(replaceString, "dota/cfg/gamestate_integration/gamestate_integration_overwolf.cfg");
    await _gsiClient.writeFileIfNeeded(filePath, fileContents.replace(/:[0-9]+/, `:${port}`), port);
  }

  function defaultListener(event, value, rawJson) {
    if (event === 'kill') {
      if (_killsTimeout) {
        clearTimeout(_killsTimeout);
      }
      _killsInRow = value.kills - _lastKillCount;
      _killsTimeout = setTimeout(_getKillsResetFn(value.kills), 18000);

      switch (_killsInRow) {
        case 1:
          value.label = 'kill';
          break;
        case 2:
          value.label = 'double_kill';
          break;
        case 3:
          value.label = 'triple_kill';
          break;
        case 4:
          value.label = 'ultra_kill';
          break;
        case 5:
        default:
          value.label = 'rampage';
          break;
      }
    }

    _updateInfos(event, value, rawJson);
    _featuresHandler.triggerEvent(event, event, value);
  }

  function _updateInfos(event, value, rawJson) {
    if (event == "game_state_changed") {
      _sendGameStateChangeEvents(event, value, rawJson);
    }

    if ((event == "match_state_changed") || (event == "game_state_changed")) {
      let info = {
        feature: 'match_state_changed',
        category: "game",
        key: "match_state",
        value: value.match_state
      };

      _infoDB.set(info.feature, info.category, info.key, info.value);
    }

    if (event == "pseudo_match_id") {
      let info = {
        feature: 'match_info',
        category: "match_info",
        key: "pseudo_match_id",
        value: value.match_id
      };

      _infoDB.set(info.feature, info.category, info.key, info.value);

    }
  }

  function _sendGameStateChangeEvents(event, value, rawJson) {
    let info = {
      feature: "game_state_changed",
      category: "game",
      key: "game_state",
      value: value.game_state
    };

    _infoDB.set(info.feature, info.category, info.key, info.value);

    info.feature = "me";
    info.category = "me";
    info.key = "steam_id";
    info.value = value.player_steam_id;


    _infoDB.set(info.feature, info.category, info.key, info.value);
    HeroDetection.tryDetectHero(_infoDB);

    info.key = "team";
    info.value = value.player_team;

    _infoDB.set(info.feature, info.category, info.key, info.value);
  }

  function _getKillsResetFn(killCount) {
    let fn = function () {
      _lastKillCount = killCount;
      _killsInRow = 0;
    };
    return fn;
  }

  function addListener(fn) {
    if (!_gsiClient) {
      return;
    }

    _gsiClient.addListener(fn);
  }

  function removeListener(fn) {
    if (!_gsiClient) {
      return;
    }

    _gsiClient.removeListener(fn);
  }

  return {
    init: init,
    addSupportedFeatures: addSupportedFeatures,
    start: start,
    stop: stop,
    fileExists: GsiClient.fileExists,
    addListener: addListener,
    removeListener: removeListener
  };
});

