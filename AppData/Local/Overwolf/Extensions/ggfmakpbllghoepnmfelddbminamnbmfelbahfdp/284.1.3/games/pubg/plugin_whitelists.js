define(["/games/pubg/supported_features.js"], function(SupportedFeatures) {
  return {
    Events: {
      team_feed: {
        featureId: SupportedFeatures.team_feed.name,
        event: SupportedFeatures.team_feed.events.team_feed
      },
      kill: {
        featureId: SupportedFeatures.kill.name,
        event: SupportedFeatures.kill.events.kill
      },
      headshot: {
        featureId: SupportedFeatures.kill.name,
        event: SupportedFeatures.kill.events.headshot
      },
      damage_given: {
        featureId: SupportedFeatures.kill.name,
        event: SupportedFeatures.kill.events.damage_dealt
      },
      knockout: {
        featureId: SupportedFeatures.kill.name,
        event: SupportedFeatures.kill.events.knockout
      },
      revived: {
        featureId: SupportedFeatures.revived.name,
        event: SupportedFeatures.revived.events.revived
      },
      knocked_out: {
        featureId: SupportedFeatures.death.name,
        event: SupportedFeatures.death.events.knockedout
      },
      dead: {
        featureId: SupportedFeatures.death.name,
        event: SupportedFeatures.death.events.death
      },
      killer: {
        featureId: SupportedFeatures.killer.name,
        event: SupportedFeatures.killer.events.killer,
        useEventData: true
      },
      game_start: {
        featureId: SupportedFeatures.match.name,
        event: SupportedFeatures.match.events.matchStart
      },
      game_end: {
        featureId: SupportedFeatures.match.name,
        event: SupportedFeatures.match.events.matchEnd
      },
      matchSummary: {
        featureId: SupportedFeatures.match.name,
        event: SupportedFeatures.match.events.matchSummary
      },
      charstate_jump: {
        featureId: SupportedFeatures.me.name,
        event: SupportedFeatures.me.events.jump
      },
      charstate_getting_damage: {
        featureId: SupportedFeatures.death.name,
        event: SupportedFeatures.death.events.damageTaken
      },
      charstate_shooting: {
        featureId: SupportedFeatures.kill.name,
        event: SupportedFeatures.kill.events.fire
      },
      zones_time: {
        featureId: SupportedFeatures.location.name,
        event: SupportedFeatures.location.events.time_to_next_circle,
        useEventData: true
      },
      ping: {
        featureId: SupportedFeatures.counters.name,
        event: SupportedFeatures.counters.events.ping,
        useEventData: true
      },

      rank: {
        featureId: SupportedFeatures.rank.name,
        event: SupportedFeatures.rank
      },
      location: {
        featureId: SupportedFeatures.location.name,
        event: SupportedFeatures.location
      },
      safe_zone: {
        featureId: SupportedFeatures.location.name,
        event: SupportedFeatures.location
      },
      blue_zone: {
        featureId: SupportedFeatures.location.name,
        event: SupportedFeatures.location
      },
      red_zone: {
        featureId: SupportedFeatures.location.name,
        event: SupportedFeatures.location
      },
      max_distance_kill: {
        featureId: SupportedFeatures.kill.name,
        event: SupportedFeatures.kill
      },
      matchid: {
        featureId: SupportedFeatures.match.name,
        event: SupportedFeatures.match
      },
      charstate_tilt_right: {
        featureId: SupportedFeatures.me.name,
        event: SupportedFeatures.me
      },
      charstate_staying_straight: {
        featureId: SupportedFeatures.me.name,
        event: SupportedFeatures.me
      },
      charstate_tilt_left: {
        featureId: SupportedFeatures.me.name,
        event: SupportedFeatures.me
      },
      charstate_vehicle: {
        featureId: SupportedFeatures.me.name,
        event: SupportedFeatures.me
      },
      charstate_aiming_tpp: {
        featureId: SupportedFeatures.me.name,
        event: SupportedFeatures.me
      },
      charstate_aiming_fpp: {
        featureId: SupportedFeatures.me.name,
        event: SupportedFeatures.me
      },
      charstate_breath: {
        featureId: SupportedFeatures.me.name,
        event: SupportedFeatures.me
      },
      charstate_stels_move: {
        featureId: SupportedFeatures.me.name,
        event: SupportedFeatures.me
      },
      charstate_normal_move: {
        featureId: SupportedFeatures.me.name,
        event: SupportedFeatures.me
      },
      charstate_run: {
        featureId: SupportedFeatures.me.name,
        event: SupportedFeatures.me
      },
      charstate_free_look: {
        featureId: SupportedFeatures.me.name,
        event: SupportedFeatures.me
      },
      charstate_fpp_view: {
        featureId: SupportedFeatures.me.name,
        event: SupportedFeatures.me
      },
      charstate_tpp_view: {
        featureId: SupportedFeatures.me.name,
        event: SupportedFeatures.me
      },
      charstate_stance: {
        featureId: SupportedFeatures.me.name,
        event: SupportedFeatures.me
      }
    },

    InfoDB: {
      put_down_message: {
        feature_id: SupportedFeatures.team_feed.name,
        config: SupportedFeatures.team_feed.info.team_feed
      },
      health_state: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.health
      },
      team_location: {
        feature_id: SupportedFeatures.location.name,
        config: SupportedFeatures.location.info.team_location
      },
      victim_name: {
        feature_id: SupportedFeatures.kill.name,
        config: SupportedFeatures.kill.events.victimName
      },
      weapon_state: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.weaponState
      },
      player_name: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.name
      },
      team_members: {
        feature_id: SupportedFeatures.team.name,
        config: SupportedFeatures.team.info.nicknames
      },
      total_teams: {
        feature_id: SupportedFeatures.rank.name,
        config: SupportedFeatures.rank.info.total_teams
      },
      scene_state: {
        feature_id: SupportedFeatures.phase.name,
        config: SupportedFeatures.phase.info.phase
      },
      match_state: {
        feature_id: SupportedFeatures.phase.name,
        config: SupportedFeatures.phase.info.phase
      },
      vehicle_state: {
        feature_id: SupportedFeatures.phase.name,
        config: SupportedFeatures.phase.info.phase
      },
      game_type: {
        feature_id: SupportedFeatures.match.name,
        config: SupportedFeatures.match.info.mode
      },
      roster_0: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_1: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_2: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_3: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_4: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_5: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_6: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_7: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_8: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_9: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_10: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_11: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_12: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_13: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_14: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_15: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_16: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_17: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_18: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_19: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_20: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_21: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_22: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_23: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_24: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_25: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_26: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_27: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_28: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_29: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_30: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_31: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_32: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_33: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_34: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_35: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_36: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_37: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_38: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_39: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_40: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_41: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_42: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_43: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_44: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_45: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_46: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_47: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_48: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_49: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_50: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_51: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_52: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_53: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_54: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_55: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_56: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_57: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_58: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_59: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_60: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_61: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_62: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_63: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_64: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_65: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_66: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_67: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_68: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_69: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_70: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_71: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_72: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_73: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_74: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_75: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_76: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_77: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_78: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_79: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_80: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_81: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_82: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_83: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_84: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_85: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_86: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_87: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_88: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_89: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_90: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_91: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_92: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_93: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_94: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_95: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_96: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_97: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_98: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      roster_99: {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      inventory_0: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_1: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_2: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_3: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_4: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_5: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_6: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_7: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_8: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_9: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_10: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_11: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_12: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_13: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_14: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_15: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_16: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_17: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_18: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_19: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_20: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_21: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_22: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_23: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_24: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_25: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_26: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_27: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_28: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_29: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_30: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_31: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_32: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_33: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_34: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_35: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_36: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_37: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_38: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_39: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_40: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_41: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_42: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_43: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_44: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_45: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_46: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_47: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_48: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_49: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_50: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_51: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_52: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_53: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_54: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_55: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_56: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_57: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_58: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_59: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_60: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_61: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_62: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_63: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_64: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_65: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_66: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_67: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_68: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_69: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_70: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_71: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_72: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_73: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_74: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_75: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_76: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_77: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_78: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_79: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_80: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_81: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_82: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_83: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_84: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_85: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_86: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_87: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_88: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_89: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_90: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_91: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_92: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_93: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_94: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_95: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_96: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_97: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_98: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      inventory_99: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.inventory
      },
      equippable_0: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.equipped
      },
      equippable_1: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.equipped
      },
      equippable_2: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.equipped
      },
      equippable_3: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.equipped
      },
      equippable_4: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.equipped
      },
      equippable_5: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.equipped
      },
      equippable_6: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.equipped
      },
      equippable_7: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.equipped
      },
      equippable_8: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.equipped
      },
      equippable_9: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.equipped
      },
      equippable_10: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.equipped
      },
      equippable_11: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.equipped
      },
      equippable_12: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.equipped
      },
      equippable_13: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.equipped
      },
      equippable_14: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.equipped
      },
      equippable_15: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.equipped
      },
      equippable_16: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.equipped
      },
      equippable_17: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.equipped
      },
      equippable_18: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.equipped
      },
      equippable_19: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.equipped
      }
    }
  };
});
