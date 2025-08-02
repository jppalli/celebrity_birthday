define([
  '/games/wow/supported_features.js'
], function (SupportedFeatures) {
  return {
    InfoDB: {
      c_lfglist_created: {
        feature_id: SupportedFeatures.game_info.feature,
        config: SupportedFeatures.game_info.infoDB.c_lfglist_created
      },
      c_lfglist_update: {
        feature_id: SupportedFeatures.game_info.feature,
        config: SupportedFeatures.game_info.infoDB.c_lfglist_update
      },
      c_lfglist_destroyed: {
        feature_id: SupportedFeatures.game_info.feature,
        config: SupportedFeatures.game_info.infoDB.c_lfglist_destroyed
      }
    }
  }
})