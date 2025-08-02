define([
  "/games/service/GameService.js",
  "/games/vgep/general_supported_features.js",
  "/games/vgep/general_plugin_whitelist.js",
  "/games/vgep/monster_hunter_wilds/plugin.js",
  "/utils/plugin/plugin_type.js",
],
  function (GameService,
    SupportedFeatures,
    PluginWhitelist,
    Plugin, PluginType) {
    return new (class MHwildsGameService extends GameService {
      constructor() {
        super({
          game: {
            id: 25446,
            name: "Monster Hunter Wilds"
          },
          eventOverrides: [],
          infoUpdateOverrides: [],
          supportedFeatures: SupportedFeatures,
          pluginWhitelist: PluginWhitelist,
          plugin: Plugin,
          logBlacklist: [],
          pluginType: PluginType.GOOP,
          goopConfig: "games/vgep/monster_hunter_wilds/goop-config.json",
        });
      }

      appInit() {
        super.appInit();
      }
    })();
  });