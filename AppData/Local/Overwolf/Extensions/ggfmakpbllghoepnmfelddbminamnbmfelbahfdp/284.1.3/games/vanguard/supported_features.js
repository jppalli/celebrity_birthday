define({
  me: {
    name: "me",
    info: {
      local_player: {
        category: "me",
        key: "player_name"
      }
    }
  },
  game_info: {
    name: 'game_info',
    info: {
      scene: {
        key: 'scene',
        category: 'game_info'
      },
      game_mode: {
        key: 'game_mode',
        category: 'game_info'
      },
      game_map: {
        key: 'game_map',
        category: 'game_info'
      }
    }
  },
  match_info: {
    name: 'match_info',
    events: {
      round_outcome : {
        name: 'round_outcome',
      },
      match_start: {
        name: 'match_start',
      },
      match_end: {
        name: 'match_end',
      }
    },
    info: {
      pseudo_match_id: {
        category: "match_info",
        key: "pseudo_match_id"
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
  }
})