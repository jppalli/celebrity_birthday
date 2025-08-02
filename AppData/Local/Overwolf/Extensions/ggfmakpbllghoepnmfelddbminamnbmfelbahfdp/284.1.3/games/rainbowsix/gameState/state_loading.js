"use strict";

define([
    "/games/rainbowsix/gameState/game-state.js"
  ],
  function (GameState) {

    let GameStateLoadingRainbowSix = class GameStateLoadingRainbowSix extends GameState {

      constructor(config, featuresHandler){
        super(config);
        this._featuresHandler = featuresHandler;
      }

      start(config, value) {
        super.start(config, value);
      }

      process(infoKey, config, value, ignoreEvents) {
        if(config && config.key === "phase"){
          if(infoKey === "scene_state" && value !== "unknown_0" && value !== "unknown_1") {
            this._stateManager.setState(value, config, value);
          }
        }
      }
    };

    return GameStateLoadingRainbowSix;
});
