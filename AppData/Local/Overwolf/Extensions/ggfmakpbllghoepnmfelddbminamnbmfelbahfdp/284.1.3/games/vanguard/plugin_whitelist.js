define([
  '/games/vanguard/supported_features.js'
], function (SupportedFeatures) {
  return {
    Events: {
      round_outcome: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.round_outcome,
        useEventData: true
      },
      kill: {
        featureId: SupportedFeatures.kill.name,
        event: SupportedFeatures.kill.events.kill
      },
      death: {
        featureId: SupportedFeatures.death.name,
        event: SupportedFeatures.death.events.death
      },
      match_start: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.match_start,
        useEventData: true
      },
      match_end: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.match_end,
        useEventData: true
      }
    },
    InfoDB: {
      scene: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.scene
      },
      game_mode: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.game_mode
      },
      game_map: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.game_map
      },
      local_player: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.local_player
      },
    }
  }
})