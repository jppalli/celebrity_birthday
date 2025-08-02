define([
  "/games/service/GameService.js",
  "/games/vgep/general_supported_features.js",
  "/games/vgep/general_plugin_whitelist.js",
  "/games/vgep/lethal_company/plugin.js",
  "/utils/plugin/plugin_type.js",
], function (
  GameService,
  SupportedFeatures,
  PluginWhitelist,
  Plugin,
  PluginType
) {
  return new (class LcGameService extends GameService {
    constructor() {
      super({
        game: {
          id: 23522,
          name: "Lethal Company",
        },
        eventOverrides: [],
        infoUpdateOverrides: [],
        supportedFeatures: SupportedFeatures,
        pluginWhitelist: PluginWhitelist,
        plugin: Plugin,
        logBlacklist: [],
        pluginType: PluginType.GOOP,
        goopConfig: "games/vgep/lethal_company/goop-config.json",
      });
    }

    appInit() {
      super.appInit();
    }
  })();
});
