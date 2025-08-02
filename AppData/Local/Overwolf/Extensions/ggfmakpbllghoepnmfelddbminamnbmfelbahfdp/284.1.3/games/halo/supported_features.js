define({
  game_info: {
    name: 'game_info',
    info: {
      scene: {
        key: 'scene',
        category: 'game_info'
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
    },
    info: {
      stats: {
        category: "match_info",
        key: "local_player_stats"
      },
      game_type :{
        category: "match_info",
        key: "game_type"
      },
      game_mode :{
        category: "match_info",
        key: "game_mode"
      },
      playlist :{
        category: "match_info",
        key: "playlist"
      },
      match_outcome :{
        category: "match_info",
        key: "match_outcome"
      }
    }
  },
  roster: {
    name: "match_info",
    info: {
      roster: {
        category: "match_info",
        key: "roster_", 
        usePluginKey : true,
        annotations: {
          description: "An array of all players in the match.",
          values: "{ 'name': 'Cocotte7425' , 'team': 1, 'local': false }"
        }
      }
    }
  },
  kill: {
    name: 'kill',
    events: {
      kill: {
        name: 'kill',
        data: null
      }
    }
  },
  assist: {
    name: 'assist',
    events: {
      assist: {
        name: 'assist',
        data: null
      }
    }
  },
  death: {
    name: 'death',
    events: {
      death: {
        name: 'death',
        data: null
      }
    }
  }
})