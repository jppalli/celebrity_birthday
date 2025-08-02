define([
  '/games/schedule1/supported_features.js'
], function (SupportedFeatures) {
  return {
    Events: {
      location: {
        featureId: SupportedFeatures.location.name,
        event: SupportedFeatures.location.events.location,
        useEventData: true
      },
    },
    InfoDB: {

    }
  }
})