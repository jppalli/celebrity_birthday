define(["/games/diablo2/supported_features.js"], function (SupportedFeatures) {
  return {
    Events: {
      match_start: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.match_start
      },
      match_end: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.match_end,
        override: true
      },
      player_spawn: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.player_spawn
      },
      player_died: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.player_died
      },
      dropped_item: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.dropped_item,
        useEventData: true
      },
    },

    InfoDB: {
      player_level: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.player_level,
      },
      player_class: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.player_class,
      },
      player_experience: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.player_experience,
      },
      act: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.act,
      },
      item_: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.item,
      },
      character_name: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.character_name,
      },
      player_stats: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.player_stats,
      },
    }
  };
});
