define([
  '/games/service/GameService.js',
  '/games/warframe/supported_features.js',
  '/games/warframe/plugin_whitelist.js',
  '/games/warframe/plugin.js'
],
  function (GameService,
    SupportedFeatures,
    PluginWhitelist,
    Plugin) {
    return new class WarframeGameService extends GameService {
      constructor() {
        super({
          game: {
            id: 8954,
            name: "Warframe"
          },
          eventOverrides: [],
          infoUpdateOverrides: [],
          supportedFeatures: SupportedFeatures,
          pluginWhitelist: PluginWhitelist,
          plugin: Plugin,
          logBlacklist: [
            'inventory',
          ],
          oop: true
        });
      }
    };
  });