"use strict";
define([
  "/utils/GSI/gsi_client.js"

], function (GsiClient) {

  let _gsiClient = GsiClient;
  let round_live = false;
  let has_steam_id = false;
  const CS2_GAME_ID = 22730;
  const DEFAULT_GSI_PORT = 59873;
  const kCSGO2_LOG_PREFIX = '[GSGO2]'
  const _cgfFileContents = '"Overwolf v0.2"\n' +
    '{\n' +
    `"uri" "http://localhost:${DEFAULT_GSI_PORT}"\n` +
    '"timeout" "5.0"\n' +
    '"buffer"  "0.1"\n' +
    '"throttle" "0.5"\n' +
    '"heartbeat" "60.0"\n' +
    '"data"\n' +
    '{\n' +
    '"provider"				"1"\n' +
    '"player_id"				"1"\n' +
    '"player_state"			"1"\n' +
    '"map"						"1"\n' +
    '"map_round_wins"			"1"\n' +
    '"player_match_stats"		"1"\n' +
    '"player_weapons"			"1"\n' +
    '"round"					"1"\n' +
    '"allgrenades"				"1"\n' +
    '"allplayers_id"			"1"\n' +
    '"allplayers_match_stats"	"1"\n' +
    '"allplayers_position"		"1"\n' +
    '"allplayers_state"		"1"\n' +
    '"allplayers_weapons"		"1"\n' +
    '"bomb"					"1"\n' +
    '"phase_countdowns"		"1"\n' +
    '"player_position"			"1"\n' +
    '}\n' +
    '}\n';




  const _cfgFileContents2 = '"Overwolf v0.2"\n' +
    '{\n' +
    `"uri" "http://localhost:${DEFAULT_GSI_PORT}"\n` +
    '"timeout" "5.0"\n' +
    '"buffer"  "0.1"\n' +
    '"throttle" "0.5"\n' +
    '"heartbeat" "60.0"\n' +
    '"data"\n' +
    '{\n' +
    '"provider"				"1"\n' +
    '"player_id"				"1"\n' +
    '"player_state"			"1"\n' +
    '"map"						"1"\n' +
    '"map_round_wins"			"1"\n' +
    '"player_match_stats"		"1"\n' +
    '"player_weapons"			"1"\n' +
    '"round"					"1"\n' +
    '"allgrenades"				"1"\n' +
    '"allplayers_id"			"1"\n' +
    '"allplayers_match_stats"	"1"\n' +
    '"allplayers_position"		"1"\n' +
    '"allplayers_state"		"1"\n' +
    '"allplayers_weapons"		"1"\n' +
    '"bomb"					"1"\n' +
    '"phase_countdowns"		"1"\n' +
    '"player_position"			"1"\n' +
    '}\n' +
    '}\n';


  let GsiManager = class GsiManager {
    constructor(gameInfo, infoDB, featuresHandler, supportedFeatures, plugin) {
      this._infoDB = infoDB;
      this._featuresHandler = featuresHandler;
      this._supportedFeatures = supportedFeatures;
      this._plugin = plugin;
      this.start(gameInfo);
    }

    async start(gameInfo) {
      let port = await _gsiClient.getGamePort(CS2_GAME_ID, DEFAULT_GSI_PORT);
      if (port) {
        await this._writeGSIFilesForCurrentRunningGame(port);
      }

      await _gsiClient.startInfoListener(CS2_GAME_ID, port);
      _gsiClient.addListener(this._onGsiInfo.bind(this));

      if (gameInfo) {
        this._infoDB.setGameProcessId(gameInfo.processId);
        this._featuresHandler.setGameProcessId(gameInfo.processId);
      }
    }

    stop() {
      _gsiClient.removeListener(this._onGsiInfo.bind(this));
      _gsiClient.stop();
    }

    async _writeGSIFilesForCurrentRunningGame(port) {
      return new Promise((resolve) => {
        overwolf.games.getRunningGameInfo(async function (info) {
          let gameId, path, filePath, filePath2;

          if (!info || !info.isRunning) {
            console.log(
              `[${kCSGO2_LOG_PREFIX}] service started but no game is running`
            );
            resolve();
            return;
          }

          gameId = parseInt(info.id / 10);
          if (gameId !== CS2_GAME_ID) {
            console.log(
              `[${kCSGO2_LOG_PREFIX}] service started but CS2 is not running`
            );
            resolve();
            return;
          }

          path = info.executionPath;

          filePath = path.replace(
            "bin/win64/cs2.exe",
            "csgo/cfg/gamestate_integration_overwolf.cfg"
          );
          filePath2 = path.replace(
            "bin/win64/cs2.exe",
            "csgo/cfg/gamestate_integration_overwolf2.cfg"
          );

          console.log(
            `[${kCSGO2_LOG_PREFIX}] CSGO2 is running - creating/replacing GSI file...`
          );

          await GsiClient.writeFileIfNeeded(
            filePath,
            _cgfFileContents.replace(/:[0-9]+/, `:${port}`),
            port
          );
          await GsiClient.writeFileIfNeeded(
            filePath2,
            _cfgFileContents2.replace(/:[0-9]+/, `:${port}`),
            port
          );
          resolve();
        });
      });
    }

    _onGsiInfo(rawJson) {
      const rawData = JSON.stringify(rawJson);
      const dataKey = Object.keys(rawJson)[0];
      switch (dataKey) {
        case "provider": {
          this._handleLiveData(dataKey, rawData);
          this._handleProviderData(dataKey, rawData, rawJson)
          break;
        }
        case "player": {
          this._handleLiveData(dataKey, rawData);
          this._handlePlayerData(dataKey, rawData, rawJson)
          break;
        }
        case "round": {
          this._handleLiveData(dataKey, rawData);
          break;
        }
        case "map": {
          this._handleLiveData(dataKey, rawData);
          break;
        }
      }
    }


    _handleLiveData(dataKey, rawData) {
      if (!this._supportedFeatures.live_data.info[dataKey].category) {
        return;
      }

      this._infoDB.set(
        this._supportedFeatures.live_data.name,
        this._supportedFeatures.live_data.info[dataKey].category,
        this._supportedFeatures.live_data.info[dataKey].key,
        rawData);
    }

    _handleProviderData(dataKey, rawData, rawJson) {
      if (this._supportedFeatures.live_data.info[dataKey].key != "provider") {
        return;
      }

      let live_game_mode = rawJson.map?.mode;
      let live_map_name = rawJson.map?.name;
      let live_game_phase = rawJson.map?.phase;
      let live_round_phase = rawJson.round?.phase;
      let live_round_num;
      if (rawJson.map?.round !== undefined) {
        live_round_num = rawJson.map.round + 1;
      }
      let live_score_T = parseInt(rawJson.map?.team_t.score);
      let live_score_CT = parseInt(rawJson.map?.team_ct.score);
      let total_score = null;

      let steam_id = rawJson.player?.steamid;

      if (steam_id != undefined && has_steam_id == false) {
        this._infoDB.set(
          this._supportedFeatures.match_info.name,
          this._supportedFeatures.match_info.info["steam_id"].category,
          this._supportedFeatures.match_info.info["steam_id"].key,
          steam_id);

        has_steam_id = true;
      }

      if (live_game_mode != undefined) {


        this._infoDB.set(
          this._supportedFeatures.match_info.name,
          this._supportedFeatures.match_info.info["mode_name"].category,
          this._supportedFeatures.match_info.info["mode_name"].key,
          live_game_mode);
      }

      if (live_map_name != undefined) {
        this._infoDB.set(
          this._supportedFeatures.match_info.name,
          this._supportedFeatures.match_info.info["map_name"].category,
          this._supportedFeatures.match_info.info["map_name"].key,
          live_map_name);
      }

      if (live_game_phase != undefined) {
        this._infoDB.set(
          this._supportedFeatures.match_info.name,
          this._supportedFeatures.match_info.info["game_phase"].category,
          this._supportedFeatures.match_info.info["game_phase"].key,
          live_game_phase);
      }

      if (live_round_num != undefined) {
        this._infoDB.set(
          this._supportedFeatures.match_info.name,
          this._supportedFeatures.match_info.info["round_number"].category,
          this._supportedFeatures.match_info.info["round_number"].key,
          live_round_num);
      }

      if (live_round_phase != undefined) {

        this._infoDB.set(
          this._supportedFeatures.match_info.name,
          this._supportedFeatures.match_info.info["round_phase"].category,
          this._supportedFeatures.match_info.info["round_phase"].key,
          live_round_phase);

        if (live_round_phase == "live" && !round_live) {
          round_live = true;
          this._featuresHandler.triggerEvent(
            this._supportedFeatures.match_info.name,
            this._supportedFeatures.match_info.events.round_start.name,
            null);
        }

        if (live_round_phase == "freezetime" && round_live) {
          round_live = false;
          this._featuresHandler.triggerEvent(
            this._supportedFeatures.match_info.name,
            this._supportedFeatures.match_info.events.round_end.name,
            null);
        }

        if (live_score_T != undefined && live_score_CT != undefined)
          total_score = {
            "team_t": live_score_T,
            "team_ct": live_score_CT
          };
        {
          this._infoDB.set(
            this._supportedFeatures.match_info.name,
            this._supportedFeatures.match_info.info["score"].category,
            this._supportedFeatures.match_info.info["score"].key,
            JSON.stringify(total_score));
        }
      }

    }

    _handlePlayerData(dataKey, rawData, rawJson) {
      if (this._supportedFeatures.live_data.info[dataKey].key != "player") {
        return;
      }

      let steam_id = rawJson.player?.steamid;

      if (steam_id != undefined && has_steam_id == false) {
        this._infoDB.set(
          this._supportedFeatures.match_info.name,
          this._supportedFeatures.match_info.info["steam_id"].category,
          this._supportedFeatures.match_info.info["steam_id"].key,
          steam_id);

        has_steam_id = true;
      }
    }

    resetRound() {
      round_live = false;
    }
  };
  return GsiManager;
});
