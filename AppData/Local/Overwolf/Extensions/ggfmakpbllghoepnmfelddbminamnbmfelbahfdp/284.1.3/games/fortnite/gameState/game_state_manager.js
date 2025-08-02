"use strict";

define([
  "/games/pubg/gameState/game_state_manager.js",
  "/games/fortnite/gameState/state_lobby.js",
  "/games/fortnite/gameState/state_loading.js",
  "/games/fortnite/gameState/state_airfield.js",
  "/games/fortnite/gameState/state_freefly.js",
  "/games/fortnite/gameState/state_replay.js"
], function(
  GameStateManager,
  StateLobbyFortnite,
  StateLoadingFortnite,
  StateAirfieldFortnite,
  StateFreeflyFortnite,
  StateReplayFortnite
) {
  let ForniteGameStateManager = class ForniteGameStateManager extends GameStateManager {
    constructor(config) {
      super(config);
      this._lobbyName = "lobby";
    }

    _registerDefaultStates(infoDB, featuresHandler) {
      super._registerDefaultStates(infoDB, featuresHandler);

      this.registerState(
        "lobby",
        new StateLobbyFortnite(
          {
            name: "lobby",
            infoDB: infoDB,
            stateManager: this
          },
          featuresHandler
        )
      );

      this.registerState(
        "loading",
        new StateLoadingFortnite({
          name: "loading",
          key: "loading_screen",
          infoDB: infoDB,
          stateManager: this
        })
      );

      this.registerState(
        "airfield",
        new StateAirfieldFortnite({
          name: "airfield",
          key: "airfield",
          infoDB: infoDB,
          stateManager: this
        })
      );

      this.registerState(
        "freefly",
        new StateFreeflyFortnite({
          name: "freefly",
          infoDB: infoDB,
          stateManager: this
        })
      );

      this.registerState(
        "replay",
        new StateReplayFortnite({
          name: "replay",
          key: "replay",
          infoDB: infoDB,
          stateManager: this
        })
      );
    }
  };
  return ForniteGameStateManager;
});
