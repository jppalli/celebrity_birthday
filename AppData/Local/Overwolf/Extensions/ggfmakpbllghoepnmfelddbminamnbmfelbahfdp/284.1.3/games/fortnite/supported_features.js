define({
  kill: {
    name: "kill",
    events: {
      kill: {
        name: "kill",
        data: null,
      },
      knockout: {
        name: "knockout",
        data: null,
      },
      hit: {
        name: "hit",
        data: null,
      },
    },
    info: {
      kills: {
        category: "match_info",
        key: "kills",
        annotations: {
          description: "total number of kills in the match",
        },
      },
    },
  },
  killed: {
    name: "killed",
    events: {
      killed: {
        name: "killed",
        data: null,
      },
    },
  },
  killer: {
    name: "killer",
    events: {
      killer: {
        name: "killer",
        data: null,
      },
    },
  },
  revived: {
    name: "revived",
    events: {
      revived: {
        name: "revived",
        data: null,
      },
    },
  },
  assist: {
    name: "assist",
    events: {
      assist: {
        name: "assist",
        data: null,
      },
    },
    info: {
      assists: {
        category: "match_info",
        key: "assists",
      },
    },
  },
  death: {
    name: "death",
    events: {
      death: {
        name: "death",
        data: null,
      },
      knockedout: {
        name: "knockedout",
        data: null,
      },
    },
    info: {
      deaths: {
        category: "match_info",
        key: "deaths",
      },
    },
  },
  match: {
    name: "match",
    events: {
      matchStart: {
        name: "matchStart",
        data: null,
      },
      matchEnd: {
        name: "matchEnd",
        data: null,
      },
    },
    info: {
      mode: {
        category: "match_info",
        key: "mode",
        annotations: {
          description: "match mode",
          values: "['Solo'|'Duo'|'Squad']",
        },
      },
      sessionID: {
        category: "match_info",
        key: "sessionID",
      },
      matchID: {
        category: "match_info",
        key: "matchID",
      },
      match_id_log: {
        category: "match_info",
        key: "match_id_log",
      },
      partyID: {
        category: "match_info",
        key: "partyID",
      },
      ticketID: {
        category: "match_info",
        key: "ticketID",
      },
      userID: {
        category: "match_info",
        key: "userID",
      },
    },
  },
  rank: {
    name: "rank",
    info: {
      rank: {
        category: "match_info",
        key: "rank",
        annotations: {
          description: "player's rank at the end of the match",
        },
      },
      total_teams: {
        category: "match_info",
        key: "total_teams",
        annotations: {
          description: "total number of teams at the end of the match",
        },
      },
      total_players: {
        category: "match_info",
        key: "total_players",
        annotations: {
          description: "total number of players at the end of the match",
        },
      },
    },
  },
  me: {
    name: "me",
    info: {
      name: {
        category: "me",
        key: "name",
        annotations: {
          description: "player's nickname",
        },
      },
      health: {
        category: "me",
        key: "health",
        annotations: {
          description: "player's health",
        },
      },
      shield: {
        category: "me",
        key: "shield",
        annotations: {
          description: "player's shield",
        },
      },
      over_shield: {
        category: "me",
        key: "over_shield",
        annotations: {
          description: "player's over shield",
        },
      },
      accuracy: {
        category: "me",
        key: "accuracy",
        annotations: {
          description: "player's accuracy %",
        },
      },
      total_shots: {
        category: "me",
        key: "total_shots",
      },
    },
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
            "['lobby' | 'loading screen' | 'airfield' | 'aircraft' | 'freefly']",
        },
      },
      in_vehicle: {
        category: "game_info",
        key: "in_vehicle"
      },
    },
  },
  location: {
    name: "location",
    info: {
      location: {
        category: "game_info",
        key: "location",
        annotations: {
          description:
            "player's current grid location using x,y" +
            " coordinates. top left is 0,0",
          values: "{'x':###,'y':###}",
        },
      },
    },
  },
  roster: {
    name: "roster",
    info: {
      roster: {
        category: "match_info",
        key: "roster",
        usePluginKey: true,
        annotations: {
          description: "an array of all players in the match with state",
          values:
            "[{ 'name' : 'hithere' , 'team' : '1', 'status' : 'in' }, { 'name' : 'upyours' , 'team' : '2', 'status' : 'out' }]",
        },
      },
    },
    events: {
      playerJoined: {
        name: "playerJoined",
        data: null,
      },
      playerLeft: {
        name: "playerLeft",
        data: null,
      },
    },
  },
  team: {
    name: "team",
    info: {
      nicknames: {
        category: "match_info",
        key: "nicknames",
        annotations: {
          description: "names of players in the player's team",
          values:
            "'nicknames':'{'team_members' : [{'player' : 'Itaygl'},{'player' : 'player2'}, {'player' : 'player3'},{'player' : 'player4'}]}'}}",
        },
      },
    },
  },
  map: {
    name: "map",
    info: {
      map: {
        category: "match_info",
        key: "map",
        annotations: {
          description: "current match map name",
        },
      },
      creative_map: {
        category: "match_info",
        key: "creative_map",
        annotations: {
          description: "current match map details in creative mode",
        },
      },
    },
  },
  items: {
    name: "items",
    info: {
      inventory: {
        category: "inventory",
        key: "item_", 
        annotations: {
          description: "inventory item update",
          values: `{"name": "<item name>", "count": <number of times this item is in the invenotry>, "ammo": <item ammo>}`,
        },
      },
      quickbar: {
        category: "quickbar",
        key: "quickbar_", 
        annotations: {
          description: "quickbar item update",
          values: `{"name": "<item name>", "count": <number of times this item is in the invenotry>, "ammo": <item ammo>}`,
        },
      },
      selected_slot: {
        category: "selected_slot",
        key: "selected_slot",
        annotations: {
          description: "marks which quickbar slot is currently selected",
          values: `{"isPrimary": "<items or build materials quickbar slot>", "slot": <quickbar slot number>}`,
        },
      },
      selected_material: {
        category: "selected_material",
        key: "selected_material",
        annotations: {
          description: "which build material is selected",
          values: `[0-2] (0=wood, 1=stone, 2=metal)`,
        },
      },
    },
  },
  counters: {
    name: "counters",
    info: {
      ping: {
        category: "performance",
        key: "ping",
      },
    },
    events: {
      ping: {
        name: "counters",
        data: null,
      },
    },
  },
  match_info: {
    name: "match_info",
    events: {
      generic: {
        name: "generic",
        data: null,
      },
      message_feed: {
        name: "message_feed",
        data: null,
      },
      emote_start: {
        name: "emote_start",
        data: null,
      },
    },
    info: {
      pseudo_match_id: {
        category: "match_info",
        key: "pseudo_match_id",
      },
      skirmish: {
        category: "match_info",
        key: "skirmish",
      },
      match_stats: {
        category: "match_info",
        key: "match_stats",
      },
    },
  },
  game_info: {
    name: "game_info",
    info: {
      compass_update: {
        category: "game_info",
        key: "compass_update"
      },
      server: {
        category: "game_info",
        key: "server"
      },
      privacy: {
        category: "game_info",
        key: "privacy"
      },
      game_title: {
        category: "game_info",
        key: "game_title"
      },
      title_mnemonic: {
        category: "game_info",
        key: "title_mnemonic"
      },
      game_type: {
        category: "game_info",
        key: "game_type"
      },
      player_rank: {
        category: "game_info",
        key: "player_rank"
      },
      party_players: {
        category: "game_info",
        key: "party_players"
      },
      vbucks: {
        category: "game_info",
        key: "vbucks"
      },
    }
  }
});
