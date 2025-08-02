'use strict';

define(['/utils/monitoring_statics.js', '/utils/base_utils.js'], function (
  MonitoringStatic,
  BaseUtils) {

  const Constants = {
    MAX_PLUGIN_LOAD_ATTEMPTS: 100,
    PLUGIN_RETRAY_INTERVAL_TIME: 1000,

    GEPPLUGIN: "GEPPlugin",
    GOOPPLUGIN: "GOOPPlugin",

    STATES: {
      started: "started",
      stopped: "stopped",
      loaded: "loaded"
    },

    EVENT_TYPES: {
      info_update: "info_update",
      event: "event"
    },

    PLUGIN_WHITE_LIST: {
      state: {},
      last_error: {},
      plugin_crashed: {}
    },

    PLUGIN_INFO_WHITELIST: ["plugin_status", "task_status"],

    PLUGIN_STATES_TO_REPORT: [
      "failed_initializing_scanner",
      "crashed_on_init",
      "observer_crash",
      "patch_info_failure",
      "observer_crash_lobby",
      "observer_crash_ingameplayers",
      "failed_initializing_monitor",
      "failed_initializing_monitor",
      "failed_starting_monitor",
      "disabled",
      "crashed_on_present_parse",
      "crashed_on_present"
    ],

    PLUGIN_ERRORS_TO_IGNORE: {
      7764: ["observer_crash_ingameplayers"]
    }
  };

  let _game, _eventsWhiteList;
  let _state = Constants.STATES.stopped;
  let _pluginLoadRetries = 0;
  let _oop = false;
  let _goop = false;
  let _listeners = {
    infoUpdate: [],
    event: []
  };

  let _logBlackList = null;
  let _monitoring = null;
  let _mock;
  let _retryTimeout;
  let _extraData = null;
  let _sdkChannelId = null;

  function GamePlugin(config) {
    if (!(this instanceof GamePlugin)) {
      throw new TypeError(
        "GamePlugin constructor cannot be called as a function.");
    }
  }

  GamePlugin.prototype = {

    EVENT_TYPES: Constants.EVENT_TYPES,
    start: function start(config, callback) {
      if (_state === Constants.STATES.started)
        return;
      _state = Constants.STATES.started;

      _logBlackList = config.logBlackList;
      _monitoring = config.monitoring;

      if (config.pluginStatesToReport && Array.isArray(config.pluginStatesToReport)) {
        Constants.PLUGIN_STATES_TO_REPORT.push(...config.pluginStatesToReport);
      }

      try {
        _extraData = JSON.stringify(config.extraData);
      } catch (e) {
        console.error(e);
      }

      _oop  = config.oop || false;
      _goop = config.goop || false;

      if (_goop) {
        let logLevel  = 1 ;
        if (localStorage.goopLogLevel) {
          logLevel = localStorage.goopLogLevel;
          console.log("[INFO] Override goop log level", logLevel);
        }

        _extraData = JSON.stringify({
             configFile: config.goopConfigPath,
             logLevel: 1, 
             extra : { arg1:"test", arg2:"test2" } 
        });
      }

          callback = callback || function () { };

      _game = config.game;
      console.log("[INFO] Starting " +_game.name +
                 " game plugin " + "[oop: " +_oop + " goop: " +_goop + "]...");

      _eventsWhiteList = config.eventsWhiteList;

      if (localStorage["mock"]) {
        _useMockPlugin(callback)
      } else {
        _tryLoadingPlugin(callback);
      }
    },


    stop: function stop() {
      _state = Constants.STATES.stopped;
      _removePluginListeners();
      if (_retryTimeout) {
        clearTimeout(_retryTimeout);
      }
    },

    addListener: function addListener(type, listener) {
      switch (type) {
        case Constants.EVENT_TYPES.info_update:
          _listeners.infoUpdate.push(listener);
          break;
        case Constants.EVENT_TYPES.event:
          _listeners.event.push(listener);
          break;
        default:
          break;
      }
    }
  };

  function _tryLoadingPlugin(callback) {
    const loadingPluginCallback = (e) => {
      if (e.status === "error") {
        console.log("[ERROR] Failed to load " + _game.name + " game plugin:" +
          " " + e.reason);
        if (_pluginLoadRetries < Constants.MAX_PLUGIN_LOAD_ATTEMPTS && !_goop) {
          console.log("[INFO] Retrying to load " + _game.name + " plugin...");
          _pluginLoadRetries++;
          _retryTimeout = setTimeout(function () { 
            _tryLoadingPlugin(callback)
           },
          Constants.PLUGIN_RETRAY_INTERVAL_TIME);
        } else {
          console.log("[INFO] Giving up loading " + _game.name + " plugin");
          let extra = _game.id;
          let id =  _goop ? 
            MonitoringStatic.TRACKING_KINDS.GOOP_PLUGIN_LOAD_FAILED:
            MonitoringStatic.TRACKING_KINDS.GEP_PLUGIN_LOAD_FAILED;

                           MonitoringStatic.sendTrack(id, extra);
          callback({ status: "error", error: "Failed to load game plugin" });
        }
      } else {
        console.log("[INFO] " + _game.name + " plugin loaded: ", JSON.stringify(e));
        _sdkChannelId = e.channelId;        
        _onPluginLoadSuccess(callback);
      }
    };

        try {
      _tryLoadingPluginV183(loadingPluginCallback);
    } catch (err){      
      _tryLoadingPluginOld(loadingPluginCallback);
    }
  }

  function _tryLoadingPluginOld(callback) {
    const loadPluginWithParamFunc = overwolfInternal.game.loadPluginWithParam;
    let pluginId = _getPluginId();
    if (_extraData && loadPluginWithParamFunc) {
      overwolfInternal.game.loadPluginWithParam(pluginId, _extraData, callback);
      return;
    } 

    if (!_goop) {
      overwolfInternal.game.loadPlugin(pluginId, callback);
    } else {
      console.error('goop plugin not supported');
    }

      }

  function _tryLoadingPluginV183(callback) {
    const loadPluginWithParamFunc = overwolfInternal.game.loadPluginWithParam;

        let pluginId = _getPluginId();
    if (_extraData && loadPluginWithParamFunc) {
      overwolfInternal.game.loadPluginWithParam(
        pluginId, _extraData, _oop,callback);
      return;
    } 

    if (!_goop) {
      overwolfInternal.game.loadPlugin(Constants.GEPPLUGIN, _oop, callback);
    } else {
      console.error('goop plugin not supported');
    }    
  }

  function _useMockPlugin(callback) {
    let gameName = localStorage["mockGameName"];
    let testName = localStorage["mockTestName"];
    let module = "/mocks/GEPPlugin/" + gameName + ".js";
    require([module], function (mock) {
      _state = Constants.STATES.loaded;

      _mock = mock;

      _mock.removeEventListener(_onPluginEvent);
      _mock.addEventListener(_onPluginEvent);

      _mock.removeInfoListener(_onPluginInfoUpdate);
      _mock.addInfoListener(_onPluginInfoUpdate);

      setTimeout(function () {
        if (_mock.tests.hasOwnProperty(testName)) {
          _mock.tests[testName]();
        }
      }, 2000);

      callback({ "status": "success" });
    });
  }

  function _getPluginId() {
    if (_goop) {
      return Constants.GOOPPLUGIN;
    }
    return Constants.GEPPLUGIN;
  }

  function _onPluginLoadSuccess(callback) {
    if (_state != Constants.STATES.loaded) {
      _state = Constants.STATES.loaded;
      _removePluginListeners();
      _addPluginListeners();
    }

    callback({ "status": "success" });
  }

  function _onPluginInfoUpdate(data) {
    let infoList = data.info;
    let listeners = _listeners.infoUpdate;
    if (infoList) {
      for (let infoItem of infoList) {
        if (Constants.PLUGIN_INFO_WHITELIST.indexOf(infoItem.category) >= 0 ||
           !_isLogBlacklisted(infoItem.key)) {
          console.log('[PLUGIN INFO] ' + JSON.stringify(infoItem));
        }

        const isWhitelisted =
          _isWhiteListedEvent(infoItem.key, Constants.EVENT_TYPES.info_update);

        if (infoItem.category === "plugin_status" &&
            infoItem.key === "last_error" && !_ignoreTracking(infoItem)) {
          let value;

          if (infoItem.value.startsWith('crashed_on_task')) {
            value = infoItem.value.substr('crashed_on_task_'.length);
          } else if (_goop || Constants.PLUGIN_STATES_TO_REPORT.indexOf(infoItem.value) >= 0) {
            value = infoItem.value;
          }

          if (value) {
            let errorId = _goop ?
              MonitoringStatic.TRACKING_KINDS.GOOP_PLUGIN_CRASHED :
              MonitoringStatic.TRACKING_KINDS.GEP_PLUGIN_CRASHED;
            MonitoringStatic.sendTrack(errorId, _game.id + "." + value);
          }

          if (_monitoring) {
            _monitoring.handleGameTrackingInfoUpdate(infoItem);
          }
        }

        if (infoItem.category === "task_status" && _monitoring) {
          _monitoring.handleGameTrackingInfoUpdate(infoItem);
        }

            if (!isWhitelisted) {
          continue;
        }

        for (let listener of listeners) {
          listener(infoItem);
        }
      }
    }
  }

  function _onPluginEvent(obj) {

    let pluginEvents = obj.events;

    for (let currentPluginEvent of pluginEvents) {
      let isWhitelisted =
        _isWhiteListedEvent(currentPluginEvent.name, Constants.EVENT_TYPES.event);
      if (isWhitelisted) {

        if (!_isLogBlacklisted(currentPluginEvent.name)) {
          console.log("[PLUGIN EVENT] " + JSON.stringify(currentPluginEvent));
        }

        let listeners = _listeners.event;
        for (let listener of listeners) {
          listener(currentPluginEvent);
        }
      } else {
        console.log("[PLUGIN EVENT] " + JSON.stringify(currentPluginEvent));
      }
    }
  }

  function _isLogBlacklisted(item) {
    if (!_logBlackList || _logBlackList.length === 0) {
      return false;
    }

    if (_logBlackList.indexOf(item) >= 0) {
      return true;
    }

    let result = false;
    for (let key of _logBlackList) {
      if (item.includes(key)) {
        result = true;
        break;
      }
    }

    return result;
  }

  function _isWhiteListedEvent(currentPluginEventName, type) {
    let result = true;
    let currentEventMetadataList = null;

    if (Constants.PLUGIN_WHITE_LIST[currentPluginEventName]) {
      return true
    }

    let whiteListType = type === Constants.EVENT_TYPES.event ? "Events" : "InfoDB";
    if (_eventsWhiteList) {
      if (!_eventsWhiteList.hasOwnProperty(whiteListType)) {
        result = false;
      }

      let whitelist = _eventsWhiteList[whiteListType];
      currentEventMetadataList =
        whitelist[currentPluginEventName];
      result = typeof currentEventMetadataList !== 'undefined' &&
        currentEventMetadataList !== null;

      if (!result) {
        for (let key in whitelist) {
          if (whitelist.hasOwnProperty(key)) {
            if (currentPluginEventName.startsWith(key)) {
              result = true;
            }
          }
        }
      }
    }

    if (!result) {
      console.log("[WARN] " + _game.name + " plugin " + whiteListType +
        " not supported: " + currentPluginEventName);
    }

    return result;
  }

  function _ignoreTracking(infoItem) {
    let intGameId = parseInt(_game.id);
    if (Constants.PLUGIN_ERRORS_TO_IGNORE.hasOwnProperty(intGameId)) {
      let blackList = Constants.PLUGIN_ERRORS_TO_IGNORE[intGameId];
      return blackList.indexOf(infoItem.value) >= 0
    }
    return false;
  }

  function _removePluginListeners() {
    overwolf.games.events.onInfoUpdates.removeListener(_onPluginInfoUpdate);
    overwolf.games.events.onNewEvents.removeListener(_onPluginEvent);
  }

  function _addPluginListeners() {
    overwolf.games.events.onInfoUpdates.addListener(_onPluginInfoUpdate);
    overwolf.games.events.onNewEvents.addListener(_onPluginEvent);
  }

  return GamePlugin;
});
