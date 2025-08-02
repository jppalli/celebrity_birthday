define([
  "/games/service/GameService.js",
  "/games/vgep/general_supported_features.js",
  "/games/vgep/general_plugin_whitelist.js",
  "/games/vgep/eldenring_nightreign/plugin.js",
  "/utils/plugin/plugin_type.js",
],
  function (GameService,
    SupportedFeatures,
    PluginWhitelist,
    Plugin, PluginType) {
    return new (class ErnGameService extends GameService {
      constructor() {
        super({
          game: {
            id: 25918,
            name: "Elden Ring Nightreign"
          },
          eventOverrides: [],
          infoUpdateOverrides: [],
          supportedFeatures: SupportedFeatures,
          pluginWhitelist: PluginWhitelist,
          plugin: Plugin,
          logBlacklist: [],
          pluginType: PluginType.GOOP,
          goopConfig: "games/vgep/eldenring_nightreign/goop-config.json",
        });
      }

      appInit() {
        super.appInit();
      }
    })();
  });