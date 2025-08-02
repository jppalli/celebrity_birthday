"use strict";

define([
    "/games/pubg/gameState/game-state.js",
    "/games/pubg/supported_features.js"
  ],
  function (GameState, SupportedFeatures) {

    let GameStateLanded = class GameStateLanded extends GameState{
      start(config, value){
        super.start(config, value);
      }

      process(infoKey, config, value, ignoreEvents) {
        super.process(infoKey, config, value, ignoreEvents);

        if(config.key === "phase" && this._stateManager.isLobby(value)){
          this._stateManager.setState("lobby", config, value);
        }
      }
    };

    return GameStateLanded;
});
