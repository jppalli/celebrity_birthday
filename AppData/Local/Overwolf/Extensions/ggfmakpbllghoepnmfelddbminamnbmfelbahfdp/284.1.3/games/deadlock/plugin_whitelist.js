define([
  '/games/deadlock/supported_features.js'
], function (SupportedFeatures) {
  return {
    Events: {
      match_start: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.match_start,
        override: true
      },
      match_end: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.match_end,
        override: true
      }
    },
    InfoDB: {
      game_mode: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.game_mode,
        override: true
      },
      game_phase: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.phase,
      },
      roster_: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.roster_,
        override: true
      },
      team_score: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.team_score
      },
      match_history: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.match_history,
        override: true
      },
      match_id: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.match_id,
      },
      match_outcome: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.match_outcome
      },
      items_: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.items_
      },
    }
  }
})