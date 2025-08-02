'use strict';

define([
  '/games/service/PluginHandler.js',
  '/games/rainbowsix/gameState/game_state_manager.js',
  '/games/rainbowsix/logsEvents/logs_manager.js',
  '/libs/js-uuid.js',
  "/utils/registry_utils.js"
], function (PluginHandler,
  StateManager,
  LogsManager,
  uuid,
  RegistryUtils) {

  let matchEnded = false;


  let RainbowSixPluginHandler = class RainbowSixPluginHandler extends PluginHandler {


    constructor(config) {
      super(config);

      this._gameStateManager = null;
      this._logsManager = null
      this._pseudo_match_id = null;
      this._isPbe = false;
      this._local_player_id = null
      this._isSteam = false;
    }



    start(gameInfo, infoDB, featuresHandler, isDisabled) {
      super.start(gameInfo, infoDB, featuresHandler, isDisabled);



      this._gameStateManager = new StateManager({
        infoDB: infoDB,
        featuresHandler: featuresHandler,
        plugin: this
      });

      this._logsManager = new LogsManager({
        infoDB: infoDB,
        featuresHandler: featuresHandler,
        pluginHandler: this
      })

      this._setPbeIfRelevant(gameInfo);
      this.getRegkey(gameInfo);
    }

    stop() {
      super.stop();
    }

    _setPbeIfRelevant(gameInfo) {
      const executionPath = gameInfo.executionPath;
      if (!executionPath) {
        return false;
      }

      if (executionPath.trim() === "") {
        return false;
      }

      this._isPbe = executionPath.includes("r6siege");
      if (!this._isPbe) {
        console.log("R6 PBE version");
        this._setPBEMode();
      }
    }

    _setPBEMode() {
      if (typeof this._monitoring != 'undefined') {
        this._monitoring.setPBE(true);
        return;
      }

      setTimeout(() => {
        this._monitoring.setPBE(true);
      }, 1000);
    }

    async retrieveTmpLog(infoDB) {
      while (true) {
        let tmpLog = infoDB.get("me", "account_id_log");
        if (tmpLog) {
          try {
            tmpLog = JSON.parse(tmpLog);
            return tmpLog.content.profileId;
          } catch (error) {
            console.log("Error parsing JSON:", error);
          }
        }
        await new Promise(resolve => setTimeout(resolve, 1000)); 
      }
    }

    onStateChane(newState) {
      let feature, info, event;
      if (newState === "lobby") {
        feature = this._supportedFeatures.match;
        info = feature.infoDB.roundNumber;
        this._infoDB.set(feature.feature, info.category, info.key, null);
        feature = this._supportedFeatures.match_info;
        info = feature.infoDB.pseudo_match_id;
        this._infoDB.set(feature.feature, info.category, info.key, null);
        this._pseudo_match_id = null;
        this.clearRoster();

        if (this._local_player_id == null) {
          this.retrieveTmpLog(this._infoDB)
            .then(profileId => {
              this._local_player_id = profileId;
              console.log("Success parsing local player ID:", this._local_player_id);
            })
            .catch(error => {
              console.log("Error retrieving tmpLog:", error);
            });
        }
      }
    }

    _handleSingleGameInfo(info) {
      if (info.key.endsWith("_log")) {
        if (this._logsManager.handleLogEvent(info)) {
          return;
        }
      }
      if (info.key == "round_outcome_type") {
        console.log("ignore old plugin", info);
        return;
      }

      if ((info.key.match(/roster_/) || {}).input) {

        if (this.isMatchEnded() && info.value != "{}") {
          return
        }

        const value = JSON.parse(info.value);
        value.player = value.player;
        value.is_anonymous = value.is_anonymous === "0" ? false : true;
        value.team = value.team === "0" ? "Blue" : "Orange";
        value.kills = +value.kills;
        value.deaths = +value.deaths;
        value.assists = +value.assists;
        value.score = +value.score;
        value.ping = +value.ping;
        value.operator = value.operator;
        value.player_id = value.player_id;
        value.is_local = value.player_id === this._local_player_id ? true : false;
        value.suffix = +value.suffix;
        delete value.health;
        info.value = JSON.stringify(value);
      }

      super._handleSingleGameInfo(info);

      let whiteListInfo = this._pluginWhitelist.InfoDB[info.key];
      if (!whiteListInfo) {
        return;
      }

      if (info.key === "round") {
        let roundNumber = parseInt(info.value);
        if (roundNumber === 1) {
          let matchInfo = this._supportedFeatures.match_info;
          let infoUpdate = matchInfo.infoDB.pseudo_match_id;
          if (this._pseudo_match_id) {
            this._infoDB.set(matchInfo.feature, infoUpdate.category, infoUpdate.key, null);
          }
          this._pseudo_match_id = uuid.v4();
          this._infoDB.set(matchInfo.feature, infoUpdate.category, infoUpdate.key, this._pseudo_match_id);
        }
      }


      this._gameStateManager.process(info.key, whiteListInfo.config, info.value, this._ignoreEvents);
    }

    _handleSingleEvent(pluginEvent) {
      super._handleSingleEvent(pluginEvent);

      let pluginEventName = pluginEvent.name;
      let whitelistMetadata = this._pluginWhitelist.Events[pluginEventName];
      if (!whitelistMetadata) {
        return;
      }
    }

    clearRoster() {
      let feature = this._supportedFeatures.roster;
      let info = feature.infoDB.roster_;
      let key = info.key.substring(0, info.key.indexOf("_") + 1);
      let rosterIndex = 0;
      for (let i = 0; i < 12; i++) {
        if (this._infoDB.get("roster", "roster_" + i) != null) {
          rosterIndex = i;
        }
      }

      for (let i = 0; i <= rosterIndex; i++) {
        this._infoDB.set(feature.feature, info.category, key + i, null);
      }
    }

    async getRegkey(gameInfo) {
      const commandLine = gameInfo.commandLine;
      if (!commandLine) {
        return false;
      }

      this._isSteam = commandLine.includes("steam");
      if (this._isSteam) {
        console.log("R6 Steam version");
        try {
          let regKeyData = await RegistryUtils.getCurrentUserKey("Software\\Valve\\Steam\\ActiveProcess", "ActiveUser");
          console.log("Registry Key Data:", regKeyData);

          regKeyData = BigInt(regKeyData);
          let constantId = BigInt("76561197960265728");

          const steamID = regKeyData + constantId;

          if (this._infoDB) {
            this._infoDB.set(
              this._supportedFeatures.game_info.feature,
              this._supportedFeatures.game_info.infoDB.steam_id.category,
              this._supportedFeatures.game_info.infoDB.steam_id.key,
              steamID.toString());

          } else {
            console.log("_infoDB is null or undefined.");
          }
        }
        catch (error) {
          console.log("Error fetching registry key:", error);
        }
      } else {
        console.log("R6 Ubisofe version");
      }
    }

    setMatchEnded = (flag) => {
      matchEnded = flag;
    };

    isMatchEnded = () => {
      return matchEnded;
    };

  };
  return RainbowSixPluginHandler;
});
