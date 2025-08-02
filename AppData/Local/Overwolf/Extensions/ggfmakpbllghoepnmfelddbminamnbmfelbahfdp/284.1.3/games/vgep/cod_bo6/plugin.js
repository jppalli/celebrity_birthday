"use strict";

define([
  "/games/service/PluginHandler.js"
], function (PluginHandler) {
  return class CodBo6PluginHandler extends PluginHandler {
    _isMatchInProgress = false;

    constructor(config) {
      super(config);
    }

    start(gameInfo, infoDB, featuresHandler, isDisabled) {
      this._infoDB = infoDB;
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
        case 'game_mode': {
          this._handleGameModeEvent(info);
          break;
        }
      }

      super._handleSingleGameInfo(info);
    }

    _handleSingleEvent(event) {

      super._handleSingleEvent(event);
    }

    _handleSceneEvent(info) {
      switch (info.value) {
        case 'ingame': {
          this._handleMatchStart();
          break;
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
    }

    _handleGameModeEvent() {
      if (this._infoDB) {
        this._infoDB.set(
          this._supportedFeatures.game_info.name,
          this._supportedFeatures.game_info.info.scene.category,
          this._supportedFeatures.game_info.info.scene.key,
          "lobby");

          this._handleMatchEnd();

                } else {
        console.error("_infoDB is null or undefined.");
      }
    }
  };
});