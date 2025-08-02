"use strict";

define([
  "/games/service/PluginHandler.js"
], function (PluginHandler) {
  return class RepoPluginHandler extends PluginHandler {
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
      }
      super._handleSingleGameInfo(info);
    }

    _handleSingleEvent(event) {
      switch (event.name) {
        case 'round_start': {
          this._handleMatchStart();
          this._handleRoundStart();
          return;
        }
        case 'match_outcome':{
          this._handleRoundEnd();
          break;
        }
      }
      super._handleSingleEvent(event);
    }

    _handleSceneEvent(info) {
      switch (info.value) {
        case "host":
        case 'lobby': {
          this._handleMatchEnd();
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

    _handleRoundEnd() {
      super._handleSingleEvent({
        name: 'round_end',
        data: null
      });
    }

    _handleRoundStart() {
      if (!this._isMatchInProgress) {
        return;
      }
      setTimeout(() => {
        super._handleSingleEvent({
          name: 'round_start',
          data: null
        });
      }, 2000);
    }
  };
});