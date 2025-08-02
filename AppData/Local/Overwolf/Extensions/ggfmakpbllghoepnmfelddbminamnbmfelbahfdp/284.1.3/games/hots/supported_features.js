define({
  roster: {
    name: 'roster',
    info: {
      roster: {
        category: 'roster',
        key: 'roster'
      }
    }
  },
  match_info: {
    name: 'match_info',
    events: {
      match_start: {
        name: 'match_start',
        data: null
      },
      match_end: {
        name: 'match_end',
        data: null
      },
      talent_available: {
        name: 'talent_available',
        data: null
      },
      gates_opened: {
        name: 'gates_opened',
        data: null
      }
    },
    info: {
      teams_level: {
        category: 'match_info',
        key: 'teams_level'
      },
      match_state: {
        category: 'match_info',
        key: 'match_state'
      },
      pseudo_match_id: {
        category: 'match_info',
        key: 'pseudo_match_id'
      },
      game_mode: {
        category: "match_info",
        key: "game_mode"
      },
      score: {
        category: "match_info",
        key: "score"
      }
    }
  },
  kill: {
    name: 'kill',
    events: {
      kill: {
        name: 'kill',
        data: null
      },
      assist: {
        name: 'assist',
        data: null
      },
      minion_kill: {
        name: 'minion_kill',
        data: null
      },
      takedown: {
        name: 'takedown',
        data: null
      }
    }
  },
  death: {
    name: 'death',
    events: {
      death: {
        name: 'death',
        data: null
      }
    }
  },
  game_info: {
    name: 'game_info',
    info: {
      scene: {
        category: 'game_info',
        key: 'scene'
      }
    }
  },
  me: {
    name: 'me',
    info: {
      player_info: {
        category: 'me',
        key: 'player_info'
      }
    }
  },
  draft: {
    name: "draft",
    info: {
      draft: {
        category: "match_info",
        key: "draft_", 
        annotations: {
          description: "a single player in the draft",
          values: `{"player_name": "<player name>", "hero_name": <hero name>}`
        }
      }
    }
  },
  bans: {
    name: "bans",
    info: {
      bans: {
        category: "match_info",
        key: "bans_", 
        annotations: {
          description: "a single hero name",
          values: `{"hero_name": <hero name>}`
        }
      }
    }
  }
});
