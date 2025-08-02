define({
  game_info: {
    feature: "game_info",
    infoDB: {
      phase: {
        category: "game_info",
        key: "phase",
        annotations: {
          description: "The current game scene/phase",
          values: "one of [lobby, teammates, announce, operator_select, loading, action, round_results]"
        }
      },
      steam_id: {
        category: "game_info",
        key: "steam_id",
      }
    }
  },
  match: {
    feature: "match",
    infoDB: {
      roundNumber: {
        category: "round",
        key: "number",
        annotations: {
          description: "The number of the current round",
          values: "number"
        }
      },
      matchScore: {
        category: "match",
        key: "score",
        annotations: {
          description: "Match score",
          values: "{'orange':1,'blue':0}"
        }
      }
    },
    events: {
      roundStart: {
        name: 'roundStart',
        data: null
      },
      roundEnd: {
        name: 'roundEnd',
        data: null
      },
      roundOutcome: {
        name: 'roundOutcome',
        data: null
      },
      matchOutcome: {
        name: 'matchOutcome',
        data: null
      }
    }
  },
  roster: {
    feature: "roster",
    infoDB: {
      roster_: {
        category: "players",
        key: "roster_", 
      },
      playerTeam: {
        category: "player",
        key: "team",
        annotations: {
          description: "Player's current team",
          values: "orange/blue"
        }
      },
      playerHealth: {
        category: "player",
        key: "health",
        annotations: {
          description: "Player's current health",
          values: "number"
        }
      },
      playerScore: {
        category: "player",
        key: "score",
        annotations: {
          description: "Player's current score",
          values: "number"
        }
      },
      totalKills: {
        category: "player",
        key: "kills",
        annotations: {
          description: "Total number of kills done by the player",
          values: "number"
        }
      },
      totalDeaths: {
        category: "player",
        key: "deaths",
        annotations: {
          description: "Total number of deaths done by the player",
          values: "number"
        }
      },
      players_list_log: {
        category: "players",
        key: "players_list_log"
      }
    }
  },
  kill: {
    feature: "kill",
    events: {
      kill: {
        name: 'kill',
        data: null
      },
      headshot: {
        name: 'headshot',
        data: null
      }
    }
  },
  death: {
    feature: "death",
    events: {
      death: {
        name: 'death',
        data: null
      },
      knockedout: {
        name: 'knockedout',
        data: null
      },
      killer: {
        name: 'killer',
        data: null
      }
    }
  },
  match_info: {
    feature: "match_info",
    events: {
      match_end: {
        name: 'match_end',
        data: null
      },
      match_start: {
        name: 'match_start',
        data: null
      }
    },
    infoDB: {
      pseudo_match_id: {
        category: "match_info",
        key: "pseudo_match_id"
      },
      match_id: {
        category: "match_info",
        key: "match_id"
      },
      map_id: {
        category: "match_info",
        key: "map_id"
      },
      round_outcome_type: {
        category: "match_info",
        key: "round_outcome_type"
      },
      game_mode: {
        category: "match_info",
        key: "game_mode"
      },
      general_log: {
        category: "match_info",
        key: "general_log"
      },
      ban_log: {
        category: "match_info",
        key: "ban_log"
      },
      match_start_log: {
        category: "match_info",
        key: "match_start_log"
      },
      round_start_log: {
        category: "match_info",
        key: "round_start_log"
      },
      move_log: {
        category: "match_info",
        key: "move_log"
      },
      score_log: {
        category: "match_info",
        key: "score_log"
      },
      death_log: {
        category: "match_info",
        key: "death_log"
      },
      round_end_log: {
        category: "match_info",
        key: "round_end_log"
      },
      match_end_log: {
        category: "match_info",
        key: "match_end_log"
      },
      kill_log: {
        category: "match_info",
        key: "kill_log"
      },
      teams_log: {
        category: "match_info",
        key: "teams_log"
      },
      ko_log: {
        category: "match_info",
        key: "ko_log"
      },
      game_mode_log: {
        category: "match_info",
        key: "game_mode_log"
      }
    }
  },
  me: {
    feature: 'me',
    infoDB: {
      account_id: {
        category: 'me',
        key: 'account_id'
      },
      name: {
        category: 'me',
        key: 'name'
      }
    }
  },
  defuser: {
    feature: 'defuser',
    events: {
      defuser_planted: {
        name: 'defuser_planted',
        data: null
      },
      defuser_disabled: {
        name: 'defuser_disabled',
        data: null
      },
    }
  }
});
