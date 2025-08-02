"use strict";

define([
    "/games/pubg/supported_features.js",
  ],
  function (SupportedFeatures) {
    let GameState = class GameState{
      constructor(config) {
        this._name = config.name;
        this._logName = config.name.toUpperCase();
        if(config.hasOwnProperty("key")) {
          this._key = config.key;
        }
        this._infoDB = config.infoDB;
        this._stateManager = config.stateManager;
      }

      start(config, value) {
        let key = this._key ? this._key : this._name;
        this._infoDB.set(SupportedFeatures.phase.name,
                         SupportedFeatures.phase.info.phase.category,
                         SupportedFeatures.phase.info.phase.key,
                         key);
      }

      process(infoKey, config, value, ignoreEvents) {
      }

      processEvent(eventName, eventData) {
      }

      get name(){
        return this._name;
      }
    };

    return GameState;
  });