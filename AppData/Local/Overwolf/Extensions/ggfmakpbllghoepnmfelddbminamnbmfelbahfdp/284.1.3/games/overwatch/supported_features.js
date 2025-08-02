define({
  game_info: {
    name: 'game_info',
    info: {
      game_state: {
        key: 'game_state',
        category: 'game_info'
      },
      game_mode: {
        key: 'game_mode',
        category: 'game_info'
      },
      battle_tag: {
        key: 'battle_tag',
        category: 'game_info'
      },
      game_type: {
        key: 'game_type',
        category: 'match_info'
      },
      game_queue_type: {
        key: 'game_queue_type',
        category: 'match_info'
      },
      party_player_count: {
        key: 'party_player_count',
        category: 'game_info'
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
      round_start: {
        name: 'round_start',
        data: null
      },
      round_end: {
        name: 'round_end',
        data: null
      },
      respawn: {
        name: 'respawn',
        data: null
      },
      revive: {
        name: 'revive',
        data: null
      },
      kill_feed: {
        name: 'kill_feed',
        data: null
      }
    },
    info: {
      pseudo_match_id: {
        key: "pseudo_match_id",
        category: "match_info"
      },
      map: {
        key: 'map',
        category: 'match_info'
      },
      match_outcome: {
        key: 'match_outcome',
        category: 'match_info'
      }
    }
  },
  kill: {
    name: 'kill',
    events: {
      elimination: {
        name: 'elimination',
        data: null
      },
    },
    info: {
      eliminations: {
        key: 'eliminations',
        category: 'kill'
      },
    }
  },
  death: {
    name: 'death',
    events: {
      death: {
        name: 'death',
        data: null
      }
    },
    info: {
      deaths: {
        key: 'deaths',
        category: 'death'
      }
    }
  },
  assist: {
    name: 'assist',
    events: {
      assist: {
        name: 'assist',
        data: null
      }
    },
    info: {
      assists: {
        key: 'assists',
        category: 'assist'
      }
    }
  },
  roster: {
    name: 'roster',
    info: {
      roster_: {
        key: 'roster_',
        category: 'roster'
      }
    }
  }
})