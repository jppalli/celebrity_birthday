define([
  '/games/sotf/supported_features.js'
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
      location: {
        feature_id: SupportedFeatures.location.name,
        config: SupportedFeatures.location.info.location,
      },
      npc_location: {
        feature_id: SupportedFeatures.location.name,
        config: SupportedFeatures.location.info.npc_location,
      },
      gps_locator_: {
        feature_id: SupportedFeatures.location.name,
        config: SupportedFeatures.location.info.gps_locator,
      },
    }
  }
})