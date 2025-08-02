define([
  '/games/rainbowsix/supported_features.js'
], function (SupportedFeatures) {
  return {
    Events: {
      "round_victory": {
        featureId: SupportedFeatures.match.feature,
        event: SupportedFeatures.match.events.roundOutcome,
        eventData: "victory",
        override: true
      },
      "round_defeat": {
        featureId: SupportedFeatures.match.feature,
        event: SupportedFeatures.match.events.roundOutcome,
        eventData: "defeat",
        override: true
      },
      "match_victory": {
        featureId: SupportedFeatures.match.feature,
        event: SupportedFeatures.match.events.matchOutcome,
        eventData: "victory",
        override: true
      },
      "match_defeat": {
        featureId: SupportedFeatures.match.feature,
        event: SupportedFeatures.match.events.matchOutcome,
        eventData: "defeat",
        override: true
      },
      "defuser_planted": {
        featureId: SupportedFeatures.defuser.feature,
        event: SupportedFeatures.defuser.events.defuser_planted
      },
    },

    InfoDB: {
      "round": {
        feature_id: SupportedFeatures.match.feature,
        config: SupportedFeatures.match.infoDB.roundNumber
      },
      "score": {
        feature_id: SupportedFeatures.match.feature,
        config: SupportedFeatures.match.infoDB.matchScore
      },
      "scene_state": {
        feature_id: SupportedFeatures.game_info.feature,
        config: SupportedFeatures.game_info.infoDB.phase,
        override: true
      },
      name: {
        feature_id: SupportedFeatures.me.feature,
        config: SupportedFeatures.me.infoDB.name
      },
      account_id: {
        feature_id: SupportedFeatures.me.feature,
        config: SupportedFeatures.me.infoDB.account_id
      },
      "general_log": {
        feature_id: SupportedFeatures.match_info.feature,
        config: SupportedFeatures.match_info.infoDB.general_log
      },
      "ban_log": {
        feature_id: SupportedFeatures.match_info.feature,
        config: SupportedFeatures.match_info.infoDB.ban_log
      },
      "match_start_log": {
        feature_id: SupportedFeatures.match_info.feature,
        config: SupportedFeatures.match_info.infoDB.match_start_log
      },
      "round_start_log": {
        feature_id: SupportedFeatures.match_info.feature,
        config: SupportedFeatures.match_info.infoDB.round_start_log
      },
      "move_log": {
        feature_id: SupportedFeatures.match_info.feature,
        config: SupportedFeatures.match_info.infoDB.move_log
      },
      "score_log": {
        feature_id: SupportedFeatures.match_info.feature,
        config: SupportedFeatures.match_info.infoDB.score_log
      },
      "death_log": {
        feature_id: SupportedFeatures.match_info.feature,
        config: SupportedFeatures.match_info.infoDB.death_log
      },
      "round_end_log": {
        feature_id: SupportedFeatures.match_info.feature,
        config: SupportedFeatures.match_info.infoDB.round_end_log
      },
      "match_end_log": {
        feature_id: SupportedFeatures.match_info.feature,
        config: SupportedFeatures.match_info.infoDB.match_end_log
      },
      "kill_log": {
        feature_id: SupportedFeatures.match_info.feature,
        config: SupportedFeatures.match_info.infoDB.kill_log
      },
      "teams_log": {
        feature_id: SupportedFeatures.match_info.feature,
        config: SupportedFeatures.match_info.infoDB.teams_log
      },
      "ko_log": {
        feature_id: SupportedFeatures.match_info.feature,
        config: SupportedFeatures.match_info.infoDB.ko_log
      },
      "game_mode_log": {
        feature_id: SupportedFeatures.match_info.feature,
        config: SupportedFeatures.match_info.infoDB.game_mode_log
      },
      "player_list_log": {
        feature_id: SupportedFeatures.roster.feature,
        config: SupportedFeatures.roster.infoDB.players_list_log
      },
      "roster_": {
        feature_id: SupportedFeatures.roster.feature,
        config: SupportedFeatures.roster.infoDB.roster_
      },
    }
  }
});
