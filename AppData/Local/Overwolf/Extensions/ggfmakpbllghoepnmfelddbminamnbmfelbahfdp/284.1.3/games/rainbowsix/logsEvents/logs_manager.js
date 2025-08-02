"use strict";

define([
  '/games/rainbowsix/supported_features.js',
  '/utils/analytics.js'
], function (SupportedFeatures,
  Analytics) {
  const MAP_CODES = {
    "00000037625C3900": "HOUSE",
    "00000035F2901CF4": "OREGON",
    "0000001DCA7A2258": "HEREFORD BASE",
    "0000000031E6DF85": "CLUB HOUSE",
    "000000009B858528": "PRESIDENTIAL PLANE",
    "000000009B858E7A": "CONSULATE",
    "00000052C53F0506": "BANK",
    "00000000570932C9": "KANAL",
    "0000003C7E4A5A5D": "CHALET",
    "00000000522587EA": "KAFE DOSTOYEVSKY",
    "000000006961015C": "YACHT",
    "000000473DCA77EF": "BORDER",
    "0000004CCD9FE066": "FAVELA",
    "0000004053835E1E": "SKYSCRAPER",
    "00000000A0C50B9A": "BARLETT UNIVERSITY",
    "00000009CCC3D997": "COASTLINE",
    "0000002E8679C826": "THEME PARK",
    "0000000C7C6E5654": "TOWER",
    "00000014839B2B18": "VILLA",
    "0000001D61EAFB8F": "FORTRESS",
    "000000546CF2DD4F": "OUTBACK",
    "000000550CA6FED4": "EMERALD PLAINS",
    "000000585E25818B": "SHINDEN",
    "00000057AC2280B2": "CLOSE QUARTER",
    "00000040DC810C48": "M.U.T.E COMM TOWER",
    "0000000B3555E074": "DOKTORS CASTLE",
    "0000003EE107746E": "STADIUM BRAVO",
    "00000058260EEFB3": "NIGHTHAVEN LABS",
    "000000002A3A99CB": "HEREFORD BASE",
    "000000584B31FC7D": "CONSULATE",
    "0000005A5AF8ECF7": "LAIR",
    "0000005C4B99AE00": "ARCTIC WORKSHOP",
    "0000005E8EED99F9": "DISTRICT"
  };

  const ROUND_END_REASON = {
    AttackersEliminated: "team_has_been_eliminated",
    BombExploded: "bomb_detonated",
    BombDeactivated_OneBomb: "bomb_deactivated",
    TimeExpired: "time_has_expired",
    HostageExtracted: "extracted_thehostages",
    DefendersKilledHostage: "killed_hostages",
    AttackersKilledHostage: "killed_hostages",
    ObjectiveCaptured: "objective_secured",
    ObjectiveProtected: "objective_protected",
    DefuserDeactivated: "defuser_deactivated",
    DefendersEliminated: "team_has_been_eliminated"
  };

  const WON_OUTCOME = {
    true: "victory",
    false: "defeat",
  };

  let LogsManager = class LogsManager {
    constructor(config) {
      this._featuresHandler = config.featuresHandler;
      this._infoDB = config.infoDB;
      this._pluginHandler = config.pluginHandler;
    }

    _triggerEvent(feature, name, data) {
      this._featuresHandler.triggerEvent(feature, name, data);
    }

    _updateInfo(feature, category, key, value) {
      this._infoDB.set(feature, category, key, value);
    }

    _triggerKnockedoutEvent() {
      let feature = SupportedFeatures.death;
      this._triggerEvent(feature.feature, feature.events.knockedout.name, null);
      return true;
    }


    _handleMapId(info) {
      var value = JSON.parse(info.value);
      var map_id = value.MAP;
      let mapValue =
        MAP_CODES[map_id] !== undefined ? MAP_CODES[map_id] : "UNKNOWN";
      var feature = SupportedFeatures.match_info;
      this._updateInfo(
        feature.feature,
        feature.infoDB.map_id.category,
        feature.infoDB.map_id.key,
        mapValue
      );
    }

    _handleRoundStartLog(info) {
      this._handleMapId(info);
      var feature = SupportedFeatures.match;
      this._triggerEvent(feature.feature, feature.events.roundStart.name, null);
      this._updateInfo("match_info", "match_info", "round_outcome_type", null);
      return true;
    }

    _handleMatchEndLog(info) {
      var value = JSON.parse(info.value);
      var round_won = value.MATCHWON;
      var feature = SupportedFeatures.match;

      if (round_won === "true" || round_won === "false") {
        this._triggerEvent(
          feature.feature,
          feature.events.matchOutcome.name,
          WON_OUTCOME[round_won]
        );
      }
      this._updateInfo("match_info", "match_info", "map_id", null);
      this._updateInfo("match_info", "match_info", "match_id", null);
      this._updateInfo("match_info", "match_info", "round_outcome_type", null);
      var feature = SupportedFeatures.match_info;
      this._triggerEvent(feature.feature, feature.events.match_end.name, null);
      if (this._pluginHandler) {
        this._pluginHandler.setMatchEnded(true);
      }
      this._updateInfo("match_info", "match_info", "game_mode_log", null);
      this._updateInfo("match_info", "match_info", "game_mode", null);
      this._updateInfo("roster", "players", "players_list_log", null);
      return true;
    }


    _handleMatchStartLog(info) {
      var feature = SupportedFeatures.match_info;
      this._triggerEvent(feature.feature, feature.events.match_start.name, null);
      if (this._pluginHandler) {
        this._pluginHandler.setMatchEnded(false);
      }
      return true;
    }

    _handleRoundEndLog(info) {
      var value = JSON.parse(info.value);
      var end_reason = value.ENDROUNDREASON;
      var round_won = value.ROUNDWON;
      var feature = SupportedFeatures.match_info;
      let endReasonValue =
        ROUND_END_REASON[end_reason] !== undefined
          ? ROUND_END_REASON[end_reason]
          : null;

      this._updateInfo(
        feature.feature,
        feature.infoDB.round_outcome_type.category,
        feature.infoDB.round_outcome_type.key,
        endReasonValue
      );

      if (end_reason === "DefuserDeactivated") {
        var feature = SupportedFeatures.defuser;
        this._triggerEvent(feature.feature, feature.events.defuser_disabled.name, null);
      }

      var feature = SupportedFeatures.match;
      this._triggerEvent(feature.feature, feature.events.roundEnd.name, null);

      if (round_won === "true" || round_won === "false") {
        this._triggerEvent(
          feature.feature,
          feature.events.roundOutcome.name,
          WON_OUTCOME[round_won]
        );
      }
      this._updateInfo("match_info", "match_info", "round_start_log", null);
      return true;
    }

    _handleKillLog(info) {
      var value = JSON.parse(info.value);
      var is_headshot = value.ISHEADSHOT;
      var feature = SupportedFeatures.kill;
      this._triggerEvent(feature.feature, feature.events.kill.name, null);

      if (is_headshot) {
        this._triggerEvent(feature.feature, feature.events.headshot.name, null);
      }
      return true;
    }

    _handleDeathLog(info) {
      var isCreatedDate;
      try {
        var value = JSON.parse(info.value);
        if (typeof value.createdDate !== "undefined") {
          isCreatedDate = true;
        }
      } catch {
        isCreatedDate = info.value.includes('createdDate');
      }

      if (!isCreatedDate) {
        var feature = SupportedFeatures.death;
        this._triggerEvent(feature.feature, feature.events.death.name, null);
        var killerId = value.KILLERID;
        this._triggerEvent(feature.feature, feature.events.killer.name, killerId)
        return true;
      }
    }

    _handleGeneralLog(info) {
      try {
        const data = JSON.parse(info);
        const matchContext = data.find(item => item.type === "context.start.MATCH");

        if (matchContext) {
          const matchId = matchContext.typeData.contextName;
          var feature = SupportedFeatures.match_info;
          this._updateInfo(feature.feature, feature.infoDB.match_id.category, feature.infoDB.match_id.key, matchId)
        } else {
          console.log("No matching context.start.MATCH found in the array.");
        }
        console.log("[GENERAL LOG PARSER] GENERAL_LOG parsed with success");
      }

      catch {
        info = "[" + info.value + "]";
        const data = JSON.parse(info);
        const matchContext = data.find(item => item.type === "context.start.MATCH");

        if (matchContext) {
          const matchId = matchContext.typeData.contextName;
          var feature = SupportedFeatures.match_info;
          this._updateInfo(feature.feature, feature.infoDB.match_id.category, feature.infoDB.match_id.key, matchId)
        } else {
          console.log("No matching context.start.MATCH found in the array.");
        }
        console.log("[GENERAL LOG PARSER] GENERAL_LOG parsed with success");
      }


      return true;
    }

    _handleGameModeLog(info) {
      var value = JSON.parse(info.value);
      var gameMode = value.GAMEMODE;

      if (gameMode) {
        var feature = SupportedFeatures.match_info;
        this._updateInfo(feature.feature, feature.infoDB.game_mode.category, feature.infoDB.game_mode.key, gameMode)
      }
    }



    handleLogEvent(info) {
      var key = info.key;
      switch (key) {
        case "ko_log":
          this._triggerKnockedoutEvent();
          return false;
        case "round_start_log":
          this._handleRoundStartLog(info);
          return false;
        case "match_start_log":
          this._handleMatchStartLog(info);
          return false;
        case "match_end_log":
          this._handleMatchEndLog(info);
          return false;
        case "round_end_log":
          this._handleRoundEndLog(info);
          return false;
        case "kill_log":
          this._handleKillLog(info);
          return false;
        case "death_log":
          this._handleDeathLog(info);
          return false;
        case "general_log":
          this._handleGeneralLog(info);
          return false;
        case "game_mode_log":
          this._handleGameModeLog(info);
          return false;
        default:
          return false;
      }
    }
  };
  return LogsManager;
});
