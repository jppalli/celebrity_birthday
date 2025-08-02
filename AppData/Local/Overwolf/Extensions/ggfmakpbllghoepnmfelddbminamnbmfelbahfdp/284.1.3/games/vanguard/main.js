define([
  "/games/service/GameService.js",
  "/games/vanguard/supported_features.js",
  "/games/vanguard/plugin_whitelist.js",
  "/games/vanguard/plugin.js",
  "/utils/plugin/plugin_type.js",
], function (
  GameService,
  SupportedFeatures,
  PluginWhitelist,
  Plugin,
  PluginType
) {
  return new (class VanguardGameService extends GameService {
    constructor() {
      super({
        game: {
          id: 21876,
          name: "CoD - Vanguard",
        },
        eventOverrides: [],
        infoUpdateOverrides: [],
        supportedFeatures: SupportedFeatures,
        pluginWhitelist: PluginWhitelist,
        plugin: Plugin,
        logBlacklist: [],
        pluginType: PluginType.GOOP,
        goopConfig: "games/vanguard/goop/goop.json",
      });
    }

    appInit() {
      super.appInit();
    }
  })();
});
