define({
  death: {
    name: 'death',
    events: {
      death: {
        name: 'death',
        data: ""
      }
    }
  },
  kill: {
    name: 'kill',
    events: {
      boss_kill: {
        name: 'boss_kill',
        data: null,
        annotations: {
          description: 'Triggered when a boss is killed',
          values: 'Boss name. e.g. Kitava, the Insatiable'
        }
      }
    }
  },
  match_info: {
    name: 'match_info',
    info: {
      opened_page: {
        category: 'match_info',
        key: 'opened_page'
      },
      current_zone: {
        category: 'match_info',
        key: 'current_zone'
      },
      in_town: {
        category: 'match_info',
        key: 'in_town'
      },
    },
    events: {
      match_outcome: {
        name: 'match_outcome',
        data: null,
        annotations: {
          description: 'Based on death or boss_kill',
          values: '[victory | defeat]'
        }
      },
      chat: {
        name: 'chat',
        data: null,
      },
      match_start: {
        name: 'match_start',
        data: null,
      },
      match_end: {
        name: 'match_end',
        data: null,
      },
    }
  },
  me: {
    name: 'me',
    info: {
      character_name: {
        category: 'me',
        key: 'character_name'
      },
      character_level: {
        category: 'me',
        key: 'character_level'
      },
      character_exp: {
        category: 'me',
        key: 'character_exp'
      }
    }
  },
  game_info: {
    name: 'game_info',
    info: {
      language: {
        category: 'language',
        key: 'language'
      },
      chat_language: {
        category: 'language',
        key: 'chat_language'
      },
      scene: {
        category: 'game_info',
        key: 'scene'
      },
    }
  },
});
