define([
  '/games/service/GameService.js',
  '/games/baldurs_gate_3/supported_features.js',
  '/games/baldurs_gate_3/plugin_whitelist.js',
  '/games/baldurs_gate_3/plugin.js'
],
  function (GameService,
            SupportedFeatures,
            PluginWhitelist,
            Plugin) {
    return new class Bg3GameService extends GameService {
      constructor() {
        super({
          game: {
            id: 22088,
            name: "Baldurs Gate 3"
          },
          eventOverrides: [],
          infoUpdateOverrides: [],
          supportedFeatures: SupportedFeatures,
          pluginWhitelist: PluginWhitelist,
          plugin: Plugin,
          logBlacklist: ["location_players", "location_camera"]
        });
      }
    };
  });