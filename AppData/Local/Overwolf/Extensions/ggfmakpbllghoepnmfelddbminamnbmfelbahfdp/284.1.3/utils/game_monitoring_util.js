'use strict';

define(['/utils/monitoring_statics.js',
  '/games/SupportedGames.js',
  '/utils/game_events_monitor.js',
  "/utils/io_plugin.js",
  '/utils/ow-api.js',
],
  function (
    MonitoringStatics,
    SupportedGames,
    GameEventsMonitor,
    IOPlugin,
    owAPI,
  ) {

    const MIN_TASK_ERROR_TIME_DIFF = 30000;
    const MIN_SESSION_TIME = 300000; 
    const PBE_SUFFIX = "_pbe";
    const COPY_EXE_PHASING = 10;

    function GameMonitoringUtility(config) {
      if (!(this instanceof GameMonitoringUtility)) {
        throw new TypeError(
          "GameMonitoringUtility constructor cannot be called as a function.");
      }
      let self = this;

      MonitoringStatics.initAllowUsage();
      this._gameEventsMonitor = new GameEventsMonitor();
      this.ioPlugin = IOPlugin;
      this.ioPlugin.asyncAssureCreation();

      if (config) {
        self.sessionStartTime = new Date();
        console.log("[TRACKING] session start time: " + self.sessionStartTime);

        if (config.hasOwnProperty("taskList")) {
          this._taskList = this._taskList.concat(config["taskList"]);
        }

        self.game = config.game;
        self._isPbe = false;
        self._disabled = false;

        self._infoDB = config["infoDB"];
        self._infoDB.addListener(self.handleGameTrackingInfoUpdate.bind(self));
        self._supportedFeatures = config["supportedFeatures"];

        if (config.hasOwnProperty("pluginWhiteList")) {
          self._pluginWhiteList = config["pluginWhiteList"];
        }
      }

      self.isTrackingTasks = this._taskList && this._taskList.length > 0;
      if (self.isTrackingTasks) {
        console.log("[TRACKING] Monitoring plugin tasks");
      }
      console.log("[TRACKING] Monitoring features");
    }


    GameMonitoringUtility.prototype = {
      constructor: GameMonitoringUtility,

      TRACKING_KINDS: MonitoringStatics.TRACKING_KINDS,

      _taskList: [],
      _crashedTasksList: [],
      _disabledTasksList: [],
      _featuresUsed: {},
      _listeners: {},
      _pluginWhiteList: {
        InfoDB: {},
        Events: {}
      },

      setGame: function setGame(gameName) {
        this.game = {
          name: gameName,
        };
      },

      setGameInfo: function setGameInfo(gameInfo) {
        this._gameInfo = gameInfo;
        console.log('[TRACKING]  set monitor gameInfo', JSON.stringify(gameInfo));
      },

      setPBE: function setPBE(enabled) {
        this._isPbe = enabled;
        this._gameEventsMonitor.setModePbe();
      },

      setDisabled: function setDisabled(disabled) {
        this._disabled = disabled;
      },

      stop: function stop() {
        console.log("[TRACKING] monitoring util stop called. Features used: " + JSON.stringify(this._featuresUsed));
        this._infoDB.removeListener(this.handleGameTrackingInfoUpdate);
        if (this._disabled) {
          return;
        }

        _sendBatchPluginMonitoringEvents.call(this);
        _uploadSessionLogsIfShould.call(this);

      },

      handleGameTrackingInfoUpdate: async function handleGameTrackingInfoUpdate(info) {
        let key = '';
        if (info.key == 'dbgdata' || info.key == 'plugin_crashed') {
          const collectedExe = await this.copyExeIfShould();
          this.reportPluginCrashInfo(info, collectedExe);
          return;
        }

        if (info.category === "task_status") {
          _handleTaskStatusTracking.call(this, info);
        }
        else if (info.category === "plugin_status") {
          _handlePluginStatusTracking.call(this, info);
          if (typeof info.value === 'string') {
            try {
              if (info.key === 'last_error') {
                this.reportCustomPluginCrashInfo(info);
              }
            } catch (error) {
              console.error('Error parsing string:', error);
              return;
            }
          } else if (typeof info.value === 'object') {
          } else {
            console.error('Invalid type for info:', typeof info);
            return;
          }
        }

        let metadata = this._pluginWhiteList.InfoDB[info.key];

        if (metadata && metadata.config) {
          key = this._isPbe ? metadata.config.key + PBE_SUFFIX : metadata.config.key;

          if (!this._featuresUsed.hasOwnProperty(key) && info.value !== null) {
            this._featuresUsed[key] = Date.now();
          }

          return;
        }

        key = this._isPbe ? info.key + PBE_SUFFIX : info.key;
        if (this._featuresUsed.hasOwnProperty(key)) {
          return;
        }

        if (key.startsWith("player") && this.game.name === "Rocket League") {
          key = "player";
        }

        if (info.feature === "collection" && this.game.name === "Hearthstone") {
          key = "collection";
        }

        if (this.game.name === "Fortnite") {
          if (info.feature === "items" && info.key.startsWith("item_")) {
            key = "item";
          }

          if (info.feature === "items" && info.key.startsWith("quickbar_")) {
            key = "quickbar";
          }
        }

        if (this.game.name === "Rainbow 6: Siege") {
          if (info.key.startsWith("roster_")) {
            key = "roster";
          }
        }

        if (this.game.name === "Marvel Rivals") {
          if (info.key.startsWith("roster_")) {
            key = "roster";
          }
        }

        if (this.game.name === "Heroes of the Storm") {
          if (info.key.startsWith("draft_")) {
            key = "draft";
          } else if (info.key.startsWith("bans_")) {
            key = "bans";
          }
        }

        this._featuresUsed[key] = Date.now();
      },

      handleGameTrackingEvent: function handleGameTrackingEvent(event) {
        let name = event.name;
        if (event.name === 'plugin_crashed') {
          this.reportPluginCrashEvent(event);
          return;
        }

        if (event.data) {
          if (typeof event.data === "object") {
            if (event.data.hasOwnProperty("label")) {
              name = event.data.label;
            }
            else if (this.game.name === "LoL" && event.data.hasOwnProperty("type")) {
              name = name + "_" + event.data.type;
            }
          }
          else if (this.game.name === "LoL" && typeof event.data === "string") {
            if (name !== "battle_start" && name !== "round_start") {
              name = name + "_" + event.data;
            }
          }
        }

        name = this._isPbe ? name + PBE_SUFFIX : name;

        if (!this._featuresUsed.hasOwnProperty(name)) {
          this._featuresUsed[name] = Date.now();
        }
      },

      sendTrack: function sendTrack(id, extra) {
        try {
          MonitoringStatics.sendTrack(id, extra);
        } catch (e) {
        }
      },

      addTracking: function addTracking(id, errorCode, handler) {
        if (typeof id !== 'undefined' && id !== null && id.length > 0) {

          let listener = {
            id: id,
            errorCode: errorCode,
            handler: handler
          };

          this.TRACKING_KINDS[id] = errorCode;

          this._listeners[id] = listener;
        }
      },

      reportEvent: function reportEvent(info, type) {
        this._gameEventsMonitor.reportEvent(info, type);
      },

      isPbe: function isPbe() {
        return this._isPbe;
      },

      reportPluginCrashEvent: async function reportPluginCrashEvent(event) {
        try {
          const collectedExe = await this.copyExeIfShould();

          const data = JSON.parse(event.data);
          const eventString = JSON.stringify(event);
          console.log(eventString);
          const game = this.game.name.replace(/ /g, '-');
          let eventName = `${game}_${this.game.id}_${data.module}`;
          if (eventString.length > 5000 || collectedExe) {
            _reportLogsOnTaskError(eventName, this.game, collectedExe, this._isPbe);
          }

          this.SentryReport(eventName, data, this._isPbe);

        } catch (ex) {
          console.error("Error while reporting plugin crash event: " + ex);
        }
      },

      reportPluginCrashInfo: function reportPluginCrashInfo(info, includeExe = false) {
        try {
          const eventString = JSON.stringify(info);
          console.log(eventString);
          var value = JSON.parse(info.value);
          const game = this.game.name.replace(/ /g, '-');
          let eventName = `${game}_${this.game.id}_${value.module.replace('#', 'num')}`;
          if (eventString.length > 5000 || includeExe) {
            _reportLogsOnTaskError(eventName, this.game, includeExe, this._isPbe);
          }

          this.SentryReport(eventName, value.data, this._isPbe);
        } catch (ex) {
          console.error("Error while reporting plugin crash info: " + ex);
        }
      },

      reportCustomPluginCrashInfo: async function reportCustomPluginCrashInfo(value, includeExe = false) {
        try {
          console.log(value);
          const game = this.game.name.replace(/ /g, '-');
          value = value.value; 
          let eventName = `${game}_${this.game.id}_${value}`;
          if (value.length > 5000) {
            _reportLogsOnTaskError(eventName, this.game, includeExe, this._isPbe);
          }


          this.SentryReport(eventName, value, this._isPbe);
        } catch (ex) {
          console.error("Error while reporting plugin crash info: " + ex);
        }
      },

      SentryReport: function SentryReport(eventName, value, isPbe) {
        try {
          eventName = isPbe ? eventName + PBE_SUFFIX : eventName;
          Sentry.withScope(scope => {
            scope.setExtra("eventName", eventName);
            scope.setExtra("game", this.game.name)
            scope.setExtra("gameId", this.game.id)
            scope.setExtra("error", value);
            scope.setExtra("elevated", this._gameInfo.elevated);
            scope.setTag('game', this.game.name);
            scope.setTag('gameId', this.game.id);
            Sentry.captureMessage(eventName);
          });
        } catch (ex) {
          console.error("Error while Sending sentry event: " + ex);
        }
      },

      copyExeIfShould: async function copyExeIfShould() {
        try {
          if (this._gameInfo == null) {
            return false;
          }

          const R6Id = 10826;
          if (this.game.id != R6Id) {
            return false;
          }

          const exePath = this._gameInfo.executionPath;
          if (!exePath || exePath == '') {
            console.log('[TRACKING] No game path');
            return false;
          }

          if (!owAPI) {
            return false;
          }

          const _phasedPercent = await owAPI.getPhasedPercent();
          if (_phasedPercent >= COPY_EXE_PHASING) {
            console.log(`[TRACKING] R6 report not in phasing '${_phasedPercent}' `);
            return false;
          }

          let localAppDataDirectory = this.ioPlugin.get().LOCALAPPDATA;
          if (!localAppDataDirectory) {
            console.log("[TRACKING] R6 crash no local app data");
            return false;
          }

          const lastReportedExe = localStorage.getItem('r6_reported');
          if (lastReportedExe && lastReportedExe == exePath) {
            console.log("[TRACKING] R6 crash (E) already reported");
            return false;
          }

          localStorage.setItem('r6_reported', exePath);

          await this.copyFile(exePath, localAppDataDirectory);
          console.log('[TRACKING] R6 copy included');
          return true;
        } catch (error) {
          localStorage.setItem('r6_reported', '');
          console.error('[TRACKING] R6 copy error', error);
        }
        return false;
      },

      copyFile(exePath, localAppDataDirectory) {
        return new Promise((resolve, reject) => {
          try {
            this.ioPlugin.get().copyFile(exePath,
              `${localAppDataDirectory}\\Overwolf\\Log\\Apps\\Overwolf General GameEvents Provider\\`,
              true,
              (success, res) => {
                if (!success) {
                  reject();
                }
                resolve();
              });
          } catch (error) {
            console.error('fail to copy');
            reject();
          }
        });
      },
    };

    function _sendBatchPluginMonitoringEvents() {

      if (this.isTrackingTasks) {

        if (this._crashedTasksList) {
          for (let taskName in this._crashedTasksList) {
            let task = this._crashedTasksList[taskName];
            if (task && task.timestamp && (Date.now() - task.timestamp > MIN_TASK_ERROR_TIME_DIFF)) {
              this.sendTrack(this.TRACKING_KINDS.TASK_CRASHED, taskName);
            }
          }
        }

        if (this._disabledTasksList) {
          for (let taskName in this._disabledTasksList) {
            let task = this._disabledTasksList[taskName];
            if (task && task.timestamp && (Date.now() - task.timestamp > MIN_TASK_ERROR_TIME_DIFF)) {
              this.sendTrack(this.TRACKING_KINDS.TASK_DISABLED, taskName);
            }
          }
        }
      }
      _handleMissingFeatures.call(this);
    }

    function _uploadSessionLogsIfShould() {
      const appVersion = localStorage.getItem("appVersion") || '';
      if (!appVersion || appVersion === '999.9999.999') {
        return;
      }

      const regex = /^(6\d{2,}|\d{4,})\.\d+\.\d+$/;
      const match = regex.test(appVersion);
      if (!match) {
        return;
      }

      _reportLogsOnTaskError.call(this, 'gep_test', this.game, false, false, true);
    }

    function _handleMissingFeatures() {
      let now = new Date().getTime();
      if (now - this.sessionStartTime.getTime() > MIN_SESSION_TIME) {
        _normalizeFeaturesUsed.call(this);

        for (let featureName in this._supportedFeatures) {
          if (this._supportedFeatures.hasOwnProperty(featureName)) {
            let feature = this._supportedFeatures[featureName];

            console.log("checking feature " + JSON.stringify(feature));
            _checkAndReportFeatureEvents.call(this, feature);
            _checkAndReportFeatureInfos.call(this, feature);
          }
        }
      }
      else {
        console.log("[TRACKING] not tracking missing features - session too" +
          " short");
      }
    }

    function _checkAndReportFeatureEvents(feature) {
      if (feature.hasOwnProperty("events")) {
        for (let eventCfgKey in feature.events) {
          if (feature.events.hasOwnProperty(eventCfgKey)) {
            let event = feature.events[eventCfgKey];
            let eventName = event.name || event;

            let sendMissingFeature = true;
            if (feature.events[eventCfgKey].hasOwnProperty('gameType')) {
              sendMissingFeature = feature.events[eventCfgKey].gameType.includes(this.game.name);
            };

            if (event.data) {
              if (typeof event.data === "object") {
                if (event.data.hasOwnProperty("label")) {
                  eventName = event.data.label;
                }
                if (event.data.hasOwnProperty("type")) {
                  eventName = eventName + "_" + event.data.type;
                }
              }
              else if (typeof event.data === "string") {
                eventName = eventName + "_" + event.data;
              }
            }

            eventName = this._isPbe ? eventName + PBE_SUFFIX : eventName;
            let isSupported = !event.hasOwnProperty("supported") || event.supported;
            if (isSupported && sendMissingFeature
              && !this._featuresUsed.hasOwnProperty(eventName)) {
              this.sendTrack(this.TRACKING_KINDS.FEATURE_MISSING, this.game.name + "." + eventName);
            }
          }
        }
      }
    }

    function _checkAndReportFeatureInfos(feature) {
      let infos = null;
      if (feature.hasOwnProperty("info")) {
        infos = feature.info;
      }
      else if (feature.hasOwnProperty("infoDB")) {
        infos = feature.infoDB;
      }

      if (infos) {
        for (let infoCfgKey in infos) {
          if (infos.hasOwnProperty(infoCfgKey)) {
            let info = infos[infoCfgKey];
            let isSupported = !info.hasOwnProperty("supported") || info.supported;
            let key = info.key;
            let sendMissingFeature = true;
            if (info.hasOwnProperty('gameType')) {
              sendMissingFeature = info.gameType.includes(this.game.name); 
            };
            if (this.game.name === "Rainbow 6: Siege") {
              if (key.startsWith("roster_")) {
                key = "roster";
              }
            }

            key = this._isPbe ? key + PBE_SUFFIX : key;

            if (isSupported && sendMissingFeature && !this._featuresUsed.hasOwnProperty(key)) {
              this.sendTrack(this.TRACKING_KINDS.FEATURE_MISSING, this.game.name + "." + key);
            }
          }
        }
      }
    }

    function _handleTaskStatusTracking(info) {
      switch (info.value) {
        case 'disabled':
          console.log('[TRACKING] task was disabled: ' + info.key);
          this._disabledTasksList[info.key] = {
            timestamp: Date.now()
          };
          _setFeaturesStatusByTask.call(this, info.key, false);
          break;
        case 'crashed':
          console.log('task has crashed: ' + info.key);
          this._crashedTasksList[info.key] = {
            timestamp: Date.now()
          };
          _setFeaturesStatusByTask.call(this, info.key, false);
          break;
        case 'initialized':
          _setFeaturesStatusByTask.call(this, info.key, true);
          break;
      }
    }


    function _handlePluginStatusTracking(info) {
      let key = info.key;
      let value = info.value;
      value = this._isPbe ? value + PBE_SUFFIX : value;
      switch (key) {
        case 'last_error':
          if (!value.startsWith('failed_init_task') && !value.startsWith('cpu_high_usage') && !value.startsWith('disabled_goop')) {
            console.error('plugin error status: ' + value);
            this.sendTrack(MonitoringStatics.TRACKING_KINDS.ERROR, value);
          }

          if (value.startsWith('cpu_high_usage') || value.startsWith('disabled_goop')) {
            const game = this.game.name.replace(/ /g, '-');
            let eventName = `${game}_${this.game.id}_${value}`;
            _reportLogsOnTaskError.call(eventName, eventName, this.game, false, false, true);
          }
          if (this._taskList.length > 0) {
            for (let taskItem of this._taskList) {
              _setFeaturesStatusByTask.call(this, taskItem, false);
            }
          }
          break;
      }

      if (this._listeners.hasOwnProperty(key) && this._listeners[key].handler) {
        this._listeners[key].handler(key, value);
      }

    }

    function _setFeaturesStatusByTask(taskName, status) {
      if (!this._infoDB || !this._supportedFeatures) {
        return;
      }

      let featureId, feature;
      let featuresCount = 0;

      for (featureId in this._supportedFeatures) {
        if (this._supportedFeatures.hasOwnProperty(featureId)) {
          feature = this._supportedFeatures[featureId];
          if (feature.task === taskName) {
            this._infoDB.set(this._supportedFeatures.features.name,
              "features",
              feature.name,
              status);
            featuresCount++;
          }
        }
      }

      if (featuresCount === 0) {
        console.log("[TRACKING] Received task status that doesn't exist in" +
          " features list" +
          " - " + taskName);
      }
    }

    function _reportLogsOnTaskError(
      taskName,
      game,
      includeExe = false,
      isPbe = false,
      ignoreTask = false) {

      if (_wasPluginTaskErrorAlreadySent(game.id, taskName)) {
        return;
      }

      try {
        if (includeExe) {
          taskName += "_hasexe";
        }

        if (isPbe) {
          taskName += PBE_SUFFIX;
        }
        console.log("Uploading  report: " + taskName);
        const appVersion = localStorage.getItem("appVersion") || '';
        let logPrefix = `${appVersion}_${taskName}_`;
        logPrefix = logPrefix.replaceAll('.', '_');
        logPrefix = logPrefix.replaceAll(' ', '_');
        logPrefix = logPrefix.replaceAll('#', '_');
        if (logPrefix.length > 64) {
          logPrefix = logPrefix.substring(0, 64);
        }
        overwolf.utils.uploadClientLogs({
          filePrefix: logPrefix
        }, (e) => {
          if (!e.success) {
            console.error(`upload client logs ${JSON.stringify(e)}`);
          } else {
            console.info(`client logs result ${JSON.stringify(e)}`);
          }
        });

        if (ignoreTask) {
          return;
        }

        _setPluginTaskErrors(game.id, taskName);

      } catch (err) {
        console.error(`upload client logs error `, err);
      }
    }

    function _wasPluginTaskErrorAlreadySent(gameId, taskName) {
      try {
        const appVersion = localStorage.getItem("appVersion") || '';
        const pluginTaskErrors = JSON.parse
          (localStorage.getItem('plugin_task_errors_multi'));

        if (!pluginTaskErrors) {
          return false;
        }

        if (!pluginTaskErrors.hasOwnProperty(gameId)) {
          return false;
        }

        const gameTaskErrors = pluginTaskErrors[gameId];
        if (!gameTaskErrors.hasOwnProperty(taskName)) {
          return false;
        }

        const taskError = gameTaskErrors[taskName];
        if (taskError.appVersion === appVersion && taskError.count >= 5) return true;

        return false;
      } catch (e) {
        console.error('Failed to determine if plugin task error was already sent, error Details: ', e)
        return true;
      }
    }

    function _setPluginTaskErrors(gameId, taskName) {

      let pluginTaskErrors =
        JSON.parse(localStorage.getItem('plugin_task_errors_multi')) || {};

      if (!pluginTaskErrors.hasOwnProperty(gameId)) {
        pluginTaskErrors[gameId] = {};
      }

      let gameTaskErrors = pluginTaskErrors[gameId];
      const appVersion = localStorage.getItem("appVersion") || '';

      if (!gameTaskErrors.hasOwnProperty(taskName)) {
        gameTaskErrors[taskName] = { appVersion, count: 1 };
      } else {
        let taskError = gameTaskErrors[taskName];
        if (taskError != appVersion) {
          taskError = { appVersion, count: taskError.count++ };
        }
      }

      localStorage.setItem('plugin_task_errors', JSON.stringify(pluginTaskErrors));
    }

    function _normalizeFeaturesUsed() {
      if (!this._isPbe) {
        return;
      }

      for (let key in this._featuresUsed) {
        if (key.includes(PBE_SUFFIX)) {
          return;
        }

        this._featuresUsed[`${key}${PBE_SUFFIX}`] = this._featuresUsed[key]
        delete this._featuresUsed[key];
      }
    }

    return GameMonitoringUtility;
  });