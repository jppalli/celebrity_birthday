define(['/games/service/GameService.js',
    '/games/apex_legends/supported_features.js',
    '/games/apex_legends/plugin_whitelists.js',
    '/games/apex_legends/plugin.js',
	],
	function(GameService,
           SupportedFeatures,
           PluginWhitelist,
           Plugin)
  {
    let ApexGameService = class ApexGameService extends GameService{
    	constructor(){
    	  super({
          game: {
            id: 21566,
            name: "Apex Legends"
          },
          eventOverrides: [],
          infoUpdateOverrides: [],
          supportedFeatures: SupportedFeatures,
          pluginWhitelist: PluginWhitelist,
          plugin: Plugin,
          logBlacklist: ["roster", "local_player", "location", ]
        });
      }
    };

    return new ApexGameService();
	});
