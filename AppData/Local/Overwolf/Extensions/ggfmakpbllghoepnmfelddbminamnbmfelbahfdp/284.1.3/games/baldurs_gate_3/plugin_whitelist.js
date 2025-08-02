define([
  '/games/baldurs_gate_3/supported_features.js'
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
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.kill
      },
      death: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.death
      },
    },
    InfoDB: {
      scene: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.scene,
        override: true
      },
      match_state: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.match_state,
      },
      match_outcome: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.match_outcome,
      },
      location_camera: {
        feature_id: SupportedFeatures.location.name,
        config: SupportedFeatures.location.info.location_camera,
      },
      location_players: {
        feature_id: SupportedFeatures.location.name,
        config: SupportedFeatures.location.info.location_players,
      },
      main_map: {
        feature_id: SupportedFeatures.location.name,
        config: SupportedFeatures.location.info.main_map,
      },
      sub_map: {
        feature_id: SupportedFeatures.location.name,
        config: SupportedFeatures.location.info.sub_map,
      }
    }
  }
})