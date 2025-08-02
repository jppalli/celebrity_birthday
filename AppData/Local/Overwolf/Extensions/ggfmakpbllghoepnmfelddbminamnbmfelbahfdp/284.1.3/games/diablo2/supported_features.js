define({
  game_info: {
    name: 'game_info',
    info: {
      player_level: {
        category: 'me',
        key: 'player_level'
      },
      player_class: {
        category: 'me',
        key: 'player_class'
      },
      player_experience: {
        category: 'me',
        key: 'player_experience'
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
      player_spawn: {
        name: 'player_spawn',
        data: null
      },
      player_died: {
        name: 'player_died',
        data: null
      },
      dropped_item: {
        name: 'dropped_item',
        data: null
      }
    },
    info: {
      act: {
        category: 'match_info',
        key: 'act'
      },
      item: {
        category: 'match_info',
        key: 'item_'
      },
      character_name: {
        category: 'match_info',
        key: 'character_name'
      },
      player_stats: {
        category: 'match_info',
        key: 'player_stats'
      }
    }
  }
});
