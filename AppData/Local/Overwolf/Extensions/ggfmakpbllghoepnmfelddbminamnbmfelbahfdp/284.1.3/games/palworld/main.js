define([
  '/games/service/GameService.js',
  '/games/palworld/supported_features.js',
  '/games/palworld/plugin_whitelist.js',
  '/games/palworld/plugin.js'
],
  function (GameService,
            SupportedFeatures,
            PluginWhitelist,
            Plugin) {
    return new class PalGameService extends GameService {
      constructor() {
        super({
          game: {
            id: 23944,
            name: "Palworld"
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