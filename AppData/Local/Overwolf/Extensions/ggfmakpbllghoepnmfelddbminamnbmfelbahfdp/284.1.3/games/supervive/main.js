define([
  '/games/service/GameService.js',
  '/games/supervive/supported_features.js',
  '/games/supervive/plugin_whitelist.js',
  '/games/supervive/plugin.js'
],
  function (GameService,
            SupportedFeatures,
            PluginWhitelist,
            Plugin) {
    return new class SuperviveGameService extends GameService {
      constructor() {
        super({
          game: {
            id: 24346,
            name: "Supervive"
          },
          eventOverrides: [],
          infoUpdateOverrides: [],
          supportedFeatures: SupportedFeatures,
          pluginWhitelist: PluginWhitelist,
          plugin: Plugin,
          logBlacklist: []
        });
      }
    };
  });