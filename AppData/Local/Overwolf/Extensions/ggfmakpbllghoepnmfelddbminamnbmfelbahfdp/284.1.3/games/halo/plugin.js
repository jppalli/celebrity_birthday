define([
  '/games/service/PluginHandler.js',
  '/libs/js-uuid.js',
  '/utils/base_utils.js',
], function (
  PluginHandler,
  uuid,
  BaseUtils
) {
  return class HaloPluginHandler extends PluginHandler {
    _localPlayer = {
      kills: 0,
      death: 0,
      assist: 0
    };

    _match_started = false;

    constructor(config) {
      super(config);
    }

    _handleSingleGameInfo(info) {
      switch (info.key) {
        case 'stats': {
          const value = this._convertStringsToNumber(JSON.parse(info.value));
          this._fireLocalPlayerEvents(value);
          info.value = JSON.stringify(value);
          break;
        }
        case 'game_state': {
          this._handleMatchState(info);
          break;
        }
        case 'game_type':
        case 'game_mode':
        case 'playlist': {
          this._handleMissingDataState(info);
          break;
        }
        case (info.key.match(/roster_/) || {}).input: {
          this._handleRoster(info);
          break;
        }
      }

      super._handleSingleGameInfo(info);
    }

    _handleMatchState(info) {
      if (info.value === 'ingame' ||
        info.value === 'match_start_countdown') {
        this._handleMatchStart(info);
      } else if (info.value === 'transfer_to_lobby' ||
        info.value === 'lobby') {
        this._handleMatchEnd(info);
      }
    }

    _handleMissingDataState(info) {
      if (info.value.includes("0x")) {
        info.value = "unknown";
      }
    }

    _handleMatchStart(info) {
      if (this._match_started) {
        super._log("skip match started (already started) " + info.value)
        return;
      }

      this._match_started = true;
      super._handleSingleEvent({ name: 'match_start' })
    }

    _handleRoster(info) {
      const value = this._convertStringsToNumber(JSON.parse(info.value));
      if (Object.keys(value).length != 0) {
        value.local = (value.local === 1 || value.local === "1");
        value.name = BaseUtils.b64DecodeUnicode(value.name);
        info.value = JSON.stringify(value);
      }
      info.value = JSON.stringify(value);
    }

    _handleMatchEnd(info) {
      if (!this._match_started) {
        super._log("skip match end (already ended) " + info.value)
        return;
      }
      this._match_started = false;
      super._handleSingleEvent({ name: 'match_end' })
      let feature, infoUpdate;
      feature = this._supportedFeatures.match_info;
      infoUpdate = feature.info.match_outcome;
      this._infoDB.set(feature.feature_id, infoUpdate.category, infoUpdate.key, null);
    }

    _fireLocalPlayerEvents(info) {
      try {
        this._handleKill(info.Kills);
        this._handleAssist(info.Assists);
        this._handleDeath(info.Deaths);
      } catch (err) {
        super._error("update local player events error", err);
      }
    }

    _handleKill(kills) {
      if (kills == undefined) {
        return;
      }

      if (this._localPlayer.kills != kills && kills > 0) {
        super._handleSingleEvent({ name: 'kill', data: kills })
      }

      this._localPlayer.kills = kills;
    }

    _handleAssist(assist) {
      if (assist == undefined) {
        return;
      }
      if (this._localPlayer.assist != assist && assist > 0) {
        super._handleSingleEvent({ name: 'assist', data: assist })
      }
      this._localPlayer.assist = assist;
    }

    _handleDeath(death) {
      if (death == undefined) {
        return;
      }

      if (this._localPlayer.death != death && death > 0) {
        super._handleSingleEvent({ name: 'death', data: death })
      }

      this._localPlayer.death = death;
    }

    _convertStringsToNumber(jsonValue) {
      function isNumber(intValue) {
        return !isNaN(intValue) && isFinite(intValue);
      }

      for (const [key, value] of Object.entries(jsonValue)) {
        let intValue = parseInt(value);
        if (isNumber(intValue)) {
          jsonValue[key] = intValue;
        }
      }
      return jsonValue;
    }
  }
});