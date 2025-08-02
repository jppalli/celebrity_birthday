"use strict";

define(["/utils/monitoring_statics.js",
        "/games/tracking_config.js",
        '/utils/ow-api.js'], function (
  MonitoringStatics,
  trackingConfig,
  owAPI
) {
  let _phasedPercent = null;
  let _isPbe = false;


  function GameEventsMonitor() {
    if (!(this instanceof GameEventsMonitor)) {
      throw new TypeError("gameEventsMonitor cannot be called as a function");
    }
    MonitoringStatics.initAllowUsage();
  }

  GameEventsMonitor.prototype = {
    constructor: GameEventsMonitor,

    TRACKING_KINDS: MonitoringStatics.TRACKING_KINDS,
    PBE_SUFFIX: '_pbe',

    reportEvent: async function (info, type) {
      try {
        let { gameId, key, value } = info;
        if (type === "event") {
          if (value == null || (Object.keys(value).length === 0 && value.constructor === Object)) {
            value = 1;
          }
        }
        if (_isEventValueEmpty(value)) {
          return;
        }

        let gameData = trackingConfig.data[gameId];
        if (!_gameEnabledForMonitor(gameData, key)) {
          return;
        }

        const allow =  await _isPhasingInRange();
        if (!allow) {
          return;
        }


        let jsonValue = _isJson(value);
        if (jsonValue != null) {
          if (Array.isArray(jsonValue) && jsonValue.length > 0) {
            value = jsonValue[0];
          }
          else {
            value = jsonValue;
          }
        }

        let filteredValues = gameData.keys[key];

        if (typeof filteredValues === "undefined") {
          return;
        }

        if (typeof value === "object") {
          this._handleEventObjectForMonitoring(gameId, key, value, filteredValues);
          return;
        }

        if (typeof value === "number") {
          value = value.toString();
        }

        if (type === "info" && value == "null") {
          return;
        }

        if (filteredValues === null ||
          filteredValues.includes(value)) {
          this._handleEventForMonitoring(gameId, value, key);
        }

      } catch (err) {
        console.error(`[Monitoring Error] sending monitoring event ${err}`);
      }
    },

    _sendTrack: function sendTrack(id, extra) {
      try {
        MonitoringStatics.sendTrack(id, extra);
      } catch (e) { }
    },

    _handleEventObjectForMonitoring: function (gameId, key, object, whiteListValues) {

      Object.keys(object).forEach((objectKey) => {

        if (whiteListValues.hasOwnProperty(objectKey)) {
          let selectedValue = whiteListValues[objectKey];
          if (typeof selectedValue === "undefined") {
            return;
          }

          if (selectedValue === null ||
            selectedValue.includes(object[objectKey])) {
            this._handleEventForMonitoring(
              gameId,
              object[objectKey], 
              key,
              objectKey
            );
          }
        }
      });
    },

    _handleEventForMonitoring: function (gameId, value, key, objectKey = null) {
      key = _isPbe ? key + this.PBE_SUFFIX : key;
      key = _replaceInvalidCharacters(key);
      value = _replaceInvalidCharacters(value);

      let extra;
      if (objectKey) {
        extra = `${gameId}.${key}.${objectKey}.${value}`;
      } else {
        extra = `${gameId}.${key}.${value}`;
      }

      this._sendTrack(this.TRACKING_KINDS.GEP_MONITOR_KEYS, extra);
    },

    setModePbe: function () {
      _setPbe();
    },

  };


  function _isJson(str) {
    try {
      return JSON.parse(str);
    } catch {
      return null;
    }
  }

  function _replaceInvalidCharacters(value) {
    if (
      typeof value === "undefined" ||
      value == null
    ) {
      return null;
    }

    if (typeof value === "number") {
      return value;
    }

    if (typeof value === "boolean") {
      return value ? "true" : "false";
    }

    return value.replace(/\./g, "_").replace(/\:/g, "_");
  }

  function _isEventValueEmpty(value) {
    if (!value || value == "0") {
      return true;
    }

    if (typeof value === "string" && (value === "" || value === "[]")) {
      return true;
    }

    return false;
  }

  function _gameEnabledForMonitor(gameData, key) {
    if (!gameData) {
      return false;
    }

    if (!gameData.enable) {
      return false;
    }

    if (!gameData.keys.hasOwnProperty(key)) {
      return false;
    }

    return true;
  }

  async function _isPhasingInRange() {
    if (_phasedPercent === null) {
      if (!owAPI) {
        return false;
      }

      _phasedPercent = await owAPI.getPhasedPercent();
      console.log(`[Monitoring] phasing percent: ${_phasedPercent}`);

      if (_phasedPercent > trackingConfig.phasing) {
        console.log(
          `[Monitoring] phasing percent: ${_phasedPercent} ` +
          `is below configured amount: ${trackingConfig.phasing}`
        );
      }
    }

    if (_phasedPercent <= trackingConfig.phasing) {
      return true;
    }

    return false;
  }

  function _setPbe() {
    _isPbe = true;
  }

  return GameEventsMonitor;
});
