define([
  '/games/service/GameService.js',
  '/games/new_world/supported_features.js',
  '/games/new_world/plugin_whitelist.js',
  '/games/new_world/plugin.js'
],
  function (GameService,
    SupportedFeatures,
    PluginWhitelist,
    Plugin) {
    return new class NewWorldGameService extends GameService {
      constructor() {
        super({
          game: {
            id: 21816,
            name: "New World"
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