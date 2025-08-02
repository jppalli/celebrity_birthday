define([
  '/games/service/GameService.js',
  '/games/path_of_exile_2/supported_features.js',
  '/games/path_of_exile_2/plugin_whitelists.js',
  '/games/path_of_exile_2/plugin.js'
], function (GameService,
             SupportedFeatures,
             PluginWhitelist,
             Plugin) {
  class GameServicePoE2 extends GameService {
    constructor() {
      super({
        game: {
          id: 24886,
          name: "Path of Exile 2"
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

  return new GameServicePoE2();
});
