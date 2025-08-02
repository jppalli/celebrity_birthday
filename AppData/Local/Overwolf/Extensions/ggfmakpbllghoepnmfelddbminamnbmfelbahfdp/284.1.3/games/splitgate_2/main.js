define([
  '/games/service/GameService.js',
  '/games/splitgate_2/supported_features.js',
  '/games/splitgate_2/plugin_whitelist.js',
  '/games/splitgate_2/plugin.js',
  '/utils/plugin/plugin_type.js',
],
  function (GameService,
    SupportedFeatures,
    PluginWhitelist,
    Plugin,
    PluginType) {
    return new (class Splitgate2GameService extends GameService {
      constructor() {
        super({
          game: {
            id: 25884,
            name: "Splitgate 2"
          },
          eventOverrides: [],
          infoUpdateOverrides: [],
          supportedFeatures: SupportedFeatures,
          pluginWhitelist: PluginWhitelist,
          plugin: Plugin,
          logBlacklist: [],
          pluginType: PluginType.GOOP,
          goopConfig: "games/splitgate_2/goop-config.json",
        });
      }

      appInit() {
        super.appInit();
      }
    })();
  });