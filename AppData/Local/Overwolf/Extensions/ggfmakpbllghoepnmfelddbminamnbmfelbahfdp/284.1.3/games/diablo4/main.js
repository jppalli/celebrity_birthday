define([
  '/games/service/GameService.js',
  '/games/diablo4/supported_features.js',
  '/games/diablo4/plugin_whitelist.js',
  '/games/diablo4/plugin.js'
],
  function (GameService,
            SupportedFeatures,
            PluginWhitelist,
            Plugin) {
    return new class Diablo4GameService extends GameService {
      constructor() {
        super({
          game: {
            id: 22700,
            name: "Diablo 4"
          },
          eventOverrides: [],
          infoUpdateOverrides: [],
          supportedFeatures: SupportedFeatures,
          pluginWhitelist: PluginWhitelist,
          plugin: Plugin,
          logBlacklist: ["location"]
        });
      }
    };
  });