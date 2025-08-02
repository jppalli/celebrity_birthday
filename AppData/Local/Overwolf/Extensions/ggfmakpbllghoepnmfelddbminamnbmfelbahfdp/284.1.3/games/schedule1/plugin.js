"use strict";

define([
  "/games/service/PluginHandler.js",
  "/utils/io_plugin.js",
  "/games/schedule1/logs/log_listener.js",
], function (PluginHandler, IOPlugin, Schedule1LogListener) {
  return class Schedule1PluginHandler extends PluginHandler {

    constructor(config) {
      super(config);
      this._logListener = null;
      this.ioPlugin = null;
    }

    start(gameInfo, infoDB, featuresHandler, isDisabled) {
      super.start(gameInfo, infoDB, featuresHandler, isDisabled);

      const self = this;

      IOPlugin.asyncAssureCreation().then(function (ioPlugin) {
        self._logListener = new Schedule1LogListener(gameInfo, infoDB, featuresHandler);
        self.ioPlugin = ioPlugin;
        self._logListener.start(self.ioPlugin);
      }).catch(_ => {
        console.log(" failed to create io plugin service");
      });

          }

    stop() {
      super.stop();
    }

    _handleSingleGameInfo(info) {
      let whiteListInfo = this._pluginWhitelist.InfoDB[info.key];
      if (!whiteListInfo) {
        return;
      }

      super._handleSingleGameInfo(info);
    }

    _handleSingleEvent(event) {
      let pluginEventName = event.name;
      let metadata = this._pluginWhitelist.Events[pluginEventName];
      if (!metadata) {
        return;
      }

      super._handleSingleEvent(event);
    }
  };
});