"use strict";

define([
  "/games/service/PluginHandler.js",
  "/utils/base_utils.js",
  '/games/marvel_rivals/game_constants.js'
], function (PluginHandler, BaseUtils, Constants) {
  return class MrPluginHandler extends PluginHandler {

    _kills = 0;
    _deaths = 0;
    _assists = 0;
    clearTimeoutId = null;
    clearTimeoutName = null;
    roster_ready = false;
    reveal_names = false;
    roster_sent = false;
    _matchstarted = false;
    gameType = null;
    isFirstRound = true;
    player_names = [];

    constructor(config) {
      super(config);
      this.character_id = Constants.character_id;
      this.mode_id = Constants.mode_id;
      this.rosterObj = {};
      this._rosterArray = [];
    }



    start(gameInfo, infoDB, featuresHandler, isDisabled) {
      super.start(gameInfo, infoDB, featuresHandler, isDisabled);

    }

    stop() {
      super.stop();
    }

    _handleSingleGameInfo(info) {
      let whiteListInfo = this._pluginWhitelist.InfoDB[info.key];

      switch (info.key) {
        case 'roster': {
          this._handleRoster(info);
          return;
        }
        case 'local_player': {
          this._handlePlayerName(info);
          break;
        }
        case 'game_mode': {
          this._handlegameType(info);
          break;
        }
        case 'scene': {
          this._handleScene(info);
          break;
        }
        case 'match_outcome': {
          this._handleMatchOutcome(info);
          break;
        }
        case 'banned_heros': {
          this._handleBannedHeros(info);
          break;
        }
        case 'score_info': {
          this._handleObjectiveProgress(info);
          break;
        }
        case (info.key.match(/ability_cd/) || {}).input: {
          this._handleAbilityCooldown(info);
          break;
        }
        case (info.key.match(/additional_ability_cd/) || {}).input: {
          this._handleAdditionAlabilityCd(info);
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
        case "kill_feed": {
          this._handlekillFeed(event);
          break;
        }
        case "round_start": {
          this._handleRoundStart();
          break;
        }
        case "round_end": {
          this._handleRoundEnd();
          break;
        }
        case "match_start": {
          this._handleMatchStart();
          break;
        }
        case "scoreboard_players": {
          this._handlePlayersNames(event);
          break;
        }
      }

      super._handleSingleEvent(event);
    }

    _handleRoster(info) {
      let value = info.value;
      if (value == "{}") {
        this.rosterObj = {};   
        for (let i = 0; i < this._rosterArray.length; i++) {
          let rosterEntry = this._rosterArray[i];
          if (rosterEntry) {
            this._infoDB.set(
              "match_info",
              "match_info",
              "roster_" + [i],
              null
            );
          }
        }

        this._rosterArray = [];

        return;
      }
      value = JSON.parse(value);
      const rosterMap = Object.fromEntries(
        Object.entries(this.rosterObj).map(([key, player]) => [player.uid, { key, player }])
      );

      this.rosterObj = {};
      value.forEach((player, index) => {
        if (rosterMap[player.uid]) {
          this.rosterObj[`roster_${index}`] = { ...rosterMap[player.uid].player, ...player };
        } else {
          this.rosterObj[`roster_${index}`] = player;
        }
      });

      Object.entries(this.rosterObj).forEach(([key, value]) => {
        value.is_local = value.is_local === 1 ? true : false;
        value.is_teammate = value.is_teammate === 1 ? true : false;
        value.is_alive = value.is_alive === 1 ? true : false;
        value.character_name = this.character_id[value.character_id] !== undefined ? this.character_id[value.character_id] : "UNKNOWN";

        value.name = BaseUtils.b64DecodeUnicode(value.name);
        const original_name = value.name;

        if (this.gameType === "Competitive" && value.elo_score >= 4100 && !this.reveal_names) {
          value.name = "*****";
        }

        if (value.name === "*****" && this.player_names.includes(original_name)) {
          value.name = original_name;
        }

        let rosterIndex = parseInt(key.split("_")[1], 10);
        this._rosterArray[rosterIndex] = JSON.stringify(value);

        if (value.is_local === true) {
          this._handleLocalKDA(value);
        }

        if (!value.is_teammate && !this.roster_sent) {
          value.character_name = null;
          value.character_id = null;
        }

        let featureInfo = this._supportedFeatures.match_info;
        this._infoDB.set(
          featureInfo.name,
          featureInfo.info.roster.category,
          key,
          JSON.stringify(value)
        );
      });

    }

    _findInRoster(uid) {
      for (let i = 0; i < 12; i++) {
        let prevRosterData = this._infoDB.get("match_info", "roster_" + i);
        if (prevRosterData) {
          prevRosterData = JSON.parse(prevRosterData);
          if (prevRosterData.uid === uid) {
            return prevRosterData;
          }
        }
      }
      return null;
    }

    _handlePlayerName(info) {

      info.value = BaseUtils.b64DecodeUnicode(info.value);

      let featureInfo = this._supportedFeatures.game_info;

      this._infoDB.set(featureInfo.name,
        featureInfo.info.player_name.category,
        featureInfo.info.player_name.key,
        info.value);


    }

    _handlegameType(info) {

      let value = info.value;
      let featureInfo = this._supportedFeatures.match_info;

      if (value == 0) {
        return;
      }

      const mode_data = this.mode_id[value] !== undefined ? this.mode_id[value] : "UNKNOWN";
      let map_name = null;
      let mode_name = null;
      let type_name = null;

      if (mode_data === "UNKNOWN") {
        map_name = "UNKNOWN";
        mode_name = "UNKNOWN";
        type_name = "UNKNOWN";
      } else {
        map_name = mode_data.map;
        mode_name = mode_data.game_mode;
        type_name = mode_data.game_type;
      }

      this.gameType = type_name;

      this._infoDB.set(featureInfo.name,
        featureInfo.info.game_mode.category,
        featureInfo.info.game_mode.key,
        mode_name);

      this._infoDB.set(featureInfo.name,
        featureInfo.info.game_type.category,
        featureInfo.info.game_type.key,
        type_name);

      this._infoDB.set(featureInfo.name,
        featureInfo.info.map.category,
        featureInfo.info.map.key,
        map_name);
    }


    _handleLocalKDA(info) {
      if (info.kills > this._kills) {
        let feature = this._supportedFeatures.match_info;
        this._featuresHandler.triggerEvent(
          feature.name,
          feature.events.kill.name,
          info.kills
        );
        this._kills = info.kills;
      }

      if (info.deaths > this._deaths) {
        let feature = this._supportedFeatures.match_info;
        this._featuresHandler.triggerEvent(
          feature.name,
          feature.events.death.name,
          info.deaths
        );
        this._deaths = info.deaths;
      }

      if (info.assists > this._assists) {
        let feature = this._supportedFeatures.match_info;
        this._featuresHandler.triggerEvent(
          feature.name,
          feature.events.assist.name,
          info.assists
        );
        this._assists = info.assists;
      }
    }

    _handleScene(info) {

      if (info.value === "Lobby") {
        let featureInfo = this._supportedFeatures.match_info;
        this._infoDB.set(featureInfo.name,
          featureInfo.info.game_mode.category,
          featureInfo.info.game_mode.key,
          null);

        this._infoDB.set(featureInfo.name,
          featureInfo.info.map.category,
          featureInfo.info.map.key,
          null);

        this._infoDB.set(featureInfo.name,
          featureInfo.info.game_type.category,
          featureInfo.info.game_type.key,
          null);

        this._infoDB.set(featureInfo.name,
          featureInfo.info.match_id.category,
          featureInfo.info.match_id.key,
          null);

        if (this._matchstarted) {
          this._handleMatchEnd();
        }
      }
    }

    _handleMatchOutcome(info) {

      let feature = this._supportedFeatures.match_info;
      this._infoDB.set(feature.name,
        feature.info.match_outcome.category,
        feature.info.match_outcome.key,
        info.value);

      if (this._matchstarted) {
        this._handleMatchEnd();
      }
    }

    _handleBannedHeros(info) {
      let value = JSON.parse(info.value);

      let processed = value.map((entry) => {
        return {
          character_id: entry.character_id,
          character_name: this.character_id[entry.character_id] !== undefined
            ? this.character_id[entry.character_id]
            : "UNKNOWN",
          is_teammate: entry.is_teammate === "1"
        };
      });

      let feature = this._supportedFeatures.match_info;
      this._infoDB.set(
        feature.name,
        feature.info.banned_characters.category,
        feature.info.banned_characters.key,
        JSON.stringify(processed)
      );
    }

    _handleObjectiveProgress(info) {
      let value = JSON.parse(info.value);

      if (value.game_mode === 0) {
        value.game_mode = "Domination";
      } else if (value.game_mode === 1) {
        value.game_mode = "Convoy";
      } else {
        value.game_mode = "Convergence";
      }

      let feature = this._supportedFeatures.match_info;
      this._infoDB.set(
        feature.name,
        feature.info.objective_progress.category,
        feature.info.objective_progress.key,
        JSON.stringify(value)
      );
    }

    _handleAbilityCooldown(info) {
      const parts = info.key.split('_');
      let key = parts[parts.length - 1];
      key = parseInt(key);
      let value = info.value;
      value = parseInt(value);
      const abilityKey = `ability_cooldown_${key}`;
      let feature = this._supportedFeatures.match_info;
      this._infoDB.set(
        feature.name,
        feature.info[abilityKey].category,
        feature.info[abilityKey].key,
        value
      );
    }

    _handleAdditionAlabilityCd(info) {
      const parts = info.key.split('_');
      let key = parts[parts.length - 1];
      key = parseInt(key);
      let value = info.value;
      value = parseInt(value);
      const abilityKey = `additional_ability_cd_${key}`;
      let feature = this._supportedFeatures.match_info;
      this._infoDB.set(
        feature.name,
        feature.info[abilityKey].category,
        feature.info[abilityKey].key,
        value
      );
    }

    _handlekillFeed(event) {
      let value = JSON.parse(event.data);
      value.attacker = BaseUtils.b64DecodeUnicode(value.attacker);
      value.victim = BaseUtils.b64DecodeUnicode(value.victim);
      value = JSON.stringify(value);

      let feature = this._supportedFeatures.match_info;
      this._featuresHandler.triggerEvent(
        feature.name,
        feature.events.kill_feed.name,
        value
      );
    }

    _handleMatchStart() {
      this._matchstarted = true;

      let feature = this._supportedFeatures.match_info;
      this._featuresHandler.triggerEvent(
        feature.name,
        feature.events.match_start.name,
        null
      );

      this._infoDB.set(feature.name,
        feature.info.match_outcome.category,
        feature.info.match_outcome.key,
        null);
    }

    _handleMatchEnd() {
      let feature = this._supportedFeatures.match_info;
      this._featuresHandler.triggerEvent(
        feature.name,
        feature.events.match_end.name,
        null
      );

      this._matchstarted = false;
      this._kills = 0;
      this._deaths = 0;
      this._assists = 0;
      this.roster_sent = false
      this.isFirstRound = true;
      this.player_names = [];
      this._cancelClearRosterTimout();
      this._cancelClearNameTimout();

      this._infoDB.set(
        feature.name,
        feature.info.banned_characters.category,
        feature.info.banned_characters.key,
        null
      );
    }

    _handleRoundStart() {

      for (let i = 0; i < this._rosterArray.length; i++) {
        let rosterEntry = this._rosterArray[i];
        if (rosterEntry) {
          rosterEntry = JSON.parse(rosterEntry);
          if (!rosterEntry.is_teammate) {
            rosterEntry.character_name = null;
            rosterEntry.character_id = null;
          }

          this._infoDB.set(
            "match_info",
            "match_info",
            "roster_" + [i],
            JSON.stringify(rosterEntry)
          );
        }
      }

      if (!this.clearTimeoutId) {
        this.clearTimeoutId = setTimeout(() => {
          this.roster_ready = true;
          if (this.roster_ready && !this.roster_sent) {
            for (let i = 0; i < this._rosterArray.length; i++) {
              let rosterEntry = this._rosterArray[i];
              if (rosterEntry) {
                this._infoDB.set(
                  "match_info",
                  "match_info",
                  "roster_" + [i],
                  rosterEntry
                );
              }
            }
            this.roster_sent = true;
          }
          this.clearTimeoutId = null; 
        }, 60000); 
      }

      if (this.isFirstRound || !this.clearTimeoutName) {
        this.clearTimeoutName = setTimeout(() => {
          this.reveal_names = true;
          this.clearTimeoutName = null; 
        }, 120000); 
      }

      this.isFirstRound = false;
    }

    _handleRoundEnd() {
      this._cancelClearRosterTimout();
      this.roster_sent = false
    }

    _cancelClearRosterTimout() {
      if (this.clearTimeoutId) {
        clearTimeout(this.clearTimeoutId);
        this.clearTimeoutId = null; 
      }
      this.roster_ready = false;
    }

    _cancelClearNameTimout() {
      if (this.clearTimeoutName) {
        clearTimeout(this.clearTimeoutName);
        this.clearTimeoutName = null; 
      }
      this.reveal_names = false;
    }

    _handlePlayersNames(event) {
      let players = JSON.parse(event.data); 
      if (this.player_names.length === 0) {
        this.player_names = players.map(player => {
          const key = Object.keys(player)[0];
          return player[key].replace(/<\/?[^>]+>/g, '');
        });
      }
    }
  };
});