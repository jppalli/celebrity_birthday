'use strict';

define([
  '/utils/version_compare.js',
  '/utils/plugin/game_plugin_gep.js',
  '/utils/plugin/game_plugin_goop.js',
  '/utils/plugin/plugin_type.js',
  "/utils/registry_utils.js",
  '/utils/monitoring_statics.js',
  "/utils/analytics.js"
], function (VersionComparer,
  GamePluginGep,
  GamePluginGoop,
  PluginType,
  RegistryUtils,
  MonitoringStatics,
  Analytics) {

  class PluginHandler {
    constructor(config) {
      this._logName = "[" + config.game.name.toUpperCase() + " SERVICE]";
      this._gameInfo = null;
      this._infoDB = null;
      this._pluginType = config.pluginType || PluginType.GAME;
      this._featuresHandler = null;
      this._eventOverrides = config.eventOverrides;
      this._infoUpdateOverrides = config.infoUpdateOverrides;

      this._pluginWhitelist = config.pluginWhitelist;
      this._supportedFeatures = config.supportedFeatures;
      this.game = config.game;
      this._logBlacklist = [];
      this._isDisabled = false;
      if (config.hasOwnProperty("logBlacklist")) {
        this._logBlacklist = config.logBlacklist;
      }

      this._pluginStatesToReport = config.pluginStatesToReport;

      this._ignoreEvents = false;
      this._oop = config.oop || false;

      this._goopConfigPath = config.goopConfigPath || '';

      this._monitoring = config.monitoring;

      this._createPlugins();
    }

    async start(gameInfo, infoDB, featuresHandler, isDisabled) {
      let MemoryIntegrityEnabled = false;

      if (!isDisabled && this.testMemoryIntegrity()) {
        console.log('testing MemoryIntegrity');

        MemoryIntegrityEnabled = await this.isMemoryIntegrityEnabled();

        Analytics.actualTrack(MonitoringStatics.TRACKING_EVENTS.MEMORY_INTEGRITY, {
          status: MemoryIntegrityEnabled ? "enabled" : "disabled",
        });
      }

      if (gameInfo.classId === 21640 && MemoryIntegrityEnabled) {
        isDisabled = true;
      }

      this._isDisabled = isDisabled;
      if (isDisabled) {
        this._log("game events are disabled for this game");
        this._monitoring.setDisabled(isDisabled);
        return;
      }

      this._gameInfo = gameInfo;
      this._infoDB = infoDB;
      this._featuresHandler = featuresHandler;

      this._startPlugins();
    }

    stop() {
      this._gamePlugin?.stop();
      this._goopPlugin?.stop();
    }

    testMemoryIntegrity() {
      return false;
    }

    _createPlugins() {
      if (this._pluginType & PluginType.GAME) {
        this._gamePlugin = new GamePluginGep();
      }

      if (this._pluginType & PluginType.GOOP) {
        const owVer = overwolf.version;
        if (VersionComparer.compare(owVer, '0.194.1.0') >= 0) {
          this._goopPlugin = new GamePluginGoop();
        } else {
          const errorMsg = `Goop plugin does not support ow version ${owVer}`;
          console.warn(errorMsg);
          if (!this._gamePlugin) {
            throw new Error(errorMsg);
          }
        }
      }
    }

    _startPlugins = () => {
      let me = this;

      const sharedPluginConfig = {
        game: {
          id: this.game.id,
          name: this.game.name,
        },
        eventsWhiteList: this._pluginWhitelist,
        logBlackList: this._logBlacklist,
        pluginStatesToReport: this._pluginStatesToReport,
        monitoring: this._monitoring
      };

      this._gamePlugin?.start({
        ...sharedPluginConfig,
        oop: this._oop || false
      },
        function (result) {
          me._onGamePluginLoaded(result, me._gamePlugin);
        });

      this._goopPlugin?.start({
        ...sharedPluginConfig,
        goopConfigPath: this._goopConfigPath || ''
      },
        function (result) {
          me._onGamePluginLoaded(result, me._goopPlugin);
        })
    };

    _onGamePluginLoaded(result, plugin) {
      if (result.status === "success") {
        let me = this;
        plugin.addListener(plugin.EVENT_TYPES.info_update,
          function (res) {
            me._onPluginInfoUpdate(res)
          });
        plugin.addListener(plugin.EVENT_TYPES.event,
          function (res) {
            me._onPluginEvent(res);
          });
      }
    }

    _onPluginEvent(currentEvent) {
      if (!this._ignoreEvents) {
        this._handleSingleEvent(currentEvent);
      }
    }

    _onPluginInfoUpdate(info) {
      if (!this._ignoreEvents) {
        this._handleSingleGameInfo(info);
      }
    }

    _handleSingleEvent(event) {
      let pluginEventName = event.name;
      let metadata = this._pluginWhitelist.Events[pluginEventName];
      if (!metadata) {
        return;
      }

      if (this._eventOverrides.indexOf(metadata.event.name) >= 0 ||
        metadata.override) {
        return;
      }

      let data = metadata.event.data;
      if (metadata.useEventData) {
        data = event.data;
      }

      this._featuresHandler.triggerEvent(metadata.featureId,
        metadata.event.name,
        data);
    }

    _handleSingleGameInfo(info) {
      if (info.category === "plugin_status") {
        this._log('plugin status: ' + info.value);
        return;
      }

      let whiteListInfo = this._pluginWhitelist.InfoDB[info.key];
      if (!whiteListInfo) {
        const incrementalInfoUpdate = this._pluginWhitelist.InfoDB[
          Object.keys(this._pluginWhitelist.InfoDB).find(
            key => info.key.startsWith(key)
          )
        ];

        if (!incrementalInfoUpdate) {
          return;
        }

        incrementalInfoUpdate.config.key = info.key;
        whiteListInfo = incrementalInfoUpdate;
      }

      if (this._infoUpdateOverrides.indexOf(whiteListInfo.config.key) >= 0 || whiteListInfo.override) {
        return;
      }

      let key = whiteListInfo.config.key;
      if (whiteListInfo.config.usePluginKey === true) {
        key = info.key;
      }

      this._infoDB.set(whiteListInfo.feature_id,
        whiteListInfo.config.category,
        key,
        info.value);
    }

    _log(line) {
      console.log(this._logName + " " + line);
    }

    _error(line, err) {
      console.error(this._logName + " " + line, err);
    }

    _clearData(featuresToClear) {
      featuresToClear.forEach(featureToClear =>
        featureToClear.infos.forEach(info =>
          this._infoDB.set(
            featureToClear.feature.name,
            featureToClear.feature.info[info].category,
            featureToClear.feature.info[info].key,
            null
          )
        )
      );
    }

    async isMemoryIntegrityEnabled() {
      let regKeyData = 0;
      try {
        regKeyData = await RegistryUtils.getLocalMachineKey(
          "SYSTEM\\CurrentControlSet\\Control\\DeviceGuard\\Scenarios\\HypervisorEnforcedCodeIntegrity",
          "Enabled"
        );
      } catch (error) {
        regKeyData = 0;
      }

      return regKeyData == 1;
    }

  };

  return PluginHandler;
});
