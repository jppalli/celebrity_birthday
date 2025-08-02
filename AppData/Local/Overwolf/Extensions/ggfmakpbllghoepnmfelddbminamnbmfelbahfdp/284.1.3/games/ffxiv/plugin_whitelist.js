define([
  '/games/ffxiv/supported_features.js'
], function (SupportedFeatures) {
  return {
    InfoDB: {
      contact_: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.contact_
      },
    }
  }
})