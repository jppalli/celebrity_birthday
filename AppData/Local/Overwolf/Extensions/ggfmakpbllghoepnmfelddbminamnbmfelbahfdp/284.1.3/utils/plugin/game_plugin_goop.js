"use strict";

define([
  "/utils/plugin/plugin_constants.js",
  "/utils/plugin/game_plugin_base.js",
  "/utils/monitoring_statics.js",
  "/utils/base_utils.js",
], function (Constants, GamePluginBase, MonitoringStatic, BaseUtils) {
  const GOOPPLUGIN = "GOOPPlugin";

  class GamePluginGoop extends GamePluginBase {
    constructor(config) {
      config = config || {};

      config.pluginName = GOOPPLUGIN;
      super(config);
    }

    get loadingErrorCode() {
      return MonitoringStatic.TRACKING_KINDS.GOOP_PLUGIN_LOAD_FAILED;
    }

    get crashErrorrCode() {
      return MonitoringStatic.TRACKING_KINDS.GOOP_PLUGIN_CRASHED;
    }

    get isLoadRetries() {
      return false;
    }

    get reportAllErrors() {
      return true;
    }

    start(config, callback) {
      let logLevel = 2;
      if (localStorage.goopLogLevel) {
        logLevel = localStorage.goopLogLevel;
        console.log("[INFO] Override goop log level", logLevel);
      }

      config.extraData = {
        configFile: config.goopConfigPath,
        logLevel: logLevel,
      };

      super.start(config, callback);
    }

    _tryLoadingPluginV183 = (callback) => {
      const loadPluginWithParamFunc = overwolfInternal.game.loadPluginWithParam;

      if (this._extraData && loadPluginWithParamFunc) {
        overwolfInternal.game.loadPluginWithParam(
          this._pluginId,
          this._extraData,
          this._oop,
          callback
        );
        return;
      } else {
        console.error(`[GamePluginGoop] Plugin not supported!`);
      }
    };

    _onPluginError = (error) => {
      if (error.id != this._sdkChannelId) {
        return;
      }

      console.error(`Goop plugin error: ${JSON.stringify(error)}`);
      error.reason = error.reason.replace(/\./g, "_");
      const extra = `${this._game.id}.${error.reason}`;
      MonitoringStatic.sendTrack(this.crashErrorrCode, extra);
    };

    _removePluginListeners = () => {
      super._removePluginListeners();
      overwolf.games.events.onError.removeListener(this._onPluginError);
    };

    _addPluginListeners = () => {
      super._addPluginListeners();
      overwolf.games.events.onError.addListener(this._onPluginError);
    };
  }

  return GamePluginGoop;
});
