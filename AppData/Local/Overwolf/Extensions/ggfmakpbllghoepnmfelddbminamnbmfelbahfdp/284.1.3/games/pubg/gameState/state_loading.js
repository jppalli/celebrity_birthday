"use strict";

define([
  "/games/pubg/gameState/game-state.js",
  "/games/pubg/supported_features.js"
],
  function (GameState, SupportedFeatures) {


    let GameStateLoading = class GameStateLoading extends GameState {
      start(config, mapName) {
        super.start(config, mapName);
      }

      process(infoKey, config, value, ignoreEvents) {
        super.process(infoKey, config, value, ignoreEvents);

        let airFieldName = this._stateManager.getAirfieldName();

        if (config && config.key === "phase") {

          if (value === airFieldName) {
            this._stateManager.setState("airfield", config, value);
          }
          else if (this._stateManager.isLobby(value)) {
            this._stateManager.setState("lobby", config, value);
          }
          else if (!ignoreEvents && infoKey === "scene_state") {
            this._infoDB.set(SupportedFeatures.map.name,
              SupportedFeatures.map.info.map.category,
              SupportedFeatures.map.info.map.key,
              value);
          }
        }
      }
    };

    return GameStateLoading;
  });
