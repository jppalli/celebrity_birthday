define([
  '/games/service/GameService.js',
  '/games/hots/supported_features.js',
  '/games/hots/plugin_whitelists.js',
  '/games/hots/plugin.js'
	],
	function(GameService,
           SupportedFeatures,
           PluginWhitelist,
           Plugin) {
    return new class HotsGameService extends GameService {
    	constructor() {
    	  super({
          game: {
            id: 10624,
            name: "Heroes of the Storm"
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
