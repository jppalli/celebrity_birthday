define({
  roster: {
    name: 'roster',
    info: {
      players: {
        category: 'roster',
        key: 'players'
      },
      bans: {
        category: 'roster',
        key: 'bans'
      },
      draft: {
        category: 'roster',
        key: 'draft'
      }
    }
  },
  me: {
    name: "me",
    info:{
      steam_id: {
        category: "me",
        key: "steam_id"
      },
      hero: {
        category: "me",
        key: "hero"
      },
      mmr: {
        category: "me",
        key: "mmr"
      }
    }
  },
  game_state:{
    name: "game_state",
    events:{
      new_game: {
        name: 'new_game',
        data: null
      },
      game_over: {
        name: 'game_over',
        data: null
      },
    }
  },
  game_state_changed: {
    name: "game_state_changed",
    events:{
      game_state_changed: {
        name: 'game_state_changed',
        data: null
      }
    }
  },
  match_state_changed: {
    name: "match_state_changed",
    events:{
      match_state_changed: {
        name: 'match_state_changed',
        data: null
      }
    }
  },
  daytime_changed: {
    name: "daytime_changed",
    events:{
      daytime_changed: {
        name: 'daytime_changed',
        data: null
      }
    }
  },
  clock_time_changed: {
    name: "clock_time_changed",
    events:{
      clock_time_changed: {
        name: 'clock_time_changed',
        data: null
      }
    }
  },
  ward_purchase_cooldown_changed: {
    name: "ward_purchase_cooldown_changed",
    events:{
      ward_purchase_cooldown_changed: {
        name: 'ward_purchase_cooldown_changed',
        data: null
      }
    }
  },
  match_ended: {
    name: "match_ended",
    events:{
      match_ended: {
        name: 'match_ended',
        data: null
      }
    }
  },
  kill: {
    name: "kill",
    events:{
      kill: {
        name: 'kill',
        data: null
      }
    }
  },
  assist: {
    name: "assist",
    events:{
      assist: {
        name: 'assist',
        data: null
      }
    }
  },
  death: {
    name: "death",
    events:{
      death: {
        name: 'death',
        data: null
      }
    }
  },
  cs: {
    name: "cs",
    events:{
      cs: {
        name: 'cs',
        data: null
      }
    }
  },
  xpm: {
    name: "xpm",
    events:{
      xpm: {
        name: 'xpm',
        data: null
      }
    }
  },
  gpm: {
    name: "gpm",
    events:{
      gpm: {
        name: 'gpm',
        data: null
      }
    }
  },
  gold: {
    name: "gold",
    events:{
      gold: {
        name: 'gold',
        data: null
      }
    }
  },
  hero_selected: {
    name: "hero_selected",
    events:{
      hero_selected: {
        name: 'hero_selected',
        data: null
      }
    }
  },
  hero_leveled_up: {
    name: "hero_leveled_up",
    events:{
      hero_leveled_up: {
        name: 'hero_leveled_up',
        data: null
      }
    }
  },
  hero_respawned: {
    name: "hero_respawned",
    events:{
      hero_respawned: {
        name: 'hero_respawned',
        data: null
      }
    }
  },
  hero_buyback_info_changed: {
    name: "hero_buyback_info_changed",
    events:{
      hero_buyback_info_changed: {
        name: 'hero_buyback_info_changed',
        data: null
      }
    }
  },
  hero_boughtback: {
    name: "hero_boughtback",
    events:{
      hero_boughtback: {
        name: 'hero_boughtback',
        data: null
      }
    }
  },
  hero_health_mana_info: {
    name: "hero_health_mana_info",
    events:{
      hero_health_mana_info: {
        name: 'hero_health_mana_info',
        data: null
      }
    }
  },
  hero_status_effect_changed: {
    name: "hero_status_effect_changed",
    events:{
      hero_status_effect_changed: {
        name: 'hero_status_effect_changed',
        data: null
      }
    }
  },
  hero_attributes_skilled: {
    name: "hero_attributes_skilled",
    events:{
      hero_attributes_skilled: {
        name: 'hero_attributes_skilled',
        data: null
      }
    }
  },
  hero_ability_skilled: {
    name: "hero_ability_skilled",
    events:{
      hero_ability_skilled: {
        name: 'hero_ability_skilled',
        data: null
      }
    }
  },
  hero_ability_used: {
    name: "hero_ability_used",
    events:{
      hero_ability_used: {
        name: 'hero_ability_used',
        data: null
      }
    }
  },
  hero_ability_cooldown_changed: {
    name: "hero_ability_cooldown_changed",
    events:{
      hero_ability_cooldown_changed: {
        name: 'hero_ability_cooldown_changed',
        data: null
      }
    }
  },
  hero_ability_changed: {
    name: "hero_ability_changed",
    events:{
      hero_ability_changed: {
        name: 'hero_ability_changed',
        data: null
      }
    }
  },
  hero_item_changed: {
    name: "hero_item_changed",
    events:{
      hero_item_changed: {
        name: 'hero_item_changed',
        data: null
      }
    }
  },
  hero_item_used: {
    name: "hero_item_used",
    events:{
      hero_item_used: {
        name: 'hero_item_used',
        data: null
      }
    }
  },
  hero_item_cooldown_changed: {
    name: "hero_item_cooldown_changed",
    events:{
      hero_item_cooldown_changed: {
        name: 'hero_item_cooldown_changed',
        data: null
      }
    }
  },
  hero_item_consumed: {
    name: "hero_item_consumed",
    events:{
      hero_item_consumed: {
        name: 'hero_item_consumed',
        data: null
      }
    }
  },
  hero_item_charged: {
    name: "hero_item_charged",
    events:{
      hero_item_charged: {
        name: 'hero_item_charged',
        data: null
      }
    }
  },
  autochess_loading: {
    name: "autochess_loading",
    events: {
      autochess_loading: {
        name: "autochess_loading",
        data: null
      }
    }
  },
  autochess_match_start: {
    name: "autochess_match_start",
    events: {
      autochess_match_start: {
        name: "autochess_match_start",
        data: null
      }
    }
  },
  autochess_match_end: {
    name: "autochess_match_end",
    events: {
      autochess_match_end: {
        name: "autochess_match_end",
        data: null
      }
    }
  },
  autochess_preparation_start: {
    name: "autochess_preparation_start",
    events: {
      autochess_preparation_start: {
        name: "autochess_preparation_start",
        data: null
      }
    }
  },
  autochess_preparation_end: {
    name: "autochess_preparation_end",
    events: {
      autochess_preparation_end: {
        name: "autochess_preparation_end",
        data: null
      }
    }
  },
  roundNumber: {
    name: "roundNumber",
    info: {
      roundNumber: {
        category: "match_info",
        key: "roundNumber"
      }
    }
  },
  roundOutcome: {
    name: "roundOutcome",
    events: {
      roundOutcome: {
        name: "roundOutcome",
        data: null
      }
    },
    info: {
      totalWon: {
        category: "match_info",
        key: "totalWon"
      },
      totalLost: {
        category: "match_info",
        key: "totalLost"
      }
    }
  },
  shop: {
    name: "shop",
    info: {
      slot: {
        category: "match_info",
        key: "slot_" 
      }
    }
  },
  bench: {
    name: "bench",
    info: {
      cell: {
        category: "match_info",
        key: "cell_" 
      }
    }
  },
  board: {
    name: "board",
    info: {
      cell: {
        category: "match_info",
        key: "cell_" 
      }
    }
  },
  match_info: {
    name: "match_info",
    events: {
      matchOutcome: {
        name: "matchOutcome",
        data: null
      }
    },
    info: {
      pseudo_match_id: {
        category: "match_info",
        key: "pseudo_match_id"
      },
      game_mode: {
        category: "match_info",
        key: "game_mode"
      },
      team_score: {
        category: "match_info",
        key: "team_score"
      }
    }
  },
  party: {
    name: "party",
    info: {
      party: {
        category: "party",
        key: "party"
      }
    }
  },
  error: {
    name: "error",
    info: {
      plugin_error: {
        category: "error",
        key: "plugin_error",
      }
    }
  },
  hero_pool: {
    name: "hero_pool",
    info: {
      hero_pool: {
        category: "hero_pool",
        key: "hero_pool"
      }
    }
  },
  damage: {
    name: "damage",
    events: {
    },
    info: {
      damage_dealt_hero: {
        category: "damage",
        key: "damage_dealt_hero"
      },
      damage_dealt_tower: {
        category: "damage",
        key: "damage_dealt_tower"
      }
    }
  },
});
