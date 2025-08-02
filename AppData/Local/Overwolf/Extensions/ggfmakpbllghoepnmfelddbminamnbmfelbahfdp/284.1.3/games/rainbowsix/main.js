define(['/games/service/GameService.js',
  '/games/rainbowsix/supported_features.js',
  '/games/rainbowsix/plugin_whitelists.js',
  '/games/rainbowsix/plugin.js',
],
  function (GameService,
    SupportedFeatures,
    PluginWhitelist,
    Plugin) {
    let RainbowSixGameService = class RainbowSixGameService extends GameService {
      constructor() {
        super({
          game: {
            id: 10826,
            name: "Rainbow Six Siege"
          },
          eventOverrides: [],
          infoUpdateOverrides: [],
          supportedFeatures: SupportedFeatures,
          pluginWhitelist: PluginWhitelist,
          plugin: Plugin,
          logBlacklist: [
            'account_id',
            'name'
          ]
        });
      }
    };

    return new RainbowSixGameService();
  });
