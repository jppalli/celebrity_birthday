define({
  "pseudo_match_id": {
		triggers: [
			{
				change:{"map.matchid": 'notEquals'},
				provide_info: { "match_id": 'map.matchid' }
			}
		]
	},
  "autochess_match_start": {
    triggers: [
      {
        added: ['map.game_state'],
        where: {
          'map.customgamename': function (newVal, oldVal) {
            return newVal ? newVal.endsWith("1613886175.vpk") : false;
          },
          'map.game_state': function (newVal, oldVal) {
            return newVal === 'DOTA_GAMERULES_STATE_GAME_IN_PROGRESS';
          }
        }
      },
      {
        change: {'map.game_state': 'any'},
        where: {
          'map.customgamename': function (newVal, oldVal) {
            return newVal ? newVal.endsWith("1613886175.vpk") : false;
          },
          'map.game_state': function (newVal, oldVal) {
            return newVal === 'DOTA_GAMERULES_STATE_GAME_IN_PROGRESS';
          }
        }
      }
    ]
  },
  "autochess_match_end": {
    triggers: [
      {
        removed: ['map.customgamename'],
        where: {
          'map.customgamename': function (newVal, oldVal) {
            return oldVal ? oldVal.endsWith("1613886175.vpk") : false;
          }
        }
      }
    ]
  },
  "autochess_loading": {
    triggers: [
      {
        added: ['map.game_state'],
        where: {
          'map.game_state': function (newVal, oldVal) {
            return newVal === 'DOTA_GAMERULES_STATE_WAIT_FOR_PLAYERS_TO_LOAD';
          }
        }
      }
    ]
  },
  "autochess_preparation_start": {
    triggers: [
      {
        change: {'map.daytime': 'any'},
        where: {
          'map.customgamename': function (newVal, oldVal) {
            return newVal ? newVal.endsWith("1613886175.vpk") : false;
          },
          'map.daytime': function (newVal, oldVal) {
            return newVal === false;
          }
        }
      }
    ]
  },
  "autochess_preparation_end": {
    triggers: [
      {
        change: {'map.daytime': 'any'},
        where: {
          'map.customgamename': function (newVal, oldVal) {
            return newVal ? newVal.endsWith("1613886175.vpk") : false;
          },
          'map.daytime': function (newVal, oldVal) {
            return newVal === true;
          }
        }
      }
    ]
  },
	"game_state_changed": {
		triggers: [
			{
				added: ['player.steamid'],
				provide_info: {
					"game_state": {'value': 'playing'},
					"match_state": 'map.game_state',
					"match_id": 'map.matchid',
					"player_steam_id": 'player.steamid',
          "player_team": "player.team_name"
				}
			},
			{
				removed: ['map.name'],
				provide_info: {
					"game_state": {'value': 'idle'},
					"match_state": 'map.game_state',
					"match_id": 'map.matchid',
					"player_steam_id": 'player.steamid',
          "player_team": "player.team_name"
				}
			},
			{
				added: ['map.radiant_ward_purchase_cooldown'],
				provide_info: {
					"game_state": {'value': 'spectating'},
					"match_state": 'map.game_state'
				}
			}
		]
	},
	"match_state_changed": {
		triggers: [
			{
				change:{"map.game_state": 'any'},
				provide_info: { "match_state" : 'map.game_state' }
			}
		]
	},
	"daytime_changed": {
		triggers: [
			{
				change: {"map.daytime": "any"},
				where: {
					"map.game_state": function (newVal, oldVal) {
						return newVal == "DOTA_GAMERULES_STATE_GAME_IN_PROGRESS" || newVal == "DOTA_GAMERULES_STATE_PRE_GAME"
					}
				},
				provide_info: {
					"daytime": 'map.daytime',
					"clock_time": 'map.clock_time',
					"nightstalker_night" : 'map.nightstalker_night'
				}
			}
		]
	},
	"clock_time_changed": {
		triggers: [
			{
				change: {"map.clock_time": "any"},
				where: {
					"map.game_state": function (newVal, oldVal) {
						return newVal == "DOTA_GAMERULES_STATE_GAME_IN_PROGRESS" || newVal == "DOTA_GAMERULES_STATE_PRE_GAME"
					}
				},
				provide_info: {
					"daytime": 'map.daytime',
					"clock_time": 'map.clock_time',
					"nightstalker_night" : 'map.nightstalker_night'
				}
			}
		]
	},
	"ward_purchase_cooldown_changed": {
		triggers: [
			{
				change: {"map.ward_purchase_cooldown": "any"},
				provide_info: {
					"ward_purchase_cooldown": 'map.ward_purchase_cooldown'
				}
			}
		]
	},
	"match_ended": {
		triggers: [
			{
				change: {"map.win_team": "any"},
				provide_info: { "winner": 'map.win_team' }
			}
		]
	},
	"kill": {
		triggers: [
			{
				change: {"player.kills": "greater"},
				provide_info: {
					"kills": 'player.kills',
					"kill_streak": 'player.kill_streak'
				}
			}
		]
	},
	"assist": {
		triggers: [
			{
				change: {"player.assists": "greater"},
				provide_info: { "assists" : 'player.assists' }
			}
		]
	},
	"death": {
		triggers: [
			{
				change: {"player.deaths": "greater"},
				provide_info: { "deaths" : 'player.deaths' }
			}
		]
	},
	"cs": {
		triggers: [
			{
				change: {"player.last_hits": "greater"},
				provide_info: {
					"last_hits": 'player.last_hits',
					"denies": 'player.denies',
					"type": {'value': 'last_hit'}
				}
			},
			{
				change: {"player.denies": "greater"},
				provide_info: {
					"last_hits": 'player.last_hits',
					"denies": 'player.denies',
					"type": {'value': 'deny'}
				}
			}
		]
	},
	"xpm": {
		triggers: [
			{
				change: {"player.xpm": "any"},
				provide_info: { "xpm" : 'player.xpm' }
			}
		]
	},
	"gpm": {
		triggers: [
			{
				change: {"player.gpm": "any"},
				provide_info: { "gpm" : 'player.gpm' }
			}
		]
	},
	"gold": {
		triggers: [
			{
				change: {"player.gold": "any"},
				provide_info: {
					"gold": 'player.gold',
					"gold_reliable": 'player.gold_reliable',
					"gold_unreliable": 'player.gold_unreliable'
				}
			}
		]
	},
	"hero_selected": {
    triggers: [
      {
        added: ["hero.id"],
        change: {"hero.id": "any"},
        provide_info: {
          "hero_selected": "hero.id"
        }
      }
    ]
  },
	"hero_leveled_up": {
		triggers: [
			{
				change: {"hero.level": "greater"},
				where: {'hero.level': {'greater':1}},
				provide_info: { "hero_level" : 'hero.level' }
			}
		]
	},
	"hero_respawned": {
		triggers: [
			{
				change: {
					'hero.alive': {to: true}
				},
				where: {'player.deaths': {'greater':0}}
			}
		]
	},
	"hero_buyback_info_changed": {
		triggers: [
			{
				change: {"hero.buyback_cost": "any"},
				provide_info: {
					"buyback_cost": 'hero.buyback_cost',
					"buyback_cooldown": 'hero.buyback_cooldown'
				}
			},
			{
				change: {"hero.buyback_cooldown": "any"},
				provide_info: {
					"buyback_cost": 'hero.buyback_cost',
					"buyback_cooldown": 'hero.buyback_cooldown',
				}
			}
		]
	},
	"hero_boughtback": {
		triggers: [
			{
				change: {
					'hero.buyback_cooldown': {from: 0}
				},
				where: {
					"map.game_state": function (newVal, oldVal) {
						return newVal == "DOTA_GAMERULES_STATE_GAME_IN_PROGRESS" || newVal == "DOTA_GAMERULES_STATE_PRE_GAME"
					}
				}
			}
		]
	},
	"hero_health_mana_info": {
		triggers: [
			{
				change: {"hero.health": "any"},
				provide_info: {
					"health": 'hero.health',
					"max_health": 'hero.max_health',
					"mana": 'hero.mana',
					"max_mana": 'hero.max_mana'
				}
			},
			{
				change: {"hero.mana": "any"},
				provide_info: {
					"health": 'hero.health',
					"max_health": 'hero.max_health',
					"mana": 'hero.mana',
					"max_mana": 'hero.max_mana'
				}
			},
			{
				change: {"hero.max_mana": "any"},
				provide_info: {
					"health": 'hero.health',
					"max_health": 'hero.max_health',
					"mana": 'hero.mana',
					"max_mana": 'hero.max_mana'
				}
			},
			{
				change: {"hero.max_health": "any"},
				provide_info: {
					"health": 'hero.health',
					"max_health": 'hero.max_health',
					"mana": 'hero.mana',
					"max_mana": 'hero.max_mana'
				}
			}
		]
	},
	"hero_status_effect_changed": {
		triggers: [
			{
				change: {"hero.silenced": "any"},
				provide_info: {
					"silenced": 'hero.silenced',
					"stunned": 'hero.stunned',
					"disarmed": 'hero.disarmed',
					"magicimmune": 'hero.magicimmune',
					"hexed": 'hero.hexed',
					"muted": 'hero.muted',
					"break": 'hero.break',
					"has_debuff": 'hero.has_debuff'
				}
			},			{
				change: {"hero.stunned": "any"},
				provide_info: {
					"silenced": 'hero.silenced',
					"stunned": 'hero.stunned',
					"disarmed": 'hero.disarmed',
					"magicimmune": 'hero.magicimmune',
					"hexed": 'hero.hexed',
					"muted": 'hero.muted',
					"break": 'hero.break',
					"has_debuff": 'hero.has_debuff'
				}
			},			{
				change: {"hero.disarmed": "any"},
				provide_info: {
					"silenced": 'hero.silenced',
					"stunned": 'hero.stunned',
					"disarmed": 'hero.disarmed',
					"magicimmune": 'hero.magicimmune',
					"hexed": 'hero.hexed',
					"muted": 'hero.muted',
					"break": 'hero.break',
					"has_debuff": 'hero.has_debuff'
				}
			},			{
				change: {"hero.magicimmune": "any"},
				provide_info: {
					"silenced": 'hero.silenced',
					"stunned": 'hero.stunned',
					"disarmed": 'hero.disarmed',
					"magicimmune": 'hero.magicimmune',
					"hexed": 'hero.hexed',
					"muted": 'hero.muted',
					"break": 'hero.break',
					"has_debuff": 'hero.has_debuff'
				}
			},			{
				change: {"hero.hexed": "any"},
				provide_info: {
					"silenced": 'hero.silenced',
					"stunned": 'hero.stunned',
					"disarmed": 'hero.disarmed',
					"magicimmune": 'hero.magicimmune',
					"hexed": 'hero.hexed',
					"muted": 'hero.muted',
					"break": 'hero.break',
					"has_debuff": 'hero.has_debuff'
				}
			},			{
				change: {"hero.muted": "any"},
				provide_info: {
					"silenced": 'hero.silenced',
					"stunned": 'hero.stunned',
					"disarmed": 'hero.disarmed',
					"magicimmune": 'hero.magicimmune',
					"hexed": 'hero.hexed',
					"muted": 'hero.muted',
					"break": 'hero.break',
					"has_debuff": 'hero.has_debuff'
				}
			},			{
				change: {"hero.break": "any"},
				provide_info: {
					"silenced": 'hero.silenced',
					"stunned": 'hero.stunned',
					"disarmed": 'hero.disarmed',
					"magicimmune": 'hero.magicimmune',
					"hexed": 'hero.hexed',
					"muted": 'hero.muted',
					"break": 'hero.break',
					"has_debuff": 'hero.has_debuff'
				}
			},			{
				change: {"hero.has_debuff": "any"},
				provide_info: {
					"silenced": 'hero.silenced',
					"stunned": 'hero.stunned',
					"disarmed": 'hero.disarmed',
					"magicimmune": 'hero.magicimmune',
					"hexed": 'hero.hexed',
					"muted": 'hero.muted',
					"break": 'hero.break',
					"has_debuff": 'hero.has_debuff'
				}
			}
		]
	},
	"hero_attributes_skilled": {
		triggers: [
			{
				change: {"hero.attributes_level": "greater"},
				provide_info: {"attributes_level": 'hero.attributes_level'}
			}
		]
	},
	"hero_ability_skilled": {
		triggers: [
			{
				change: {"abilities.ability0.level": "greater"},
				same: ['abilities.ability0.name'],
				provide_info: {
					"slot": {'value':0},
					"name": 'abilities.ability0.name',
					"level": 'abilities.ability0.level',
					"can_cast": 'abilities.ability0.can_cast',
					"passive": 'abilities.ability0.passive',
					"ability_active": 'abilities.ability0.ability_active',
					"cooldown": 'abilities.ability0.cooldown',
					"ultimate": 'abilities.ability0.ultimate'
				}
			},
			{
				change: {"abilities.ability1.level": "greater"},
				same: ['abilities.ability1.name'],
				provide_info: {
					"slot": {'value':1},
					"name": 'abilities.ability1.name',
					"level": 'abilities.ability1.level',
					"can_cast": 'abilities.ability1.can_cast',
					"passive": 'abilities.ability1.passive',
					"ability_active": 'abilities.ability1.ability_active',
					"cooldown": 'abilities.ability1.cooldown',
					"ultimate": 'abilities.ability1.ultimate'
				}
			},
			{
				change: {"abilities.ability2.level": "greater"},
				same: ['abilities.ability2.name'],
				provide_info: {
					"slot": {'value':2},
					"name": 'abilities.ability2.name',
					"level": 'abilities.ability2.level',
					"can_cast": 'abilities.ability2.can_cast',
					"passive": 'abilities.ability2.passive',
					"ability_active": 'abilities.ability2.ability_active',
					"cooldown": 'abilities.ability2.cooldown',
					"ultimate": 'abilities.ability2.ultimate'
				}
			},
			{
				change: {"abilities.ability3.level": "greater"},
				same: ['abilities.ability3.name'],
				provide_info: {
					"slot": {'value':3},
					"name": 'abilities.ability3.name',
					"level": 'abilities.ability3.level',
					"can_cast": 'abilities.ability3.can_cast',
					"passive": 'abilities.ability3.passive',
					"ability_active": 'abilities.ability3.ability_active',
					"cooldown": 'abilities.ability3.cooldown',
					"ultimate": 'abilities.ability3.ultimate'
				}
			},
			{
				change: {"abilities.ability4.level": "greater"},
				same: ['abilities.ability4.name'],
				provide_info: {
					"slot": {'value':4},
					"name": 'abilities.ability4.name',
					"level": 'abilities.ability4.level',
					"can_cast": 'abilities.ability4.can_cast',
					"passive": 'abilities.ability4.passive',
					"ability_active": 'abilities.ability4.ability_active',
					"cooldown": 'abilities.ability4.cooldown',
					"ultimate": 'abilities.ability4.ultimate'
				}
			},
			{
				change: {"abilities.ability5.level": "greater"},
				same: ['abilities.ability5.name'],
				provide_info: {
					"slot": {'value':5},
					"name": 'abilities.ability5.name',
					"level": 'abilities.ability5.level',
					"can_cast": 'abilities.ability5.can_cast',
					"passive": 'abilities.ability5.passive',
					"ability_active": 'abilities.ability5.ability_active',
					"cooldown": 'abilities.ability5.cooldown',
					"ultimate": 'abilities.ability5.ultimate'
				}
			}
		]
	},
	"hero_ability_used": {
		triggers: [
			{
				change: {
					'abilities.ability0.can_cast': {from: true}
				},
				where: {
					"map.game_state": function (newVal, oldVal) {
						return newVal == "DOTA_GAMERULES_STATE_GAME_IN_PROGRESS" || newVal == "DOTA_GAMERULES_STATE_PRE_GAME"
					}
				},
				provide_info: {
					"slot": {'value':0},
					"name": 'abilities.ability0.name',
					"level": 'abilities.ability0.level',
					"can_cast": 'abilities.ability0.can_cast',
					"passive": 'abilities.ability0.passive',
					"ability_active": 'abilities.ability0.ability_active',
					"cooldown": 'abilities.ability0.cooldown',
					"ultimate": 'abilities.ability0.ultimate'
				}
			},
			{
				change: {
					'abilities.ability1.can_cast': {from: true}
				},
				where: {
					"map.game_state": function (newVal, oldVal) {
						return newVal == "DOTA_GAMERULES_STATE_GAME_IN_PROGRESS" || newVal == "DOTA_GAMERULES_STATE_PRE_GAME"
					}
				},
				provide_info: {
					"slot": {'value':1},
					"name": 'abilities.ability1.name',
					"level": 'abilities.ability1.level',
					"can_cast": 'abilities.ability1.can_cast',
					"passive": 'abilities.ability1.passive',
					"ability_active": 'abilities.ability1.ability_active',
					"cooldown": 'abilities.ability1.cooldown',
					"ultimate": 'abilities.ability1.ultimate'
				}
			},
			{
				change: {
					'abilities.ability2.can_cast': {from: true}
				},
				where: {
					"map.game_state": function (newVal, oldVal) {
						return newVal == "DOTA_GAMERULES_STATE_GAME_IN_PROGRESS" || newVal == "DOTA_GAMERULES_STATE_PRE_GAME"
					}
				},
				provide_info: {
					"slot": {'value':2},
					"name": 'abilities.ability2.name',
					"level": 'abilities.ability2.level',
					"can_cast": 'abilities.ability2.can_cast',
					"passive": 'abilities.ability2.passive',
					"ability_active": 'abilities.ability2.ability_active',
					"cooldown": 'abilities.ability2.cooldown',
					"ultimate": 'abilities.ability2.ultimate'
				}
			},
			{
				change: {
					'abilities.ability3.can_cast': {from: true}
				},
				where: {
					"map.game_state": function (newVal, oldVal) {
						return newVal == "DOTA_GAMERULES_STATE_GAME_IN_PROGRESS" || newVal == "DOTA_GAMERULES_STATE_PRE_GAME"
					}
				},
				provide_info: {
					"slot": {'value':3},
					"name": 'abilities.ability3.name',
					"level": 'abilities.ability3.level',
					"can_cast": 'abilities.ability3.can_cast',
					"passive": 'abilities.ability3.passive',
					"ability_active": 'abilities.ability3.ability_active',
					"cooldown": 'abilities.ability3.cooldown',
					"ultimate": 'abilities.ability3.ultimate'
				}
			},
			{
				change: {
					'abilities.ability4.can_cast': {from: true}
				},
				where: {
					"map.game_state": function (newVal, oldVal) {
						return newVal == "DOTA_GAMERULES_STATE_GAME_IN_PROGRESS" || newVal == "DOTA_GAMERULES_STATE_PRE_GAME"
					}
				},
				provide_info: {
					"slot": {'value':4},
					"name": 'abilities.ability4.name',
					"level": 'abilities.ability4.level',
					"can_cast": 'abilities.ability4.can_cast',
					"passive": 'abilities.ability4.passive',
					"ability_active": 'abilities.ability4.ability_active',
					"cooldown": 'abilities.ability4.cooldown',
					"ultimate": 'abilities.ability4.ultimate'
				}
			},
			{
				change: {
					'abilities.ability5.can_cast': {from: true}
				},
				where: {
					"map.game_state": function (newVal, oldVal) {
						return newVal == "DOTA_GAMERULES_STATE_GAME_IN_PROGRESS" || newVal == "DOTA_GAMERULES_STATE_PRE_GAME"
					}
				},
				provide_info: {
					"slot": {'value':5},
					"name": 'abilities.ability5.name',
					"level": 'abilities.ability5.level',
					"can_cast": 'abilities.ability5.can_cast',
					"passive": 'abilities.ability5.passive',
					"ability_active": 'abilities.ability5.ability_active',
					"cooldown": 'abilities.ability5.cooldown',
					"ultimate": 'abilities.ability5.ultimate'
				}
			}
		]
	},
	"hero_ability_cooldown_changed": {
		multiEvents : true,
		triggers: [
			{
				change: {"abilities.ability0.cooldown": "any"},
				provide_info: {
					"slot": {'value':0},
					"name": 'abilities.ability0.name',
					"level": 'abilities.ability0.level',
					"can_cast": 'abilities.ability0.can_cast',
					"passive": 'abilities.ability0.passive',
					"ability_active": 'abilities.ability0.ability_active',
					"cooldown": 'abilities.ability0.cooldown',
					"ultimate": 'abilities.ability0.ultimate'
				}
			},
			{
				change: {"abilities.ability1.cooldown": "any"},
				provide_info: {
					"slot": {'value':1},
					"name": 'abilities.ability1.name',
					"level": 'abilities.ability1.level',
					"can_cast": 'abilities.ability1.can_cast',
					"passive": 'abilities.ability1.passive',
					"ability_active": 'abilities.ability1.ability_active',
					"cooldown": 'abilities.ability1.cooldown',
					"ultimate": 'abilities.ability1.ultimate'
				}
			},
			{
				change: {"abilities.ability2.cooldown": "any"},
				provide_info: {
					"slot": {'value':2},
					"name": 'abilities.ability2.name',
					"level": 'abilities.ability2.level',
					"can_cast": 'abilities.ability2.can_cast',
					"passive": 'abilities.ability2.passive',
					"ability_active": 'abilities.ability2.ability_active',
					"cooldown": 'abilities.ability2.cooldown',
					"ultimate": 'abilities.ability2.ultimate'
				}
			},
			{
				change: {"abilities.ability3.cooldown": "any"},
				provide_info: {
					"slot": {'value':3},
					"name": 'abilities.ability3.name',
					"level": 'abilities.ability3.level',
					"can_cast": 'abilities.ability3.can_cast',
					"passive": 'abilities.ability3.passive',
					"ability_active": 'abilities.ability3.ability_active',
					"cooldown": 'abilities.ability3.cooldown',
					"ultimate": 'abilities.ability3.ultimate'
				}
			},
			{
				change: {"abilities.ability4.cooldown": "any"},
				provide_info: {
					"slot": {'value':4},
					"name": 'abilities.ability4.name',
					"level": 'abilities.ability4.level',
					"can_cast": 'abilities.ability4.can_cast',
					"passive": 'abilities.ability4.passive',
					"ability_active": 'abilities.ability4.ability_active',
					"cooldown": 'abilities.ability4.cooldown',
					"ultimate": 'abilities.ability4.ultimate'
				}
			},
			{
				change: {"abilities.ability5.cooldown": "any"},
				provide_info: {
					"slot": {'value':5},
					"name": 'abilities.ability5.name',
					"level": 'abilities.ability5.level',
					"can_cast": 'abilities.ability5.can_cast',
					"passive": 'abilities.ability5.passive',
					"ability_active": 'abilities.ability5.ability_active',
					"cooldown": 'abilities.ability5.cooldown',
					"ultimate": 'abilities.ability5.ultimate'
				}
			}
		]
	},
	"hero_ability_changed": {
		multiEvents : true,
		triggers: [
			{
				change: {"abilities.ability0.name": "any"},
				provide_info: {
					"slot": {'value':0},
					"name": 'abilities.ability0.name',
					"level": 'abilities.ability0.level',
					"can_cast": 'abilities.ability0.can_cast',
					"passive": 'abilities.ability0.passive',
					"ability_active": 'abilities.ability0.ability_active',
					"cooldown": 'abilities.ability0.cooldown',
					"ultimate": 'abilities.ability0.ultimate'
				}
			},
			{
				change: {"abilities.ability1.name": "any"},
				provide_info: {
					"slot": {'value':1},
					"name": 'abilities.ability1.name',
					"level": 'abilities.ability1.level',
					"can_cast": 'abilities.ability1.can_cast',
					"passive": 'abilities.ability1.passive',
					"ability_active": 'abilities.ability1.ability_active',
					"cooldown": 'abilities.ability1.cooldown',
					"ultimate": 'abilities.ability1.ultimate'
				}
			},
			{
				change: {"abilities.ability2.name": "any"},
				provide_info: {
					"slot": {'value':2},
					"name": 'abilities.ability2.name',
					"level": 'abilities.ability2.level',
					"can_cast": 'abilities.ability2.can_cast',
					"passive": 'abilities.ability2.passive',
					"ability_active": 'abilities.ability2.ability_active',
					"cooldown": 'abilities.ability2.cooldown',
					"ultimate": 'abilities.ability2.ultimate'
				}
			},
			{
				change: {"abilities.ability3.name": "any"},
				provide_info: {
					"slot": {'value':3},
					"name": 'abilities.ability3.name',
					"level": 'abilities.ability3.level',
					"can_cast": 'abilities.ability3.can_cast',
					"passive": 'abilities.ability3.passive',
					"ability_active": 'abilities.ability3.ability_active',
					"cooldown": 'abilities.ability3.cooldown',
					"ultimate": 'abilities.ability3.ultimate'
				}
			},
			{
				change: {"abilities.ability4.name": "any"},
				provide_info: {
					"slot": {'value':4},
					"name": 'abilities.ability4.name',
					"level": 'abilities.ability4.level',
					"can_cast": 'abilities.ability4.can_cast',
					"passive": 'abilities.ability4.passive',
					"ability_active": 'abilities.ability4.ability_active',
					"cooldown": 'abilities.ability4.cooldown',
					"ultimate": 'abilities.ability4.ultimate'
				}
			},
			{
				change: {"abilities.ability5.name": "any"},
				provide_info: {
					"slot": {'value':5},
					"name": 'abilities.ability5.name',
					"level": 'abilities.ability5.level',
					"can_cast": 'abilities.ability5.can_cast',
					"passive": 'abilities.ability5.passive',
					"ability_active": 'abilities.ability5.ability_active',
					"cooldown": 'abilities.ability5.cooldown',
					"ultimate": 'abilities.ability5.ultimate'
				}
			}
		]
	},
	"hero_item_changed": {
		multiEvents : true,
		triggers: [
			{
				change: {"items.slot0.name": "any"},
				provide_info: {
					"slot": {'value':0},
					"location": {'value':"hero"},
					"name": 'items.slot0.name',
					"can_cast": 'items.slot0.can_cast',
					"passive": 'items.slot0.passive',
					"cooldown": 'items.slot0.cooldown',
					"charges": 'items.slot0.charges'
				}
			},
			{
				change: {"items.slot1.name": "any"},
				provide_info: {
					"slot": {'value':1},
					"location": {'value':"hero"},
					"name": 'items.slot1.name',
					"can_cast": 'items.slot1.can_cast',
					"passive": 'items.slot1.passive',
					"cooldown": 'items.slot1.cooldown',
					"charges": 'items.slot1.charges'
				}
			},
			{
				change: {"items.slot2.name": "any"},
				provide_info: {
					"slot": {'value':2},
					"location": {'value':"hero"},
					"name": 'items.slot2.name',
					"can_cast": 'items.slot2.can_cast',
					"passive": 'items.slot2.passive',
					"cooldown": 'items.slot2.cooldown',
					"charges": 'items.slot2.charges'
				}
			},
			{
				change: {"items.slot3.name": "any"},
				provide_info: {
					"slot": {'value':3},
					"location": {'value':"hero"},
					"name": 'items.slot3.name',
					"can_cast": 'items.slot3.can_cast',
					"passive": 'items.slot3.passive',
					"cooldown": 'items.slot3.cooldown',
					"charges": 'items.slot3.charges'
				}
			},
			{
				change: {"items.slot4.name": "any"},
				provide_info: {
					"slot": {'value':4},
					"location": {'value':"hero"},
					"name": 'items.slot4.name',
					"can_cast": 'items.slot4.can_cast',
					"passive": 'items.slot4.passive',
					"cooldown": 'items.slot4.cooldown',
					"charges": 'items.slot4.charges'
				}
			},
			{
				change: {"items.slot5.name": "any"},
				provide_info: {
					"slot": {'value':5},
					"location": {'value':"hero"},
					"name": 'items.slot5.name',
					"can_cast": 'items.slot5.can_cast',
					"passive": 'items.slot5.passive',
					"cooldown": 'items.slot5.cooldown',
					"charges": 'items.slot5.charges'
				}
			},
			{
				change: {"items.stash0.name": "any"},
				provide_info: {
					"slot": {'value':0},
					"location": {'value':"stash"},
					"name": 'items.stash0.name',
					"can_cast": 'items.stash0.can_cast',
					"passive": 'items.stash0.passive',
					"cooldown": 'items.stash0.cooldown',
					"charges": 'items.stash0.charges'
				}
			},
			{
				change: {"items.stash1.name": "any"},
				provide_info: {
					"slot": {'value':1},
					"location": {'value':"stash"},
					"name": 'items.stash1.name',
					"can_cast": 'items.stash1.can_cast',
					"passive": 'items.stash1.passive',
					"cooldown": 'items.stash1.cooldown',
					"charges": 'items.stash1.charges'
				}
			},
			{
				change: {"items.stash2.name": "any"},
				provide_info: {
					"slot": {'value':2},
					"location": {'value':"stash"},
					"name": 'items.stash2.name',
					"can_cast": 'items.stash2.can_cast',
					"passive": 'items.stash2.passive',
					"cooldown": 'items.stash2.cooldown',
					"charges": 'items.stash2.charges'
				}
			},
			{
				change: {"items.stash3.name": "any"},
				provide_info: {
					"slot": {'value':3},
					"location": {'value':"stash"},
					"name": 'items.stash3.name',
					"can_cast": 'items.stash3.can_cast',
					"passive": 'items.stash3.passive',
					"cooldown": 'items.stash3.cooldown',
					"charges": 'items.stash3.charges'
				}
			},
			{
				change: {"items.stash4.name": "any"},
				provide_info: {
					"slot": {'value':4},
					"location": {'value':"stash"},
					"name": 'items.stash4.name',
					"can_cast": 'items.stash4.can_cast',
					"passive": 'items.stash4.passive',
					"cooldown": 'items.stash4.cooldown',
					"charges": 'items.stash4.charges'
				}
			},
			{
				change: {"items.stash5.name": "any"},
				provide_info: {
					"slot": {'value':5},
					"location": {'value':"stash"},
					"name": 'items.stash5.name',
					"can_cast": 'items.stash5.can_cast',
					"passive": 'items.stash5.passive',
					"cooldown": 'items.stash5.cooldown',
					"charges": 'items.stash5.charges'
				}
			}
		]
	},
	"hero_item_used": {
		triggers: [
			{
				change: {"items.slot0.cooldown": {from: 0}},
				same: ['items.slot0.name'],
				provide_info: {
					"slot": {'value': 0},
					"location": {'value': "hero"},
					"name": 'items.slot0.name',
					"can_cast": 'items.slot0.can_cast',
					"passive": 'items.slot0.passive',
					"cooldown": 'items.slot0.cooldown',
					"charges": 'items.slot0.charges'
				}
			},
			{
				change: {"items.slot1.cooldown": {from: 0}},
				same: ['items.slot1.name'],
				provide_info: {
					"slot": {'value':1},
					"location": {'value':"hero"},
					"name": 'items.slot1.name',
					"can_cast": 'items.slot1.can_cast',
					"passive": 'items.slot1.passive',
					"cooldown": 'items.slot1.cooldown',
					"charges": 'items.slot1.charges'
				}
			},
			{
				change: {"items.slot2.cooldown": {from: 0}},
				same: ['items.slot2.name'],
				provide_info: {
					"slot": {'value':2},
					"location": {'value':"hero"},
					"name": 'items.slot2.name',
					"can_cast": 'items.slot2.can_cast',
					"passive": 'items.slot2.passive',
					"cooldown": 'items.slot2.cooldown',
					"charges": 'items.slot2.charges'
				}
			},
			{
				change: {"items.slot3.cooldown": {from: 0}},
				same: ['items.slot3.name'],
				provide_info: {
					"slot": {'value':3},
					"location": {'value':"hero"},
					"name": 'items.slot3.name',
					"can_cast": 'items.slot3.can_cast',
					"passive": 'items.slot3.passive',
					"cooldown": 'items.slot3.cooldown',
					"charges": 'items.slot3.charges'
				}
			},
			{
				change: {"items.slot4.cooldown": {from: 0}},
				same: ['items.slot4.name'],
				provide_info: {
					"slot": {'value':4},
					"location": {'value':"hero"},
					"name": 'items.slot4.name',
					"can_cast": 'items.slot4.can_cast',
					"passive": 'items.slot4.passive',
					"cooldown": 'items.slot4.cooldown',
					"charges": 'items.slot4.charges'
				}
			},
			{
				change: {"items.slot5.cooldown": {from: 0}},
				same: ['items.slot5.name'],
				provide_info: {
					"slot": {'value':5},
					"location": {'value':"hero"},
					"name": 'items.slot5.name',
					"can_cast": 'items.slot5.can_cast',
					"passive": 'items.slot5.passive',
					"cooldown": 'items.slot5.cooldown',
					"charges": 'items.slot5.charges'
				}
			}
		]
	},
	"hero_item_cooldown_changed": {
		multiEvents : true,
		triggers: [
			{
				change: {"items.slot0.cooldown": "any"},
				same: ['items.slot0.name'],
				provide_info: {
					"slot": {'value':0},
					"location": {'value':"hero"},
					"name": 'items.slot0.name',
					"can_cast": 'items.slot0.can_cast',
					"passive": 'items.slot0.passive',
					"cooldown": 'items.slot0.cooldown',
					"charges": 'items.slot0.charges'
				}
			},
			{
				change: {"items.slot1.cooldown": "any"},
				same: ['items.slot1.name'],
				provide_info: {
					"slot": {'value':1},
					"location": {'value':"hero"},
					"name": 'items.slot1.name',
					"can_cast": 'items.slot1.can_cast',
					"passive": 'items.slot1.passive',
					"cooldown": 'items.slot1.cooldown',
					"charges": 'items.slot1.charges'
				}
			},
			{
				change: {"items.slot2.cooldown": "any"},
				same: ['items.slot2.name'],
				provide_info: {
					"slot": {'value':2},
					"location": {'value':"hero"},
					"name": 'items.slot2.name',
					"can_cast": 'items.slot2.can_cast',
					"passive": 'items.slot2.passive',
					"cooldown": 'items.slot2.cooldown',
					"charges": 'items.slot2.charges'
				}
			},
			{
				change: {"items.slot3.cooldown": "any"},
				same: ['items.slot3.name'],
				provide_info: {
					"slot": {'value':3},
					"location": {'value':"hero"},
					"name": 'items.slot3.name',
					"can_cast": 'items.slot3.can_cast',
					"passive": 'items.slot3.passive',
					"cooldown": 'items.slot3.cooldown',
					"charges": 'items.slot3.charges'
				}
			},
			{
				change: {"items.slot4.cooldown": "any"},
				same: ['items.slot4.name'],
				provide_info: {
					"slot": {'value':4},
					"location": {'value':"hero"},
					"name": 'items.slot4.name',
					"can_cast": 'items.slot4.can_cast',
					"passive": 'items.slot4.passive',
					"cooldown": 'items.slot4.cooldown',
					"charges": 'items.slot4.charges'
				}
			},
			{
				change: {"items.slot5.cooldown": "any"},
				same: ['items.slot5.name'],
				provide_info: {
					"slot": {'value':5},
					"location": {'value':"hero"},
					"name": 'items.slot5.name',
					"can_cast": 'items.slot5.can_cast',
					"passive": 'items.slot5.passive',
					"cooldown": 'items.slot5.cooldown',
					"charges": 'items.slot5.charges'
				}
			},
			{
				change: {"items.stash0.cooldown": "any"},
				same: ['items.stash0.cooldown'],
				provide_info: {
					"slot": {'value':0},
					"location": {'value':"stash"},
					"name": 'items.stash0.name',
					"can_cast": 'items.stash0.can_cast',
					"passive": 'items.stash0.passive',
					"cooldown": 'items.stash0.cooldown',
					"charges": 'items.stash0.charges'
				}
			},
			{
				change: {"items.stash1.cooldown": "any"},
				same: ['items.stash1.cooldown'],
				provide_info: {
					"slot": {'value':1},
					"location": {'value':"stash"},
					"name": 'items.stash1.name',
					"can_cast": 'items.stash1.can_cast',
					"passive": 'items.stash1.passive',
					"cooldown": 'items.stash1.cooldown',
					"charges": 'items.stash1.charges'
				}
			},
			{
				change: {"items.stash2.cooldown": "any"},
				same: ['items.stash2.cooldown'],
				provide_info: {
					"slot": {'value':2},
					"location": {'value':"stash"},
					"name": 'items.stash2.name',
					"can_cast": 'items.stash2.can_cast',
					"passive": 'items.stash2.passive',
					"cooldown": 'items.stash2.cooldown',
					"charges": 'items.stash2.charges'
				}
			},
			{
				change: {"items.stash3.cooldown": "any"},
				same: ['items.stash3.cooldown'],
				provide_info: {
					"slot": {'value':3},
					"location": {'value':"stash"},
					"name": 'items.stash3.name',
					"can_cast": 'items.stash3.can_cast',
					"passive": 'items.stash3.passive',
					"cooldown": 'items.stash3.cooldown',
					"charges": 'items.stash3.charges'
				}
			},
			{
				change: {"items.stash4.cooldown": "any"},
				same: ['items.stash4.cooldown'],
				provide_info: {
					"slot": {'value':4},
					"location": {'value':"stash"},
					"name": 'items.stash4.name',
					"can_cast": 'items.stash4.can_cast',
					"passive": 'items.stash4.passive',
					"cooldown": 'items.stash4.cooldown',
					"charges": 'items.stash4.charges'
				}
			},
			{
				change: {"items.stash5.cooldown": "any"},
				same: ['items.stash5.cooldown'],
				provide_info: {
					"slot": {'value':5},
					"location": {'value':"stash"},
					"name": 'items.stash5.name',
					"can_cast": 'items.stash5.can_cast',
					"passive": 'items.stash5.passive',
					"cooldown": 'items.stash5.cooldown',
					"charges": 'items.stash5.charges'
				}
			}
		]
	},
	"hero_item_consumed": {
		triggers: [
			{
				change: {"items.slot0.charges": "less"},
				same: ['items.slot0.name'],
				provide_info: {
					"slot": {'value': 0},
					"location": {'value': "hero"},
					"name": 'items.slot0.name',
					"can_cast": 'items.slot0.can_cast',
					"passive": 'items.slot0.passive',
					"cooldown": 'items.slot0.cooldown',
					"charges": 'items.slot0.charges'
				}
			},
			{
				change: {"items.slot0.charges": "lessOrRemoved"},
				same: [
					'items.slot1.name',
					'items.slot2.name',
					'items.slot3.name',
					'items.slot4.name',
					'items.slot5.name',
					'items.stash0.name',
					'items.stash1.name',
					'items.stash2.name',
					'items.stash3.name',
					'items.stash4.name',
					'items.stash5.name'],
				provide_info: {
					"slot": {'value': 0},
					"location": {'value': "hero"},
					"name": 'items.slot0.name',
					"can_cast": 'items.slot0.can_cast',
					"passive": 'items.slot0.passive',
					"cooldown": 'items.slot0.cooldown',
					"charges": 'items.slot0.charges'
				}
			},
			{
				change: {"items.slot1.charges": "less"},
				same: ['items.slot1.name'],
				provide_info: {
					"slot": {'value': 1},
					"location": {'value': "hero"},
					"name": 'items.slot1.name',
					"can_cast": 'items.slot1.can_cast',
					"passive": 'items.slot1.passive',
					"cooldown": 'items.slot1.cooldown',
					"charges": 'items.slot1.charges'
				}
			},
			{
				change: {"items.slot1.charges": "lessOrRemoved"},
				same: [
					'items.slot0.name',
					'items.slot2.name',
					'items.slot3.name',
					'items.slot4.name',
					'items.slot5.name',
					'items.stash0.name',
					'items.stash1.name',
					'items.stash2.name',
					'items.stash3.name',
					'items.stash4.name',
					'items.stash5.name'],
				provide_info: {
					"slot": {'value': 1},
					"location": {'value': "hero"},
					"name": 'items.slot1.name',
					"can_cast": 'items.slot1.can_cast',
					"passive": 'items.slot1.passive',
					"cooldown": 'items.slot1.cooldown',
					"charges": 'items.slot1.charges'
				}
			},
			{
				change: {"items.slot2.charges": "less"},
				same: ['items.slot2.name'],
				provide_info: {
					"slot": {'value': 2},
					"location": {'value': "hero"},
					"name": 'items.slot2.name',
					"can_cast": 'items.slot2.can_cast',
					"passive": 'items.slot2.passive',
					"cooldown": 'items.slot2.cooldown',
					"charges": 'items.slot2.charges'
				}
			},
			{
				change: {"items.slot2.charges": "lessOrRemoved"},
				same: [
					'items.slot0.name',
					'items.slot1.name',
					'items.slot3.name',
					'items.slot4.name',
					'items.slot5.name',
					'items.stash0.name',
					'items.stash1.name',
					'items.stash2.name',
					'items.stash3.name',
					'items.stash4.name',
					'items.stash5.name'],
				provide_info: {
					"slot": {'value': 2},
					"location": {'value': "hero"},
					"name": 'items.slot2.name',
					"can_cast": 'items.slot2.can_cast',
					"passive": 'items.slot2.passive',
					"cooldown": 'items.slot2.cooldown',
					"charges": 'items.slot2.charges'
				}
			},
			{
				change: {"items.slot3.charges": "less"},
				same: ['items.slot3.name'],
				provide_info: {
					"slot": {'value': 3},
					"location": {'value': "hero"},
					"name": 'items.slot3.name',
					"can_cast": 'items.slot3.can_cast',
					"passive": 'items.slot3.passive',
					"cooldown": 'items.slot3.cooldown',
					"charges": 'items.slot3.charges'
				}
			},
			{
				change: {"items.slot3.charges": "lessOrRemoved"},
				same: [
					'items.slot0.name',
					'items.slot1.name',
					'items.slot2.name',
					'items.slot4.name',
					'items.slot5.name',
					'items.stash0.name',
					'items.stash1.name',
					'items.stash2.name',
					'items.stash3.name',
					'items.stash4.name',
					'items.stash5.name'],
				provide_info: {
					"slot": {'value': 3},
					"location": {'value': "hero"},
					"name": 'items.slot3.name',
					"can_cast": 'items.slot3.can_cast',
					"passive": 'items.slot3.passive',
					"cooldown": 'items.slot3.cooldown',
					"charges": 'items.slot3.charges'
				}
			},
			{
				change: {"items.slot4.charges": "less"},
				same: ['items.slot4.name'],
				provide_info: {
					"slot": {'value': 4},
					"location": {'value': "hero"},
					"name": 'items.slot4.name',
					"can_cast": 'items.slot4.can_cast',
					"passive": 'items.slot4.passive',
					"cooldown": 'items.slot4.cooldown',
					"charges": 'items.slot4.charges'
				}
			},
			{
				change: {"items.slot4.charges": "lessOrRemoved"},
				same: [
					'items.slot0.name',
					'items.slot1.name',
					'items.slot2.name',
					'items.slot3.name',
					'items.slot5.name',
					'items.stash0.name',
					'items.stash1.name',
					'items.stash2.name',
					'items.stash3.name',
					'items.stash4.name',
					'items.stash5.name'],
				provide_info: {
					"slot": {'value': 4},
					"location": {'value': "hero"},
					"name": 'items.slot4.name',
					"can_cast": 'items.slot4.can_cast',
					"passive": 'items.slot4.passive',
					"cooldown": 'items.slot4.cooldown',
					"charges": 'items.slot4.charges'
				}
			},
			{
				change: {"items.slot5.charges": "less"},
				same: ['items.slot5.name'],
				provide_info: {
					"slot": {'value': 5},
					"location": {'value': "hero"},
					"name": 'items.slot5.name',
					"can_cast": 'items.slot5.can_cast',
					"passive": 'items.slot5.passive',
					"cooldown": 'items.slot5.cooldown',
					"charges": 'items.slot5.charges'
				}
			},
			{
				change: {"items.slot5.charges": "lessOrRemoved"},
				same: [
					'items.slot0.name',
					'items.slot1.name',
					'items.slot2.name',
					'items.slot3.name',
					'items.slot4.name',
					'items.stash0.name',
					'items.stash1.name',
					'items.stash2.name',
					'items.stash3.name',
					'items.stash4.name',
					'items.stash5.name'],
				provide_info: {
					"slot": {'value': 5},
					"location": {'value': "hero"},
					"name": 'items.slot5.name',
					"can_cast": 'items.slot5.can_cast',
					"passive": 'items.slot5.passive',
					"cooldown": 'items.slot5.cooldown',
					"charges": 'items.slot5.charges'
				}
			}
		]
	},
	"hero_item_charged": {
		triggers: [
			{
				change: {"items.slot0.charges": 'greater'},
				same: ['items.slot0.name'],
				provide_info: {
					"slot": {'value': 0},
					"location": {'value': "hero"},
					"name": 'items.slot0.name',
					"can_cast": 'items.slot0.can_cast',
					"passive": 'items.slot0.passive',
					"cooldown": 'items.slot0.cooldown',
					"charges": 'items.slot0.charges'
				}
			},
			{
				change: {"items.slot1.charges": 'greater'},
				same: ['items.slot1.name'],
				provide_info: {
					"slot": {'value':1},
					"location": {'value':"hero"},
					"name": 'items.slot1.name',
					"can_cast": 'items.slot1.can_cast',
					"passive": 'items.slot1.passive',
					"cooldown": 'items.slot1.cooldown',
					"charges": 'items.slot1.charges'
				}
			},
			{
				change: {"items.slot2.charges": 'greater'},
				same: ['items.slot2.name'],
				provide_info: {
					"slot": {'value':2},
					"location": {'value':"hero"},
					"name": 'items.slot2.name',
					"can_cast": 'items.slot2.can_cast',
					"passive": 'items.slot2.passive',
					"cooldown": 'items.slot2.cooldown',
					"charges": 'items.slot2.charges'
				}
			},
			{
				change: {"items.slot3.charges": 'greater'},
				same: ['items.slot3.name'],
				provide_info: {
					"slot": {'value':3},
					"location": {'value':"hero"},
					"name": 'items.slot3.name',
					"can_cast": 'items.slot3.can_cast',
					"passive": 'items.slot3.passive',
					"cooldown": 'items.slot3.cooldown',
					"charges": 'items.slot3.charges'
				}
			},
			{
				change: {"items.slot4.charges": 'greater'},
				same: ['items.slot4.name'],
				provide_info: {
					"slot": {'value':4},
					"location": {'value':"hero"},
					"name": 'items.slot4.name',
					"can_cast": 'items.slot4.can_cast',
					"passive": 'items.slot4.passive',
					"cooldown": 'items.slot4.cooldown',
					"charges": 'items.slot4.charges'
				}
			},
			{
				change: {"items.slot5.charges": 'greater'},
				same: ['items.slot5.name'],
				provide_info: {
					"slot": {'value':5},
					"location": {'value':"hero"},
					"name": 'items.slot5.name',
					"can_cast": 'items.slot5.can_cast',
					"passive": 'items.slot5.passive',
					"cooldown": 'items.slot5.cooldown',
					"charges": 'items.slot5.charges'
				}
			},
			{
				change: {"items.stash0.charges": 'greater'},
				same: ['items.stash0.name'],
				provide_info: {
					"slot": {'value':0},
					"location": {'value':"stash"},
					"name": 'items.stash0.name',
					"can_cast": 'items.stash0.can_cast',
					"passive": 'items.stash0.passive',
					"cooldown": 'items.stash0.cooldown',
					"charges": 'items.stash0.charges'
				}
			},
			{
				change: {"items.stash1.charges": 'greater'},
				same: ['items.stash1.name'],
				provide_info: {
					"slot": {'value':1},
					"location": {'value':"stash"},
					"name": 'items.stash0.name',
					"can_cast": 'items.stash0.can_cast',
					"passive": 'items.stash0.passive',
					"cooldown": 'items.stash0.cooldown',
					"charges": 'items.stash0.charges'
				}
			},
			{
				change: {"items.stash2.charges": 'greater'},
				same: ['items.stash2.name'],
				provide_info: {
					"slot": {'value':2},
					"location": {'value':"stash"},
					"name": 'items.stash0.name',
					"can_cast": 'items.stash0.can_cast',
					"passive": 'items.stash0.passive',
					"cooldown": 'items.stash0.cooldown',
					"charges": 'items.stash0.charges'
				}
			},
			{
				change: {"items.stash3.charges": 'greater'},
				same: ['items.stash3.name'],
				provide_info: {
					"slot": {'value':3},
					"location": {'value':"stash"},
					"name": 'items.stash0.name',
					"can_cast": 'items.stash0.can_cast',
					"passive": 'items.stash0.passive',
					"cooldown": 'items.stash0.cooldown',
					"charges": 'items.stash0.charges'
				}
			},
			{
				change: {"items.stash4.charges": 'greater'},
				same: ['items.stash4.name'],
				provide_info: {
					"slot": {'value':4},
					"location": {'value':"stash"},
					"name": 'items.stash0.name',
					"can_cast": 'items.stash0.can_cast',
					"passive": 'items.stash0.passive',
					"cooldown": 'items.stash0.cooldown',
					"charges": 'items.stash0.charges'
				}
			},
			{
				change: {"items.stash5.charges": 'greater'},
				same: ['items.stash5.name'],
				provide_info: {
					"slot": {'value':5},
					"location": {'value':"stash"},
					"name": 'items.stash0.name',
					"can_cast": 'items.stash0.can_cast',
					"passive": 'items.stash0.passive',
					"cooldown": 'items.stash0.cooldown',
					"charges": 'items.stash0.charges'
				}
			}
		]
	}
});