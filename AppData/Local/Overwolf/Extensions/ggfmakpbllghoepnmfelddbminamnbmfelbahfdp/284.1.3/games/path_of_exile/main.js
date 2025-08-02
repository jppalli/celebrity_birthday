define([
  '/games/service/GameService.js',
  '/games/path_of_exile/supported_features.js',
  '/games/path_of_exile/plugin_whitelists.js',
  '/games/path_of_exile/plugin.js'
], function (GameService,
             SupportedFeatures,
             PluginWhitelist,
             Plugin) {
  class GameServicePoE extends GameService {
    constructor() {
      super({
        game: {
          id: 7212,
          name: "Path of Exile"
        },
        eventOverrides: [],
        infoUpdateOverrides: [],
        supportedFeatures: SupportedFeatures,
        pluginWhitelist: PluginWhitelist,
        plugin: Plugin,
        logBlacklist: ['chat']
      });
    }
  };

  return new GameServicePoE();
});
