define({
  game_info: {
    name: 'game_info',
    info: {
      player_class: {
        category: 'me',
        key: 'player_class'
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
      kill: {
        name: 'kill',
        data: null
      }
    },
    info: {
      mob_details: {
        category: 'match_info',
        key: 'mob_details'
      },
    }
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
      },
    }
  },
});
