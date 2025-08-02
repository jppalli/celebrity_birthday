define([
  "/games/service/GameService.js",
  "/games/lost_ark/supported_features.js",
  "/games/lost_ark/plugin_whitelists.js",
  "/games/lost_ark/plugin.js",
], function(
  GameService,
  SupportedFeatures,
  PluginWhitelist,
  Plugin,
) {
  let LostArkGameService = class LostArkGameService extends GameService {
    constructor() {
      super({
        game: {
          id: 21864,
          name: "Lost Ark"
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

  return new LostArkGameService();
});
