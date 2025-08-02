define([
  '/games/valorant/supported_features.js'
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
      defused: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.spike_defused
      },
      detonated: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.spike_detonated
      },
      kill: {
        featureId: SupportedFeatures.kill.name,
        event: SupportedFeatures.kill.events.kill,
        useEventData: true
      },
      headshot: {
        featureId: SupportedFeatures.kill.name,
        event: SupportedFeatures.kill.events.headshot,
        useEventData: true
      },
      assist: {
        featureId: SupportedFeatures.kill.name,
        event: SupportedFeatures.kill.events.assist,
        useEventData: true
      },
      death: {
        featureId: SupportedFeatures.death.name,
        event: SupportedFeatures.death.events.death,
        useEventData: true
      },
      killfeed: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.kill_feed,
        useEventData: true
      },
      shop: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.shop,
        useEventData: true
      },
      tabmenu: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.scoreboard_screen,
        useEventData: true
      },
      planted_location: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.planted_location,
        useEventData: true
      },
    },
    InfoDB: {
      matchstate: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.state
      },
      playername: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.player_name
      },
      region: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.region
      },
      character: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.agent
      },
      player_id: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.player_id
      },
      scene: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.scene
      },
      game_mode: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.game_mode
      },
      round: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.round_number
      },
      round_phase: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.round_phase
      },
      round_report: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.round_report
      },
      round_outcome: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.score
      },
      match_score: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.match_score
      },
      team: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.team
      },
      roster_: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.roster_
      },
      kills: {
        feature_id: SupportedFeatures.kill.name,
        config: SupportedFeatures.kill.info.kills
      },
      headshots: {
        feature_id: SupportedFeatures.kill.name,
        config: SupportedFeatures.kill.info.headshots
      },
      assists: {
        feature_id: SupportedFeatures.kill.name,
        config: SupportedFeatures.kill.info.assists
      },
      deaths: {
        feature_id: SupportedFeatures.death.name,
        config: SupportedFeatures.death.info.deaths
      },
      scoreboard_: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.scoreboard_
      },
      killfeed: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.killfeed
      },
      map: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.map
      },
      health: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.health
      },
      abilities: {
        feature_id: SupportedFeatures.me.name,
        config: SupportedFeatures.me.info.abilities
      },
      escalation_stage: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.escalation_stage
      },
      spectated: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.observing
      },
      planted_site: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.planted_site,
        override: true,
      },
      match_id: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.match_id
      },
      ui_team_order_allies: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.ui_team_order_allies
      },
      ui_team_order_enemies: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.ui_team_order_enemies
      },
    }
  }
})