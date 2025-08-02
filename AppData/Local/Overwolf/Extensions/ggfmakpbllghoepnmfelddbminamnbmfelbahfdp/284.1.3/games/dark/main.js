define([
  '/games/service/GameService.js',
  '/games/dark/supported_features.js',
  '/games/dark/plugin_whitelist.js',
  '/games/dark/plugin.js'
],
  function (GameService,
            SupportedFeatures,
            PluginWhitelist,
            Plugin) {
    return new class DarkGameService extends GameService {
      constructor() {
        super({
          game: {
            id: 22584,
            name: "Dark and Darker"
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