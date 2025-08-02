define([
  "/games/service/GameService.js",
  "/games/vgep/general_supported_features.js",
  "/games/vgep/general_plugin_whitelist.js",
  "/games/vgep/hades2/plugin.js",
  "/utils/plugin/plugin_type.js",
],
  function (GameService,
    SupportedFeatures,
    PluginWhitelist,
    Plugin, PluginType) {
    return new (class HaGameService extends GameService {
      constructor() {
        super({
          game: {
            id: 24218,
            name: "Hades 2"
          },
          eventOverrides: [],
          infoUpdateOverrides: [],
          supportedFeatures: SupportedFeatures,
          pluginWhitelist: PluginWhitelist,
          plugin: Plugin,
          logBlacklist: [],
          pluginType: PluginType.GOOP,
          goopConfig: "games/vgep/hades2/goop-config.json",
        });
      }

      appInit() {
        super.appInit();
      }
    })();
  });