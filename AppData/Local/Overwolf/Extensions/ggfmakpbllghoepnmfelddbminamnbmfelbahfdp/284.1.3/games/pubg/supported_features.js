define({
  team_feed: {
    name: 'team_feed',
    events: {
      team_feed: {
        name: 'team_feed',
        data: null
      }
    },
    info: {
      team_feed: {
        category: 'team_feed',
        key: 'team_feed'
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
      knockout: {
        name: "knockout",
        data: null,
        supported: true
      },
      headshot: {
        name: "headshot",
        data: null,
        supported: true
      },
      damage_dealt: {
        name: "damage_dealt",
        data: null
      },
      fire: {
        name: "fire",
        data: null
      },
      victimName: {
        name: "victimName",
        data: null
      }
    },
    info: {
      kills: {
        category: "match_info",
        key: "kills",
        annotations: {
          description: "total number of kills in the match"
        }
      },
      headshots: {
        category: "match_info",
        key: "headshots",
        annotations: {
          description: "total number of headshots in the match"
        }
      },
      total_damage_dealt: {
        category: "match_info",
        key: "total_damage_dealt",
        annotations: {
          description: "total damage dealt in the current match"
        }
      },
      max_kill_distance: {
        category: "match_info",
        key: "max_kill_distance",
        annotations: {
          description: "max kill distance in CM"
        }
      }
    }
  },
  revived: {
    name: "revived",
    events: {
      revived: {
        name: "revived",
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
      knockedout: {
        name: "knockedout",
        data: null
      },
      damageTaken: {
        name: "damageTaken",
        data: null
      }
    }
  },
  killer: {
    name: "killer",
    events: {
      killer: {
        name: "killer",
        data: null
      }
    }
  },
  match: {
    name: "match",
    events: {
      matchStart: {
        name: "matchStart",
        data: null
      },
      matchEnd: {
        name: "matchEnd",
        data: null
      },
      matchSummary: {
        name: "matchSummary",
        data: null,
        ignoreWhileSpectating: false
      }
    },
    info: {
      mode: {
        category: "match_info",
        key: "mode",
        annotations: {
          description: "match mode",
          values: "['Solo'|'Duo'|'Squad']"
        }
      },
      match_id: {
        category: "match_info",
        key: "match_id",
        annotations: {
          description: "Code string of the session",
          values:
            "match.bro.official.pc-2018-03.steam.solo.eu.2019.03.28.13.369b73e9-ffd6-493d-a459-a5f7815569e1"
        }
      }
    }
  },
  rank: {
    name: "rank",
    ignoreWhileSpectating: false,
    info: {
      me: {
        category: "match_info",
        key: "me",
        annotations: {
          description: "player's rank at the end of the match"
        }
      },
      total: {
        category: "match_info",
        key: "total",
        annotations: {
          description: "the total number of players"
        }
      },
      total_teams: {
        category: "match_info",
        key: "total_teams",
        annotations: {
          description: "the total number of teams"
        }
      }
    }
  },
  location: {
    name: "location",
    events: {
      time_to_next_circle: {
        name: "time_to_next_circle",
        data: null
      }
    },
    info: {
      location: {
        category: "game_info",
        key: "location",
        annotations: {
          description:
            "player's current grid location using x,y" +
            " coordinates. top left is 0,0",
          values: "{'x':###,'y':###, 'z':###}"
        }
      },
      team_location: {
        category: "game_info",
        key: "team_location",
        annotations: {
          description:
            "teammates current grid location using x,y,z" +
            " coordinates. top left is 0,0",
          values: "{player: 'noobmaster69', 'x':###,'y':###, 'z':###}"
        }
      },
      safe_zone: {
        category: "game_info",
        key: "safe_zone"
      },
      blue_zone: {
        category: "game_info",
        key: "blue_zone"
      },
      red_zone: {
        category: "game_info",
        key: "red_zone"
      }
    }
  },
  me: {
    name: "me",
    events: {
      jump: {
        name: "jump",
        data: null
      }
    },
    info: {
      health: {
        category: "me",
        key: "health",
        annotations: {
          description: "player's health"
        }
      },
      name: {
        category: "me",
        key: "name",
        annotations: {
          description: "player's nickname"
        }
      },
      bodyPosition: {
        category: "me",
        key: "bodyPosition",
        annotations: {
          description: "The local player's tilt.",
          values: "leanLeft|leanRight|straight"
        }
      },
      inVehicle: {
        category: "me",
        key: "inVehicle",
        annotations: {
          description: "Is the local player in a vehicles?",
          values: "true|false"
        }
      },
      aiming: {
        category: "me",
        key: "aiming",
        annotations: {
          description: "Local player's aim mode.",
          values: "null|focusedAim|aimDownSight|aimDownSight_holding_breath"
        }
      },
      view: {
        category: "me",
        key: "view",
        annotations: {
          description: "Local player's perspective.",
          values: "FPP|TPP"
        }
      },
      freeView: {
        category: "me",
        key: "freeView",
        annotations: {
          description: "Is the local player in free view?",
          values: "true|false"
        }
      },
      movement: {
        category: "me",
        key: "movement",
        annotations: {
          description: "Local player's movement speed state.",
          values: "fast|normal|stealth"
        }
      },
      stance: {
        category: "me",
        key: "stance",
        annotations: {
          description: "Local player's stance",
          values: "stand|crouch|prone"
        }
      },
      inventory: {
        category: "inventory",
        key: "inventory_", 
        annotations: {
          description:
            "Name and amount of un-equippable items currently in possession of local player."
        }
      },
      equipped: {
        category: "inventory",
        key: "equipped_", 
        annotations: {
          description:
            "Name and amount of equippable items currently in possession of local player."
        }
      },
      weaponState: {
        category: "inventory",
        key: "weaponState",
        annotations: {
          description: "Info about the selected weapon",
          values: `{“name”:”WeapHK416_C_0”,”firingMode”:”2”}`
        }
      }
    }
  },
  team: {
    name: "team",
    info: {
      nicknames: {
        category: "match_info",
        key: "nicknames",
        annotations: {
          description: "names of players in the player's team"
        }
      },
      team_index: {
        category: "match_info",
        key: "team_index",
        annotations: {
          description: "teammate hud location index"
        }
      }
    }
  },
  phase: {
    name: "phase",
    info: {
      phase: {
        category: "game_info",
        key: "phase",
        annotations: {
          description: "game state",
          values:
            "['lobby' | 'loading_screen'| <map_name> | 'airfield' |" +
            " 'airfield' | 'aircraft' | 'freefly' | 'landed']"
        }
      }
    }
  },
  map: {
    name: "map",
    info: {
      map: {
        category: "match_info",
        key: "map",
        annotations: {
          description: "current match map name"
        }
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
          description: "a single player in the match",
          values: `{"player": "<player name>", "kills": <number of kills for the player>}`
        }
      }
    }
  },
  counters: {
    name: "counters",
    events: {
      ping: {
        name: "ping",
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
      }
    }
  }
});
