define([
  '/games/service/GameService.js',
  '/games/halo/supported_features.js',
  '/games/halo/plugin_whitelist.js',
  '/games/halo/plugin.js'
],
  function (GameService,
            SupportedFeatures,
            PluginWhitelist,
            Plugin) {
    return new class HaloGameService extends GameService {
      constructor() {
        super({
          game: {
            id: 21854,
            name: "Halo Infinite"
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