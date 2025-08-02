"use strict";

define([
  "/games/rainbowsix/supported_features.js"
],
  function (SupportedFeatures) {

    const INFO_UPDATE_TIMEOUT = 2000;
    const HEALTH_CONST = 0; 0; 

    const TEAMS = {
      0: "Blue",
      1: "Orange",
      2: "Spectator",
    };

    const _getRealHealth = function (health) {
      if (health === null) {
        return null;
      }
      else {
        let realHealth = health - HEALTH_CONST;
        if (realHealth < 0) {
          realHealth = 0;
        }
        return realHealth;
      }
    };

    let _lastLocalPlayerInfo = null;

    let RosterManager = class RosterManager {
      constructor(config) {
        this.roster = new Array(0);
        this._playersInfo = new Array(0);
        this._infoDB = config.infoDB;
        this._featuresHandler = config.featuresHandler;

        this._rosterUpdates = false;
        this._updateTimeout = null;
        this._isKnockedOut = false;
      }

      start() {
      }

      stop() {
      }

      process(whitelistConfig, pluginInfo) {
        if (!pluginInfo.key.startsWith("roster_")) {
          return false;
        }

        try {
          let key = pluginInfo.key;
          let indexStr = key.replace("roster_", "");
          let index = parseInt(indexStr);

          let playerInfo = pluginInfo.value;

          if (!playerInfo || playerInfo.length === 0 || playerInfo === "{}") {
            this._playerLeft(index);
          }
          else {
            playerInfo = pluginInfo.value;
            if (typeof pluginInfo.value === "string") {
              playerInfo = JSON.parse(pluginInfo.value);
            }

            this._playerJoined(index, playerInfo);
            this._updatePlayerInfo(index, JSON.stringify(this.roster[index]));

            if (this.roster[index].is_local) {
              this._handlePlayerInfo(index, playerInfo, !_lastLocalPlayerInfo);
              _lastLocalPlayerInfo = playerInfo;
            }
          }
          return true;
        }
        catch (e) {
          console.log(`[Rainbow Six roster] failed to parse index from ${JSON.stringify(pluginInfo)}`);
        }

        return false;
      }

      clearRoster() {
        for (let i = 0; i < 12; i++) {
          this._updatePlayerInfo(i, null);
        }

        this.roster = new Array(0);
        this._playersInfo = {};

        this._sendScoreInfo(null);
        this._sendKillsInfo(null);
        this._sendDeathsInfo(null);
        this._sendHealthInfo(null);
        this._sendTeamInfo(null);
      }

      _playerJoined(index, playerInfo) {
        console.log(`[Rainbow Six roster] player joined ${JSON.stringify(playerInfo)}`);
        this.roster[index] = {
          name: playerInfo.player,
          suffix: playerInfo.suffix,
          team: TEAMS[playerInfo.team],
          is_local: playerInfo.is_local === "1",
          operator: +playerInfo.operator,
          kills: +playerInfo.kills,
          deaths: +playerInfo.deaths,
          score: +playerInfo.score,
          health: +playerInfo.health,
          headshots: +playerInfo.headshots,
          defuser: +playerInfo.defuser,
          player_id: playerInfo.player_id,
        };
        this._playersInfo[index] = playerInfo;
      }

      _playerLeft(index) {
        console.log(`[Rainbow Six roster] player left ${this.roster[index].name}`);
        this.roster[index] = null;
        this._playersInfo[index] = null;

        this._updatePlayerInfo(index, null);
      }

      _updatePlayerInfo(index, playerInfo) {
        let feature = SupportedFeatures.roster;
        let info = feature.infoDB.playerInfo;
        this._infoDB.set(feature.feature, info.category, info.key + index, playerInfo);
      }

      _handlePlayerInfo(index, playerInfo, playerJoined) {
        let prevPlayerInfo = _lastLocalPlayerInfo;

        if (playerJoined || prevPlayerInfo.kills < playerInfo.kills) {
          console.log(`[Rainbow Six roster] detected player kill`);
          this._playersInfo[index].kills = playerInfo.kills;
          if (!playerJoined) {
          }
          this._sendKillsInfo(playerInfo.kills);
        }
        if (playerJoined || prevPlayerInfo.deaths < playerInfo.deaths) {
          console.log(`[Rainbow Six roster] detected player deaths`);
          this._playersInfo[index].deaths = playerInfo.deaths;
          if (!playerJoined) {
          }
          this._sendDeathsInfo(playerInfo.deaths);
        }
        if (playerJoined || prevPlayerInfo.health !== playerInfo.health) {
          console.log(`[Rainbow Six roster] detected player health change`);
          this._playersInfo[index].health = playerInfo.health;
          this._sendHealthInfo(playerInfo.health);
          if (!playerJoined) {
            this._triggerKnockedoutEvent(playerInfo.health);
          }
        }
        if (playerJoined || prevPlayerInfo.score !== playerInfo.score) {
          console.log(`[Rainbow Six roster] detected player score change`);
          this._playersInfo[index].score = playerInfo.score;
          this._sendScoreInfo(playerInfo.score);
        }
        if (playerJoined || prevPlayerInfo.team !== playerInfo.team) {
          console.log(`[Rainbow Six roster] detected player team change`);
          this._playersInfo[index].team = playerInfo.team;
          this._sendTeamInfo(playerInfo.team);
        }
      }



      _triggerKnockedoutEvent(health) {
        if (health <= 20 && health > 0) {
          if (this._isKnockedOut) {
            return;
          }
          this._isKnockedOut = true;
          let feature = SupportedFeatures.death;
          this._featuresHandler.triggerEvent(
            feature.feature,
            feature.events.knockedout.name,
            null);
        }
        else {
          this._isKnockedOut = false;
        }
      }

      _sendKillsInfo(kills) {
        let feature = SupportedFeatures.roster;
        let info = feature.infoDB.totalKills;
        this._infoDB.set(feature.feature, info.category, info.key, kills);
      }

      _sendDeathsInfo(deaths) {
        let feature = SupportedFeatures.roster;
        let info = feature.infoDB.totalDeaths;
        this._infoDB.set(feature.feature, info.category, info.key, deaths);
      }

      _sendHealthInfo(health) {
        let realHealth = _getRealHealth(health);
        let feature = SupportedFeatures.roster;
        let info = feature.infoDB.playerHealth;
        this._infoDB.set(feature.feature, info.category, info.key, realHealth);
      }

      _sendScoreInfo(score) {
        let feature = SupportedFeatures.roster;
        let info = feature.infoDB.playerScore;
        this._infoDB.set(feature.feature, info.category, info.key, score);
      }

      _sendTeamInfo(team) {
        let feature = SupportedFeatures.roster;
        let info = feature.infoDB.playerTeam;
        team = team ? TEAMS[team] : null;
        this._infoDB.set(feature.feature, info.category, info.key, team);
      }

      _getPlayerName(killerId) {
        for (var i = 0; i <= this.roster.length; i++) {
          if (this.roster[i] != null) {
            if (this.roster[i].player_id == killerId && this.roster[i].player_id != undefined) {
              var killerName = this.roster[i].name;
              break;
            }
          }
        }
        return killerName;
      }


    };

    return RosterManager;

  });
