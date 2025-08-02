define([
  '/games/vgep/general_supported_features.js'
], function (SupportedFeatures) {
  return {
    Events: {
      match_start: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.match_start,
      },
      match_end: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.match_end,
      },
      battle_start: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.battle_start,
      },
      battle_end: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.battle_end,
      },
      death: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.death,
        useEventData: true
      },
      respawn: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.respawn,
      },
      elimination: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.elimination,
        useEventData: true
      },
      kill: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.kill,
        useEventData: true
      },
      match_outcome: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.match_outcome,
        useEventData: true
      },
      mission_failed: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.mission_failed,
      },
      level_up: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.level_up,
        useEventData: true
      },
      knockout: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.knockout,
        useEventData: true
      },
      boss_fight: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.boss_fight,
        useEventData: true
      },
      boss_kill: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.boss_kill,
        useEventData: true,
        override: true
      },
      character_side_right: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.character_side_right,
        override: true
      },
      character_side_left: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.character_side_left,
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
      win_left: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.win_left,
        override: true
      },
      win_right: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.win_right,
        override: true
      },
      victory: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.victory,
        useEventData: true
      },
      defeat: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.defeat,
        useEventData: true
      },
      quest_complete: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.quest_complete,
        useEventData: true
      },
      quest_start: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.quest_start,
        useEventData: true
      },
      quest_failed: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.quest_failed,
        useEventData: true
      },
    },
    InfoDB: {
      scene: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.scene
      },
      steam_id: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.steam_id,
      },
      game_mode: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.game_mode,
      }
    }
  }
})