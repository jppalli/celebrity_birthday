define([
  "/games/service/GameService.js",
  "/games/vgep/general_supported_features.js",
  "/games/vgep/general_plugin_whitelist.js",
  "/games/vgep/the_finals/plugin.js",
  "/utils/plugin/plugin_type.js",
],
  function (GameService,
    SupportedFeatures,
    PluginWhitelist,
    Plugin, PluginType) {
    return new (class TfGameService extends GameService {
      constructor() {
        super({
          game: {
            id: 23478,
            name: "The Finals"
          },
          eventOverrides: [],
          infoUpdateOverrides: [],
          supportedFeatures: SupportedFeatures,
          pluginWhitelist: PluginWhitelist,
          plugin: Plugin,
          logBlacklist: [],
          pluginType: PluginType.GOOP,
          goopConfig: "games/vgep/the_finals/goop-config.json",
        });
      }

      appInit() {
        super.appInit();
      }
    })();
  });