define({
  scene_state: {
    name: "scene_state",
    info: {
      scene_state: {
        category: "game_info",
        key: "scene_state",
        annotations: {
          description: "scene_state",
          values: ["scene_invalid", "scene_startup", "scene_login", "scene_hub",
            "scene_gameplay", "scene_collection", "scene_packs",
            "scene_tournament", "scene_friendly", "scene_error", "scene_arena",
            "scene_credits", "scene_reset","scene_adventure",
            "scene_tavern_brawl"]
        }
      }
    }
  },
  collection: {
    name: "collection",
    info: {
      collection: {
        category: "collection",
        key: "collection",
        annotations: {
          description: "player's card collection",
          values: [{"id": "HERO_01", "count": "1", "premiumCount": "0"}]
        }
      }
    }
  },
  arena: {
    name: "arena",
    info: {
      arena_draft: {
        category: "arena",
        key : "arena_draft",
        annotations: {
          description: "arena drafts card pick",
          values: []
        }
      }
    },
  },
  decks: {
    name: "decks",
    info: {
      decks: {
        category: "decks",
        key: "decks", 
        annotations: {
          description: "decks from collection",
          values: []
        }
      },
      adventure_deck: {
        category: "decks",
        key: "adventure_deck", 
        annotations: {
          description: "",
          values: []
        }
      },
      adventure_loot_options: {
        category: "decks",
        key: "adventure_loot_options", 
        annotations: {
          description: "",
          values: []
        }
      },
      selected_deck: {
        category: "selected_deck",
        key: "selected_deck",
        annotations: {
          description: "selected deck",
          values: []
        }
      },
    }
  },
  match: {
    name: "match",
    info: {
      match_player_info: {
        category: "playersInfo",
        key: "playersInfo",
        annotations: {
          description: "player info",
          values: `{
            "name" : "name of local player" ,
            "standardRank" : int ,
            "standardLegendRank" : "int" ,
            "wildRank" : int ,
            "wildLegendRank" : int ,
            "cardBackId" : int ,
            "cardId" : "string"
          }`
        }
      },
      match_type: {
        category: "match_info",
        key: 'match_type'
      }
    },
    events: {
      match_start: {
        name: "matchStart",
        data: null
      },
      match_end: {
        name: "matchEnd",
        data: null
      },
      match_outcome: {
        name: "match_outcome",
        data: null
      }
    }
  },
  match_info: {
    name: "match_info",
    info: {
      pseudo_match_id: {
        category: "match_info",
        key: "pseudo_match_id"
      },
      battlegrounds_rating: {
        category: "match_info",
        key: "battlegrounds_rating"
      },
      adventure_stats: {
        category: "match_info",
        key: "adventure_stats"
      }
    }
  }
});
