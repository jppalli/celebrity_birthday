define([
  "/games/service/GameService.js",
  "/games/vgep/general_supported_features.js",
  "/games/vgep/general_plugin_whitelist.js",
  "/games/vgep/street_fighter6/plugin.js",
  "/utils/plugin/plugin_type.js",
],
  function (GameService,
    SupportedFeatures,
    PluginWhitelist,
    Plugin, PluginType) {
    return new (class Sf6GameService extends GameService {
      constructor() {
        super({
          game: {
            id: 22894,
            name: "Street Fighter 6"
          },
          eventOverrides: [],
          infoUpdateOverrides: [],
          supportedFeatures: SupportedFeatures,
          pluginWhitelist: PluginWhitelist,
          plugin: Plugin,
          logBlacklist: ["character_side_left","character_side_right"],
          pluginType: PluginType.GOOP,
          goopConfig: "games/vgep/street_fighter6/goop-config.json",
        });
      }

      appInit() {
        super.appInit();
      }
    })();
  });