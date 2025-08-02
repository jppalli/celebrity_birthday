define([
  '/games/service/GameService.js',
  '/games/peak/supported_features.js',
  '/games/peak/plugin_whitelist.js',
  '/games/peak/plugin.js'
],
  function (GameService,
            SupportedFeatures,
            PluginWhitelist,
            Plugin) {
    return new class PeakGameService extends GameService {
      constructor() {
        super({
          game: {
            id: 26092,
            name: "Peak"
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