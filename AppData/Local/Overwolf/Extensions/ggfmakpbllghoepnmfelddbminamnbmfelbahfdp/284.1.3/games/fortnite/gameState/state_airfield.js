"use strict";

define([
    "/games/pubg/gameState/game-state.js"
  ],
  function (GameState) {

    let GameStateAirfieldFortnite = class GameStateAirfieldFortnite extends GameState{
      start(config, value){
        super.start(config, value);
      }

      process(infoKey, config, value, ignoreEvents) {
        super.process(infoKey, config, value, ignoreEvents);

        if(config && config.key === "phase"){
          if(value === "aircraft"){
            this._stateManager.setState("aircraft", config, value);
          }
          if(value === "free_fly"){
            this._stateManager.setState("freefly", config, value);
          } else if (value ==="replay") {
            this._stateManager.setState("replay", config, value);
          } else if(this._stateManager.isLobby(value)){
            this._stateManager.setState("lobby", config, value);
          }
        }
      }
    };

    return GameStateAirfieldFortnite;
});
