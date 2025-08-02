define([
  '/games/path_of_exile/supported_features.js'
  ], function(SupportedFeatures) {

  return {
    Events: {
      "death": {
        featureId: SupportedFeatures.death.name,
        event: SupportedFeatures.death.events.death
      },
      "boss_kill": {
        featureId: SupportedFeatures.kill.name,
        event: SupportedFeatures.kill.events.boss_kill,
        override: true
      },
      "chat_message": {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.chat,
        override: true
      }
    },

    InfoDB: {
      opened_page: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.opened_page
      },
      closed_page: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.opened_page
      },
      current_zone: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.current_zone
      },
      character_name: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.character_name
      },
      character_level: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.character_level
      },
      language: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.language
      },
      chat_language: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.chat_language
      }
    }
  }
});
