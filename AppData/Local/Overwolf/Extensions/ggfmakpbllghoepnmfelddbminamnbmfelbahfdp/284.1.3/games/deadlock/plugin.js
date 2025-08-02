"use strict";

define([
  "/games/service/PluginHandler.js",
  "/libs/js-uuid.js",
  "/utils/base_utils.js",
  "/games/deadlock/game_constants.js",
  "/utils/registry_utils.js"
], function (PluginHandler, uuid, BaseUtils, Constants, RegistryUtils) {
  return class DeadlockPluginHandler extends PluginHandler {
    _featuresToClearOnMatchEnd = [
      {
        feature: this._supportedFeatures.me,
        infos: [

        ]
      },
      {
        feature: this._supportedFeatures.location,
        infos: [

        ]
      }
    ];

    _matchstarted = false;
    _kills = 0;
    _deaths = 0;
    _assists = 0;
    _myTeam = null;

    constructor(config) {
      super(config);
      this.hero_id = Constants.hero_id;
    }



    start(gameInfo, infoDB, featuresHandler, isDisabled) {
      super.start(gameInfo, infoDB, featuresHandler, isDisabled);

      this.getRegkey(gameInfo);
    }

    stop() {
      super.stop();
    }

    _handleSingleGameInfo(info) {
      let whiteListInfo = this._pluginWhitelist.InfoDB[info.key];

      if (this._handleMapInfo(info, whiteListInfo)) {
        return;
      }

      if (this._handleGamePhaseInfo(info, whiteListInfo)) {
        return;
      }

      if (this._handleGameModeInfo(info, whiteListInfo)) {
        return;
      }

      if (this._handleMatchHistoryInfo(info, whiteListInfo)) {
        return;
      }

      if (this._handleRosterInfo(info)) {
        return;
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
        case "match_start":
          this._handleMatchStartEvent(event, metadata);
          break;
        case "match_end":
          this._handleMatchEndEvent(event, metadata);
          break;
      }

      super._handleSingleEvent(event);

    }

    _handleMapInfo(info, whiteListInfo) {
      if (!info.key.startsWith("player_map")) {
        return false;
      }
      this._infoDB.set(whiteListInfo.feature_id,
        whiteListInfo.config.category,
        whiteListInfo.config.key,
        info.value);
    }
    _handleGamePhaseInfo(info, whiteListInfo) {
      if (!info.key.startsWith("game_phase")) {
        return false;
      }

      info.value = info.value.replace("EGameState_", "");

      this._infoDB.set(whiteListInfo.feature_id,
        whiteListInfo.config.category,
        whiteListInfo.config.key,
        info.value);
    }
    _handleGameModeInfo(info, whiteListInfo) {
      if (!info.key.startsWith("game_mode")) {
        return false;
      }

      let value = JSON.parse(info.value);
      value.match_mode = value.match_mode.replace("k_ECitadelMatchMode_", "");
      value.game_mode = value.game_mode.replace("k_ECitadelGameMode_", "");
      value = JSON.stringify(value)

      this._infoDB.set(whiteListInfo.feature_id,
        whiteListInfo.config.category,
        whiteListInfo.config.key,
        value);
    }
    _handleMatchHistoryInfo(info, whiteListInfo) {
      if (!info.key.startsWith("match_history")) {
        return false;
      }

      let value = JSON.parse(info.value);

      if (Array.isArray(value)) {
        value = value.map(match => {
          match.hero_name = this.hero_id[match.hero_id] !== undefined ? this.hero_id[match.hero_id] : "UNKNOWN";
          return match;
        });
      } else {
        value.hero_name = this.hero_id[value.hero_id] !== undefined ? this.hero_id[value.hero_id] : "UNKNOWN";
      }

      value = JSON.stringify(value);

      this._infoDB.set(whiteListInfo.feature_id,
        whiteListInfo.config.category,
        whiteListInfo.config.key,
        value);
    }

    _handleRosterInfo(info) {
      if (!info.key.startsWith("roster_")) {
        return false;
      }

      let featureInfo = this._supportedFeatures.match_info;
      let value = JSON.parse(info.value);
      value.is_local = value.is_local == 1 ? true : false;
      value.souls = value.net_worth_souls;
      delete value.net_worth_souls;
      value.hero_name = this.hero_id[value.hero_id] !== undefined ? this.hero_id[value.hero_id] : "UNKNOWN";

      if (value.is_local == true) {
        this._handleLocalKDA(info);

        if (this._myTeam == null) {
          this._myTeam = value.team_name;
        }
      }

      value = JSON.stringify(value)

      this._infoDB.set(featureInfo.name,
        featureInfo.info.roster_.category,
        info.key,
        value);
    }


    _handleMatchStartEvent(eventInfo, metadata) {

      if (this._matchstarted == false) {
        let feature = this._supportedFeatures.match_info;
        this._featuresHandler.triggerEvent(
          feature.name,
          feature.events.match_start.name,
          null
        );
        this._matchstarted = true;
      }
    }


    _handleMatchEndEvent(eventInfo, metadata) {

      if (this._matchstarted == true) {
        let feature = this._supportedFeatures.match_info;
        this._featuresHandler.triggerEvent(
          feature.name,
          feature.events.match_end.name,
          null
        );

        this._clearData(this._featuresToClearOnMatchEnd);
        this._matchstarted = false;
        this._kills = 0;
        this._deaths = 0;
        this._assists = 0;
        this._myTeam = null;
      }
    }




    _handleLocalKDA(info) {
      let value = JSON.parse(info.value);
      if (value.kills > this._kills) {
        let feature = this._supportedFeatures.match_info;
        this._featuresHandler.triggerEvent(
          feature.name,
          feature.events.kill.name,
          null
        );
        this._kills = value.kills;
      }

      if (value.deaths > this._deaths) {
        let feature = this._supportedFeatures.match_info;
        this._featuresHandler.triggerEvent(
          feature.name,
          feature.events.death.name,
          null
        );
        this._deaths = value.deaths;
      }

      if (value.assist > this._assists) {
        let feature = this._supportedFeatures.match_info;
        this._featuresHandler.triggerEvent(
          feature.name,
          feature.events.assist.name,
          null
        );
        this._assists = value.assist;
      }
    }

    async getRegkey(gameInfo) {

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
          console.log("_infoDB is null or undefined.");
        }
      }
      catch (error) {
        console.log("Error fetching registry key:", error);
      }

    }
  };
});