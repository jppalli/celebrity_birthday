define([
  "/games/service/GameService.js",
  "/games/starcraft2/supported_features.js",
  "/games/starcraft2/plugin_whitelists.js",
  "/games/starcraft2/plugin.js",
  "/games/starcraft2/textures/listener.js"
], function(
  GameService,
  SupportedFeatures,
  PluginWhitelist,
  Plugin,
  TextureListener
) {
  let SC2GameService = class SC2GameService extends GameService {
    constructor() {
      super({
        game: {
          id: 5855,
          name: "Starcraft 2"
        },
        eventOverrides: [],
        infoUpdateOverrides: [],
        supportedFeatures: SupportedFeatures,
        pluginWhitelist: PluginWhitelist,
        plugin: Plugin,
        logBlacklist: []
      });

      this._textureListener = new TextureListener(this._featuresHandler, this._infoDB);
    }

    async start(gameInfo, isDisabled) {
      super.start(gameInfo, isDisabled);
      try {
        this._textureListener.start();
      } catch (error) {
        console.log(`[SC2] Failed to start log listener: ${error}`);
      }
    }
  };

  return new SC2GameService();
});
