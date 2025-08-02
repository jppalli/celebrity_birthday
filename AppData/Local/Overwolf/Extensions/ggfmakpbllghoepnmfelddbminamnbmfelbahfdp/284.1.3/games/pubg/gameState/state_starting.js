"use strict";

define(["/games/pubg/gameState/game-state.js",
  "/games/pubg/supported_features.js"
],
  function (GameState, SupportedFeatures) {
    let GameStateStarting = class GameStateStarting extends GameState {
      constructor(config) {
        super(config);
      }

      start(config, value) {
        console.log("[STATE " + this._logName + "] start");
      }

      process(infoKey, config, value, ignoreEvents) {
        super.process(infoKey, config, value, ignoreEvents);

        if (
          config &&
          config.key === "phase" &&
          this._stateManager.isLobby(value)
        ) {
          let lobbyConfig = {
            isStartOfGame: true
          };
          for (let key in config) {
            if (config.hasOwnProperty(key)) {
              lobbyConfig[key] = config[key];
            }
          }
          this._stateManager.setState("lobby", lobbyConfig, value);
        }

        if (!ignoreEvents && infoKey === "scene_state") {
          if (value.includes("_Main")) {
            this._infoDB.set(SupportedFeatures.map.name,
              SupportedFeatures.map.info.map.category,
              SupportedFeatures.map.info.map.key,
              value);
          }
        }
      }
    };

    return GameStateStarting;
  });
