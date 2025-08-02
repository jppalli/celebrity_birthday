"use strict";

define([
    "/games/pubg/gameState/game_state_manager.js",
    "/games/rainbowsix/gameState/state_lobby.js",
    "/games/rainbowsix/gameState/state_announce.js",
    "/games/rainbowsix/gameState/state_operator_select.js",
    "/games/rainbowsix/gameState/state_loading.js",
    "/games/rainbowsix/gameState/state_results.js",
  ],
  function (GameStateManager, RainbowSixStateLobby, 
            RainbowSixStateAnnounce, RainbowSixStateOperator,
            RainbowSixStateLoading, RainbowSixStateResults) {

    let RainbowSixGameStateManager = class RainbowSixGameStateManager extends GameStateManager{
      constructor(config) {
        super(config);
        this._lobbyName = "lobby";
      }

      _registerDefaultStates(infoDB, featuresHandler) {
        super._registerDefaultStates(infoDB, featuresHandler);

        this.registerState("lobby", new RainbowSixStateLobby({
          name: "lobby",
          infoDB: infoDB,
          stateManager: this
        }, featuresHandler));


        this.registerState("announce", new RainbowSixStateAnnounce({
          name: "announce",
          infoDB: infoDB,
          stateManager: this
        }, featuresHandler));

        this.registerState("operator_select", new RainbowSixStateOperator({
          name: "operator_select",
          infoDB: infoDB,
          stateManager: this
        }));

        this.registerState("loading", new RainbowSixStateLoading({
          name: "loading",
          infoDB: infoDB,
          stateManager: this
        }));

        this.registerState("round_results", new RainbowSixStateResults({
          name: "round_results",
          infoDB: infoDB,
          stateManager: this
        }));

      }

    };
    return RainbowSixGameStateManager;
});