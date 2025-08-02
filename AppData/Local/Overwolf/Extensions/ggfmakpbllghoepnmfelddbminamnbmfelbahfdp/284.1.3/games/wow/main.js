define([
  '/games/service/GameService.js',
  '/games/wow/supported_features.js',
  '/games/wow/plugin_whitelist.js',
  '/games/wow/plugin.js',
  '/utils/analytics.js'
],
  function (GameService,
    SupportedFeatures,
    PluginWhitelist,
    Plugin
  ) {
    return new class WorldOfWarcraftGameService extends GameService {
      constructor() {
        super({
          game: {
            id: 765,
            name: "World of Warcraft"
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