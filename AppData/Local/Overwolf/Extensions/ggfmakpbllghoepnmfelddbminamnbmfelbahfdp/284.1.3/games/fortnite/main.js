define([
  "/games/service/GameService.js",
  "/games/fortnite/supported_features.js",
  "/games/fortnite/plugin_whitelists.js",
  "/games/fortnite/plugin.js"
], function (GameService, SupportedFeatures, PluginWhitelist, Plugin) {
  let FortniteGameService = class FortniteGameService extends GameService {
    constructor() {
      super({
        game: {
          id: 21216,
          name: "Fortnite"
        },
        eventOverrides: [
          "rank",
          "location",
          "kill",
          "killer",
          "killed",
          "items",
          "hit",
          "headshot",
          "me",
          "matchStart",
          "matchEnd"
        ],
        infoUpdateOverrides: [
          "phase",
          "health",
          "roster",
          "selected_slot",
          "selected_material",
          "shield"
        ],
        supportedFeatures: SupportedFeatures,
        pluginWhitelist: PluginWhitelist,
        plugin: Plugin,
        logBlacklist: [
          "location",
          "roster",
          "playerJoined",
          "playerLeft",
          "ping",
          "compass_update",
          "skirmish",
          "match_id_log",
          "items", "inventory_picked", "inventory_update",
          "inventory_dropped", "quickbar_new_primary",
          "quickbar_updated_primary", "quickbar_removed_primary",
          "selected_slot", "selected_material","message_feed",
          "vbucks", "over_shield"
        ],
      });
    }
  };

  return new FortniteGameService();
});
