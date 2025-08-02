define({
  game_info: {
    name: 'game_info',
    feature: "game_info",
    info: {
      scene: {
        category: "game_info",
        key: "scene",
      },
      player_name: {
        category: "game_info",
        key: "player_name",
      },
      player_id: {
        category: "game_info",
        key: "player_id"
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
      round_start: {
        name: 'round_start',
        data: null
      },
      round_end: {
        name: 'round_end',
        data: null
      },
      kill_feed: {
        name: 'kill_feed',
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
      },
      scoreboard_players: {
        name: 'scoreboard_players',
        data: null
      }
    },
    info: {
      roster: {
        category: 'match_info',
        key: 'roster'
      },
      match_id: {
        category: 'match_info',
        key: 'match_id'
      },
      player_stats: {
        category: 'match_info',
        key: 'player_stats'
      },
      game_mode: {
        category: "match_info",
        key: "game_mode",
      },
      game_type: {
        category: "match_info",
        key: "game_type",
      },
      map: {
        category: "match_info",
        key: "map",
      },
      match_outcome: {
        key: 'match_outcome',
        category: 'match_info'
      },
      banned_characters: {
        key: 'banned_characters',
        category: 'match_info'
      },
      objective_progress: {
        key: 'objective_progress',
        category: 'match_info'
      },
      ability_cooldown_0: {
        key: 'ability_cooldown_0',
        category: 'match_info'
      },
      ability_cooldown_1: {
        key: 'ability_cooldown_1',
        category: 'match_info'
      },
      ability_cooldown_2: {
        key: 'ability_cooldown_2',
        category: 'match_info'
      },
      ability_cooldown_3: {
        key: 'ability_cooldown_3',
        category: 'match_info'
      },
      ability_cooldown_4: {
        key: 'ability_cooldown_4',
        category: 'match_info'
      },
      ability_cooldown_5: {
        key: 'ability_cooldown_5',
        category: 'match_info'
      },
      ability_cooldown_6: {
        key: 'ability_cooldown_6',
        category: 'match_info'
      },
      additional_ability_cd_0: {
        key: 'additional_ability_cd_0',
        category: 'match_info'
      },
      additional_ability_cd_1: {
        key: 'additional_ability_cd_1',
        category: 'match_info'
      },
      additional_ability_cd_2: {
        key: 'additional_ability_cd_2',
        category: 'match_info'
      },
      additional_ability_cd_3: {
        key: 'additional_ability_cd_3',
        category: 'match_info'
      },
    }
  }
})