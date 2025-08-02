define([
  '/games/service/GameService.js',
  '/games/overwatch/supported_features.js',
  '/games/overwatch/plugin_whitelist.js',
  '/games/overwatch/plugin.js'
],
  function (GameService,
    SupportedFeatures,
    PluginWhitelist,
    Plugin) {
    return new class OverwatchGameService extends GameService {
      constructor() {
        super({
          game: {
            id: 10844,
            name: "overwatch"
          },
          eventOverrides: [],
          infoUpdateOverrides: [],
          supportedFeatures: SupportedFeatures,
          pluginWhitelist: PluginWhitelist,
          plugin: Plugin,
          logBlacklist: ['roster',"kill_feed"],
        });
      }
    };
  });