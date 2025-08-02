define([
  '/games/halo/supported_features.js'
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
        featureId: SupportedFeatures.kill.name,
        event: SupportedFeatures.kill.events.kill,
        useEventData: true
      },
      assist: {
        featureId: SupportedFeatures.assist.name,
        event: SupportedFeatures.assist.events.assist,
        useEventData: true
      },
      death: {
        featureId: SupportedFeatures.death.name,
        event: SupportedFeatures.death.events.death,
        useEventData: true
      }
    },
    InfoDB: {
      game_state: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.scene
      },
      stats: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.stats
      },
      game_type: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.game_type
      },
      game_mode: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.game_mode
      },
      playlist: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.playlist
      },      
      roster_: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
      },      
      match_outcome: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.match_outcome
      }
    }
  }
})