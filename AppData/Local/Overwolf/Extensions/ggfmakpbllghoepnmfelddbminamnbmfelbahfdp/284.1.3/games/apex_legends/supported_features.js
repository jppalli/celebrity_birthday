define({
  rank: {
    name: 'rank',
    info: {
      victory: {
        category: "match_info",
        key: "victory",
        annotations: {
          description: "Did a user win the current match",
          values: "[true|false|null]"
        }
      },
      defeat: {
        category: "match_info",
        key: "defeat",
        annotations: {
          description: "Did a user lose in a TDM game mode in the current match",
          values: ""
        }
      }
    }
  },
  match_summary: {
    name: "match_summary",
    info: {
      match_summary: {
        category: "match_info",
        key: "match_summary",
        annotations: {
          description: "Match summary data (rank, total teams, squad kills)"
        }
      }
    }
  },
  match_state: {
    name: "match_state",
    events: {
      match_start: {
        name: "match_start",
        data: null
      },
      match_end: {
        name: "match_end",
        data: null
      },
    },
    info: {
      match_state: {
        category: "game_info",
        key: "match_state",
        annotations: {
          description: "The current state of the match",
          values: "['active'|'inactive']"
        }
      }
    }
  },
  kill: {
    name: "kill",
    events: {
      kill: {
        name: "kill",
        data: null
      },
      assist: {
        name: "assist",
        data: null
      },
      knockdown: {
        name: "knockdown",
        data: null
      },
      squad_wipe: {
        name: "squad_wipe",
        data: null
      }
    }
  },
  death: {
    name: "death",
    events: {
      death: {
        name: "death",
        data: null
      },
      knocked_out: {
        name: "knocked_out",
        data: null
      }
    }
  },
  team: {
    name: "team",
    info: {
      team_info: {
        category: "match_info",
        key: "team_info",
        annotations: {
          description: "The current status of the local player’s team (active or eliminated).",
          values: "['active'|'eliminated']"
        }
      },
      teammate: {
        category: "match_info",
        key: "teammate_", 
        annotations: {
          description: "A list of teammates.",
          values: "[{ 'name': 'hithere' , 'state': 'alive'/'knockedout'/'dead' }]"
        }
      },
      legendSelect: {
        category: "match_info",
        key: "legendSelect_", 
        annotations: {
          description: "A list of teammates' Legend selection."
        }
      }
    }
  },
  me: {
    name: "me",
    info: {
      name: {
        category: "me",
        key: "name",
        annotations: {
          description: "The local player’s nickname."
        }
      },
      ultimate_cooldown: {
        category: "me",
        key: "ultimate_cooldown"
      }
    }
  },
  location: {
    name: "location",
    info: {
      location: {
        category: "match_info",
        key: "location",
        annotations: {
          description: "The local player's location on the map, (0,0) is the center"
        }
      }
    }
  },
  revive: {
    name: "revive",
    events: {
      respawn: {
        name: "respawn",
        data: null
      },
      healed_from_ko: {
        name: "healed_from_ko",
        data: null
      }
    }
  },
  roster: {
    name: "roster",
    info: {
      roster: {
        category: "match_info",
        key: "roster_", 
        annotations: {
          description: "An array of all players in the match.",
          values: "{ 'name': 'hithere' , 'isTeammate': true|false }"
        }
      }
    }
  },
  kill_feed: {
    name: "kill_feed",
    events: {
      kill_feed: {
        name: "kill_feed",
        data: null
      }
    }
  },
  hud: {
    name: "hud",
    events: {
      hud: {
        name: "hud",
        data: null
      }
    }
  },
  localization: {
    name: "localization",
    events: {
      language: {
        name: "language",
        data: null
      }
    },
    info: {
      language: {
        category: "game_info",
        key: "language",
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
      game_mode: {
        category: "match_info",
        key: "game_mode"
      },
      mode_name: {
        category: "match_info",
        key: "mode_name"
      },
      tabs: {
        category: "match_info",
        key: "tabs"
      },
      map_id: {
        category: "match_info",
        key: "map_id"
      },
      map_name: {
        category: "match_info",
        key: "map_name"
      },
    }
  },
  game_info: {
    name: "game_info",
    info: {
      phase: {
        category: "game_info",
        key: "phase"
      },
      player: {
        category: "game_info",
        key: "player"
      },
    }
  },
  inventory: {
    name: "inventory",
    info: {
      inventory: {
        category: "me",
        key: "inventory_" 
      },
      weapons: {
        category: "me",
        key: "weapons"
      },
      inUse: {
        category: "me",
        key: "inUse"
      }
    }
  },
  damage: {
    name: "damage",
    events: {
      damage: {
        name: "damage",
        data: null
      }
    },
    info: {
      totalDamageDealt: {
        category: "me",
        key: "totalDamageDealt"
      },
      team_damage_dealt: {
        category: "damage",
        key: "team_damage_dealt"
      }
    }
  }
});
