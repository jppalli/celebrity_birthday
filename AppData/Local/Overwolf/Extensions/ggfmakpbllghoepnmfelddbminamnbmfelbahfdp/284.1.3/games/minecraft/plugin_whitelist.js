define([
  '/games/minecraft/supported_features.js'
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
      chat: {
        featureId: SupportedFeatures.match_info.name,
        event: SupportedFeatures.match_info.events.chat,
		    useEventData: true
      }
    },
    InfoDB: {
      scene: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.scene
      },
      scene_key: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.scene_key
      },
      name: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.name
      },
      server: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.server
      },
      server_info: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.server_info
      },
      items_stats: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.items_stats
      },
      general_stats: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.general_stats
      },
      mobs_stats: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.mobs_stats
      },
      location: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.location
      },
      facing: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.facing
      },
      addon_: {
        feature_id: SupportedFeatures.mods.name,
        config: SupportedFeatures.mods.info.mods
      },
      player_: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.player_,
      },
      ping: {
        feature_id: SupportedFeatures.counters.name,
        config: SupportedFeatures.counters.info.ping
      },
      mc_version: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.mc_version
      },
      biome: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.biome
      },
      dimension: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.dimension
      },
      world_id: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.world_id
      },
      game_dir: {
        feature_id: SupportedFeatures.game_info.name,
        config: SupportedFeatures.game_info.info.game_dir
      },
      realms_info: {
        feature_id: SupportedFeatures.match_info.name,
        config: SupportedFeatures.match_info.info.realms_info
      },
    }
  }
})