define([
  '/games/service/GameService.js',
  '/games/marvel_rivals/supported_features.js',
  '/games/marvel_rivals/plugin_whitelist.js',
  '/games/marvel_rivals/plugin.js'
],
  function (GameService,
    SupportedFeatures,
    PluginWhitelist,
    Plugin) {
    return new class MrGameService extends GameService {
      constructor() {
        super({
          game: {
            id: 24890,
            name: "Marvel Rivals"
          },
          eventOverrides: [],
          infoUpdateOverrides: [],
          supportedFeatures: SupportedFeatures,
          pluginWhitelist: PluginWhitelist,
          plugin: Plugin,
          logBlacklist: ["roster", "kill_feed", "player_stats"]
        });
      }
    };
  });