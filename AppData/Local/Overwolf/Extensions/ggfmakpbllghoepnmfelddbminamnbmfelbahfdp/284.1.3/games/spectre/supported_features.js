define({
  game_info: {
    name: "game_info",
    info: {
      scene: {
        category: "game_info",
        key: "scene",
      }
    },
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
      death: {
        name: 'death',
        data: null
      },
      kill: {
        name: 'kill',
        data: null
      },
      assist: {
        name: 'assist',
        data: null
      }
    },
    info: {
      map: {
        category: "match_info",
        key: "map",
      },
      deaths: {
        key: 'deaths',
        category: "match_info",
      },
      kills: {
        key: 'kills',
        category: "match_info",
      },
      assists: {
        key: 'assists',
        category: "match_info",
      }
    },
  }
})