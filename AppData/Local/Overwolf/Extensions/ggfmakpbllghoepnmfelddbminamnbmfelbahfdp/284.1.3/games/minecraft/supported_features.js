define({
  game_info: {
    name: 'game_info',
    info: {
      scene: {
        key: 'scene',
        category: 'game_info'
      },
      scene_key: {
        key: 'scene_key',
        category: 'game_info'
      },
      name: {
        key: 'name',
        category: 'game_info'
      },
      player_: {
        key: 'player_', 
        category: 'game_info',
        usePluginKey: true
      },
      mc_version: {
        key: 'mc_version',
        category: 'game_info'
      },
      world_id: {
        key: 'world_id',
        category: 'game_info'
      },
      game_dir: {
        key: 'game_dir',
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
      },
      chat: {
        name: 'chat',
        data: null
      }
    },
    info: {
      server: {
        key: 'server',
        category: 'match_info'
      },
      server_info: {
        key: 'server_info',
        category: 'match_info'
      },
      items_stats: {
        key: 'items_stats',
        category: 'match_info'
      },
      general_stats: {
        key: 'general_stats',
        category: 'match_info'
      },
      mobs_stats: {
        key: 'mobs_stats',
        category: 'match_info'
      },
      location: {
        key: 'location',
        category: 'match_info'
      },
      facing: {
        key: 'facing',
        category: 'match_info'
      },
      biome: {
        key: 'biome',
        category: 'match_info'
      },
      dimension: {
        key: 'dimension',
        category: 'match_info'
      },
      realms_info: {
        key: 'realms_info',
        category: 'match_info'
      },
    }
  },
  counters: {
    name: 'counters',
    events: {},
    info: {
      ping: {
        key: 'ping',
        category: 'performance'
      }
    }
  },
  mods: {
    name: 'mods',
    events: {},
    info: {
      mods: {
        key: 'addon_',
        category: 'mods',
        usePluginKey: true
      },
      mods_details: {
        key: 'mods_details',
        category: 'mods',
      }
    }
  }
})