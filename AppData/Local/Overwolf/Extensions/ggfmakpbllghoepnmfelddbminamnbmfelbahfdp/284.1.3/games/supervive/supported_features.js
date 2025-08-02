define({
  game_info: {
    feature: "game_info",
    info: {
      scene: {
        category: "game_info",
        key: "scene",
      },
      player_name: {
        category: "game_info",
        key: "player_name",
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
      kill: {
        name: 'kill',
        data: null
      },
      death: {
        name: 'death',
        data: null
      },
      assist: {
        name: 'assist',
        data: null
      }
    },
    info: {
      roster_: {
        category: 'match_info',
        key: 'roster_'
      },
    }
  }
})