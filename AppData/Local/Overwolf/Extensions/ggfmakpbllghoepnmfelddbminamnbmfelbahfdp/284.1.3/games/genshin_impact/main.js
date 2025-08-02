define([
  '/games/service/GameService.js',
  '/games/genshin_impact/supported_features.js',
  '/games/genshin_impact/plugin_whitelist.js',
  '/games/genshin_impact/plugin.js'
],
  function (GameService,
            SupportedFeatures,
            PluginWhitelist,
            Plugin) {
    return new class GiGameService extends GameService {
      constructor() {
        super({
          game: {
            id: 21656,
            name: "Genshin Impact"
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