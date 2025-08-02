"use strict";

define([
  "/games/service/PluginHandler.js",
  "/games/cs2/gsi_manager.js",
  "/utils/base_utils.js",
  "/libs/js-uuid.js"

], function (PluginHandler, GsiManager, BaseUtils, uuid) {

  return class Cs2PluginHandler extends PluginHandler {

    _local_player_id = null;
    _last_mm_state = null;

    _featuresToClearOnMatchEnd = [
      {
        feature: this._supportedFeatures.match_info,
        infos: [
          'kills',
          'deaths',
          'assists',
          'pseudo_match_id',
          'mode_name',
          'is_ranked',
          `match_outcome`,
          `mm_state`
        ]
      }
    ];

    _featuresToClearOnMatchStart = [
      {
        feature: this._supportedFeatures.match_info,
        infos: [
          'score',
        ]
      }
    ];

    constructor(config) {
      super(config);

    }


    start(gameInfo, infoDB, featuresHandler, isDisabled) {
      super.start(gameInfo, infoDB, featuresHandler, isDisabled);
      this._gsiManager = new GsiManager(gameInfo, infoDB, featuresHandler, this._supportedFeatures, this);
    }

    stop() {
      if (this._gsiManager) {
        this._gsiManager.stop();
      }

      super.stop();
    }

    _handleSingleGameInfo(info) {
      switch (info.key) {
        case (info.key.match(/roster_/) || {}).input: {
          if (info.value != "null") {
            let value = JSON.parse(info.value);
            value.nickname = BaseUtils.b64DecodeUnicode(value.nickname);
            value.is_local = value.is_local === 1 ? "true" : "false";
            if (value.is_local == "true") {
              this._handleKDA(info);
              if (this._local_player_id == null) {
                this._local_player_id = value.steamid;
              }
            }

            if (value.color == -1) {
              value.color = null;
            }
            else if (value.color == 0) {
              value.color = "Blue";
            }
            else if (value.color == 1) {
              value.color = "Green";
            }
            else if (value.color == 2) {
              value.color = "Yellow";
            }
            else if (value.color == 3) {
              value.color = "Orange";
            }
            else if (value.color == 4) {
              value.color = "Purple";
            }

            info.value = JSON.stringify(value);
          }
          break;
        }
        case 'gamemode': {
          if (info.value === "Playing CS:GO") {
            info.value = "null";
          }
          break;
        }
        case 'is_rank': {
          info.value = info.value === "1" ? true : false;
          break;
        }
        case 'mm_state': {
          const state_to_ignore = ["registering", "reserved"];
          let prefix = "#SFUI_QMM_State_find_";
          info.value = info.value.slice(prefix.length);

                    if (state_to_ignore.includes(info.value)) {
            return;
          }

          if (info.value == "" && (this._last_mm_state == null || this._last_mm_state == "connect" || this._last_mm_state == "canceled")) {
            return
          }

          if (info.value == "" && (this._last_mm_state == "searching" || this._last_mm_state == "unavailable")) {
            info.value = "canceled"
          }

          this._last_mm_state = info.value;
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

      if (this._handleKillFeed(event)) {
        return;
      }

      if (this._handleMatchStart(event)) {
        return;
      }

      if (this._handleMatchEnd(event)) {
        return;
      }

      if (this._handlePluginKDA(event)) {
        return;
      }

      super._handleSingleEvent(event);
    }

    _handleKillFeed(event) {
      if (event.name !== 'kill_feed') {
        return false;
      }

      try {
        const parsedData = JSON.parse(event.data);
        const weapon = parsedData.weapon.match(/(?<=\/\/.*\/.*\/.*\/).*/)[0];

        const data = {
          ...parsedData,
          headshot: parsedData.headshot === '1',
          suicide: parsedData.suicide === '1',
          wallbang: parsedData.wallbang === '1',
          revenge: parsedData.revenge === '1',
          domination: parsedData.domination === '1',
          noscope: parsedData.noscope === '1',
          throughsmoke: parsedData.throughsmoke === '1',
          flashed: parsedData.flashed === '1',
          weapon: weapon,
          attacker: BaseUtils.b64DecodeUnicode(parsedData.attacker),
          victim: BaseUtils.b64DecodeUnicode(parsedData.victim),
          assister: BaseUtils.b64DecodeUnicode(parsedData.assister),
        }

        this._featuresHandler.triggerEvent(
          this._supportedFeatures.match_info.name,
          this._supportedFeatures.match_info.events.kill_feed.name,
          JSON.stringify(data)
        );
      } catch (err) {
        console.error('Error while triggering kill_feed event')
        return false;
      }

      return true;
    }

    _handleMatchStart(event) {
      if (event.name !== 'match_start') {
        return false;
      }

      this._infoDB.set(
        this._supportedFeatures.match_info.name,
        this._supportedFeatures.match_info.info.pseudo_match_id.category,
        this._supportedFeatures.match_info.info.pseudo_match_id.key,
        uuid.v4());

      this._clearData(this._featuresToClearOnMatchStart);
    }

    _handleMatchEnd(event) {
      if (event.name !== 'match_end') {
        return false;
      }

      this._clearData(this._featuresToClearOnMatchEnd);
      this._gsiManager.resetRound();
    }

    _handlePluginKDA(event) {
      if (!(event.name === 'kill' || event.name === 'death' || event.name === 'assist')) {
        return false;
      }

      event.data = parseInt(event.data);

    }

    _handleKDA(info) {
      let value = JSON.parse(info.value);
      let kills = value.kills;
      let deaths = value.deaths;
      let assists = value.assists;
      let mvps = value.mvps;

      this._infoDB.set(
        this._supportedFeatures.match_info.name,
        this._supportedFeatures.match_info.info["kills"].category,
        this._supportedFeatures.match_info.info["kills"].key,
        kills);

      this._infoDB.set(
        this._supportedFeatures.match_info.name,
        this._supportedFeatures.match_info.info["deaths"].category,
        this._supportedFeatures.match_info.info["deaths"].key,
        deaths);

      this._infoDB.set(
        this._supportedFeatures.match_info.name,
        this._supportedFeatures.match_info.info["assists"].category,
        this._supportedFeatures.match_info.info["assists"].key,
        assists);

      this._infoDB.set(
        this._supportedFeatures.match_info.name,
        this._supportedFeatures.match_info.info["mvps"].category,
        this._supportedFeatures.match_info.info["mvps"].key,
        mvps);

    }
  };
});