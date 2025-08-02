define([
  '/games/service/GameService.js',
  '/games/legends_of_runeterra/supported_features.js',
  '/games/legends_of_runeterra/plugin_whitelist.js',
  '/games/legends_of_runeterra/plugin.js',
  '/games/legends_of_runeterra/lor_live_client_data.js'
],
  function (GameService,
    SupportedFeatures,
    PluginWhitelist,
    Plugin,
    LoRLiveClientData) {
    return new class LegendsOfRuneterraGameService extends GameService {
      constructor() {
        super({
          game: {
            id: 21620,
            name: "Legends of Runeterra"
          },
          eventOverrides: [],
          infoUpdateOverrides: [],
          supportedFeatures: SupportedFeatures,
          pluginWhitelist: PluginWhitelist,
          plugin: Plugin,
          logBlacklist: []
        });

        this._liveClientData = null;
      }

      async start(gameInfo, isDisabled) {
        super.start(gameInfo, isDisabled);

        this._liveClientData = new LoRLiveClientData({
          infoDB: this._infoDB,
          featuresHandler: this._featuresHandler
        });

        this._liveClientData.start();
      }
    };
  });