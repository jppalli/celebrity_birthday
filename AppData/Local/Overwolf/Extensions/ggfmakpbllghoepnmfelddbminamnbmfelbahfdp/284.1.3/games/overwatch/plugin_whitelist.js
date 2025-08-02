define([
  '/games/overwatch/supported_features.js'
], function (SupportedFeatures) {
  return {
    Events: {
      elimination: {
        featureId: SupportedFeatures.kill.name,
        event: SupportedFeatures.kill.events.elimination,
        useEventData: true
      },
      death: {
        featureId: SupportedFeatures.death.name,
        event: SupportedFeatures.death.events.death,
        useEventData: true
      },
      match_start: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.match_start,
        override: true
      },
      match_end: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.match_end,
        override: true
      },
      round_start: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.round_start,
      },
      round_end: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.round_end,
      },
      assist: {
        featureId: SupportedFeatures.assist.name,
        event: SupportedFeatures.assist.events.assist,
        useEventData: true
      },
      respawn: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.respawn
      },
      revive: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.revive
      },
      kill_feed: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.kill_feed,
        override: true
      },
    },
    InfoDB: {
      game_state: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.game_state
      },
      game_mode: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.game_mode
      },
      map: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.map,
      },
      eliminations: {
        feature_id: SupportedFeatures.kill.name,
        config: SupportedFeatures.kill.info.eliminations,
      },
      deaths: {
        feature_id: SupportedFeatures.death.name,
        config: SupportedFeatures.death.info.deaths,
      },
      assists: {
        feature_id: SupportedFeatures.assist.name,
        config: SupportedFeatures.assist.info.assists,
      },
      battle_tag: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.battle_tag
      },
      roster_: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster_
      },
      match_outcome: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.match_outcome
      },
      game_type: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.game_type
      },
      game_queue_type: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.game_queue_type
      },
      party_player_count: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.party_player_count
      },
    }
  }
})