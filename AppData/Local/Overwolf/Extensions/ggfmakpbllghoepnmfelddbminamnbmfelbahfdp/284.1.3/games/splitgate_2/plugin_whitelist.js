define([
  '/games/splitgate_2/supported_features.js'
], function (SupportedFeatures) {
  return {
    Events: {
      kill: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.kill
      },
      death: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.death,
        useEventData: true,
        override: true
      },
    },
    InfoDB: {

    }
  }
})