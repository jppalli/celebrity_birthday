"use strict";

define([
  "/games/service/PluginHandler.js",
  "/utils/io_plugin.js",
  "/games/splitgate_2/logs/log_listener.js",
], function (PluginHandler, IOPlugin, Splitgate2LogListener) {
  return class Splitgate2PluginHandler extends PluginHandler {

    _isDeathAllowed = true;
    _deathTimeout = null;

    constructor(config) {
      super(config);
      this._logListener = null;
      this.ioPlugin = null;
    }

    start(gameInfo, infoDB, featuresHandler, isDisabled) {
      super.start(gameInfo, infoDB, featuresHandler, isDisabled);

      const self = this;

      IOPlugin.asyncAssureCreation().then(function (ioPlugin) {
        self._logListener = new Splitgate2LogListener(gameInfo, infoDB, featuresHandler);
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

      switch (event.data) {
        case 'death': {
          this._handleDeathEvent(event);
          break;
        }
      }

      super._handleSingleEvent(event);
    }

    _handleDeathEvent(event) {
      if (!this._isDeathAllowed) {
        return;
      }

      const matchInfo = this._supportedFeatures.match_info;
      this._featuresHandler.triggerEvent(
        matchInfo.name,
        matchInfo.events.death.name,
        null
      );

      this._isDeathAllowed = false

      if (this._deathTimeout) {
        clearTimeout(this._deathTimeout);
      }

      this._deathTimeout = setTimeout(() => {
        this._isDeathAllowed = true;
        this._deathTimeout = null;
      }, 7000); 
    }
  };
});