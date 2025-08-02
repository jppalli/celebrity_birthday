define([
  '/games/service/GameService.js',
  '/games/cs2/supported_features.js',
  '/games/cs2/plugin_whitelist.js',
  '/games/cs2/plugin.js'
],
  function (GameService,
            SupportedFeatures,
            PluginWhitelist,
            Plugin) {
    return new class Cs2GameService extends GameService {
      constructor() {
        super({
          game: {
            id: 22730,
            name: "Counter-Strike 2"
          },
          oop : true,
          eventOverrides: [],
          infoUpdateOverrides: [],
          supportedFeatures: SupportedFeatures,
          pluginWhitelist: PluginWhitelist,
          plugin: Plugin,
          logBlacklist: ['live_data']
        });
      }
    };
  });