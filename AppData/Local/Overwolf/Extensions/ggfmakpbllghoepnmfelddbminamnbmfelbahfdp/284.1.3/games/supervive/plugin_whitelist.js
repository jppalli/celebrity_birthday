define([
  '/games/supervive/supported_features.js'
], function (SupportedFeatures) {
  return {
    Events: {
      match_start: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.match_start
      },
      match_end: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.match_end
      }
    },
    InfoDB: {
      roster_: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.roster_,
        override: true
      },
      scene: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.scene
      },
      local_player: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.player_name
      },
    }
  }
})