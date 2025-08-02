define([
  '/games/rocket_league/supported_features.js'
], function (SupportedFeatures) {
  return {
    Events: {
      death: {
        featureId: SupportedFeatures.death.name,
        event: SupportedFeatures.death.events.death
      },
      action_points: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.action_points,
        useEventData: true
      },
      training_round: {
        featureId: SupportedFeatures.training.name,
        event: SupportedFeatures.training.events.training_round,
        useEventData: true
      },
      training_round_result: {
        featureId: SupportedFeatures.training.name,
        event: SupportedFeatures.training.events.training_round_result,
      },
      training_shuffle_mode: {
        featureId: SupportedFeatures.training.name,
        event: SupportedFeatures.training.events.training_shuffle_mode,
      },
      overtime: {
        featureId: SupportedFeatures.match.name,
        event: SupportedFeatures.match.events.overtime,
      },
      surrender: {
        featureId: SupportedFeatures.match.name,
        event: SupportedFeatures.match.events.surrender,
        useEventData: true
      },
    },

    InfoDB: {
      trade_my_proposition: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.trade_my_proposition
      },
      trade_opponent_proposition: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.trade_opponent_proposition
      },
      trade_menu_opened: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.trade_menu_opened
      },
      trade_my_inventory: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.trade_my_inventory
      },
      car_look_inventory: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.car_look_inventory
      },
      match_type: {
        feature_id: SupportedFeatures.match.name,
        config: SupportedFeatures.match.info.matchType
      },
      is_ranked: {
        feature_id: SupportedFeatures.match.name,
        config: SupportedFeatures.match.info.matchRanked
      },
      game_mode: {
        feature_id: SupportedFeatures.match.name,
        config: SupportedFeatures.match.info.gameMode
      },
      max_players: {
        feature_id: SupportedFeatures.match.name,
        config: SupportedFeatures.match.info.matchMaxPlayers
      },
      game_state: {
        feature_id: SupportedFeatures.match.name,
        config: SupportedFeatures.match.info.gameState
      },
      game_type: {
        feature_id: SupportedFeatures.match.name,
        config: SupportedFeatures.match.info.gameType
      },
      game_server: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.game_server
      },
      game_mutators: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.game_mutators
      },
      game_arena: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.game_arena
      },
      players_list: {
      },
      training_pack: {
        feature_id: SupportedFeatures.training.name,
        config: SupportedFeatures.training.info.training_pack
      },
      players_rank: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.players_rank
      },
      rank_playlists: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.rank_playlists
      },
      players_boost: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.players_boost
      },
    }
  }
});