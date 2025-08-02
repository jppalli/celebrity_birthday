define([
  '/games/starfield/supported_features.js'
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
    },
    InfoDB: {
      player_location: {
        feature_id: SupportedFeatures.location.name,
        config: SupportedFeatures.location.info.location,
      },
      planet_name: {
        feature_id: SupportedFeatures.location.name,
        config: SupportedFeatures.location.info.planet_name,
        override: true
      }
    }
  }
})