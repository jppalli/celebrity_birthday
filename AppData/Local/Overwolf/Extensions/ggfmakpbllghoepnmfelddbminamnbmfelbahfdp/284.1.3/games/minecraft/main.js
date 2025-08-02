define([
  '/games/service/GameService.js',
  '/games/minecraft/supported_features.js',
  '/games/minecraft/plugin_whitelist.js',
  '/games/minecraft/plugin.js'
],
  function (GameService,
    SupportedFeatures,
    PluginWhitelist,
    Plugin) {
    return new class MinecraftGameService extends GameService {
      constructor() {
        super({
          game: {
            id: 8032,
            name: "Minecraft"
          },
          eventOverrides: [],
          infoUpdateOverrides: [],
          supportedFeatures: SupportedFeatures,
          pluginWhitelist: PluginWhitelist,
          plugin: Plugin,
          logBlacklist: [
            'location',
            'facing',
            'player_',
            'chat'
          ],
          pluginStatesToReport: [
            'minecraft_version_not_supported'
          ]
        });
      }
    };
  });