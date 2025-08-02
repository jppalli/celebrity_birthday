"use strict";

define([
    "/games/pubg/gameState/state_loading.js",
    "/games/fortnite/supported_features.js"
  ],
  function (GameStateLoading, SupportedFeatures) {


    let GameStateLoadingFortnite = class GameStateLoadingFortnite extends GameStateLoading{
      start(config, mapName){
        super.start(config, mapName);
      }

      process(infoKey, config, value, ignoreEvents) {

        let lobbyName = this._stateManager.getLobbyName();

        if(config && config.key === "phase"){
          switch(value){
            case "waiting_for_players":
            case "WaitingToStart":
              this._stateManager.setState("airfield", config, value);
              break;
            case lobbyName:
              this._stateManager.setState("lobby", config, value);
              break;
            case "replay":
              this._stateManager.setState("replay", config, value);
              break;
            default:
              if(ignoreEvents){
                break;
              }
              if(infoKey === "scene_state") {
                this._infoDB.set(SupportedFeatures.map.name,
                  SupportedFeatures.map.info.map.category,
                  SupportedFeatures.map.info.map.key,
                  value);
              }

              if(infoKey === "vehicle_state"){

                if(value === "aircraft"){
                  this._stateManager.setState("aircraft", config, value);
                }

                if(value === "free_fly"){
                  this._stateManager.setState("freefly", config, value);
                }
              }
              break;
          }
        }
      }
    };

    return GameStateLoadingFortnite;
});
