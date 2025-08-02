define([
  '/games/rematch/supported_features.js'
], function (SupportedFeatures) {
  return {
    Events: {
      match_end: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.match_end,
        override: true
      },
      match_start: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.match_start,
        override: true
      },
      score_right: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.score_right,
        useEventData: true,
        override: true
      },
      score_left: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.score_left,
        useEventData: true,
        override: true
      },
    },
    InfoDB: {
      scene: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.scene,
      },
    }
  }
})