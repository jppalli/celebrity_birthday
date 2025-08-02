define({
  game_client_data: {
    name: 'game_client_data',
    info: {
      active_deck: {
        category: 'game_client_data',
        key: 'active_deck'
      },
      card_positions: {
        category: 'game_client_data',
        key: 'card_positions'
      },
      expeditions: {
        category: 'game_client_data',
        key: 'expeditions'
      },
      game_result: {
        category: 'game_client_data',
        key: 'game_result'
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
      }
    }
  }
})