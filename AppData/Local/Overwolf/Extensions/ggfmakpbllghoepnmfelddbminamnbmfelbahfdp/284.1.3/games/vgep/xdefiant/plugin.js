"use strict";

define([
  "/games/service/PluginHandler.js",
  "/utils/registry_utils.js"
], function (PluginHandler, RegistryUtils) {
  return class XdGameService extends PluginHandler {
    _isMatchInProgress = false;
    _eliminationCount = 0;
    _deathCount = 0;

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
      let pluginEventName = event.name;
      let metadata = this._pluginWhitelist.Events[pluginEventName];
      if (!metadata) {
        return;
      }

      switch (event.name) {
        case 'elimination': {
          this._eliminationCount++;
          event.data = this._eliminationCount;
          break;
        }
        case 'death': {
          this._deathCount++;
          event.data = this._deathCount;
          break;
        }

              }

      super._handleSingleEvent(event);
    }

    _handleSceneEvent(info) {
      switch (info.value) {
        case 'match_summary': {
          this._handleMatchEnd();
          break;
        }
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

      this._eliminationCount = 0;
      this._deathCount = 0;
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