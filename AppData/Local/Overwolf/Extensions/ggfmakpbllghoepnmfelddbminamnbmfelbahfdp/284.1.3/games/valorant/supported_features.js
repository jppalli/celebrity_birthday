define({
  game_info: {
    name: 'game_info',
    info: {
      state: {
        key: 'state',
        category: 'game_info'
      },
      scene: {
        key: 'scene',
        category: 'game_info'
      },
      is_pbe: {
        key: 'is_pbe',
        category: 'game_info'

      }
    }
  },
  me: {
    name: 'me',
    info: {
      player_name: {
        key: 'player_name',
        category: 'me'
      },
      player_id: {
        key: 'player_id',
        category: 'me'
      },
      region: {
        key: 'region',
        category: 'me'
      },
      agent: {
        key: 'agent',
        category: 'me'
      },
      health: {
        key: 'health',
        category: 'me'
      },
      abilities: {
        key: 'abilities',
        category: 'me'
      },
      server: {
        key: 'server',
        category: 'me'
      },
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
      spike_defused: {
        name: 'spike_defused',
        data: null
      },
      spike_detonated: {
        name: 'spike_detonated',
        data: null
      },
      kill_feed: {
        name: 'kill_feed',
        data: null
      },
      shop: {
        name: 'shop',
        data: null
      },
      scoreboard_screen: {
        name: 'scoreboard_screen',
        data: null
      },
      planted_location: {
        name: 'planted_location',
        data: null
      },
    },
    info: {
      pseudo_match_id: {
        category: "match_info",
        key: "pseudo_match_id"
      },
      game_mode: {
        key: 'game_mode',
        category: 'match_info'
      },
      round_number: {
        key: 'round_number',
        category: 'match_info'
      },
      round_phase: {
        key: 'round_phase',
        category: 'match_info'
      },
      round_report: {
        key: 'round_report',
        category: 'match_info'
      },
      score: {
        key: 'score',
        category: 'match_info'
      },
      match_score: {
        key: 'match_score',
        category: 'match_info'
      },
      match_outcome: {
        key: 'match_outcome',
        category: 'match_info'
      },
      team: {
        key: 'team',
        category: 'match_info'
      },
      roster_: {
        key: 'roster_',
        category: 'match_info'
      },
      scoreboard_: {
        key: 'scoreboard_',
        category: 'match_info'
      },
      killfeed: {
        key: 'kill_feed',
        category: 'match_info'
      },
      map: {
        key: 'map',
        category: 'match_info'
      },
      escalation_stage: {
        key: 'escalation_stage',
        category: 'match_info'
      },
      observing: {
        key: 'observing',
        category: 'match_info'
      },
      planted_site: {
        key: 'planted_site',
        category: 'match_info'
      },
      match_id: {
        key: 'match_id',
        category: 'match_info'
      },
      ui_team_order_allies: {
        key: 'ui_team_order_allies',
        category: 'match_info'
      },
      ui_team_order_enemies: {
        key: 'ui_team_order_enemies',
        category: 'match_info'
      },
    }
  },
  kill: {
    name: 'kill',
    events: {
      kill: {
        name: 'kill',
        data: null
      },
      headshot: {
        name: 'headshot',
        data: null
      },
      assist: {
        name: 'assist',
        data: null
      }
    },
    info: {
      kills: {
        key: 'kills',
        category: 'kill'
      },
      headshots: {
        key: 'headshots',
        category: 'kill'
      },
      assists: {
        key: 'assists',
        category: 'kill'
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
    },
    info: {
      deaths: {
        key: 'deaths',
        category: 'death'
      }
    }
  }
})