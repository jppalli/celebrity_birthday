define([
  '/games/apex_legends/supported_features.js'
], function (SupportedFeatures) {
  return {
    Events: {
      "match_start": {
        featureId: SupportedFeatures.match_state.name,
        event: SupportedFeatures.match_state.events.match_start,
        override: true
      },
      "match_end": {
        featureId: SupportedFeatures.match_state.name,
        event: SupportedFeatures.match_state.events.match_end,
        override: true
      },
      "hud_kill": {
        featureId: SupportedFeatures.kill.name,
        event: SupportedFeatures.kill.events.kill,
        override: false,
        useEventData: true
      },
      "death": {
        featureId: SupportedFeatures.death.name,
        event: SupportedFeatures.death.events.death,
        override: false,
      },
      "knocked_out": {
        featureId: SupportedFeatures.death.name,
        event: SupportedFeatures.death.events.knocked_out,
        override: false,
      },
      "respawn": {
        featureId: SupportedFeatures.revive.name,
        event: SupportedFeatures.revive.events.respawn,
        override: false
      },
      "healed_from_ko": {
        featureId: SupportedFeatures.revive.name,
        event: SupportedFeatures.revive.events.healed_from_ko,
        override: false
      },
      "hud_assist": {
        featureId: SupportedFeatures.kill.name,
        event: SupportedFeatures.kill.events.assist,
        override: false,
        useEventData: true
      },
      "hud_knockdown": {
        featureId: SupportedFeatures.kill.name,
        event: SupportedFeatures.kill.events.knockdown,
        override: false,
        useEventData: true
      },
      "hud_squad_wipe": {
        featureId: SupportedFeatures.kill.name,
        event: SupportedFeatures.kill.events.squad_wipe,
        override: false,
        useEventData: true
      },
      "kill_feed": {
        featureId: SupportedFeatures.kill_feed.name,
        event: SupportedFeatures.kill_feed.events.kill_feed,
        override: false,
        useEventData: true
      },
      "language": {
        featureId: SupportedFeatures.localization.name,
        event: SupportedFeatures.localization.events.language,
        override: true,
      },
      "hud": {
        featureId: SupportedFeatures.hud.name,
        event: SupportedFeatures.hud.events.hud,
        override: true
      },
      "damage": {
        featureId: SupportedFeatures.damage.name,
        event: SupportedFeatures.damage.events.damage,
        override: true
      },

      "your_squad_is_eliminated": {
        featureId: SupportedFeatures.team.name,
        event: SupportedFeatures.team,
        override: true
      },
      "victory": {
        featureId: SupportedFeatures.rank.name,
        event: SupportedFeatures.rank,
        override: true
      },
      "defeat": {
        featureId: SupportedFeatures.rank.name,
        event: SupportedFeatures.rank,
        override: true
      }
    },

    InfoDB: {
      "hud_ultimate_ability": {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.ultimate_cooldown,
        override: false,
      },
      "hud_legend_select": {
        feature_id: SupportedFeatures.team.name,
        config: SupportedFeatures.team.info.legendSelect,
        override: true,
      },
      "hud_match_summary": {
        feature_id: SupportedFeatures.match_summary.name,
        config: SupportedFeatures.match_summary.info.match_summary,
        override: false,
      },
      "weapons": {
        feature_id: SupportedFeatures.inventory.name,
        config: SupportedFeatures.inventory.info.weapons,
        override: true,
      },
      game_mode: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.game_mode,
        override: true,
      },
      tabs: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.tabs,
      },
      "local_player": {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.name,
        override: true
      },
      "roster_0": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_1": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_2": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_3": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_4": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_5": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_6": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_7": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_8": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_9": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_10": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_11": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_12": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_13": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_14": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_15": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_16": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_17": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_18": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_19": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_20": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_21": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_22": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_23": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_24": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_25": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_26": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_27": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_28": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_29": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_30": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_31": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_32": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_33": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_34": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_35": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_36": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_37": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_38": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_39": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_40": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_41": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_42": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_43": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_44": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_45": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_46": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_47": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_48": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_49": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_50": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_51": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_52": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_53": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_54": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_55": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_56": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_57": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_58": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_59": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_60": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_61": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_62": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_63": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_64": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_65": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_66": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_67": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_68": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_69": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_70": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_71": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_72": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_73": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_74": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_75": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_76": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_77": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_78": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_79": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_80": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_81": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_82": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_83": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_84": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_85": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_86": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_87": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_88": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_89": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_90": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_91": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_92": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_93": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_94": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_95": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_96": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_97": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_98": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "roster_99": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster,
        override: true
      },
      "consumable_0": {
        feature_id: SupportedFeatures.inventory.name,
        config: SupportedFeatures.inventory.info.inventory,
        override: true
      },
      "consumable_1": {
        feature_id: SupportedFeatures.inventory.name,
        config: SupportedFeatures.inventory.info.inventory,
        override: true
      },
      "consumable_2": {
        feature_id: SupportedFeatures.inventory.name,
        config: SupportedFeatures.inventory.info.inventory,
        override: true
      },
      "consumable_3": {
        feature_id: SupportedFeatures.inventory.name,
        config: SupportedFeatures.inventory.info.inventory,
        override: true
      },
      "consumable_4": {
        feature_id: SupportedFeatures.inventory.name,
        config: SupportedFeatures.inventory.info.inventory,
        override: true
      },
      "consumable_5": {
        feature_id: SupportedFeatures.inventory.name,
        config: SupportedFeatures.inventory.info.inventory,
        override: true
      },
      "consumable_6": {
        feature_id: SupportedFeatures.inventory.name,
        config: SupportedFeatures.inventory.info.inventory,
        override: true
      },
      "consumable_7": {
        feature_id: SupportedFeatures.inventory.name,
        config: SupportedFeatures.inventory.info.inventory,
        override: true
      },
      "consumable_8": {
        feature_id: SupportedFeatures.inventory.name,
        config: SupportedFeatures.inventory.info.inventory,
        override: true
      },
      "consumable_9": {
        feature_id: SupportedFeatures.inventory.name,
        config: SupportedFeatures.inventory.info.inventory,
        override: true
      },
      "consumable_10": {
        feature_id: SupportedFeatures.inventory.name,
        config: SupportedFeatures.inventory.info.inventory,
        override: true
      },
      "consumable_11": {
        feature_id: SupportedFeatures.inventory.name,
        config: SupportedFeatures.inventory.info.inventory,
        override: true
      },
      "consumable_12": {
        feature_id: SupportedFeatures.inventory.name,
        config: SupportedFeatures.inventory.info.inventory,
        override: true
      },
      "consumable_13": {
        feature_id: SupportedFeatures.inventory.name,
        config: SupportedFeatures.inventory.info.inventory,
        override: true
      },
      "consumable_14": {
        feature_id: SupportedFeatures.inventory.name,
        config: SupportedFeatures.inventory.info.inventory,
        override: true
      },
      "consumable_15": {
        feature_id: SupportedFeatures.inventory.name,
        config: SupportedFeatures.inventory.info.inventory,
        override: true
      },
      "consumable_16": {
        feature_id: SupportedFeatures.inventory.name,
        config: SupportedFeatures.inventory.info.inventory,
        override: true
      },
      "consumable_17": {
        feature_id: SupportedFeatures.inventory.name,
        config: SupportedFeatures.inventory.info.inventory,
        override: true
      },
      "consumable_18": {
        feature_id: SupportedFeatures.inventory.name,
        config: SupportedFeatures.inventory.info.inventory,
        override: true
      },
      "consumable_19": {
        feature_id: SupportedFeatures.inventory.name,
        config: SupportedFeatures.inventory.info.inventory,
        override: true
      },
      "consumable_20": {
        feature_id: SupportedFeatures.inventory.name,
        config: SupportedFeatures.inventory.info.inventory,
        override: true
      },
      "consumable_21": {
        feature_id: SupportedFeatures.inventory.name,
        config: SupportedFeatures.inventory.info.inventory,
        override: true
      },
      "consumable_22": {
        feature_id: SupportedFeatures.inventory.name,
        config: SupportedFeatures.inventory.info.inventory,
        override: true
      },
      "consumable_23": {
        feature_id: SupportedFeatures.inventory.name,
        config: SupportedFeatures.inventory.info.inventory,
        override: true
      },
      "consumable_24": {
        feature_id: SupportedFeatures.inventory.name,
        config: SupportedFeatures.inventory.info.inventory,
        override: true
      },
      "consumable_25": {
        feature_id: SupportedFeatures.inventory.name,
        config: SupportedFeatures.inventory.info.inventory,
        override: true
      },
      "consumable_26": {
        feature_id: SupportedFeatures.inventory.name,
        config: SupportedFeatures.inventory.info.inventory,
        override: true
      },
      "consumable_27": {
        feature_id: SupportedFeatures.inventory.name,
        config: SupportedFeatures.inventory.info.inventory,
        override: true
      },
      "consumable_28": {
        feature_id: SupportedFeatures.inventory.name,
        config: SupportedFeatures.inventory.info.inventory,
        override: true
      },
      "consumable_29": {
        feature_id: SupportedFeatures.inventory.name,
        config: SupportedFeatures.inventory.info.inventory,
        override: true
      },
      "consumable_30": {
        feature_id: SupportedFeatures.inventory.name,
        config: SupportedFeatures.inventory.info.inventory,
        override: true
      },
      "consumable_31": {
        feature_id: SupportedFeatures.inventory.name,
        config: SupportedFeatures.inventory.info.inventory,
        override: true
      },
      "language": {
        feature_id: SupportedFeatures.localization.name,
        config: SupportedFeatures.localization.info.language,
        override: true,
      },
      "phase": {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.phase,
      },
      "mapid": {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.map_id,
        override: true,
      },
      "team_damage_dealt": {
        feature_id: SupportedFeatures.damage.name,
        config: SupportedFeatures.damage.info.team_damage_dealt,
      },
    }
  }
});
