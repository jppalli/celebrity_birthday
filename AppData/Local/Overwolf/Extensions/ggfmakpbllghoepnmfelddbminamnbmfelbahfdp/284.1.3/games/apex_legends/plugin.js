'use strict';

define([
  '/games/service/PluginHandler.js',
  '/games/apex_legends/roster/roster_manager.js',
  '/games/apex_legends/roster/team_manager.js',
  '/games/apex_legends/roster/legend_select_manager.js',
  '/games/apex_legends/hud_parser.js',
  '/games/apex_legends/inventory/backpack_items.js',
  '/games/apex_legends/inventory/weapons.js',
  '/libs/js-uuid.js',
  '/utils/base_utils.js',
  '/games/apex_legends/game_constants.js'
], function (PluginHandler,
  RosterManager,
  TeamManager,
  LegendSelectManager,
  HudParser,
  BackpackItems,
  Weapons,
  uuid,
  BaseUtils,
  Constants) {

  let ApexPluginHandler = class ApexPluginHandler extends PluginHandler {



    constructor(config) {
      super(config);

      this._language = null;
      this._isSpectating = false;
      this._isResetVictory = false;
      this._gameMode = null;
      this._modes = Constants.Game_Modes;
      this._maps = Constants.Map_Names;
      this.totla_kills = 0;
      this.totla_assists = 0;
      this.parsedPlayer = null;
      this.parsedInGame_player = null;
      this.is_map_name_reset = false;
      this.is_map_id_reset = false;
    }

    start(gameInfo, infoDB, featuresHandler, isDisabled) {
      super.start(gameInfo, infoDB, featuresHandler, isDisabled);

      this._rosterManager = new RosterManager({ infoDB });

      this._teamManager = new TeamManager({ infoDB });

      this._legendManager = new LegendSelectManager({ infoDB });

      this._hudParser = null;

      this._playerName = null;

      this._game = gameInfo;
    }

    stop() {
      super.stop();
    }

    _handleSingleGameInfo(info) {
      if (this._handleTabsInfo(info)) {
        return;
      }

      super._handleSingleGameInfo(info);

      let whiteListInfo = this._pluginWhitelist.InfoDB[info.key];
      if (!whiteListInfo) {
        return;
      }

      if (this._handleLocalPlayerInfo(info, whiteListInfo)) {
        return;
      }

      if (this._handleConsumableInfo(info, whiteListInfo)) {
        return;
      }

      if (this._handleWeaponsInfo(info, whiteListInfo)) {
        return;
      }

      if (this._handleGameModeInfo(info, whiteListInfo)) {
        return;
      }

      if (this._handleLanguageInfo(info, whiteListInfo)) {
        return;
      }


      if (this._handlePhaseInfo(info)) {
        return;
      }

      if (this._handleMapInfo(info, whiteListInfo)) {
        return;
      }

      this._teamManager.process(info);
      this._legendManager.process(info);

      if (this._rosterManager.process(whiteListInfo.config, info)) {
        return;
      }
    }

    _handleSingleEvent(event) {
      super._handleSingleEvent(event);

      let pluginEventName = event.name;
      let metadata = this._pluginWhitelist.Events[pluginEventName];
      if (!metadata) {
        return;
      }

      if (event.name === "death") {
        this._isSpectating = true;
      }

      if (event.name === "respawn" || event.name === "match_end") {
        this._isSpectating = false;
      }

      if (event.name === "kill_feed" && event.data.action === "knockdown") {
        const [attackerNoSpace, parsedInGameNoSpace, playerNameNoSpace] = [
          event.data.attackerName.replace(/\s/g, "").replace(/\[.*?\]/g, ""),
          this.parsedInGame_player.replace(/\s/g, "").replace(/\[.*?\]/g, ""),
          this._playerName.replace(/\s/g, "").replace(/\[.*?\]/g, "")
        ];
        if (attackerNoSpace == parsedInGameNoSpace || attackerNoSpace == playerNameNoSpace) {
          metadata = this._pluginWhitelist.Events["hud_knockdown"];
          this._featuresHandler.triggerEvent(metadata.featureId,
            metadata.event.name,
            null);
        }
      }

      if (event.name === "hud" && this._hudParser) {
        try {
          const parsed = this._hudParser.parse(event);
          if (parsed.event) {
            this._handleSingleEvent(parsed.event);
          }
          else if (parsed.info) {
            this._handleSingleGameInfo(parsed.info);
          }
          return;
        } catch (error) {
          console.log("[APEX PLUGIN] Unsupported HUD info:", event, error);
        }
      }

      if (this._handleMatchStateEvent(event, metadata)) {
        return;
      }

      if (this._handleSquadEliminatedEvent(event, metadata)) {
        return;
      }

      if (this._handleVictoryEvent(event)) {
        return;
      }

      if (this._handleLanguageEvent(event, metadata)) {
        return;
      }

      if (this._handleDamageEvent(event, metadata)) {
        return;
      }

      if (this._handleDefeatEvent(event)) {
        return;
      }


    }

    _handleTabsInfo(info) {
      if (info.key !== "tabs") {
        return false;
      }

      const data = JSON.parse(info.value);

      Object.entries(data).forEach(([key, value]) => {
        data[key] = parseInt(value);
      });

      const kills = data.kills;
      const assists = data.assists;

      let metadata = this._pluginWhitelist.Events["hud_kill"];

      if (kills > this.totla_kills) {
        this._featuresHandler.triggerEvent(metadata.featureId,
          metadata.event.name,
          kills);
        this.totla_kills++;
      }

      metadata = this._pluginWhitelist.Events["hud_assist"];

      if (assists > this.totla_assists) {
        this._featuresHandler.triggerEvent(metadata.featureId,
          metadata.event.name,
          assists);
        this.totla_assists++;
      }

      info.value = JSON.stringify(data);

      super._handleSingleGameInfo(info);

      return true;
    }

    _handleWeaponsInfo(info, whiteListInfo) {
      if (info.key !== "weapons") {
        return false;
      }

      const data = JSON.parse(info.value);
      let weapon_0 = "unknown";
      let weapon_1 = "unknown";
      if (Weapons[data.weapon_0] != undefined) {
        weapon_0 = Weapons[data.weapon_0]
      } else if (data.weapon_0 == "") {
        weapon_0 = ""
      }

      if (Weapons[data.weapon_1] != undefined) {
        weapon_1 = Weapons[data.weapon_1]
      } else if (data.weapon_1 == "") {
        weapon_1 = ""
      }

      const equippedWeapons = {
        "weapon0": weapon_0,
        "weapon1": weapon_1
      }

      this._infoDB.set(whiteListInfo.feature_id,
        whiteListInfo.config.category,
        whiteListInfo.config.key,
        JSON.stringify(equippedWeapons));

      const inUse = {
        inUse: Weapons[data.active_0] || data.active_0
      }

      this._infoDB.set(this._supportedFeatures.inventory.name,
        this._supportedFeatures.inventory.info.inUse.category,
        this._supportedFeatures.inventory.info.inUse.key,
        JSON.stringify(inUse));

      return true;
    }

    _handleGameModeInfo(info, whiteListInfo) {
      if (info.key !== "game_mode") {
        return false;
      }

      if (info.value == "[nametext]") {
        return false;
      }

      this._gameMode = info.value;
      let mode_name = this._modes[info.value] !== undefined ? this._modes[info.value] : "UNKNOWN";

      this._infoDB.set(whiteListInfo.feature_id,
        whiteListInfo.config.category,
        whiteListInfo.config.key,
        info.value);

      const feature = this._supportedFeatures.match_info;
      this._infoDB.set(feature.name,
        feature.info.mode_name.category,
        feature.info.mode_name.key,
        mode_name);

      if (mode_name == "UNKNOWN") {
        Sentry.withScope((scope) => {
          scope.setExtra("game", this._game.classId);
          scope.setExtra("gameId", this._game.title)
          Sentry.captureMessage("Apex_game_mode_UNKNOWN - " + info.value);
        });
      }

      return true;
    }

    _handleConsumableInfo(info, whiteListInfo) {
      if (!info.key.startsWith("consumable_")) {
        return false;
      }

      const data = JSON.parse(info.value);
      const index = info.key.replace("consumable_", "");
      const value = {
        name: BackpackItems[data.item_id] || data.item_name,
        amount: data.amount
      }

      this._infoDB.set(whiteListInfo.feature_id,
        whiteListInfo.config.category,
        whiteListInfo.config.key + index,
        JSON.stringify(value));

      return true;
    }

    _handleLanguageInfo(info, whiteListInfo) {
      if (!info.key.startsWith("language")) {
        return false;
      }

      this._infoDB.set(whiteListInfo.feature_id,
        whiteListInfo.config.category,
        whiteListInfo.config.key,
        info.value);

      this._language = info.value;
      this._assureHudParser();

      return true;
    }

    _handlePhaseInfo(info) {
      const name = info.value;
      if (name === "shopping") {
        if (!this._isResetVictory) {
          this._setVictoryInfo(null);
        }
      }

      if (name === "lobby") {
        if (this.is_map_id_reset === false) {
          this._infoDB.set(this._supportedFeatures.match_info.name,
            this._supportedFeatures.match_info.info.map_id.category,
            this._supportedFeatures.match_info.info.map_id.key,
            null
          );
          this.is_map_id_reset = true;
        }

        if (this.is_map_name_reset === false) {
          this._infoDB.set(this._supportedFeatures.match_info.name,
            this._supportedFeatures.match_info.info.map_name.category,
            this._supportedFeatures.match_info.info.map_name.key,
            null
          );
          this.is_map_name_reset = true;
        }
      }
      else {
        return false;
      }

    }

    _handleMapInfo(info, whiteListInfo) {
      if (!info.key.startsWith("mapid")) {
        return false;
      }

      let map_name = this._maps[info.value] !== undefined ? this._maps[info.value] : "UNKNOWN";

      if (!info.value.includes("mp_lobby")) {
        this._infoDB.set(whiteListInfo.feature_id,
          whiteListInfo.config.category,
          whiteListInfo.config.key,
          info.value);
        this.is_map_id_reset = false;

        const feature = this._supportedFeatures.match_info;
        this._infoDB.set(feature.name,
          feature.info.map_name.category,
          feature.info.map_name.key,
          map_name);
        this.is_map_name_reset = false;
      }

      else
        return true;

    }

    _assureHudParser() {
      if (this._hudParser) {
        return;
      }

      if (this._playerName && !this._hudParser) {
        this._hudParser = new HudParser({
          local_player: this._playerName,
          language: this._language || 'english'
        });
        console.log(`[APEX PLUGIN] Hud parser created for player: ${this._playerName} with this language: ${this._language}`);
      }
    }

    _handleLocalPlayerInfo(info, whiteListInfo) {
      if (info.key !== "local_player") {
        return false;
      }

      const { player, inGame_player, loc_x, loc_y, loc_z } = JSON.parse(info.value);
      this.parsedInGame_player = BaseUtils.b64DecodeUnicode(inGame_player)
      this.parsedPlayer = BaseUtils.b64DecodeUnicode(player);
      if (this.parsedInGame_player.includes('"')) {
        this.parsedInGame_player = this.parsedInGame_player.replace(/"/g, '\\"');
      }
      if (this.parsedPlayer.includes('"')) {
        this.parsedPlayer = this.parsedPlayer.replace(/"/g, '\\"');
      }
      let feature = null;
      let data = null;
      let infoUpdate = null;
      let player_data = null;


      if (this.parsedPlayer != this._playerName && this.parsedPlayer) {
        this._playerName = this.parsedPlayer;
        this._assureHudParser();

        data = this.parsedPlayer;
        feature = this._supportedFeatures.me;
        infoUpdate = feature.info.name;

        this._infoDB.set(feature.name,
          infoUpdate.category,
          infoUpdate.key,
          data);
        console.log(`[APEX PLUGIN] player detected: ${this.parsedPlayer} and inGame_player: ${this.parsedInGame_player}`);
      }

      player_data = '{"player_name": "' + this.parsedPlayer + '", "in_game_player_name": "' + this.parsedInGame_player + '"}';
      feature = this._supportedFeatures.game_info;
      infoUpdate = feature.info.player;

      this._infoDB.set(feature.name,
        infoUpdate.category,
        infoUpdate.key,
        player_data);

      if (loc_x && loc_y && loc_z) {
        data = JSON.stringify({ x: loc_x, y: loc_y, z: loc_z });
        feature = this._supportedFeatures.location;
        infoUpdate = feature.info.location;

        this._infoDB.set(feature.name,
          infoUpdate.category,
          infoUpdate.key,
          data);
      }

      return true;
    }

    _setVictoryInfo(playerWon) {
      const feature = this._supportedFeatures.rank;
      this._infoDB.set(feature.name,
        feature.info.victory.category,
        feature.info.victory.key,
        playerWon);
    }

    _handleDamageEvent(event, metadata) {
      if (event.name !== "damage") {
        return false;
      }

      const data = JSON.parse(event.data);
      const value = {
        targetName: BaseUtils.b64DecodeUnicode(data.target),
        damageAmount: data.amount,
        armor: data.armor,
        headshot: data.headshot
      }

      this._featuresHandler.triggerEvent(metadata.featureId,
        metadata.event.name,
        value);

      if (!this._isSpectating) {
        let totalDamageDealt = this._infoDB.get("me", "totalDamageDealt") || 0;
        totalDamageDealt += parseFloat(data.amount);
        this._updateTotalDamageDealt(totalDamageDealt);
      }

      return true;
    }

    _updateTotalDamageDealt(totalDamageDealt) {
      const feature = this._supportedFeatures.damage;
      this._infoDB.set(feature.name,
        feature.info.totalDamageDealt.category,
        feature.info.totalDamageDealt.key,
        totalDamageDealt);
    }



    _handleLanguageEvent(event, metadata) {
      if (event.name !== "language") {
        return false;
      }
      this._language = event.data;
      console.log(`[APEX PLUGIN] Client language: ${this._language}`)
      this._assureHudParser();
      return true;
    }

    _handleVictoryEvent(event) {
      if (event.name !== "victory") {
        return false;
      }

      this._setVictoryInfo(true);

      return true;
    }

    _handleMatchStateEvent(event, metadata) {
      const name = event.name;
      let state = null;
      if (name === "match_start") {
        this._updatePseudoMatchId(uuid.v4());
        this._setVictoryInfo(null);
        this._isResetVictory = true;
        this._updateTotalDamageDealt(0);
        state = "active";
        this._rosterManager.setInMatch();
        const eliminated = true;
        this._setTeamState(!eliminated);
          this._infoDB.set(this._supportedFeatures.match_summary.name,
            this._supportedFeatures.match_summary.info.match_summary.category,
            this._supportedFeatures.match_summary.info.match_summary.key,
            null
          );
      } else if (name === "match_end") {
        this.totla_assists = 0;
        this.totla_kills = 0;
        this._updatePseudoMatchId(null);
        state = "inactive";
        this._rosterManager.setNotInMatch();
        this._setTeamState(null);
        setTimeout(this._rosterManager.clearRoster, 2000);
        setTimeout(this._teamManager.clearTeam, 2000);
        setTimeout(this._legendManager.clear, 2000);
        setTimeout(() => {
          this._infoDB.set(this._supportedFeatures.match_info.name,
            this._supportedFeatures.match_info.info.tabs.category,
            this._supportedFeatures.match_info.info.tabs.key,
            null
          );
          if (this.is_map_id_reset === false) {
            this._infoDB.set(this._supportedFeatures.match_info.name,
              this._supportedFeatures.match_info.info.map_id.category,
              this._supportedFeatures.match_info.info.map_id.key,
              null
            );
            this.is_map_id_reset = true;
          }
          this._infoDB.set(this._supportedFeatures.match_info.name,
            this._supportedFeatures.match_info.info.mode_name.category,
            this._supportedFeatures.match_info.info.mode_name.key,
            null
          );
          if (this.is_map_name_reset === false) {
            this._infoDB.set(this._supportedFeatures.match_info.name,
              this._supportedFeatures.match_info.info.map_name.category,
              this._supportedFeatures.match_info.info.map_name.key,
              null
            );
            this.is_map_name_reset = true;
          }
        }, 2000);
      } else {
        return false;
      }

      const feature = this._supportedFeatures.match_state;
      this._infoDB.set(feature.name,
        feature.info.match_state.category,
        feature.info.match_state.key,
        state);

      this._featuresHandler.triggerEvent(metadata.featureId,
        metadata.event.name,
        null);
      return true;
    }

    _updatePseudoMatchId(id) {
      const feature = this._supportedFeatures.match_info;
      this._infoDB.set(feature.name,
        feature.info.pseudo_match_id.category,
        feature.info.pseudo_match_id.key,
        id);
    }

    _handleSquadEliminatedEvent(event, metadata) {
      if (event.name !== "your_squad_is_eliminated") {
        return false;
      }

      const eliminated = true;
      this._setTeamState(eliminated);

      if (this._gameMode === "#PL_TRIO" || this._gameMode === "#PL_DUO" || this._gameMode === "#PL_Ranked_Leagues" || this._gameMode === "#PL_FREERESPAWNS" || this._gameMode === "#PL_TRIO_HALLOWEEN_18_1_Harbinger_NAME" || this._gameMode === "#GOLDEN_HORSE_LTM_TITLE") {
        this._setVictoryInfo(false);
      }
      return true;
    }

    _handleDefeatEvent(event) {
      if (event.name !== "defeat") {
        return false;
      }

      this._setVictoryInfo(false);

      return true;
    }

    _setTeamState(isEliminated) {
      const feature = this._supportedFeatures.team;
      const data = {
        team_state: isEliminated ? "eliminated" : "active"
      }

      if (typeof isEliminated !== "boolean") {
        data.team_state = null;
      }

      this._infoDB.set(feature.name,
        feature.info.team_info.category,
        feature.info.team_info.key,
        JSON.stringify(data));
    }
  };

  return ApexPluginHandler;
});
