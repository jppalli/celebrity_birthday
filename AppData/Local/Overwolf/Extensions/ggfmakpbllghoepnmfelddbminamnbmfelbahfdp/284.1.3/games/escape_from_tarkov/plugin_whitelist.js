define([
  '/games/escape_from_tarkov/supported_features.js'
], function (SupportedFeatures) {
  return {
    Events: {
      match_start: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.match_start
      },
      match_end: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.match_end
      },
      death: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.death
      }
    },
    InfoDB: {
      scene_state: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.phase
      },
      mapname_state: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.map
      },
      raid_type: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.raid_type
      },
      session_type: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.session_type,
        override: true,
      },
      quests_list_0: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.quests_list,
        override: true,
      },
      quests_list_0: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.quests_list_0,
        override: true,
      },
      quests_list_1: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.quests_list_1,
        override: true,
      },
      quests_list_2: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.quests_list_2,
        override: true,
      },
      quests_list_3: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.quests_list_3,
        override: true,
      },
      quests_list_4: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.quests_list_4,
        override: true,
      },
      quests_list_5: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.quests_list_5,
        override: true,
      },
      quests_list_6: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.quests_list_6,
        override: true,
      },
      quests_list_7: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.quests_list_7,
        override: true,
      },
      quests_list_8: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.quests_list_8,
        override: true,
      },
      quests_list_9: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.quests_list_9,
        override: true,
      },
    }
  }
})