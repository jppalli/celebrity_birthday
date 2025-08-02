define(['/games/lol/supported_features.js',
        '/games/lol/plugin_whitelist.js',
        '/utils/game_monitoring_util.js',
        '/utils/game_events_monitor.js',
        '/utils/analytics.js'
      ],
  function(SupportedFeatures,
           PluginWhitelist,
           GameMonitoringUtility,
           GameEventsMonitor,
           Analytics){

    let _tasksList = ['var_map', 'lvl', 'game_modes', 'abilities', 'play_type',
      'objectmanager', 'tft_gameplay'];

    let CODES = {
      LOL_PATCH: 40001,
      LOL_PATCH_RETRIEVAL_FAILURE: 40002,
      ERROR_EXTRACTING_SUMMONER_ID: 40010,
      ERROR_EXTRACTING_MATCH_ID: 40032,
      LOL_CRASH_DUMP: 400088,
    };

    const LOL_PATCH_KEY = "patch";
    const LOL_PATCH_FAIL_KEY = "patch_retrieval";

    let _monitoring;
    function LoLMonitoringUtility(config){

      _monitoring = new GameMonitoringUtility({
        game: {
          name: "LOL",
          id: window.___gameid___ || 5426
        },
        taskList: _tasksList,
        infoDB: config.infoDB,
        supportedFeatures: SupportedFeatures,
        pluginWhiteList: PluginWhitelist
      });

      this.addMonitoringEvents();

    }

    LoLMonitoringUtility.prototype = {
      constructor: LoLMonitoringUtility,

      stop: function stop(){
        _monitoring.stop();
      },

      handleGameTrackingInfoUpdate: function handleGameTrackingInfoUpdate(info) {
        _monitoring.handleGameTrackingInfoUpdate(info);
      },

      handleGameTrackingEvent: function handleGameTrackingEvent(event){
        _monitoring.handleGameTrackingEvent(event);
      },

      sendBatchPluginMonitoringEvents: function sendBatchPluginMonitoringEvents(){
        _monitoring.sendBatchPluginMonitoringEvents();
      },

      addMonitoringEvents: function addMonitoringEvents(){
        _monitoring.addTracking(LOL_PATCH_KEY, CODES.LOL_PATCH, function(key, value){
          console.log('LoL patch: ' + value);
          _monitoring.sendTrack(_monitoring.TRACKING_KINDS[LOL_PATCH_KEY], value);
        });

        _monitoring.addTracking(
          LOL_PATCH_FAIL_KEY,
          CODES.LOL_PATCH_RETRIEVAL_FAILURE,
          function(key, value){
            if (value === 'failure') {
              console.log('LoL patch retrieval error');
              _monitoring.sendTrack(
                _monitoring.TRACKING_KINDS[LOL_PATCH_FAIL_KEY]);
            }
          });

        _monitoring.addTracking(
          "ERROR_EXTRACTING_SUMMONER_ID",
          CODES.ERROR_EXTRACTING_SUMMONER_ID
        );
      },

      sendCrashDumpEvent: function sendCrashDumpEvent(variant) {
        let extra = variant
        _monitoring.sendTrack( CODES.LOL_CRASH_DUMP, extra);
      },

      sendTftDisabled: function sendTftDisabled(gepVersion) {
        let extra = "21570" + "." + gepVersion.replace(/\./g,"_");
        _monitoring.sendTrack( _monitoring.TRACKING_KINDS.REMOTE_CONFIG_DISABLED, JSON.stringify(extra));
      },

      sendArenaDisabled: function sendArenaDisabled(gepVersion) {
        let extra = "21556" + "." + gepVersion.replace(/\./g,"_");
        _monitoring.sendTrack( _monitoring.TRACKING_KINDS.REMOTE_CONFIG_DISABLED, JSON.stringify(extra));
      },

      sendSwarmDisabled: function sendSwarmDisabled(gepVersion) {
        let extra = "13956" + "." + gepVersion.replace(/\./g,"_");
        _monitoring.sendTrack( _monitoring.TRACKING_KINDS.REMOTE_CONFIG_DISABLED, JSON.stringify(extra));
      },

      sendBrawlDisabled: function sendBrawlDisabled(gepVersion) {
        let extra = "21568" + "." + gepVersion.replace(/\./g,"_");
        _monitoring.sendTrack( _monitoring.TRACKING_KINDS.REMOTE_CONFIG_DISABLED, JSON.stringify(extra));
      },

      reportEvent: function reportEvent(info,type){
        _monitoring.reportEvent(info,type);
      },

      setTFTGameMode: function setTFTGameMode(gameName) {
        _monitoring.setGame(gameName);
       },

       setARENAGameMode: function setARENAGameMode(gameName) {
        _monitoring.setGame(gameName);
        Analytics.lolGameMode(gameName);
       },

       setSWARMGameMode: function setSWARMGameMode(gameName) {
        _monitoring.setGame(gameName);
        Analytics.lolGameMode(gameName);
       },

       setBRAWLGameMode: function setBRAWLGameMode(gameName) {
        _monitoring.setGame(gameName);
        Analytics.lolGameMode(gameName);
       },

       setPBEGameMode: function setPBEGameMode(enabled) {
        this.isPbe = enabled;
        _monitoring.setPBE(enabled);
       },

       setDisabled: function setDisabled(disabled) {
        this.disabled = disabled;
        _monitoring.setDisabled(disabled);
       },

       isPbe: function isPbe() {
        return this.isPbe;
      },
    };

    return LoLMonitoringUtility;
});