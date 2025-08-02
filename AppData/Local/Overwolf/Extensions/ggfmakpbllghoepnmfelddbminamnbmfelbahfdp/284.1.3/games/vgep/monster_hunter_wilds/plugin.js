"use strict";

define([
  "/games/service/PluginHandler.js"
], function (PluginHandler) {
  return class MHwildsPluginHandler extends PluginHandler {
    _isMatchInProgress = false;
    _isBossKillAllowed = true;
    _bossKillTimeout = null;

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

      switch (event.data) {
        case 'boss_kill': {
          this._handleBossKillEvent(event);
          break;
        }
      }

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

      if (this._bossKillTimeout) {
        clearTimeout(this._bossKillTimeout);
        this._bossKillTimeout = null;
        this._isBossKillAllowed = true;
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
    _handleBossKillEvent(event) {
      if (!this._isMatchInProgress || !this._isBossKillAllowed) {
        return;
      }

      const matchInfo = this._supportedFeatures.match_info;
      this._featuresHandler.triggerEvent(
        matchInfo.name,
        matchInfo.events.boss_kill.name,
        null
      );

      this._isBossKillAllowed = false

      if (this._bossKillTimeout) {
        clearTimeout(this._bossKillTimeout);
      }

      this._bossKillTimeout = setTimeout(() => {
        this._isBossKillAllowed = true;
        this._bossKillTimeout = null;
      }, 60000); 
    }
  };
});