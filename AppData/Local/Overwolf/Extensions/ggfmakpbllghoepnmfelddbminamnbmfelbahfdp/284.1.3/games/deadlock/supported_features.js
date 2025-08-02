define({
  game_info: {
    name: 'game_info',
    info: {
      game_mode: {
        category: 'game_info',
        key: 'game_mode'
      },
      phase: {
        category: 'game_info',
        key: 'phase'
      },
      match_history: {
        category: 'game_info',
        key: 'match_history'
      },
      steam_id: {
        category: "game_info",
        key: "steam_id",
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
      match_id: {
        category: 'match_info',
        key: 'match_id'
      },
      roster_: {
        category: 'match_info',
        key: 'roster_'
      },
      team_score: {
        category: 'match_info',
        key: 'team_score'
      }, 
      match_outcome: {
        category: 'match_info',
        key: 'match_outcome'
      },
      items_: {
        category: 'match_info',
        key: 'items_'
      },
    }
  },
})