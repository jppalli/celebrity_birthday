define({
  game_info: {
    name: 'game_info',
    info: {
      scene: {
        key: 'scene',
        category: 'game_info'
      },
      mode: {
        key: 'mode',
        category: 'game_info'
      },
    }
  },
  match_info: {
    name: 'match_info',
    events: {
      victory : {
        name: 'victory',
      },
      match_start: {
        name: 'match_start',
      },
      match_end: {
        name: 'match_end',
      }
    }
  }
})