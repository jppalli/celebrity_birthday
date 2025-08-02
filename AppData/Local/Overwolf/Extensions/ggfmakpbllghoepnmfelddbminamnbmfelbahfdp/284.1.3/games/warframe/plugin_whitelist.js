define([
  '/games/warframe/supported_features.js'
], function (SupportedFeatures) {
  return {
    InfoDB: {
      username: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.username
      },
      inventory: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.inventory
      },
      highlighted: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.highlighted
      }
    }
  }
})