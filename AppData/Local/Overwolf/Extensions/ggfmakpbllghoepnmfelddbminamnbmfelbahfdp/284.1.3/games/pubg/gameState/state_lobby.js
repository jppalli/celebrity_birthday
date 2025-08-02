"use strict";

define([
    "/games/pubg/gameState/game-state.js",
    "/games/pubg/supported_features.js"
  ],
  function (GameState, SupportedFeatures) {

    let GameStateLobby = class GameStateLobby extends GameState{

      constructor(config, featuresHandler){
        super(config);
        this._featuresHandler = featuresHandler;
        this._matchStart = false;
      }

      start(config, value){
        super.start(config, value);

        if(!config.isStartOfGame){
          if ( this._matchStart ) {
           this._featuresHandler.triggerEvent(SupportedFeatures.match.name,
                                             SupportedFeatures.match.events.matchEnd.name,
                                             SupportedFeatures.match.events.matchEnd.data);
           this._matchStart = false;
          }


          let feature = SupportedFeatures.match_info;
          this._infoDB.set(feature.name,
                           feature.info.pseudo_match_id.category,
                           feature.info.pseudo_match_id.key,
                           null);

          feature = SupportedFeatures.location;
          if (feature.info.team_location) {
            this._infoDB.set(feature.name,
                             feature.info.team_location.category,
                             feature.info.team_location.key,
                             null);
          }

          for (let i = 0; i < 100; i++) {
            this._infoDB.set(
              SupportedFeatures.me.name,
              SupportedFeatures.me.info.inventory.category,
              SupportedFeatures.me.info.inventory.key + i,
              null
            );
          }
          for (let i = 0; i < 20; i++) {
            this._infoDB.set(
              SupportedFeatures.me.name,
              SupportedFeatures.me.info.equipped.category,
              SupportedFeatures.me.info.equipped.key + i,
              null
            );
          }

          this._infoDB.set(
            SupportedFeatures.rank.name,
            SupportedFeatures.rank.info.total_teams.category,
            SupportedFeatures.rank.info.total_teams.key,
            null
          );
          this._infoDB.set(
            SupportedFeatures.me.name,
            SupportedFeatures.me.info.weaponState.category,
            SupportedFeatures.me.info.weaponState.key,
            null
          );
          this._infoDB.set(
            SupportedFeatures.match.name,
            SupportedFeatures.match.info.match_id.category,
            SupportedFeatures.match.info.match_id.key,
            null
          );
          this._infoDB.set(
            SupportedFeatures.me.name,
            SupportedFeatures.me.info.health.category,
            SupportedFeatures.me.info.health.key,
            null
          );
          this._infoDB.set(
            SupportedFeatures.map.name,
            SupportedFeatures.map.info.map.category,
            SupportedFeatures.map.info.map.key,
            null
          );
        }
      }

      process(infoKey, config, value, ignoreEvents) {
        super.process(infoKey, config, value, ignoreEvents);

        if(config && config.key === "phase" && infoKey === "scene_state" && !this._stateManager.isLobby(value)){
          if (value.includes("_Main")) {
            this._infoDB.set(SupportedFeatures.map.name,
              SupportedFeatures.map.info.map.category,
              SupportedFeatures.map.info.map.key,
              value);
          }
          this._stateManager.setState("loading", config, value);
        }
      }

      processEvent(eventName, eventData) {
        switch (eventName) {
          case 'game_end':
            this._matchStart = false;
            break;

          case 'game_start':
            console.info('[GameStateLobby] match start');
            this._matchStart = true;
            break;
        }
      }

    };

    return GameStateLobby;
});
