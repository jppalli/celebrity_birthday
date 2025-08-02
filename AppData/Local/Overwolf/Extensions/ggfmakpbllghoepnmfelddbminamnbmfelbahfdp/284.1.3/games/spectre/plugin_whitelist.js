define([
  '/games/spectre/supported_features.js'
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
        event: SupportedFeatures.match_info.events.death,
        useEventData: true
      },
      kill: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.kill,
        useEventData: true
      },
      assist: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.assist,
        useEventData: true
      },
    },
    InfoDB: {
      scene: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.scene,
        override: true
      },
      kills: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.kills
      },
      assists: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.assists
      },
      deaths: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.deaths
      },
    }
  }
})