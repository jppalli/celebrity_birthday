"use strict";

define([
  "/games/service/PluginHandler.js",
  "/utils/registry_utils.js"
], function (PluginHandler, RegistryUtils) {
  return class HoPluginHandler extends PluginHandler {
    _isMatchInProgress = false;
    _isBattleInProgress = false;
    _isDefeat = undefined;

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
      }

      super._handleSingleGameInfo(info);
    }

    _handleSingleEvent(event) {

      super._handleSingleEvent(event);
    }

    _handleSceneEvent(info) {
      switch (info.value) {
        case 'lobby': {
          this._handleMatchEnd();
          break;
        }
        case 'ingame': {
          this._handleMatchStart();
          break;
        }
        case 'battle': {
          this._handleBattleStart();
          break;
        }
        case 'defeat': {
          this._handleDefeat();
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

      this._isDefeat == undefined;
    }
    _handleMatchStart() {
      if (this._isBattleInProgress) {
        super._handleSingleEvent({
          name: 'battle_end',
          data: null
        });
        this._isBattleInProgress = false;
      }

      if (this._isDefeat == false) {
        super._handleSingleEvent({
          name: 'match_outcome',
          data: "victory"
        });
      }

            if (this._isMatchInProgress) {
        return;
      }

      this._isMatchInProgress = true;
      super._handleSingleEvent({
        name: 'match_start',
        data: null
      });
    }
    _handleBattleStart() {
      if (this._isBattleInProgress) {
        return;
      }

      this._isBattleInProgress = true;
      this._isDefeat = false
    }
    _handleDefeat() {
      this._isDefeat = true;
    }
  };
});