define([
  '/games/fortnite/supported_features.js'
], function (SupportedFeatures) {
  return {
    Events: {
      "knockout": {
        featureId: SupportedFeatures.kill.name,
        event: SupportedFeatures.kill.events.knockout,
        useEventData: true
      },
      "kill": {
        featureId: SupportedFeatures.kill.name,
        event: SupportedFeatures.kill.events.kill
      },
      "hit": {
        featureId: SupportedFeatures.kill.name,
        event: SupportedFeatures.kill.events.hit
      },
      "headshot": {
        featureId: SupportedFeatures.kill.name,
        event: SupportedFeatures.kill.events.hit
      },
      "killed": {
        featureId: SupportedFeatures.killed.name,
        event: SupportedFeatures.killed.events.killed,
        useEventData: true
      },
      "killer": {
        featureId: SupportedFeatures.killer.name,
        event: SupportedFeatures.killer.events.killer,
        useEventData: true
      },
      "revived": {
        featureId: SupportedFeatures.revived.name,
        event: SupportedFeatures.revived.events.revived
      },
      "knocked_out": {
        featureId: SupportedFeatures.death.name,
        event: SupportedFeatures.death.events.knockedout,
        useEventData: true
      },
      "dead": {
        featureId: SupportedFeatures.death.name,
        event: SupportedFeatures.death.events.death
      },
      "location": {
        featureId: SupportedFeatures.location.name,
        event: SupportedFeatures.location
      },
      "generic": {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.generic,
        useEventData: true
      },
      "rank": {
        featureId: SupportedFeatures.rank.name,
        event: SupportedFeatures.rank
      },
      "inventory_picked": {
        featureId: SupportedFeatures.items.name,
        event: SupportedFeatures.items
      },
      "inventory_update": {
        featureId: SupportedFeatures.items.name,
        event: SupportedFeatures.items
      },
      "inventory_dropped": {
        featureId: SupportedFeatures.items.name,
        event: SupportedFeatures.items
      },
      "quickbar_new_primary": {
        featureId: SupportedFeatures.items.name,
        event: SupportedFeatures.items
      },
      "quickbar_updated_primary": {
        featureId: SupportedFeatures.items.name,
        event: SupportedFeatures.items
      },
      "quickbar_removed_primary": {
        featureId: SupportedFeatures.items.name,
        event: SupportedFeatures.items
      },
      "accuracy": {
        featureId: SupportedFeatures.me.name,
        event: SupportedFeatures.me
      },
      "ping": {
        featureId: SupportedFeatures.counters.name,
        event: SupportedFeatures.counters,
        override: true,
      },
      "message_feed": {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info,
        override: true
      },
    },

    InfoDB: {
      "compass_update": {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.compass_update
      },
      "ticket_id": {
        feature_id: SupportedFeatures.match.name,
        config: SupportedFeatures.match.info.ticketID
      },
      "match_id_log": {
        feature_id: SupportedFeatures.match.name,
        config: SupportedFeatures.match.info.match_id_log,
        override: true
      },
      "scene_state": {
        feature_id: SupportedFeatures.phase.name,
        config: SupportedFeatures.phase.info.phase
      },
      "match_state": {
        feature_id: SupportedFeatures.phase.name,
        config: SupportedFeatures.phase.info.phase
      },
      "vehicle_state": {
        feature_id: SupportedFeatures.phase.name,
        config: SupportedFeatures.phase.info.phase
      },
      "game_type": {
        feature_id: SupportedFeatures.match.name,
        config: SupportedFeatures.match.info.mode,
        override: true
      },
      "health": {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.health
      },
      "shield": {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.shield
      },
      total_shots: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.total_shots
      },
      "total_teams": {
        feature_id: SupportedFeatures.rank.name,
        config: SupportedFeatures.rank.info.total_teams
      },
      "total_players": {
        feature_id: SupportedFeatures.rank.name,
        config: SupportedFeatures.rank.info.total_players
      },
      "team_members": {
        feature_id: SupportedFeatures.team.name,
        config: SupportedFeatures.team.info.nicknames
      },
      "primary_slot": {
        feature_id: SupportedFeatures.items.name,
        config: SupportedFeatures.items.info.selected_slot
      },
      "build_slot": {
        feature_id: SupportedFeatures.items.name,
        config: SupportedFeatures.items.info.selected_slot
      },
      "resource_slot": {
        feature_id: SupportedFeatures.items.name,
        config: SupportedFeatures.items.info.selected_material
      },
      "roster_": {
        feature_id: SupportedFeatures.roster.name,
        config: SupportedFeatures.roster.info.roster
      },
      "skirmish": {
        featureId: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.skirmish,
      },
      "match_stats": {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.match_stats
      },
      "vbucks": {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.vbucks,
        override: true
      },
       "over_shield": {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.over_shield
      },
    }
  }
});
