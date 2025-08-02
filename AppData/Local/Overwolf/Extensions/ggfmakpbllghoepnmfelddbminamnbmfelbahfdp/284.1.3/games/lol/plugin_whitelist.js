define([
  '/games/lol/supported_features.js'
], function (SupportedFeatures) {
  return {
    Events: {
      match_pause: [{
        feature_id: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.match_pause
      }],
      match_resume: [{
        feature_id: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.match_resume
      }],
      arena_battle_start: [{
        feature_id: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.battle_start
      }],

      physical_damage_dealt_player: [{
        feature_id: SupportedFeatures.damage.name,
        event: SupportedFeatures.damage.events.physical_damage_dealt_player,
        no_count: true
      }],

      magic_damage_dealt_player: [{
        feature_id: SupportedFeatures.damage.name,
        event: SupportedFeatures.damage.events.magic_damage_dealt_player,
        no_count: true
      }],

      true_damage_dealt_player: [{
        feature_id: SupportedFeatures.damage.name,
        event: SupportedFeatures.damage.events.true_damage_dealt_player,
        no_count: true
      }],

      physical_damage_dealt_to_champions: [{
        feature_id: SupportedFeatures.damage.name,
        event: SupportedFeatures.damage.events.physical_damage_dealt_to_champions,
        no_count: true
      }],

      magic_damage_dealt_to_champions: [{
        feature_id: SupportedFeatures.damage.name,
        event: SupportedFeatures.damage.events.magic_damage_dealt_to_champions,
        no_count: true
      }],

      true_damage_dealt_to_champions: [{
        feature_id: SupportedFeatures.damage.name,
        event: SupportedFeatures.damage.events.true_damage_dealt_to_champions,
        no_count: true
      }],

      physical_damage_taken: [{
        feature_id: SupportedFeatures.damage.name,
        event: SupportedFeatures.damage.events.physical_damage_taken,
        no_count: true
      }],

      magic_damage_taken: [{
        feature_id: SupportedFeatures.damage.name,
        event: SupportedFeatures.damage.events.magic_damage_taken,
        no_count: true
      }],

      true_damage_taken: [{
        feature_id: SupportedFeatures.damage.name,
        event: SupportedFeatures.damage.events.true_damage_taken,
        no_count: true
      }],

      clock: [{
        feature_id: SupportedFeatures.counters.name,
        event: SupportedFeatures.counters.events.match_clock,
        no_count: true
      }],

      death: [{
        feature_id: SupportedFeatures.death.name,
        event: SupportedFeatures.death.events.death
      }, {
        feature_id: SupportedFeatures.deathAndRespawn.name,
        event: SupportedFeatures.deathAndRespawn.events.death
      }],

      respawn: [{
        feature_id: SupportedFeatures.respawn.name,
        event: SupportedFeatures.respawn.events.respawn,
        no_count: true 
      }, {
        feature_id: SupportedFeatures.deathAndRespawn.name,
        event: SupportedFeatures.deathAndRespawn.events.respawn,
        no_count: true 
      }],

      assist: [{
        feature_id: SupportedFeatures.assist.name,
        event: SupportedFeatures.assist.events.assist
      }],

      kill: [{
        feature_id: SupportedFeatures.kill.name,
        event: SupportedFeatures.kill.events.kill,
        kill_rank: 1
      }],

      d_kill: [{
        feature_id: SupportedFeatures.kill.name,
        event: SupportedFeatures.kill.events.doubleKill,
        kill_rank: 2
      }],

      t_kill: [{
        feature_id: SupportedFeatures.kill.name,
        event: SupportedFeatures.kill.events.tripleKill,
        kill_rank: 3
      }],

      q_kill: [{
        feature_id: SupportedFeatures.kill.name,
        event: SupportedFeatures.kill.events.quadraKill,
        kill_rank: 4
      }],

      p_kill: [{
        feature_id: SupportedFeatures.kill.name,
        event: SupportedFeatures.kill.events.pentaKill,
        kill_rank: 5
      }],

      u_kill: [{
        feature_id: SupportedFeatures.kill.name,
        event: SupportedFeatures.kill.events.unrealKill,
        kill_rank: 6
      }],

      spell1: [{
        feature_id: SupportedFeatures.abilities.name,
        event: SupportedFeatures.abilities.events.ability1,
        no_count: true
      }],

      spell2: [{
        feature_id: SupportedFeatures.abilities.name,
        event: SupportedFeatures.abilities.events.ability2,
        no_count: true
      }],

      spell3: [{
        feature_id: SupportedFeatures.abilities.name,
        event: SupportedFeatures.abilities.events.ability3,
        no_count: true
      }],

      spell4: [{
        feature_id: SupportedFeatures.abilities.name,
        event: SupportedFeatures.abilities.events.ability4,
        no_count: true
      }],

      used_ability1: [{
        feature_id: SupportedFeatures.abilities.name,
        event: SupportedFeatures.abilities.events.usedAbility1
      }],

      used_ability2: [{
        feature_id: SupportedFeatures.abilities.name,
        event: SupportedFeatures.abilities.events.usedAbility2
      }],

      used_ability3: [{
        feature_id: SupportedFeatures.abilities.name,
        event: SupportedFeatures.abilities.events.usedAbility3
      }],

      used_ability4: [{
        feature_id: SupportedFeatures.abilities.name,
        event: SupportedFeatures.abilities.events.usedAbility4
      }],

      ability_ready1: [{
        feature_id: SupportedFeatures.abilities.name,
        event: SupportedFeatures.abilities.events.abilityReady1
      }],

      ability_ready2: [{
        feature_id: SupportedFeatures.abilities.name,
        event: SupportedFeatures.abilities.events.abilityReady2
      }],

      ability_ready3: [{
        feature_id: SupportedFeatures.abilities.name,
        event: SupportedFeatures.abilities.events.abilityReady3
      }],

      ability_ready4: [{
        feature_id: SupportedFeatures.abilities.name,
        event: SupportedFeatures.abilities.events.abilityReady4
      }],

      announcer: [{
        feature_id: SupportedFeatures.announcer.name,
        event: SupportedFeatures.announcer
      }],

      chat: [{
        feature_id: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.chat,
        no_count: true,
        useEventData: true
      }],

      arena_round_outcome: [{
        feature_id: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.round_outcome,
        no_count: true,
        useEventData: true
      }],
      tft_picked_item: [{
        feature_id: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.picked_item,
        useEventData: true,
        no_count: true
      }],

    },

    InfoDB: {
      total_heal: [{
        feature_id: SupportedFeatures.heal.name,
        config: SupportedFeatures.heal.info.total_heal
      }],

      total_heal_on_teammates: [{
        feature_id: SupportedFeatures.heal.name,
        config: SupportedFeatures.heal.info.total_heal_on_teammates
      }],

      total_units_healed: [{
        feature_id: SupportedFeatures.heal.name,
        config: SupportedFeatures.heal.info.total_units_healed
      }],

      total_damage_dealt: [{
        feature_id: SupportedFeatures.damage.name,
        config: SupportedFeatures.damage.info.total_damage_dealt
      }],

      total_damage_dealt_to_champions: [{
        feature_id: SupportedFeatures.damage.name,
        config: SupportedFeatures.damage.info.total_damage_dealt_to_champions
      }],

      total_damage_taken: [{
        feature_id: SupportedFeatures.damage.name,
        config: SupportedFeatures.damage.info.total_damage_taken
      }],

      total_damage_dealt_to_buildings: [{
        feature_id: SupportedFeatures.damage.name,
        config: SupportedFeatures.damage.info.total_damage_dealt_to_buildings
      }],

      total_damage_dealt_to_turrets: [{
        feature_id: SupportedFeatures.damage.name,
        config: SupportedFeatures.damage.info.total_damage_dealt_to_turrets
      }],

      total_damage_dealt_to_objectives: [{
        feature_id: SupportedFeatures.damage.name,
        config: SupportedFeatures.damage.info.total_damage_dealt_to_objectives
      }],

      total_damage_self_mitigated: [{
        feature_id: SupportedFeatures.damage.name,
        config: SupportedFeatures.damage.info.total_damage_self_mitigated
      }],

      ping: [{
        feature_id: SupportedFeatures.counters.name,
        config: SupportedFeatures.counters.info.ping
      }],

      minions: [{
        feature_id: SupportedFeatures.minions.name,
        config: SupportedFeatures.minions.info.minionKills
      }, {
        feature_id: SupportedFeatures.minion.name,
        config: SupportedFeatures.minion.info.minions_kills
      }],

      n_minions: [{
        feature_id: SupportedFeatures.minions.name,
        config: SupportedFeatures.minions.info.neutralMinionKills
      }, {
        feature_id: SupportedFeatures.minion.name,
        config: SupportedFeatures.minion.info.neutral_minion_kills
      }],

      gold: [{
        feature_id: SupportedFeatures.gold.name,
        config: SupportedFeatures.gold.info.gold
      }],

      lvl: [{
        feature_id: SupportedFeatures.level.name,
        config: SupportedFeatures.level.info.level
      }],

      game_mode: [{
        feature_id: SupportedFeatures.gameMode.name,
        config: SupportedFeatures.gameMode.info.gameMode
      }, {
        feature_id: SupportedFeatures.game_mode.name,
        config: SupportedFeatures.game_mode.info.game_mode
      }],
      is_aram: [{
        feature_id: SupportedFeatures.is_aram.name,
        config: SupportedFeatures.is_aram.info.is_aram
      }],
      abilities: [],
      patch: [],
      patch_retrieval: [],
      var_map: [],
      game_modes: [],
      champion_name: [],
      play_type: [],
      map_name: [],
      mission_mode: [],

           jungle_camp_0: [{
        feature_id: SupportedFeatures.jungle_camps.name,
        config: SupportedFeatures.jungle_camps.info.jungle_camps,
      }],
      jungle_camp_1: [{
        feature_id: SupportedFeatures.jungle_camps.name,
        config: SupportedFeatures.jungle_camps.info.jungle_camps,
      }],
      jungle_camp_2: [{
        feature_id: SupportedFeatures.jungle_camps.name,
        config: SupportedFeatures.jungle_camps.info.jungle_camps,
      }],
      jungle_camp_3: [{
        feature_id: SupportedFeatures.jungle_camps.name,
        config: SupportedFeatures.jungle_camps.info.jungle_camps,
      }],
      jungle_camp_4: [{
        feature_id: SupportedFeatures.jungle_camps.name,
        config: SupportedFeatures.jungle_camps.info.jungle_camps,
      }],
      jungle_camp_5: [{
        feature_id: SupportedFeatures.jungle_camps.name,
        config: SupportedFeatures.jungle_camps.info.jungle_camps,
      }],
      jungle_camp_6: [{
        feature_id: SupportedFeatures.jungle_camps.name,
        config: SupportedFeatures.jungle_camps.info.jungle_camps,
      }],
      jungle_camp_7: [{
        feature_id: SupportedFeatures.jungle_camps.name,
        config: SupportedFeatures.jungle_camps.info.jungle_camps,
      }],
      jungle_camp_8: [{
        feature_id: SupportedFeatures.jungle_camps.name,
        config: SupportedFeatures.jungle_camps.info.jungle_camps,
      }],
      jungle_camp_9: [{
        feature_id: SupportedFeatures.jungle_camps.name,
        config: SupportedFeatures.jungle_camps.info.jungle_camps,
      }],
      jungle_camp_10: [{
        feature_id: SupportedFeatures.jungle_camps.name,
        config: SupportedFeatures.jungle_camps.info.jungle_camps,
      }],
      jungle_camp_11: [{
        feature_id: SupportedFeatures.jungle_camps.name,
        config: SupportedFeatures.jungle_camps.info.jungle_camps,
      }],
      jungle_camp_12: [{
        feature_id: SupportedFeatures.jungle_camps.name,
        config: SupportedFeatures.jungle_camps.info.jungle_camps,
      }],
      jungle_camp_13: [{
        feature_id: SupportedFeatures.jungle_camps.name,
        config: SupportedFeatures.jungle_camps.info.jungle_camps,
      }],
      jungle_camps_14: [{
        feature_id: SupportedFeatures.jungle_camps.name,
        config: SupportedFeatures.jungle_camps.info.jungle_camps,
      }],
      jungle_camp_15: [{
        feature_id: SupportedFeatures.jungle_camps.name,
        config: SupportedFeatures.jungle_camps.info.jungle_camps,
      }],
      jungle_camp_16: [{
        feature_id: SupportedFeatures.jungle_camps.name,
        config: SupportedFeatures.jungle_camps.info.jungle_camps ,
      }],
      jungle_camp_17: [{
        feature_id: SupportedFeatures.jungle_camps.name,
        config: SupportedFeatures.jungle_camps.info.jungle_camps,
      }],

      tft_roster: [{
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.player_status
      }],

      tft_round: [{
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.round_type
      }],
      tft_xp: [{
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.xp
      }],
      tft_gold: [{
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.gold
      }],
      tft_combat: [{
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.battle_state
      }],
      tft_match: [{
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.match_state
      }],
      tft_round_outcome: [{
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.round_outcome
      }],
      tft_opp: [{
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.opponent
      }],
      tft_mode: [{
        feature_id: SupportedFeatures.game_mode.name,
        config: SupportedFeatures.game_mode.info.game_mode
      }],
      tft_carousel: [{
        feature_id: SupportedFeatures.carousel.name,
        config: SupportedFeatures.carousel.info.carousel_pieces
      }],
      tft_bench: [{
        feature_id: SupportedFeatures.bench.name,
        config: SupportedFeatures.bench.info.bench_pieces
      }],
      tft_board: [{
        feature_id: SupportedFeatures.board.name,
        config: SupportedFeatures.board.info.board_pieces
      }],
      tft_shop: [{
        feature_id: SupportedFeatures.store.name,
        config: SupportedFeatures.store.info.shop_pieces
      }],
      tft_damage: [{
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.local_player_damage
      }],
      tft_augments: [{
        feature_id: SupportedFeatures.augments.name,
        config: SupportedFeatures.augments.info.augments,
      }],
      match_paused: [{
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.match_paused
      }],
      team_frames_0: [{
        feature_id: SupportedFeatures.team_frames.name,
        config: SupportedFeatures.team_frames.info.team_frames,
      }],
      team_frames_1: [{
        feature_id: SupportedFeatures.team_frames.name,
        config: SupportedFeatures.team_frames.info.team_frames,
      }],
      team_frames_2: [{
        feature_id: SupportedFeatures.team_frames.name,
        config: SupportedFeatures.team_frames.info.team_frames,
      }],
      team_frames_3: [{
        feature_id: SupportedFeatures.team_frames.name,
        config: SupportedFeatures.team_frames.info.team_frames,
      }],
      is_pbe: [{
        feature_id: SupportedFeatures.match_info.info.is_pbe.category,
        config: SupportedFeatures.match_info.info.is_pbe,
      }],
      tft_picked_augment: [{
        feature_id: SupportedFeatures.augments.name,
        config: SupportedFeatures.augments.info.picked_augment,
      }],
      arena_round: [{
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.round_number,
      }],
      arena_augments: [{
        feature_id: SupportedFeatures.augments.name,
        config: SupportedFeatures.augments.info.augments,
      }],
      arena_picked_augment: [{
        feature_id: SupportedFeatures.augments.name,
        config: SupportedFeatures.augments.info.picked_augment,
      }],
      arena_match_outcome: [{
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.match_outcome,
      }],
      arena_total_heal: [{
        feature_id: SupportedFeatures.heal.name,
        config: SupportedFeatures.heal.info.total_heal
      }],
      arena_total_heal_on_teammates: [{
        feature_id: SupportedFeatures.heal.name,
        config: SupportedFeatures.heal.info.total_heal_on_teammates
      }],
      arena_total_units_healed: [{
        feature_id: SupportedFeatures.heal.name,
        config: SupportedFeatures.heal.info.total_units_healed
      }],
      arena_teams: [{
        feature_id: SupportedFeatures.teams.name,
        config: SupportedFeatures.teams.info.arena_teams
      }],
      stacks: [{
        feature_id: SupportedFeatures.abilities.name,
        config: SupportedFeatures.abilities.info.stack
      }],
      tft_item_select: [{
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.item_select
      }]
    }
  }
});
