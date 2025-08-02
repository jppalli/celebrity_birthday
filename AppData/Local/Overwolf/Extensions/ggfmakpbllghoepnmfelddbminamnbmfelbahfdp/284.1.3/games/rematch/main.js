define([
  '/games/service/GameService.js',
  '/games/rematch/supported_features.js',
  '/games/rematch/plugin_whitelist.js',
  '/games/rematch/plugin.js',
  '/utils/plugin/plugin_type.js',
],
  function (GameService,
    SupportedFeatures,
    PluginWhitelist,
    Plugin,
    PluginType) {
    return new (class RematchGameService extends GameService {
      constructor() {
        super({
          game: {
            id: 26120,
            name: "Rematch"
          },
          eventOverrides: [],
          infoUpdateOverrides: [],
          supportedFeatures: SupportedFeatures,
          pluginWhitelist: PluginWhitelist,
          plugin: Plugin,
          logBlacklist: [],
        });
      }

      appInit() {
        super.appInit();
      }
    })();
  });