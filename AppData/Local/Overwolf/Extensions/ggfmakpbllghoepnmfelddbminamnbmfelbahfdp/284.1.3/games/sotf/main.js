define([
  '/games/service/GameService.js',
  '/games/sotf/supported_features.js',
  '/games/sotf/plugin_whitelist.js',
  '/games/sotf/plugin.js'
],
  function (GameService,
            SupportedFeatures,
            PluginWhitelist,
            Plugin) {
    return new class SotfGameService extends GameService {
      constructor() {
        super({
          game: {
            id: 22638,
            name: "Sons Of The Forest"
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