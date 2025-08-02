"use strict";

define([
  "/games/pubg/gameState/game-state.js",
  "/games/fortnite/supported_features.js"
], function(GameState, SupportedFeatures) {
  let GameStateLobbyFortnite = class GameStateLobbyFortnite extends GameState {
    constructor(config, featuresHandler) {
      super(config);
      this._featuresHandler = featuresHandler;
    }

    start(config, value) {
      super.start(config, value);

      if (!config.isStartOfGame) {
      }
    }

    process(infoKey, config, value, ignoreEvents) {
      if (config && config.key === "phase") {
        if (infoKey === "match_state") {
          if (value === "loading_screen") {
            this._stateManager.setState("loading", config, value);
          }

          if (value ==="replay") {
            this._stateManager.setState("replay", config, value);
          }
        }

        if (infoKey === "scene_state") {
          if (!this._stateManager.isLobby(value)) {
            this._stateManager.setState("airfield", config, value);
          }
        }

        if (infoKey === "vehicle_state") {
          if (value === "aircraft") {
            this._stateManager.setState("aircraft", config, value);
          }

          if (value === "free_fly") {
            this._stateManager.setState("freefly", config, value);
          }
        }
      }
    }
  };

  return GameStateLobbyFortnite;
});
