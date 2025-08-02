define({
  game_info: {
    name: 'game_info',
    info: {
      battlenet_tag: {
        category: 'game_info',
        key: 'battlenet_tag'
      },
      gold: {
        category: 'gold',
        key: 'gold'
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
      }
    },
  },
  location: {
    name: 'location',
    info: {
      location: {
        category: 'match_info',
        key: 'location'
      },
      map: {
        category: 'match_info',
        key: 'map'
      }
    }
  },
  me: {
    name: 'me',
    info: {
      name: {
        category: 'character',
        key: 'name'
      },
      class: {
        category: 'character',
        key: 'class'
      },
      level: {
        category: 'character',
        key: 'level'
      },
      paragon_level: {
        category: 'character',
        key: 'paragon_level'
      },
      xp: {
        category: 'character',
        key: 'xp'
      },
      health: {
        category: 'character',
        key: 'health'
      }
    }
  },
})