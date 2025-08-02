define([
  "/games/service/GameService.js",
  "/games/mtga/supported_features.js",
  "/games/mtga/plugin_whitelists.js",
  "/games/mtga/plugin.js"
], function(
  GameService,
  SupportedFeatures,
  PluginWhitelist,
  Plugin,
) {
  let MtgaGameService = class MtgaGameService extends GameService {
    constructor() {
      super({
        game: {
          id: 21308,
          name: "Magic The Gathering Arena"
        },
        eventOverrides: [],
        infoUpdateOverrides: [],
        supportedFeatures: SupportedFeatures,
        pluginWhitelist: PluginWhitelist,
        plugin: Plugin,
        logBlacklist: []
      });
    }

    async start(gameInfo, isDisabled) {
      super.start(gameInfo, isDisabled);

    }
  };

  return new MtgaGameService();
});
