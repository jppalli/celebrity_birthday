define({
  game_info: {
    name: 'game_info',
    info: {
      scene: {
        category: 'game_info',
        key: 'scene'
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
      death: {
        name: 'death',
        data: null
      },
      knockout: {
        name: 'knockout',
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
    },
  },
  location: {
    name: 'location',
    info: {
      location: {
        category: 'match_info',
        key: 'location'
      }
    }
  },
})