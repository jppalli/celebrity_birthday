define({
  stats: {
    name: 'stats',
    events: {
      goal: {
        name: 'goal',
        data: null
      },
      teamGoal: {
        name: 'teamGoal',
        data: null
      },
      opposingTeamGoal: {
        name: 'opposingTeamGoal',
        data: null
      },
      score: {
        name: 'score',
        data: null
      }
    }
  },
  death: {
    name: 'death',
    events: {
      death: {
        name: 'death',
        data: null,
      },
    }
  },
  match: {
    name: 'match',
    events: {
      matchStart: {
        name: 'matchStart',
        data: null
      },
      matchEnd: {
        name: 'matchEnd',
        data: null
      },
      victory: {
        name: "victory",
        data: null
      },
      defeat: {
        name: "defeat",
        data: null
      },
      overtime: {
        name: "overtime",
        data: null
      },
      surrender: {
        name: "surrender",
        data: null
      }
    },
    info: {
      started: {
        category: 'matchState',
        key: 'started'
      },
      ended: {
        category: 'matchState',
        key: 'ended'
      },
      matchType: {
        category: 'matchInfo',
        key: 'matchType',
        annotations: {
          description: 'The match type',
          values: 'string: ["Lobby" | "Private" | "Online" | "Offline"]'
        }
      },
      matchRanked: {
        category: 'matchInfo',
        key: 'ranked',
        annotations: {
          description: 'true if the match is ranked, false otherwise',
          values: '["true" | "false"]'
        }
      },
      matchMaxPlayers: {
        category: 'matchInfo',
        key: 'maxPlayers',
        annotations: {
          description: 'maximum number of players allowed in this match',
          values: 'integer - use parseInt'
        }
      },
      gameMode: {
        category: 'matchInfo',
        key: 'gameMode',
        annotations: {
          description: 'the game mode of the match',
          values: '["soccer" | "basketball", "hockey", "items", "volleyball", "breakout", "playTest"]'
        }
      },
      gameState: {
        category: 'matchInfo',
        key: 'gameState',
        annotations: {
          description: 'current state of the game',
          values: '["waitingForPlayers" | "countdown | "active" | "postGoalScored"]'
        }
      },
      gameType: {
        category: 'matchInfo',
        key: 'gameType',
        annotations: {
          description: 'the game type',
          values: ''
        }
      }
    }
  },
  roster: {
    name: 'roster',
    events: {
      rosterChange: {
        name: 'rosterChange',
        data: null
      },
      playerLeft: {
        name: 'playerLeft',
        data: null
      },
      playerJoined: {
        name: 'playerJoined',
        data: null
      }
    },
    info: {
      player: {
        category: 'playersInfo',
        key: 'player'
      },
      players_rank: {
        category: 'playersInfo',
        key: 'players_rank'
      },
      players_boost: {
        category: 'playersInfo',
        key: 'players_boost'
      },
      team1: {
        category: 'teamsInfo',
        key: 'team1',
        annotations: {
          description: "team 1 details",
          values: "['player1','player2',...]"
        }
      },
      team1Score: {
        category: 'teamsScore',
        key: 'team1_score',
        annotations: {
          description: "team 1 score",
          values: "integer"
        }
      },
      team2: {
        category: 'teamsInfo',
        key: 'team2',
        annotations: {
          description: "team 2 details",
          values: "['player1','player2',...]"
        }
      },
      team2Score: {
        category: 'teamsScore',
        key: 'team2_score',
        annotations: {
          description: "team 2 score",
          values: "integer"
        }
      }
    }
  },
  me: {
    name: 'me',
    events: null,
    info: {
      name: {
        key: 'name',
        category: 'me'
      },
      steamId: {
        key: 'steamId',
        category: 'me'
      },
      goals: {
        key: 'goals',
        category: 'me'
      },
      score: {
        key: 'score',
        category: 'me'
      },
      team: {
        key: 'team',
        category: 'me'
      },
      team_score: {
        key: 'team_score',
        category: 'me'
      },
      rank_playlists: {
        key: 'playlists_rank',
        category: 'game_info'
      }
    }
  },
  match_info: {
    name: "match_info",
    events: {
      action_points: {
        name: 'action_points',
        data: null,
      },
    },
    info: {
      pseudo_match_id: {
        category: "match_info",
        key: "pseudo_match_id"
      },
      game_server: {
        category: 'match_info',
        key: 'server_info'
      },
      game_mutators: {
        category: 'match_info',
        key: 'mutator_settings'
      },
      game_arena: {
        category: 'match_info',
        key: 'arena'
      }
    }
  },
  game_info: {
    name: 'game_info',
    info: {
      trade_my_proposition: {
        category: 'game_info',
        key: 'trade_my_proposition'
      },
      trade_my_inventory: {
        category: 'game_info',
        key: 'trade_my_inventory'
      },
      car_look_inventory: {
        category: 'game_info',
        key: 'car_look_inventory'
      },
      trade_opponent_proposition: {
        category: 'game_info',
        key: 'trade_opponent_proposition'
      },
      trade_menu_opened: {
        category: 'game_info',
        key: 'trade_menu_opened'
      }
    }
  },
  training: {
    name: "training",
    events: {
      training_round: {
        name: 'training_round',
        data: null,
      },
      training_round_result: {
        name: 'training_round_result',
        data: null,
      },
      training_shuffle_mode: {
        name: 'training_shuffle_mode',
        data: null,
      },
    },
    info: {
      training_pack: {
        category: "training",
        key: "training_pack"
      }
    }
  },
});
