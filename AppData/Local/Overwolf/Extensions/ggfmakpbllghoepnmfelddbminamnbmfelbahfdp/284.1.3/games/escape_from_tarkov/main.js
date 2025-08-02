define([
  '/games/service/GameService.js',
  '/games/escape_from_tarkov/supported_features.js',
  '/games/escape_from_tarkov/plugin_whitelist.js',
  '/games/escape_from_tarkov/plugin.js'
],
  function (GameService,
    SupportedFeatures,
    PluginWhitelist,
    Plugin) {
    return new class EscapeFromTarkovGameService extends GameService {
      constructor() {
        super({
          game: {
            id: 21210,
            name: "Escape From Tarkov"
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