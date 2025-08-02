define([
  '/games/genshin_impact/supported_features.js'
], function (SupportedFeatures) {
  return {
    Events: {
      dungeon_start: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.dungeon_start
      },
      dungeon_end: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.dungeon_end
      },
      character_switch: {
        featureId: SupportedFeatures.game_info.name,
        event: SupportedFeatures.game_info.events.character_switch,
        useEventData: true
      }
    },
    InfoDB: {
      player_id: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.player_id,
      },
      character_name: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.character_name,
      },
    }
  }
})