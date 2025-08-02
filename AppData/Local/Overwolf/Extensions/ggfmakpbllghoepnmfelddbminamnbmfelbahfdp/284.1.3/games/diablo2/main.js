define([
  "/games/service/GameService.js",
  "/games/diablo2/supported_features.js",
  "/games/diablo2/plugin_whitelists.js",
  "/games/diablo2/plugin.js",
], function(
  GameService,
  SupportedFeatures,
  PluginWhitelist,
  Plugin,
  LogListener
) {
  let Diablo2GameService = class Diablo2GameService extends GameService {
    constructor() {
      super({
        game: {
          id: 21848,
          name: "Diablo2"
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

  return new Diablo2GameService();
});
