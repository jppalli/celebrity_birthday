define([
  '/games/service/GameService.js',
  '/games/schedule1/supported_features.js',
  '/games/schedule1/plugin_whitelist.js',
  '/games/schedule1/plugin.js'
],
  function (GameService,
            SupportedFeatures,
            PluginWhitelist,
            Plugin) {
    return new class Schedule1GameService extends GameService {
      constructor() {
        super({
          game: {
            id: 25610,
            name: "Schedule I"
          },
          eventOverrides: [],
          infoUpdateOverrides: [],
          supportedFeatures: SupportedFeatures,
          pluginWhitelist: PluginWhitelist,
          plugin: Plugin,
          logBlacklist: ['location']
        });
      }
    };
  });