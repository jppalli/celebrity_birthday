define([
    '/games/hearthstone/supported_features.js'
], function(SupportedFeatures) {
  return {
    Events: {
      match_start: {
        featureId: SupportedFeatures.match.feature,
        event: SupportedFeatures.match.events.match_start
      },
      match_end: {
        featureId: SupportedFeatures.match.feature,
        event: SupportedFeatures.match.events.match_end,
        useEventData: true
      },
      savedata: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.adventure_stats
      }
    },

    InfoDB: {
      scene_state: {
        feature_id: SupportedFeatures.scene_state.name,
        config: SupportedFeatures.scene_state.info.scene_state
      },
      card_: {
        feature_id: SupportedFeatures.collection.name,
        config: SupportedFeatures.collection.info.collection
      },
      deck_: {
        feature_id: SupportedFeatures.decks.name,
        config: SupportedFeatures.decks.info.decks
      },
      selected_deck: {
        feature_id: SupportedFeatures.decks.name,
        config: SupportedFeatures.decks.info.selected_deck
      },
      arena_deck: {
        feature_id: SupportedFeatures.decks.name,
        config: SupportedFeatures.decks.info.decks
      },
      adv_deck: {
        feature_id: SupportedFeatures.decks.name,
        config: SupportedFeatures.decks.info.adventure_deck
      },
      adv_loot_options: {
        feature_id: SupportedFeatures.decks.name,
        config: SupportedFeatures.decks.info.adventure_loot_options
      },
      match_player_info: {
        feature_id: SupportedFeatures.match.name,
        config: SupportedFeatures.match.info.match_player_info
      },
      battleground: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.battlegrounds_rating
      },
      arena_draft : {
        feature_id: SupportedFeatures.arena.name,
        config: SupportedFeatures.arena.info.arena_draft
      }
    }

  }
});
