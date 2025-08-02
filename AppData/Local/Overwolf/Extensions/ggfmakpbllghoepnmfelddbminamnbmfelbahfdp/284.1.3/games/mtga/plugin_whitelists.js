define(["/games/mtga/supported_features.js"], function (SupportedFeatures) {
  return {
    Events: {
      draft_start: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.draft_start
      },
      draft_end: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.draft_end
      }
    },

    InfoDB: {
      scene_manager: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.scene
      },
      sideboard_update_info: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.sideboard_cards
      },
      deck_update_info: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.main_deck_cards
      },
      draft_scene_pack: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.draft_pack
      },
      draft_scene_cards: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.draft_cards
      },
      draft_scene_pickcard: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.draft_picked_card
      },
      inventory_cards: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.inventory_cards
      },
      inventory_stats: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.inventory_stats
      }
    }
  };
});
