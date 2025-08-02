define([
  '/games/service/GameService.js',
  '/games/valorant/supported_features.js',
  '/games/valorant/plugin_whitelist.js',
  '/games/valorant/plugin.js'
],
  function (GameService,
    SupportedFeatures,
    PluginWhitelist,
    Plugin) {
    return new class ValorantGameService extends GameService {
      constructor() {
        super({
          game: {
            id: (window.___gameid___ ||21640),
            name: "Valorant"
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