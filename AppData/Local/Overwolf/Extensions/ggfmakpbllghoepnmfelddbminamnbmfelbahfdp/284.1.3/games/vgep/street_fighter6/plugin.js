"use strict";

define([
  "/games/service/PluginHandler.js"
], function (PluginHandler) {
  return class Sf6PluginHandler extends PluginHandler {
    _isMatchInProgress = false;
    _localPlayerSide = null;

    constructor(config) {
      super(config);
    }

    start(gameInfo, infoDB, featuresHandler, isDisabled) {
      this._infoDB = infoDB;
      this._featuresHandler = featuresHandler;
      super.start(gameInfo, infoDB, featuresHandler, isDisabled);
    }

    _handleSingleGameInfo(info) {
      let whiteListInfo = this._pluginWhitelist.InfoDB[info.key];
      if (!whiteListInfo) {
        return;
      }
      switch (info.key) {
        case 'scene': {
          this._handleSceneEvent(info);
          break;
        }
      }
      super._handleSingleGameInfo(info);
    }

    _handleSingleEvent(event) {

      switch (event.name) {
        case 'round_start': {
          this._handleMatchStart();
          break;
        }
        case 'character_side_right':
        case 'character_side_left': {
          this._handleSidesEvents(event.name);
          break;
        }
        case 'win_left':
        case 'win_right': {
          this._handleMatchOutcome(event.name);
          break;
        }
        case 'result': {
          this._handleMatchEnd(event.name)
          break;
        }
        case 'match_outcome': {
          this._handleSceneOutcome();
          break;
        }
      }
      super._handleSingleEvent(event);
    }

    _handleSceneEvent(info) {
      switch (info.value) {
        case 'battle_hub':
        case 'fighting_ground': {
          this._handleGameMode(info.value);
          this._handleMatchEnd();
          break;
        }
        case 'match_outcome': {
          this._handleMatchEnd();
        }
      }
    }

    _handleMatchEnd() {
      if (!this._isMatchInProgress) {
        return;
      }

      this._isMatchInProgress = false;
      super._handleSingleEvent({
        name: 'match_end',
        data: null
      });
    }
    _handleMatchStart() {
      if (this._isMatchInProgress) {
        return;
      }

      this._isMatchInProgress = true;
      super._handleSingleEvent({
        name: 'match_start',
        data: null
      });

      const gameInfo = this._supportedFeatures.game_info;
      this._infoDB.set(
        gameInfo.name,
        gameInfo.info.scene.category,
        gameInfo.info.scene.key,
        "ingame"
      )

      this._localPlayerSide = null;
    }

    _handleMatchOutcome(event) {

      let data = null;
      if ((event === "win_left" && this._handleSides === "left") || (event === "win_right" && this._handleSides === "right")) {
        data = "victory";
      } else {
        data = "defeat";
      }
      const matchInfo = this._supportedFeatures.match_info;
      this._featuresHandler.triggerEvent(
        matchInfo.name,
        matchInfo.events.match_outcome.name,
        data
      );

      this._handleSceneOutcome();
      this._handleMatchEnd();
    }

    _handleSidesEvents(event) {

      if (event === "character_side_left") {
        this._handleSides = "left";
      } else {
        this._handleSides = "right";
      }
    }

    _handleSceneOutcome() {
      const gameInfo = this._supportedFeatures.game_info;
      this._infoDB.set(
        gameInfo.name,
        gameInfo.info.scene.category,
        gameInfo.info.scene.key,
        "match_outcome"
      )
      this._handleMatchEnd();
    }

    _handleGameMode(info) {
      const gameInfo = this._supportedFeatures.game_info;
      this._infoDB.set(
        gameInfo.name,
        gameInfo.info.game_mode.category,
        gameInfo.info.game_mode.key,
        info
      )
    }
  };
});