"use strict";

define([
    "/games/pubg/gameState/game-state.js",
    "/games/pubg/supported_features.js"
  ],
  function (GameState, SupportedFeatures) {

    let GameStateFreefly = class GameStateFreefly extends GameState{
      start(config, value){
        super.start(config, value);
      }

      process(infoKey, config, value, ignoreEvents) {
        super.process(infoKey, config, value, ignoreEvents);

        if(config && config.key === "phase"){
          if(value === "landing"){
            this._stateManager.setState("landing", config, value);
          }
          else if(this._stateManager.isLobby(value)){
            this._stateManager.setState("lobby", config, value);
          }
        }
      }
    };

    return GameStateFreefly;
});
