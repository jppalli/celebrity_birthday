define([
  '/games/palworld/supported_features.js'
], function (SupportedFeatures) {
  return {
    Events: {
      death: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.death
      },
      knockout: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.knockout
      },
      respawn: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.respawn
      },
      revive: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.revive
      },

    },
    InfoDB: {
      location: {
        feature_id: SupportedFeatures.location.name,
        config: SupportedFeatures.location.info.location,
      },
      scene: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.scene,
      }
    }
  }
})