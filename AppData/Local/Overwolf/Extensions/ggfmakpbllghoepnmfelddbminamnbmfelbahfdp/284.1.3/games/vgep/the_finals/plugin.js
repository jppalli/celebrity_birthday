"use strict";

define([
  "/games/service/PluginHandler.js",
  "/utils/registry_utils.js"
], function (PluginHandler, RegistryUtils) {
  return class TfPluginHandler extends PluginHandler {
    _isMatchInProgress = false;
    _eliminationCount = 0;
    _deathCount = 0;

    constructor(config) {
      super(config);
    }

    start(gameInfo, infoDB, featuresHandler, isDisabled) {
      this._infoDB = infoDB;
      this.getRegkey();
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

    async getRegkey() {
      try {
        let regKeyData = await RegistryUtils.getCurrentUserKey("Software\\Valve\\Steam\\ActiveProcess", "ActiveUser");
        console.log("Registry Key Data:", regKeyData);

        regKeyData = BigInt(regKeyData);
        let constantId = BigInt("76561197960265728");

        const steamID = regKeyData + constantId;

        if (this._infoDB) {
          this._infoDB.set(
            this._supportedFeatures.game_info.name,
            this._supportedFeatures.game_info.info.steam_id.category,
            this._supportedFeatures.game_info.info.steam_id.key,
            steamID.toString());

        } else {
          console.error("_infoDB is null or undefined.");
        }
      }
      catch (error) {
        console.error("Error fetching registry key:", error);
      }
    }

    _handleSceneEvent(info) {
      switch (info.value) {
        case 'summary':
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