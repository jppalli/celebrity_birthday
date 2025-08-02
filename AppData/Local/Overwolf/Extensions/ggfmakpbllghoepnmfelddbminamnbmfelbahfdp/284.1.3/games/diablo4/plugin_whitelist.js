define([
  '/games/diablo4/supported_features.js'
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
        override: true
      },
      player_died: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.death,
      }
    },
    InfoDB: {
      player_location: {
        feature_id: SupportedFeatures.location.name,
        config: SupportedFeatures.location.info.location,
      },
      player_map: {
        feature_id: SupportedFeatures.location.name,
        config: SupportedFeatures.location.info.map,
      },
      player_gold: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.gold,
      },
      player_name: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.name,
      },
      player_class: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.class,
      },
      battlenet_tag: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.battlenet_tag,
      },
      player_level: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.level,
      },
      player_paragon_level: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.paragon_level,
      },
      player_xp: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.xp,
      },
      player_health: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.health,
      }
    }
  }
})