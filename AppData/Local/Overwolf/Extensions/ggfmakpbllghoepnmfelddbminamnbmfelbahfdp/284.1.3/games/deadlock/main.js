define([
  '/games/service/GameService.js',
  '/games/deadlock/supported_features.js',
  '/games/deadlock/plugin_whitelist.js',
  '/games/deadlock/plugin.js'
],
  function (GameService,
            SupportedFeatures,
            PluginWhitelist,
            Plugin) {
    return new class DeadlockGameService extends GameService {
      constructor() {
        super({
          game: {
            id: 24482,
            name: "Deadlock"
          },
          eventOverrides: [],
          infoUpdateOverrides: [],
          supportedFeatures: SupportedFeatures,
          pluginWhitelist: PluginWhitelist,
          plugin: Plugin,
          logBlacklist: ["roster", "items"]
        });
      }
    };
  });