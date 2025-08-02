"use strict";

define([
  "/games/pubg/gameState/game-state.js",
  "/games/pubg/supported_features.js"
], function(GameState, SupportedFeatures) {
  let GameStateReplay = class GameStateRelayFortnite extends GameState {
    start(config, value) {
      super.start(config, value);
    }

    process(infoKey, config, value, ignoreEvents) {
      super.process(infoKey, config, value, ignoreEvents);
      let lobbyName = this._stateManager.getLobbyName();

      if (config && config.key === "phase") {
        if (infoKey === "match_state" || infoKey === "scene_state") {
          if (value === "replay") {
            this._stateManager.setState("replay", config, value);
          } else if (value === "lobby") {
            this._stateManager.setState("lobby", config, value);
          }
        }
      }
    }
  };

  return GameStateReplay;
});
