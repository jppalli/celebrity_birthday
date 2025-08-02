define([
  '/games/service/GameService.js',
  '/games/starfield/supported_features.js',
  '/games/starfield/plugin_whitelist.js',
  '/games/starfield/plugin.js'
],
  function (GameService,
            SupportedFeatures,
            PluginWhitelist,
            Plugin) {
    return new class StarfieldGameService extends GameService {
      constructor() {
        super({
          game: {
            id: 23222,
            name: "Starfield"
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