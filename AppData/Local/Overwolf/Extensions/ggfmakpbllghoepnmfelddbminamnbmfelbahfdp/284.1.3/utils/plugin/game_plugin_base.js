'use strict';

define([
  '/utils/plugin/plugin_constants.js',
  '/utils/monitoring_statics.js',
  '/utils/base_utils.js'],
  function (Constants,
    MonitoringStatic,
    BaseUtils) {

    class GamePluginBase {
      constructor(config) {
        if (this.constructor == GamePluginBase) {
          throw new Error(`Can't instantiate abstract class`);
        }

        this._pluginId = config.pluginName;
        this._game = null;
        this._eventsWhiteList = null;
        this._state = Constants.STATES.stopped;
        this._statesToReport = Constants.PLUGIN_STATES_TO_REPORT;
        this._pluginLoadRetries = 0;
        this._oop = false;
        this._listeners = {
          infoUpdate: [],
          event: []
        };

        this._logBlackList = null;
        this._monitoring = null;
        this._mock = null;
        this._retryTimeout = null;
        this._reloadOOPCounter = 0;
        this._extraData = null;
        this._sdkChannelId = null;
        this.EVENT_TYPES = Constants.EVENT_TYPES;
        this.PBE_SUFFIX = "_pbe";
      }


      start(config, callback) {
        if (this._state === Constants.STATES.started) {
          return;
        }

        this._state = Constants.STATES.started;
        this._logBlackList = config.logBlackList;
        this._monitoring = config.monitoring;
        this._game = config.game;
        this._pluginName = config?.pluginName || Constants.DEFAULT_PLUGIN;
        this._eventsWhiteList = config.eventsWhiteList;

        if (config.pluginStatesToReport && Array.isArray(config.pluginStatesToReport)) {
          this._statesToReport.push(...config.pluginStatesToReport);
        }

        this._oop = config.oop || false;

        this._createPluginExtraData(config);

        callback = callback || function () { };
        console.log(
          `[INFO] Starting ${this._game?.name} plugin [oop: ${this._oop} id: ${this._pluginId}]...`);

        if (localStorage["mock"]) {
          this._useMockPlugin(callback)
        } else {
          this._tryLoadingPlugin(callback);
        }
      }

      stop() {
        console.log(`Stopping [${this._pluginId}] plugin`);
        this._state = Constants.STATES.stopped;
        this._removePluginListeners();
        if (this._retryTimeout) {
          clearTimeout(this._retryTimeout);
        }
        this._reloadOOPCounter = 0;
      }

      addListener(type, listener) {
        switch (type) {
          case Constants.EVENT_TYPES.info_update:
            this._listeners.infoUpdate.push(listener);
            break;
          case Constants.EVENT_TYPES.event:
            this._listeners.event.push(listener);
            break;
          default:
            break;
        }
      }

      get loadingErrorCode() {
        return MonitoringStatic.TRACKING_KINDS.GEP_PLUGIN_LOAD_FAILED;
      }

      get crashErrorrCode() {
        return MonitoringStatic.TRACKING_KINDS.GEP_PLUGIN_CRASHED;
      }

      get isLoadRetries() {
        return true;
      }

      get reportAllErrors() {
        return false;
      }

      _createPluginExtraData = (config) => {
        try {
          if (config.extraData) {
            this._extraData = JSON.stringify(config.extraData);
          }
        } catch (e) {
          console.error(`[GamePluginBase] Failed to stringify extra data`, e);
        }
      }

      _tryLoadingPlugin = (callback) => {
        let me = this;
        const loadingPluginCallback = (e) => {
          if (e.status === "error") {
            console.log(`[ERROR] Failed to load ${me._game.name}  plugin: ${e.reason}`);
            if (me._pluginLoadRetries < Constants.MAX_PLUGIN_LOAD_ATTEMPTS &&
              me.isLoadRetries) {
              console.log("[INFO] Retrying to load " + me._game.name + " plugin...");
              me._pluginLoadRetries++;
              me._retryTimeout = setTimeout(function () {
                me._tryLoadingPlugin(callback)
              }, Constants.PLUGIN_RETRAY_INTERVAL_TIME);
            } else {
              console.log("[INFO] Giving up loading " + me._game.name + " plugin");
              MonitoringStatic.sendTrack(me.loadingErrorCode, me._game.id);

              callback({ status: "error", error: "Failed to load game plugin" });
              me._removePluginListeners();
            }
          } else {
            console.log(
              `[INFO] ${me._game.name} plugin loaded: ${JSON.stringify(e)}`);
            me._sdkChannelId = e.channelId;
            me._onPluginLoadSuccess(callback);
          }
        };

        this._removePluginListeners();
        this._addPluginListeners();

        try {
          this._tryLoadingPluginV183(loadingPluginCallback);
        } catch (err) {
          console.warn("trying old plugin loader", err);
          this._tryLoadingPluginOld(loadingPluginCallback);
        }
      }

      _tryLoadingPluginOld = (callback) => {
        const loadPluginWithParamFunc = overwolfInternal.game.loadPluginWithParam;
        if (this._extraData && loadPluginWithParamFunc) {
          overwolfInternal.game.loadPluginWithParam(
            this._pluginId, this._extraData, callback);
          return;
        }

        overwolfInternal.game.loadPlugin(this._pluginId, callback);
      };

      _tryLoadingPluginV183 = (callback) => {
        const loadPluginWithParamFunc = overwolfInternal.game.loadPluginWithParam;

        if (this._extraData && loadPluginWithParamFunc) {
          overwolfInternal.game.loadPluginWithParam(
            this._pluginId, this._extraData, this._oop, callback);
          return;
        }

        overwolfInternal.game.loadPlugin(this._pluginId, this._oop, callback);

      };

      _useMockPlugin = (callback) => {
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
      };

      _onPluginLoadSuccess = (callback) => {
        if (this._state != Constants.STATES.loaded) {
          this._state = Constants.STATES.loaded;
        }

        callback({ "status": "success" });
      };

      _onPluginInfoUpdate = (data) => {
        const infoList = data.info;
        if (!infoList) {
          return;
        }

        for (let infoItem of infoList) {
          if (this._sdkChannelId && infoItem.channelId &&
            this._sdkChannelId !== infoItem.channelId) {
            return;
          }

          if (Constants.PLUGIN_INFO_WHITELIST.indexOf(infoItem.category) >= 0 ||
            !this._isLogBlacklisted(infoItem.key)) {
            console.log('[PLUGIN INFO] ' + JSON.stringify(infoItem));
          }

          const isWhitelisted =
            this._isWhiteListedEvent(infoItem.key, Constants.EVENT_TYPES.info_update);

          const isPluginError = infoItem.category === "plugin_status" &&
            infoItem.key === "last_error";
          if (isPluginError && !this._ignoreTracking(infoItem)) {
            let value;

            if (infoItem.value.startsWith('crashed_on_task')) {
              value = infoItem.value.substr('crashed_on_task_'.length);
            } else if (infoItem.value.startsWith('failed_init_task')) {
              console.error('failed_init_task: ' + infoItem.value);
              value = infoItem.value;
            } else if (this._reportAllErrors ||
              Constants.PLUGIN_STATES_TO_REPORT.indexOf(infoItem.value) >= 0) {
              value = infoItem.value;
            }

            if (value) {
              let errorId = this.crashErrorrCode;
              if (this._monitoring?.isPbe == true) {
                value = value + this.PBE_SUFFIX;
              }
              MonitoringStatic.sendTrack(errorId, this._game.id + "." + value);
            }

            if (this._monitoring) {
              this._monitoring.handleGameTrackingInfoUpdate(infoItem);
            }
          }

          if (infoItem.key === 'dbgdata' ||
            (infoItem.category === "task_status" && this._monitoring)) {
            let value;
            value = JSON.parse(infoItem.value);
            value = value.module;
            if (value.startsWith('SF')) {
              value = value.replaceAll('#', '_');
              let errorId = this.crashErrorrCode;
              MonitoringStatic.sendTrack(errorId, this._game.id + "." + value);
            }
            this._monitoring.handleGameTrackingInfoUpdate(infoItem);
          }

          if (!isWhitelisted) {
            continue;
          }

          for (let listener of this._listeners.infoUpdate) {
            listener(infoItem);
          }
        }
      };

      _onPluginEvent = (data) => {
        const pluginEvents = data.events;

        for (let currentPluginEvent of pluginEvents) {
          if (this._sdkChannelId && currentPluginEvent.channelId &&
            this._sdkChannelId !== currentPluginEvent.channelId) {
            return;
          }

          let value = currentPluginEvent.data;
          if (currentPluginEvent.name === "plugin_crashed") {
            let errorId = this.crashErrorrCode;
            value = JSON.parse(value);
            if (value.module.startsWith('SF')) {
              value = value.module;
              value = value.replaceAll('#', '_');
              MonitoringStatic.sendTrack(errorId, this._game.id + "." + value);
            }
          }

          if (this._monitoring) {
            this._monitoring.handleGameTrackingEvent(currentPluginEvent);
          }

          let isWhitelisted =
            this._isWhiteListedEvent(currentPluginEvent.name,
              Constants.EVENT_TYPES.event);
          if (isWhitelisted) {

            if (!this._isLogBlacklisted(currentPluginEvent.name)) {
              console.log("[PLUGIN EVENT] " + JSON.stringify(currentPluginEvent));
            }

            for (let listener of this._listeners.event) {
              listener(currentPluginEvent);
            }
          } else {
            console.log("[PLUGIN EVENT] " + JSON.stringify(currentPluginEvent));
          }
        }
      };

      _onPluginConnected = (info) => {
        console.log(`[PLUGIN] connected ${JSON.stringify(info)}`);
      }

      _onPluginError = (info) => {
        console.error(`[PLUGIN] plugin error ${JSON.stringify(info)}`);
        if (!this._oop) {
          return;
        }

        console.log(`[PLUGIN] try to reload oop plugin`, ++this._reloadOOPCounter);
        if (this._reloadOOPCounter > 10) {
          return;
        }

        this._tryLoadingPlugin(() => {
        });
      }

      _isLogBlacklisted = (item) => {
        if (!this._logBlackList || this._logBlackList.length === 0) {
          return false;
        }

        if (this._logBlackList.indexOf(item) >= 0) {
          return true;
        }

        let result = false;
        for (let key of this._logBlackList) {
          if (item.includes(key)) {
            result = true;
            break;
          }
        }

        return result;
      };

      _isWhiteListedEvent = (currentPluginEventName, type) => {
        let result = true;
        let currentEventMetadataList = null;

        if (Constants.PLUGIN_WHITE_LIST[currentPluginEventName]) {
          return true
        }

        const whiteListType = type === Constants.EVENT_TYPES.event ? "Events" : "InfoDB";
        if (this._eventsWhiteList) {
          if (!this._eventsWhiteList.hasOwnProperty(whiteListType)) {
            result = false;
          }

          const whitelist = this._eventsWhiteList[whiteListType];
          currentEventMetadataList = whitelist[currentPluginEventName];
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
          console.log(`[WARN] ${this._game.name} plugin ${whiteListType} not supported: ${currentPluginEventName}`);
        }

        return result;
      };

      _ignoreTracking = (infoItem) => {
        let intGameId = parseInt(this._game.id);
        if (Constants.PLUGIN_ERRORS_TO_IGNORE.hasOwnProperty(intGameId)) {
          let blackList = Constants.PLUGIN_ERRORS_TO_IGNORE[intGameId];
          return blackList.indexOf(infoItem.value) >= 0
        }
        return false;
      };

      _removePluginListeners() {
        overwolf.games.events.onInfoUpdates.removeListener(this._onPluginInfoUpdate);
        overwolf.games.events.onNewEvents.removeListener(this._onPluginEvent);
        if (overwolf.games.events.onConnected) {
          overwolf.games.events.onConnected.removeListener(this._onPluginConnected);
        }
        if (overwolf.games.events.onError) {
          overwolf.games.events.onError.removeListener(this._onPluginError);
        }
      }

      _addPluginListeners() {
        overwolf.games.events.onInfoUpdates.addListener(this._onPluginInfoUpdate);
        overwolf.games.events.onNewEvents.addListener(this._onPluginEvent);

        if (overwolf.games.events.onConnected) {
          overwolf.games.events.onConnected.addListener(this._onPluginConnected);
        }

        if (overwolf.games.events.onError) {
          overwolf.games.events.onError.addListener(this._onPluginError);
        }
      }
    };

    return GamePluginBase;
  });
