"use strict";

define([
  "/games/pubg/gameState/state_starting.js",
    "/games/pubg/gameState/state_lobby.js",
    "/games/pubg/gameState/state_loading.js",
    "/games/pubg/gameState/state_airfield.js",
    "/games/pubg/gameState/state_aircraft.js",
    "/games/pubg/gameState/state_freefly.js",
    "/games/pubg/gameState/state_landed.js",
    "/games/pubg/supported_features.js"
  ],
  function (StateStarting, StateLobby, StateLoading, StateAirfield, StateAircraft, StateFreefly, StateLanded, SupportedFeatures) {

    let GameStateManager = class GameStateManager {
      constructor(config) {

        this._lobbyName = "lobby";
        this._airfieldName = "WaitingToStart";
        this._currentState = null;
        this._stateMap = {};

        this._plugin = config.plugin;
        this._infoDB = config.infoDB;

        this._registerDefaultStates(config.infoDB, config.featuresHandler);
        this.setState("starting", null, null);
      }

      registerState(name, state) {
        this._stateMap[name] = state;
      }

      setState(name, info, value) {
        this._currentState = this._stateMap[name];

        if (typeof this._currentState === 'undefined' || this._currentState === null) {
          console.error("[STATE MANAGER] requested change to unregistered state" +
            " | " + name);
          return;
        }

        this._currentState.start(info, value);
        this._plugin.onStateChane(name);
      }

      process(infoKey, config, value, ignoreEvents) {
        if (config.key === "phase") {
          this._currentState.process(infoKey, config, value, ignoreEvents);
          return true;
        }
        else {
          return false;
        }
      }

      processEvent(eventName, eventData) {
        let keys = Object.keys(this._stateMap);
        keys.forEach( state => {
          this._stateMap[state].processEvent(eventName, eventData)
        })
      }

      getLobbyName() {
        return this._lobbyName;
      }

      isLobby(value) {
        if(value === this._lobbyName){
          return true;
        }

        return value.toLowerCase().indexOf(this._lobbyName) >= 0;
      }

      getAirfieldName(){
        return this._airfieldName;
      }

      _registerDefaultStates(infoDB, featuresHandler) {
        this.registerState("starting", new StateStarting({
          name: "starting",
          infoDB: infoDB,
          stateManager: this
        }));

        this.registerState("lobby", new StateLobby({
          name: "lobby",
          infoDB: infoDB,
          stateManager: this
        }, featuresHandler));

        this.registerState("loading", new StateLoading({
          name: "loading",
          key: "loading_screen",
          infoDB: infoDB,
          stateManager: this
        }));

        this.registerState("airfield", new StateAirfield({
          name: "airfield",
          infoDB: infoDB,
          stateManager: this
        }));

        this.registerState("aircraft", new StateAircraft({
          name: "aircraft",
          infoDB: infoDB,
          stateManager: this
        }));

        this.registerState("freefly", new StateFreefly({
          name: "freefly",
          infoDB: infoDB,
          stateManager: this
        }));

        this.registerState("landing", new StateLanded({
          name: "landing",
          key: "landed",
          infoDB: infoDB,
          stateManager: this
        }));
      }

    };
    return GameStateManager;
});