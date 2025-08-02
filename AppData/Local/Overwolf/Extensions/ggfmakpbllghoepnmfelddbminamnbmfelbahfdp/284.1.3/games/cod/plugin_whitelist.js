define([
  '/games/cod/supported_features.js'
], function (SupportedFeatures) {
  return {
    Events: {
      victory: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.victory,
        useEventData: true
      },
      match_start: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.match_start,
        useEventData: true
      },
      match_end: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.match_end,
        useEventData: true
      }
    },
    InfoDB: {
      scene: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.scene
      }
    }
  }
})