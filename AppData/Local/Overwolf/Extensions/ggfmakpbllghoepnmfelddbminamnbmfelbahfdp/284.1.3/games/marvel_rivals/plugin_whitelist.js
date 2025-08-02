define([
  '/games/marvel_rivals/supported_features.js'
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
      },
      round_start: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.round_start
      },
      round_end: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.round_end
      },
      kill_feed: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.kill_feed,
        useEventData: true,
        override: true
      },
      scoreboard_players: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.scoreboard_players,
        useEventData: true,
        override: true
      },
    },
    InfoDB: {
      roster: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.roster,
        override: true
      },
      scene: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.scene
      },
      local_player: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.player_name,
        override: true
      },
      match_id: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.match_id
      },
      game_mode: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.game_mode,
        override: true
      },
      player_stats: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.player_stats
      },
      player_id: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.player_id,
      },
      match_outcome: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.match_outcome,
        override: true
      },
      banned_heros: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.banned_characters,
        override: true
      },
      score_info: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.objective_progress,
        override: true
      },
      ability_cd_0: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.ability_cooldown_0,
        override: true
      },
      ability_cd_1: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.ability_cooldown_1,
        override: true
      },
      ability_cd_2: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.ability_cooldown_2,
        override: true
      },
      ability_cd_3: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.ability_cooldown_3,
        override: true
      },
      ability_cd_4: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.ability_cooldown_4,
        override: true
      },
      ability_cd_5: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.ability_cooldown_5,
        override: true
      },
      ability_cd_6: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.ability_cooldown_6,
        override: true
      },
      additional_ability_cd_0: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.additional_ability_cd_0
      },
      additional_ability_cd_1: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.additional_ability_cd_1
      },
      additional_ability_cd_2: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.additional_ability_cd_2
      },
      additional_ability_cd_3: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.additional_ability_cd_3
      },
    }
  }
})