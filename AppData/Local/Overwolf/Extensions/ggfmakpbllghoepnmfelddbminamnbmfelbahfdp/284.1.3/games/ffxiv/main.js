define([
  '/games/service/GameService.js',
  '/games/ffxiv/supported_features.js',
  '/games/ffxiv/plugin_whitelist.js',
  '/games/ffxiv/plugin.js'
],
  function (GameService,
    SupportedFeatures,
    PluginWhitelist,
    Plugin) {
    return new class FinalFantasyXivGameService extends GameService {
      constructor() {
        super({
          game: {
            id: 6350,
            name: "Final Fantasy XIV"
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