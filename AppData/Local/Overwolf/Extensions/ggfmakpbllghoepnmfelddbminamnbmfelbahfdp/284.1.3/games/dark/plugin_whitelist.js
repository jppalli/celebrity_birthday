define([
  '/games/dark/supported_features.js'
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
      },
      death: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.death
      },
      kill: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.kill
      },
      match_outcome: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.match_outcome
      },
    },
    InfoDB: {
    }
  }
})