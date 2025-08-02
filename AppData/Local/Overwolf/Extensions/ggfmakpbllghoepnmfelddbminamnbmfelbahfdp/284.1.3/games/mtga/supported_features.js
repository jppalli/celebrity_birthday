define({
  game_info: {
    name: "game_info",
    info: {
      scene: {
        category: "game_info",
        key: "scene"
      },
      sideboard_cards: {
        category: 'game_info',
        key: 'sideboard_cards'
      },
      main_deck_cards: {
        category: 'game_info',
        key: 'main_deck_cards'
      }
    }
  },
  match_info: {
    name: "match_info",
    events: {
      draft_start: {
        name: 'draft_start',
        data: null
      },
      draft_end: {
        name: 'draft_end',
        data: null
      }
    },
    info: {
      draft_pack: {
        category: 'match_info',
        key: 'draft_pack'
      },
      draft_cards: {
        category: 'match_info',
        key: 'draft_cards'
      },
      draft_picked_card: {
        category: 'match_info',
        key: 'draft_picked_card'
      },
      inventory_cards: {
        category: 'game_info',
        key: 'inventory_cards'
      },
      inventory_stats: {
        category: 'game_info',
        key: 'inventory_stats'
      }
    }
  }
});
