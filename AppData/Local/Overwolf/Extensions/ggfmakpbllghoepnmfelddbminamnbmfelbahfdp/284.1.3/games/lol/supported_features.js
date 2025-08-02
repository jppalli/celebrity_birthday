define({
  features: {
    name: 'features',
  },
  summoner_info: {
    name: 'summoner_info',
    info: {
      id: {
        category: 'summoner_info',
        key: 'id',
      },
      region: {
        category: 'summoner_info',
        key: 'region',
      },
      name: {
        category: 'summoner_info',
        key: 'name',
      },
      champion: {
        category: 'summoner_info',
        key: 'champion',
      },
      level: {
        category: 'summoner_info',
        key: 'level',
      },
      tier: {
        category: 'summoner_info',
        key: 'tier',
      },
      division: {
        category: 'summoner_info',
        key: 'division',
      },
      queue: {
        category: 'summoner_info',
        key: 'queue',
      },
      accountId: {
        category: 'summoner_info',
        key: 'accountId',
      },
    },
  },
  gameMode: {
    task: 'game_modes',
    name: 'gameMode',
    info: {
      gameMode: {
        category: 'game_info',
        key: 'gameMode',
        gameType: ['NA'],
      },
    },
  },
  is_aram: {
    name: 'is_aram',
    info: {
      is_aram: {
        category: 'is_aram',
        key: 'is_aram',
        gameType: ['NA'],
      },
    },
  },
  matchState: {
    name: 'matchState',
    events: {
      matchStart: {
        name: 'matchStart',
        data: null,
      },
      matchEnd: {
        name: 'matchEnd',
        data: null,
        gameType: ['NA'],
      },
    },
    info: {
      matchStarted: {
        category: 'game_info',
        key: 'matchStarted',
      },
      matchOutcome: {
        category: 'game_info',
        key: 'matchOutcome',
        gameType: ['NA'],
      },
      matchId: {
        category: 'game_info',
        key: 'matchId',
      },
      queueId: {
        category: 'game_info',
        key: 'queueId',
      },
    },
  },
  teams: {
    name: 'teams',
    info: {
      teams: {
        category: 'game_info',
        key: 'teams',
      },
      arena_teams: {
        category: 'game_info',
        key: 'arena_teams',
        gameType: ['ARENA'],
      },
    },
  },
  team_frames: {
    name: 'team_frames',
    info: {
      team_frames: {
        category: 'game_info',
        key: 'team_frames', 
        gameType: ['LOL'],
      },
    },
  },
  augments: {
    name: 'augments',
    info: {
      augments: {
        category: 'me',
        key: 'me',
        gameType: ['TFT', 'ARENA'],
      },
      picked_augment: {
        category: 'me',
        key: 'picked_augment',
        gameType: ['TFT', 'ARENA'],
      },
    },
  },
  kill: {
    task: 'var_map',
    name: 'kill',
    events: {
      kill: {
        name: 'kill',
        data: {
          label: 'kill',
        },
        gameType: ['LOL', 'BRAWL'],
      },
      doubleKill: {
        name: 'kill',
        data: {
          label: 'double_kill',
        },
        gameType: ['LOL', 'BRAWL'],
      },
      tripleKill: {
        name: 'kill',
        data: {
          label: 'triple_kill',
        },
        gameType: ['LOL', 'BRAWL'],
      },
      quadraKill: {
        name: 'kill',
        data: {
          label: 'quadra_kill',
        },
        gameType: ['LOL', 'BRAWL'],
      },
      pentaKill: {
        name: 'kill',
        data: {
          label: 'penta_kill',
        },
        gameType: ['LOL', 'BRAWL'],
      },
      unrealKill: {
        name: 'kill',
        data: {
          label: 'unreal_kill',
        },
        gameType: ['LOL', 'BRAWL'],
      },
    },
    info: {
      kills: {
        category: 'game_info',
        key: 'kills',
        gameType: ['LOL', 'BRAWL'],
      },
      doubleKills: {
        category: 'game_info',
        key: 'doubleKills',
        gameType: ['LOL', 'BRAWL'],
      },
      tripleKills: {
        category: 'game_info',
        key: 'tripleKills',
        gameType: ['LOL', 'BRAWL'],
      },
      quadraKills: {
        category: 'game_info',
        key: 'quadraKills',
        gameType: ['LOL', 'BRAWL'],
      },
      pentaKills: {
        category: 'game_info',
        key: 'pentaKills',
        gameType: ['LOL', 'BRAWL'],
      },
    },
  },
  assist: {
    task: 'var_map',
    name: 'assist',
    events: {
      assist: {
        name: 'assist',
        data: null,
        gameType: ['LOL', 'BRAWL'],
      },
    },
    info: {
      assists: {
        category: 'game_info',
        key: 'assists',
        gameType: ['LOL', 'BRAWL'],
      },
    },
  },
  gold: {
    task: 'gold',
    name: 'gold',
    events: null,
    info: {
      gold: {
        category: 'game_info',
        key: 'gold',
        gameType: ['LOL'],
      },
    },
  },
  minions: {
    task: 'var_map',
    name: 'minions',
    events: null, 
    info: {
      minionKills: {
        category: 'game_info',
        key: 'minionKills',
        gameType: ['LOL', 'SWARM', 'BRAWL'],
      },
      neutralMinionKills: {
        category: 'game_info',
        key: 'neutralMinionKills',
        gameType: ['LOL', 'BRAWL'],
      },
    },
  },
  abilities: {
    task: 'abilities',
    name: 'abilities',
    events: {
      ability1: {
        name: 'ability',
        data: '1',
        gameType: ['LOL', 'SWARM', 'BRAWL'],
      },
      ability2: {
        name: 'ability',
        data: '2',
        gameType: ['LOL', 'SWARM', 'BRAWL'],
      },
      ability3: {
        name: 'ability',
        data: '3',
        gameType: ['LOL', 'SWARM', 'BRAWL'],
      },
      ability4: {
        name: 'ability',
        data: '4',
        gameType: ['LOL', 'SWARM', 'BRAWL'],
      },
      usedAbility1: {
        name: 'usedAbility',
        data: {
          type: '1',
        },
        gameType: ['LOL', 'SWARM', 'BRAWL'],
      },
      usedAbility2: {
        name: 'usedAbility',
        data: {
          type: '2',
        },
        gameType: ['LOL', 'SWARM', 'BRAWL'],
      },
      usedAbility3: {
        name: 'usedAbility',
        data: {
          type: '3',
        },
        gameType: ['LOL', 'SWARM', 'BRAWL'],
      },
      usedAbility4: {
        name: 'usedAbility',
        data: {
          type: '4',
        },
        gameType: ['LOL', 'SWARM', 'BRAWL'],
      },
      abilityReady1: {
        name: 'abilityReady',
        data: {
          type: '1',
        },
        gameType: ['LOL', 'SWARM', 'BRAWL'],
      },
      abilityReady2: {
        name: 'abilityReady',
        data: {
          type: '2',
        },
        gameType: ['LOL', 'SWARM', 'BRAWL'],
      },
      abilityReady3: {
        name: 'abilityReady',
        data: {
          type: '3',
        },
        gameType: ['LOL', 'SWARM', 'BRAWL'],
      },
      abilityReady4: {
        name: 'abilityReady',
        data: {
          type: '4',
        },
        gameType: ['LOL', 'SWARM', 'BRAWL'],
      },
    },
    info: {
      stack: {
        category: 'stack',
        key: 'stack',
        gameType: ['LOL'],
      },
    },
  },
  level: {
    task: 'lvl',
    name: 'level',
    info: {
      level: {
        category: 'level',
        key: 'level',
        gameType: ['LOL'],
      },
    },
  },
  jungle_camps: {
    name: 'jungle_camps',
    info: {
      jungle_camps: {
        category: 'jungle_camps',
        key: 'jungle_camps',  
        gameType: ['LOL', 'BRAWL'],
      },
    },
  },
  announcer: {
    task: 'announcer',
    name: 'announcer',
    events: {
      'c996dc8c0611f8ce18fe6ae7992ba2b8': {
        name: 'welcome_rift',
        data: null,
        gameType: ['LOL'],
      },
      'aaef65d9d6114f6fa37f2f97d266beff': {
        name: 'minions_30_sec',
        data: null,
        gameType: ['LOL'],
      },
      'ab316155ba03e3974fea7ba6e6b6e0eb': {
        name: 'minions_spawn',
        data: null,
        gameType: ['LOL'],
      },
      'debd3c24c0b17ca8e36864355758b8da': {
        name: 'first_blood',
        data: null,
        gameType: ['LOL'],
      },
      'e96126d56be357b7668aa5e747ee0977': {
        name: 'first_blood',
        data: null,
        gameType: ['LOL'],
      },
      '7c3665d00f64f6a3e4c4c55b001ec1ee': {
        name: 'first_blood',
        data: null,
        gameType: ['LOL'],
      },


      'b837eabd253f950cbb8d49ce28a291d6': {
        name: 'slain',
        data: 'team',
        gameType: ['LOL'],
      },
      '6d2140d48a34f5776a01005630cd3335': {
        name: 'self_slain',
        data: 'team',
        gameType: ['LOL'],
      },
      '2bfb710cffd89e3e2a6e873e65209452': {
        name: 'killing_spree',
        data: 'team',
        gameType: ['LOL'],
      },
      '6bdd6946a83307c84862179f1e5ae0dc': {
        name: 'rampage',
        data: 'team',
        gameType: ['LOL'],
      },
      'e4f10baa763625c91ecd778e42a39793': {
        name: 'unstoppable',
        data: 'team',
        gameType: ['LOL'],
      },
      '8b3e3319ef5446fe32d7cee489a42c05': {
        name: 'dominating',
        data: 'team',
        gameType: ['LOL'],
      },
      '7bf618bf1b7e7513be604a5e0ddc66fa': {
        name: 'godlike',
        data: 'team',
        gameType: ['LOL'],
      },
      '244d39c90afb3e4d4de9e7f6ae70cc7b': {
        name: 'legendary',
        data: 'team',
        gameType: ['LOL'],
      },
      '8d97bf3d510efd1c27062cfe108dfcc0': {
        name: 'double_kill',
        data: 'team',
        gameType: ['LOL'],
      },
      '452e018e45bab4a063f9a52af34a5527': {
        name: 'triple_kill',
        data: 'team',
        gameType: ['LOL'],
      },
      'b1dd281a38afe032aeb98aec68e494c5': {
        name: 'quadra_kill',
        data: 'team',
        gameType: ['LOL'],
      },
      '4e47b9128380ea164679547f1ea6235e': {
        name: 'penta_kill',
        data: 'team',
        gameType: ['LOL'],
      },
      'be81b84b3e4284d4b17a09784ad0d769': {
        name: 'slain',
        data: 'enemy',
        gameType: ['LOL'],
      },
      'd35c9c9e36dbca12bb7273940fd256aa': {
        name: 'slain_self',
        data: 'enemy',
        gameType: ['LOL'],
      },
      '2cfc19f1f7489dc8b37eeb81bc6d6da3': {
        name: 'killing_spree',
        data: 'enemy',
        gameType: ['LOL'],
      },
      'b652a8bfd02b9fdf8e8f4c35de3f5d62': {
        name: 'rampage',
        data: 'enemy',
        gameType: ['LOL'],
      },
      'acf45391c75349794de90c68d58fe972': {
        name: 'unstoppable',
        data: 'enemy',
        gameType: ['LOL'],
      },
      'b98cb4946346ed0377d42168fd2efad6': {
        name: 'dominating',
        data: 'enemy',
        gameType: ['LOL'],
      },
      'a8fe03d02450abf14733c85194392f61': {
        name: 'godlike',
        data: 'enemy',
        gameType: ['LOL'],
      },
      '500e88d8df500a53499504568504648f': {
        name: 'legendary',
        data: 'enemy',
        gameType: ['LOL'],
      },
      'cc7fc67edbf0005b655c800bbc7c0005': {
        name: 'double_kill',
        data: 'enemy',
        gameType: ['LOL'],
      },
      'b5978091df33a598a59847476f13b1a2': {
        name: 'triple_kill',
        data: 'enemy',
        gameType: ['LOL'],
      },
      '01988577b40fb8da05bc42566c94aebf': {
        name: 'quadra_kill',
        data: 'enemy',
        gameType: ['LOL'],
      },
      '1d1cbcea472897218768098b04dafd24': {
        name: 'penta_kill',
        data: 'enemy',
        gameType: ['LOL'],
      },
      '425e95eaeda27e6e0e8682f26ce212b3': {
        name: 'executed',
        data: 'minion',
        gameType: ['LOL'],
      },
      '8592a5346c5f88c34a3fad86c065c083': {
        name: 'executed',
        data: 'turret',
        gameType: ['LOL'],
      },
      '41965303a8ae31be999468cc6557a0b9': {
        name: 'shutdown',
        data: null,
        gameType: ['LOL'],
      },
      '6040233c2815c6679b61ccaa10f607f0': {
        name: 'shutdown',
        data: null,
        gameType: ['LOL'],
      },
      '5fefc36241a90401e6211d20a767d4f0': {
        name: 'ace',
        data: null,
        gameType: ['LOL'],
      },
      'f3025f4d56c3245504de5a3ced5962f8': {
        name: 'ace',
        data: null,
        gameType: ['LOL'],
      },

      '43f108ee5fc2f950d340fffd7c542ad5': {
        name: 'turret_destroy',
        data: 'team',
        gameType: ['LOL'],
      },
      '500dc70117d77b6caafc0a14aaf88085': {
        name: 'turret_destroy',
        data: 'enemy',
        gameType: ['LOL'],
      },
      '2c0fd58b6660739f1691e60bfda87719': {
        name: 'inhibitor_destroy',
        data: 'team',
        gameType: ['LOL'],
      },
      '08c278cee3ac00a5b64312dde114cd9c': {
        name: 'inhibitor_respawn',
        data: 'team',
        gameType: ['LOL', 'BRAWL'],
      },
      '9ab5c372ebab7f2a292c47645fca0539': {
        name: 'turret_destroy',
        data: 'enemy',
        gameType: ['LOL'],
      },
      '26239b6e3fe97d7619697de92a845bb1': {
        name: 'turret_destroy',
        data: 'team',
        gameType: ['LOL'],
      },
      '850f26b5cc3caef2836a929c8641a999': {
        name: 'inhibitor_destroy',
        data: 'enemy',
        gameType: ['LOL'],
      },
      '375a4218466626551722e71371f274e0': {
        name: 'inhibitor_respawn',
        data: 'enemy',
        gameType: ['LOL'],
      },
      '8a91656d7f1dce9b2ac44c70ddb7a924': {
        name: 'defeat',
        data: null,
        gameType: ['LOL'],
      },
      '510a987ca4334c30a1aad211eacf9ebc': {
        name: 'victory',
        data: null,
        gameType: ['LOL'],
      },
      '86adc7b8f25eba68771d5b6c2aad0b9b': {
        name: 'killing_spree',
        data: 'red',
        gameType: ['LOL'],
      },
      '22093d1de344944e86b8e300f689298c': {
        name: 'rampage',
        data: 'red',
        gameType: ['LOL'],
      },
      '917074a490287bb759b114054fa2b7e9': {
        name: 'unstoppable',
        data: 'red',
        gameType: ['LOL'],
      },
      '5cb24807a5311415e0844a4519006034': {
        name: 'dominating',
        data: 'red',
        gameType: ['LOL'],
      },
      '3acd82e1c31da35012d8e0fe85c87496': {
        name: 'godlike',
        data: 'red',
        gameType: ['LOL'],
      },
      '9d8fda3b4df03c656b9e416ff80e3ca5': {
        name: 'legendary',
        data: 'red',
        gameType: ['LOL'],
      },
      '1c7f9ffa2313ad860e405623c8d61ad9': {
        name: 'double_kill',
        data: 'red',
        gameType: ['LOL'],
      },
      'b8294c614e6048ff7276114360b6491a': {
        name: 'triple_kill',
        data: 'red',
        gameType: ['LOL'],
      },
      'c8794610029fbf3905b0c22913613462': {
        name: 'quadra_kill',
        data: 'red',
        gameType: ['LOL'],
      },
      'e15046cd4a2b8a46aae3f0429e881599': {
        name: 'penta_kill',
        data: 'red',
        gameType: ['LOL'],
      },
      'e46ebd61dc5a65078b6037d864630881': {
        name: 'turret_destroy',
        data: 'red',
        gameType: ['LOL'],
      },
      'd8c1fe750b8f26f1e75fc30f8727d25f': {
        name: 'inhibitor_destroy',
        data: 'red',
        gameType: ['LOL'],
      },
      '6a79639dfbebdd7bb42bc8b2b028c913': {
        name: 'inhibitor_respawn',
        data: 'red',
        gameType: ['LOL'],
      },
      '67c2af85c61d7089e327c66e83796dad': {
        name: 'killing_spree',
        data: 'blue',
        gameType: ['LOL'],
      },
      '71b538a038d0f2b7603c5970aec1047a': {
        name: 'rampage',
        data: 'blue',
        gameType: ['LOL'],
      },
      '7fd968d00b3d47ef82ba0b9214acc01c': {
        name: 'unstoppable',
        data: 'blue',
        gameType: ['LOL'],
      },
      'e38b643fd022a3806d968179ee2f35e9': {
        name: 'dominating',
        data: 'blue',
        gameType: ['LOL'],
      },
      '4a984f19f6d10cb9a022a786c05b83ed': {
        name: 'godlike',
        data: 'blue',
        gameType: ['LOL'],
      },
      'da522c92c1dc6792be58c70cc64eb850': {
        name: 'legendary',
        data: 'blue',
        gameType: ['LOL'],
      },
      'e8ce2a21f6f037c99b0b785b65a98ad4': {
        name: 'double_kill',
        data: 'blue',
        gameType: ['LOL'],
      },
      'efbb1c030fb28760d81d03210415301e': {
        name: 'quadra_kill',
        data: 'blue',
        gameType: ['LOL'],
      },
      '4d229dc098b85070630716148f596488': {
        name: 'penta_kill',
        data: 'blue',
        gameType: ['LOL'],
      },
      'd9a43e5bfa917e779bfbe826fb7739e2': {
        name: 'turret_destroy',
        data: 'blue',
        gameType: ['LOL'],
      },
      'dcc564cd39b57685f876c4a0175c5477': {
        name: 'inhibitor_destroy',
        data: 'blue',
        gameType: ['LOL'],
      },
      '1a56bbf1d62b103b6228a42b4ff996b8': {
        name: 'inhibitor_respawn',
        data: 'blue',
        gameType: ['LOL'],
      },
    },
  },
  death: {
    task: 'var_map',
    name: 'death',
    events: {
      death: {
        name: 'death',
        data: null,
        gameType: ['LOL', 'SWARM', 'BRAWL'],
      },
    },
    info: {
      deaths: {
        category: 'game_info',
        key: 'deaths',
        gameType: ['LOL', 'BRAWL'],
      },
    },
  },
  respawn: {
    task: 'objectmanager',
    name: 'respawn',
    events: {
      respawn: {
        name: 'respawn',
        data: null,
        gameType: ['LOL'],
      },
    },
  },
  deathAndRespawn: {
    task: 'var_map',
    name: 'deathAndRespawn',
    events: {
      death: {
        name: 'death',
        data: null,
        gameType: ['LOL'],
      },
      respawn: {
        name: 'respawn',
        data: null,
        gameType: ['LOL'],
      },
    },
    info: {
      deaths: {
        category: 'game_info',
        key: 'deaths',
        gameType: ['LOL', 'SWARM'],
      },
    },
  },
  minion: {
    task: 'var_map',
    name: 'minion',
    events: null, 
    info: {
      minions_kills: {
        category: 'game_info',
        key: 'minions_kills',
        gameType: ['LOL'],
      },
      neutral_minion_kills: {
        category: 'game_info',
        key: 'neutral_minion_kills',
        gameType: ['LOL'],
      },
    },
  },
  match: {
    name: 'match',
    events: {
      matchStart: {
        name: 'match',
        data: 'match_start',
        gameType: ['LOL', 'BRAWL'],
      },
      matchEnd: {
        name: 'match',
        data: 'match_end',
        gameType: ['NA'],
      },
    },
    info: {
      match_started: {
        category: 'game_info',
        key: 'match_started',
      },
    },
  },
  game_mode: {
    task: 'game_modes',
    name: 'game_mode',
    info: {
      game_mode: {
        category: 'game_info',
        key: 'game_mode',
      },
    },
  },
  heal: {
    name: 'heal',
    info: {
      total_heal: {
        category: 'heal',
        key: 'total_heal',
        gameType: ['LOL', 'BRAWL'],
      },
      total_heal_on_teammates: {
        category: 'heal',
        key: 'total_heal_on_teammates',
        gameType: ['LOL', 'BRAWL'],
      },
      total_units_healed: {
        category: 'heal',
        key: 'total_units_healed',
        gameType: ['LOL', 'BRAWL'],
      },
    },
  },
  damage: {
    name: 'damage',
    events: {
      physical_damage_dealt_player: {
        name: 'physical_damage_dealt_player',
        data: null,
        gameType: ['LOL', 'ARENA', 'SWARM', 'BRAWL'],
      },
      magic_damage_dealt_player: {
        name: 'magic_damage_dealt_player',
        data: null,
        gameType: ['LOL', 'ARENA', 'SWARM', 'BRAWL'],
      },
      true_damage_dealt_player: {
        name: 'true_damage_dealt_player',
        data: null,
        gameType: ['LOL', 'ARENA', 'SWARM', 'BRAWL'],
      },
      physical_damage_dealt_to_champions: {
        name: 'physical_damage_dealt_to_champions',
        data: null,
        gameType: ['LOL', 'ARENA', 'BRAWL'],
      },
      magic_damage_dealt_to_champions: {
        name: 'magic_damage_dealt_to_champions',
        data: null,
        gameType: ['LOL', 'ARENA', 'BRAWL'],
      },
      true_damage_dealt_to_champions: {
        name: 'true_damage_dealt_to_champions',
        data: null,
        gameType: ['LOL', 'ARENA', 'BRAWL'],
      },
      physical_damage_taken: {
        name: 'physical_damage_taken',
        data: null,
        gameType: ['LOL', 'ARENA', 'SWARM', 'BRAWL'],
      },
      magic_damage_taken: {
        name: 'magic_damage_taken',
        data: null,
        gameType: ['LOL', 'ARENA', 'BRAWL'],
      },
      true_damage_taken: {
        name: 'true_damage_taken',
        data: null,
        gameType: ['LOL', 'ARENA', 'BRAWL'],
      },
    },
    info: {
      total_damage_dealt: {
        category: 'damage',
        key: 'total_damage_dealt',
        gameType: ['LOL', 'ARENA', 'SWARM', 'BRAWL'],
      },
      total_damage_dealt_to_champions: {
        category: 'damage',
        key: 'total_damage_dealt_to_champions',
        gameType: ['LOL', 'ARENA', 'BRAWL'],
      },
      total_damage_taken: {
        category: 'damage',
        key: 'total_damage_taken',
        gameType: ['LOL', 'ARENA', 'SWARM', 'BRAWL'],
      },
      total_damage_dealt_to_buildings: {
        category: 'damage',
        key: 'total_damage_dealt_to_buildings',
        gameType: ['LOL', 'BRAWL'],
      },
      total_damage_dealt_to_turrets: {
        category: 'damage',
        key: 'total_damage_dealt_to_turrets',
        gameType: ['LOL', 'BRAWL'],
      },
      total_damage_dealt_to_objectives: {
        category: 'damage',
        key: 'total_damage_dealt_to_objectives',
        gameType: ['LOL', 'BRAWL'],
      },
      total_damage_self_mitigated: {
        category: 'damage',
        key: 'total_damage_self_mitigated',
        gameType: ['LOL', 'BRAWL'],
      },
    },
  },
  counters: {
    name: 'counters',
    events: {
      match_clock: {
        name: 'match_clock',
        data: null,
        gameType: ['LOL', 'SWARM'],
      },
    },
    info: {
      ping: {
        category: 'performance',
        key: 'ping',
        gameType: ['LOL', 'BRAWL'],
      },
    },
  },
  match_info: {
    name: 'match_info',
    events: {
      round_start: {
        name: 'round_start',
        data: null,
        gameType: ['TFT'],
      },
      round_end: {
        name: 'round_end',
        data: null,
        gameType: ['TFT'],
      },
      battle_start: {
        name: 'battle_start',
        data: null,
        gameType: ['TFT'],
      },
      battle_end: {
        name: 'battle_end',
        data: null,
        gameType: ['TFT'],
      },
      match_start: {
        name: 'match_start',
        data: null,
        gameType: ['TFT'],
      },
      match_end: {
        name: 'match_end',
        data: null,
        gameType: ['TFT'],
      },
      match_pause: {
        name: 'match_pause',
        data: null,
        gameType: ['NA'],
      },
      match_resume: {
        name: 'match_resume',
        data: null,
        gameType: ['NA'],
      },
      chat: {
        name: 'chat',
        data: null,
        gameType: ['LOL', 'SWARM'],
      },
      round_outcome: {
        name: 'round_outcome',
        data: null,
        gameType: ['ARENA'],
      },
      picked_item: {
        name: 'picked_item',
        data: null,
        gameType: ['TFT'],
      },
    },
    info: {
      pseudo_match_id: {
        category: 'match_info',
        key: 'pseudo_match_id',
        gameType: ['LOL'],
      },
      game_mode: {
        category: 'match_info',
        key: 'game_mode',
      },
      match_paused: {
        category: 'match_info',
        key: 'match_paused',
        gameType: ['NA'],
      },
      battle_state: {
        category: 'match_info',
        key: 'battle_state',
        gameType: ['TFT'],
      },
      match_state: {
        category: 'match_info',
        key: 'match_state',
        gameType: ['TFT'],
      },
      round_type: {
        category: 'match_info',
        key: 'round_type',
        gameType: ['TFT'],
      },
      round_number: {
        category: 'match_info',
        key: 'round_number',
        gameType: ['ARENA'],
      },
      round_outcome: {
        category: 'match_info',
        key: 'round_outcome',
        gameType: ['TFT'],
      },
      opponent: {
        category: 'match_info',
        key: 'opponent',
        gameType: ['TFT'],
      },
      local_player_damage: {
        category: 'match_info',
        key: 'local_player_damage',
        gameType: ['TFT'],
      },
      is_pbe: {
        category: 'game_info',
        key: 'is_pbe',
        gameType: ['TFT'],
      },
      match_outcome: {
        category: 'match_info',
        key: 'match_outcome',
        gameType: ['ARENA'],
      },
      players_tagline: {
        category: 'match_info',
        key: 'players_tagline',
      },
      item_select: {
        category: 'match_info',
        key: 'item_select',
        gameType: ['TFT'],
      },
    },
  },
  me: {
    name: 'me',
    info: {
      summoner_name: {
        category: 'me',
        key: 'summoner_name',
        gameType: ['TFT'],
      },
      xp: {
        category: 'me',
        key: 'xp',
        gameType: ['TFT'],
      },
      health: {
        category: 'me',
        key: 'health',
        gameType: ['TFT'],
      },
      rank: {
        category: 'me',
        key: 'rank',
        gameType: ['TFT'],
      },
      gold: {
        category: 'me',
        key: 'gold',
        gameType: ['TFT'],
      },
    },
  },
  roster: {
    name: 'roster',
    info: {
      player_status: {
        category: 'roster',
        key: 'player_status',
        gameType: ['TFT'],
      },
    },
  },
  store: {
    name: 'store',
    info: {
      shop_pieces: {
        category: 'store',
        key: 'shop_pieces',
        gameType: ['TFT'],
      },
    },
  },
  board: {
    name: 'board',
    info: {
      board_pieces: {
        category: 'board',
        key: 'board_pieces',
        gameType: ['TFT'],
      },
    },
  },
  bench: {
    name: 'bench',
    info: {
      bench_pieces: {
        category: 'bench',
        key: 'bench_pieces',
        gameType: ['TFT'],
      },
    },
  },
  carousel: {
    name: 'carousel',
    info: {
      carousel_pieces: {
        category: 'carousel',
        key: 'carousel_pieces',
        gameType: ['TFT'],
      },
    },
  },
  live_client_data: {
    name: 'live_client_data',
    info: {
      active_player: {
        category: 'live_client_data',
        key: 'active_player',
      },
      all_players: {
        category: 'live_client_data',
        key: 'all_players',
      },
      events: {
        category: 'live_client_data',
        key: 'events',
      },
      game_data: {
        category: 'live_client_data',
        key: 'game_data',
      },
      port: {
        category: 'live_client_data',
        key: 'port',
      },
    },
  }
});