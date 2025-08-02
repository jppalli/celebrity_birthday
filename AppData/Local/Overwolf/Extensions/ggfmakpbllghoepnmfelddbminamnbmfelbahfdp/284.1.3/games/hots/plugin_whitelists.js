define([
    '/games/hots/supported_features.js'
], function(SupportedFeatures) {
  return {
    Events: {
      "match_start": {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.match_start,
        override: true
      },
      "match_end": {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.match_end,
        override: true
      },
      "hero_kill": {
        featureId: SupportedFeatures.kill.name,
        event: SupportedFeatures.kill.events.kill,
        override: false
      },
      "takedown": {
        featureId: SupportedFeatures.kill.name,
        event: SupportedFeatures.kill.events.takedown,
        override: false
      },
      "assist": {
        featureId: SupportedFeatures.kill.name,
        event: SupportedFeatures.kill.events.assist,
        override: false
      },
      "minion_kill": {
        featureId: SupportedFeatures.kill.name,
        event: SupportedFeatures.kill.events.minion_kill,
        override: false
      },
      "death": {
        featureId: SupportedFeatures.death.name,
        event: SupportedFeatures.death.events.death,
        override: false
      },
      "talent_available": {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.talent_available,
        override: false
      },
      "open_gates": {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.gates_opened,
        override: false
      }

      ,
      "draft": {
        featureId: SupportedFeatures.draft.name,
        event: SupportedFeatures.draft,
        override: true
      },
      "bans": {
        featureId: SupportedFeatures.bans.name,
        event: SupportedFeatures.bans,
        override: true
      }
    },

    InfoDB: {
      "teams_level": {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.teams_level,
        override: true
      },
      "score": {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.score,
        override: true
      },
      "scene": {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.scene,
        override: false
      },
      "game_mode": {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.game_mode,
        override: false
      },
      "roster": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "player_info": {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.player_info,
        override: true
      }
    }
  }
});
