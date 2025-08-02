define({
  game_info: {
    name: 'game_info',
    info: {
      user_id: {
        key: 'user_id',
        category: 'game_info'
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
      record_start: {
        name: 'record_start',
        data: null
      },
      record_end: {
        name: 'record_end',
        data: null
      },
    },
    info: {
      game_id: {
        category: 'match_info',
        key: 'game_id'
      },
      universe_id: {
        category: 'match_info',
        key: 'universe_id'
      }
    }
  },
})