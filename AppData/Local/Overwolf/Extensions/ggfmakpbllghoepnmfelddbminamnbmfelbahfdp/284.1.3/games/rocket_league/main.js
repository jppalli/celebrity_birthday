define([
  '/utils/InfoDBContainer.js',
  '/utils/FeaturesHandler.js',
  '/utils/gep_internal_info_tracker.js',
  '/games/rocket_league/plugin.js',
  '/games/rocket_league/playerFetcher.js',
  '/games/rocket_league/supported_features.js',
  '/games/rocket_league/plugin_whitelist.js',
  '/utils/game_monitoring_util.js',
  '/utils/io_plugin.js'
], function(InfoDBContainer,
            FeaturesHandler,
            GepInternalInfo,
            plugin,
            playerFetcher,
            SUPPORTED_FEATURES,
            PluginWhitelist,
            GameMonitoringUtility,
            IOPlugin) {

  let _started = false;
  const LOG_BLACK_LIST = ["roster"];
  const RL_GAME_ID = 10798;

  let _infoDB = new InfoDBContainer({
    logBlacklist: LOG_BLACK_LIST
  }, RL_GAME_ID);
  let _monitoring = new GameMonitoringUtility({
    game: {
      name: "Rocket League",
      id: RL_GAME_ID,
    },
    infoDB: _infoDB,
    supportedFeatures: SUPPORTED_FEATURES,
    pluginWhiteList: PluginWhitelist
  });
  let _featuresHandler = new FeaturesHandler({
    monitoring: _monitoring,
    logBlacklist: LOG_BLACK_LIST,
    gepInternalInfoTracker: new GepInternalInfo({ infoDB: _infoDB })
  },RL_GAME_ID);

  function onAppInit() {
    console.log('[Rocket League] onAppInit');
    IOPlugin.asyncAssureCreation().then(_ => {
    }).catch(_ => {
    });
  }

  async function start(gameInfo, isDisabled) {
    if (_started) {
      console.log('[Rocket League] service already started');
      return;
    }

    console.log('[Rocket League] starting');

    _featuresHandler.addSupportedFeatures(SUPPORTED_FEATURES);
    _featuresHandler.setSupportedFeatures();

    if (gameInfo) {
      _infoDB.setGameProcessId(gameInfo.processId);
      _featuresHandler.setGameProcessId(gameInfo.processId);
    }

    plugin.start(_infoDB, _featuresHandler, isDisabled);
    IOPlugin.asyncAssureCreation().then(_ => {
      playerFetcher.start(_infoDB, _featuresHandler);
    }).catch(_ => {
      console.log("[Rocket league] failed to create io plugin service");
    });



    _infoDB.reset();

    overwolf.games.events.provider.onRequiredFeaturesChanged.removeListener(onRequiredFeaturesChanged);
    overwolf.games.events.provider.onRequiredFeaturesChanged.addListener(onRequiredFeaturesChanged);

    _started = true;
  }


  function onRequiredFeaturesChanged(requiredFeatures) {
    console.log("Required Features Changed: " + JSON.stringify(requiredFeatures));
  }

  function shutdown() {
    console.log('[Rocket League] shutdown');
    playerFetcher.stop();
    plugin.stop();
    _monitoring.stop();
    _started = false;
  }

  function getNumOfEvents() {
    return plugin.getNumOfEvents();
  }

  return {
    appInit: onAppInit,
    start: start,
    shutdown: shutdown,
    getNumOfEvents: getNumOfEvents
  }
});