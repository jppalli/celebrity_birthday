define([
  "/games/starcraft2/textures/textures_data.js",
  "/games/starcraft2/supported_features.js"
], function(TexturesData, SupportedFeatures) {
  class SC2TextureListener {
    constructor(featuresHandler, infoDB) {
      this._featuresHandler = featuresHandler;
      this._infoDB = infoDB;
      this.start = this.start.bind(this);
      this._listener = this._listener.bind(this);

      this._victoryHashes = [
        TexturesData.terranVictory.hashstr,
        TexturesData.protossVictory.hashstr,
        TexturesData.zergVictory.hashstr
      ];
      this._matchEndTextures = [
        TexturesData.terranVictory,
        TexturesData.protossVictory,
        TexturesData.zergVictory,
        TexturesData.scoreScreen
      ];
      this._matchWon = false;
    }

    async start() {
      overwolfInternal.game.onHashesAppeared.removeListener(this._listener);
      overwolfInternal.game.onHashesAppeared.addListener(this._listener);

      overwolfInternal.game.setHashesOfInterest({
        hash_details_list: [TexturesData.matchStart]
      });
    }

    _listener(data) {
      const { hashes } = data;

      console.log("[SC2 TEXTURE LISTENER] Detected texture hashes: " + hashes);

      if (this._handleMatchStart(hashes)) {
        return;
      }

      if (this._handleVictory(hashes)) {
        return;
      }

      if (this._handleScoreScreen(hashes)) {
        return;
      }
    }

    _handleMatchStart(hashes) {
      if (hashes[0] != TexturesData.matchStart.hashstr) {
        return false;
      }

      const feature = SupportedFeatures.match_info;
      const event = feature.events.match_start;
      this._featuresHandler.triggerEvent(feature.name, event.name, null);

      overwolfInternal.game.setHashesOfInterest({
        hash_details_list: this._matchEndTextures
      });

      return true;
    }

    _handleVictory(hashes) {
      if (!this._victoryHashes.includes(`${hashes[0]}`)) {
        return false;
      }

      this._matchWon = true;

      return true;
    }

    _handleScoreScreen(hashes) {
      if (hashes[0] != TexturesData.scoreScreen.hashstr) {
        return false;
      }

      const data = this._matchWon ? "victory" : "defeat";
      const feature = SupportedFeatures.match_info;
      const event = feature.events.match_end;
      this._featuresHandler.triggerEvent(feature.name, event.name, data);
      this._matchWon = false;

      overwolfInternal.game.setHashesOfInterest({
        hash_details_list: [TexturesData.matchStart]
      });

      return true;
    }
  }

  return SC2TextureListener;
});
