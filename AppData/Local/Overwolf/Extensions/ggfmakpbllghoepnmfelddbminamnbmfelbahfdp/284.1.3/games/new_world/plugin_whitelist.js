define([
  '/games/new_world/supported_features.js'
], function (SupportedFeatures) {
  return {
    InfoDB: {
      location: {
        feature_id: SupportedFeatures.game_info.game_info,
        config: SupportedFeatures.game_info.info.location
      },
      player_name: {
        feature_id: SupportedFeatures.game_info.game_info,
        config: SupportedFeatures.game_info.info.player_name
      },
      world_name: {
        feature_id: SupportedFeatures.game_info.game_info,
        config: SupportedFeatures.game_info.info.world_name
      }
    }
  }
})