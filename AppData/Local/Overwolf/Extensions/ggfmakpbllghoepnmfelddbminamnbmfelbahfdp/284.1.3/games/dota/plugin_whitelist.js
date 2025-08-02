define([
  '/games/dota/supported_features.js'
], function (SupportedFeatures) {
  return {
    Events: {
      new_game: {
        featureId: SupportedFeatures.game_state.name,
        event: SupportedFeatures.game_state.events.new_game
      },
      game_over: {
        featureId: SupportedFeatures.game_state.name,
        event: SupportedFeatures.game_state.events.game_over
      },
      round_won: {
        featureId: SupportedFeatures.roundOutcome.name,
        event: SupportedFeatures.roundOutcome.events.roundOutcome
      },
      round_lose: {
        featureId: SupportedFeatures.roundOutcome.name,
        event: SupportedFeatures.roundOutcome.events.roundOutcome
      },
      game_won: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.matchOutcome
      },
      game_lose: {
        featureId: SupportedFeatures.roundOutcome.name,
        event: SupportedFeatures.match_info.events.matchOutcome
      },

      round: {
        featureId: SupportedFeatures.roundNumber.name,
        event: SupportedFeatures.roundNumber
      },
      plugin_mode: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info
      }
    },

    InfoDB: {
      game_mode: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.game_mode
      },
      team_score: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.team_score
      },
      last_error: {
        feature_id: SupportedFeatures.error.name,
        config: SupportedFeatures.error.info.plugin_error
      },
      players_list: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.players
      },
      bans_list: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.bans
      },
      draft_list: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.draft
      },
      party_list: {
        feature_id: SupportedFeatures.party.name,
        config: SupportedFeatures.party.info.party
      },
      hero_pool: {
        feature_id: SupportedFeatures.hero_pool.name,
        config: SupportedFeatures.hero_pool.info.hero_pool
      },
      shop_list: {
        feature_id: SupportedFeatures.shop.name,
        config: SupportedFeatures.shop.info.slot
      },
      bench_state: {
        feature_id: SupportedFeatures.bench.name,
        config: SupportedFeatures.bench.info.cell
      },
      board_state: {
        feature_id: SupportedFeatures.board.name,
        config: SupportedFeatures.board.info.cell
      },
      mmr: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.mmr
      },
      damage_dealt_hero: {
        feature_id: SupportedFeatures.damage.name,
        config: SupportedFeatures.damage.info.damage_dealt_hero
      },
      damage_dealt_tower: {
        feature_id: SupportedFeatures.damage.name,
        config: SupportedFeatures.damage.info.damage_dealt_tower
      }
    }
  }
});