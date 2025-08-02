define([
  '/games/cs2/supported_features.js'
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
      kill: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.kill,
        useEventData: true
      },
      death: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.death,
        useEventData: true
      },
      assist: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.assist,
        useEventData: true
      },
      kill_feed: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.kill_feed
      },
    },
    InfoDB: {
      roster_: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.roster_
      },
      gamemode: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.game_mode
      },
      match_outcome: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.match_outcome
      },
      elo_points: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.elo_points
      },
      is_rank: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.is_ranked
      },
      mm_state: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.mm_state
      }
    }
  }
})