define([
  '/utils/InfoDBContainer.js',
  '/utils/FeaturesHandler.js',
  '/utils/gep_internal_info_tracker.js',
  '/games/dota/supported_features.js',
  '/games/dota/DotaGsiListener.js',
  '/games/dota/plugin.js',
  '/games/pubg/plugin_whitelists.js',
  '/utils/game_monitoring_util.js'
], function (InfoDBContainer,
             FeaturesHandler,
             GepInternalInfo,
             SupportedFeatures,
             DotaGsiListener,
             Plugin,
             PluginWhitelist,
             GameMonitoringUtility) {


                const DOTA_GAME_ID = 7314;
  const LOG_BLACK_LIST = ['hero_health_mana_info', 'clock_time_changed',
    'hero_item_cooldown_changed', 'hero_ability_cooldown_changed', 'gpm',
    'gold', 'xpm', 'hero_buyback_info_changed', 'ward_purchase_cooldown_changed',
  ];

  let _totalNumOfEvents = 0;
  let _infoDB = new InfoDBContainer({
    logBlacklist: LOG_BLACK_LIST
  }, DOTA_GAME_ID);

  let _monitoring = new GameMonitoringUtility({
    game: {
      name: "DOTA2",
      id: DOTA_GAME_ID,
    },
    infoDB: _infoDB,
    supportedFeatures: SupportedFeatures,
    pluginWhiteList: PluginWhitelist
  });
  let _featuresHandler = new FeaturesHandler({
    logBlacklist: LOG_BLACK_LIST,
    monitoring: _monitoring,
    gepInternalInfoTracker: new GepInternalInfo({ infoDB: _infoDB })
  }, DOTA_GAME_ID);
  let _gsiListenerTimeout;
  let _gsiInitialized = false;
  let _started = false;

  let _dotaGsiListener = DotaGsiListener;


  function onAppInit() {
    console.log('[DOTA] onAppInit');
    _gsiListenerTimeout = setTimeout(function () {
      overwolf.games.getGameInfo(DOTA_GAME_ID, async function (result) {
        try {
          if (result.status == 'success' && result.gameInfo) {
            const gameInstalled = await _dotaGsiListener.fileExists(
              result.gameInfo.ProcessPath
            );
            if (!gameInstalled) {
              console.log('[DOTA] game file not exits, skip GSI file');
              return;
            }
            let port = await GsiClient.getGamePort(
              DOTA_GAME_ID,
              DEFAULT_GSI_PORT
            );
            await modifyFileAndWrite(result.gameInfo.ProcessPath, port);
          } else {
            console.log(
              'Could not find a valid DOTA installation. Reason: ' +
                result.reason
            );
            console.log('Aborting...');
          }
        } catch (err) {
          console.error('[DOTA] gsi install error', err);
        }
      });

      if (!_gsiInitialized) {
        console.log('[DOTA] initializing DotaGsiListener from onAppInit');
        _gsiInitialized = true;
        _dotaGsiListener.init(_infoDB, _featuresHandler);
      }
    }, 1000);
  }

  async function  start(gameInfo, isDisabled) {
    if (_started) {
      console.info("[DOTA] service already started");
      return;
    }

    let supportedFeatures = [];
    supportedFeatures = _dotaGsiListener.addSupportedFeatures(supportedFeatures);
    _featuresHandler.addSupportedFeatures(SupportedFeatures);
    _featuresHandler.concat(supportedFeatures);
    _featuresHandler.setSupportedFeatures();

    if(_gsiListenerTimeout){
      clearTimeout(_gsiListenerTimeout);
    }

        if (gameInfo) {
      _infoDB.setGameProcessId(gameInfo.processId);
      _featuresHandler.setGameProcessId(gameInfo.processId);
    }

    console.log("[DOTA] initializing DotaGsiListener from start");
    _dotaGsiListener.removeListener(onEvent);
    _dotaGsiListener.addListener(onEvent);
    _dotaGsiListener.init(_infoDB, _featuresHandler);
    _dotaGsiListener.start();

    Plugin.start(_infoDB, _featuresHandler, isDisabled);
    _started = true;
  }

  function shutdown() {
    console.log("[DOTA] Shutdown called");
    _monitoring.stop();
    _dotaGsiListener.stop();
  }

  function getNumOfEvents() {
    return _totalNumOfEvents;
  }

  function onEvent(event, value, rawJson) {
    _totalNumOfEvents++;
  }

  return {
    start: start,
    shutdown: shutdown,
    appInit: onAppInit,
    getNumOfEvents: getNumOfEvents
  }
});