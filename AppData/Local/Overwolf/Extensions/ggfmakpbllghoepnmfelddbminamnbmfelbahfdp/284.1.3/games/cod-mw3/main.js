define([
  "/games/service/GameService.js",
  "/games/cod-mw3/supported_features.js",
  "/games/cod-mw3/plugin_whitelist.js",
  "/games/cod-mw3/plugin.js",
  "/utils/plugin/plugin_type.js",
], function (
  GameService,
  SupportedFeatures,
  PluginWhitelist,
  Plugin,
  PluginType
) {
  return new (class CoDMW3GameService extends GameService {
    constructor() {
      super({
        game: {
          id: 23424,
          name: "CoD-mw3",
        },
        eventOverrides: [],
        infoUpdateOverrides: [],
        supportedFeatures: SupportedFeatures,
        pluginWhitelist: PluginWhitelist,
        plugin: Plugin,
        logBlacklist: [],
        pluginType: PluginType.GOOP,
        goopConfig: "games/cod-mw3/goop/goop-all.json",
      });
    }

    appInit() {
      super.appInit();
    }
  })();
});
