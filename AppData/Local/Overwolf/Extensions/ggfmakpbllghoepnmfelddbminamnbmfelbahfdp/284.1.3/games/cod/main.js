define([
  "/games/service/GameService.js",
  "/games/cod/supported_features.js",
  "/games/cod/plugin_whitelist.js",
  "/games/cod/plugin.js",
  "/utils/plugin/plugin_type.js",
], function (
  GameService,
  SupportedFeatures,
  PluginWhitelist,
  Plugin,
  PluginType
) {
  return new (class CoDGameService extends GameService {
    constructor() {
      super({
        game: {
          id: 22328,
          name: "CoD",
        },
        eventOverrides: [],
        infoUpdateOverrides: [],
        supportedFeatures: SupportedFeatures,
        pluginWhitelist: PluginWhitelist,
        plugin: Plugin,
        logBlacklist: [],
        pluginType: PluginType.GOOP,
        goopConfig: "games/cod/goop/goop-all.json",
      });
    }

    appInit() {
      super.appInit();
    }
  })();
});
