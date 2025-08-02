define(["/games/lost_ark/supported_features.js"], function (SupportedFeatures) {
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
      kill: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.kill,
        useEventData: true
      },
    },

    InfoDB: {
      player_class: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.player_class,
      },
      mob_details: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.mob_details,
      },
      location: {
        feature_id: SupportedFeatures.location.name,
        config: SupportedFeatures.location.info.location,
      },
      map: {
        feature_id: SupportedFeatures.location.name,
        config: SupportedFeatures.location.info.map,
      },
    }
  };
});
