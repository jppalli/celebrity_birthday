define([
  '/games/service/GameService.js',
  '/games/spectre/supported_features.js',
  '/games/spectre/plugin_whitelist.js',
  '/games/spectre/plugin.js'
],
  function (GameService,
            SupportedFeatures,
            PluginWhitelist,
            Plugin) {
    return new class SpectreGameService extends GameService {
      constructor() {
        super({
          game: {
            id: 24484,
            name: "Spectre Divide"
          },
          eventOverrides: [],
          infoUpdateOverrides: [],
          supportedFeatures: SupportedFeatures,
          pluginWhitelist: PluginWhitelist,
          plugin: Plugin,
          logBlacklist: []
        });
      }
    };
  });