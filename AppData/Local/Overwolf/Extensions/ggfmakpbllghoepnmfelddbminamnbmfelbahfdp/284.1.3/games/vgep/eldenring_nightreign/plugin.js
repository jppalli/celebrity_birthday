"use strict";

define([
  "/games/service/PluginHandler.js",
  "/utils/registry_utils.js"
], function (PluginHandler, RegistryUtils) {
  return class ErnPluginHandler extends PluginHandler {
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
  };
});