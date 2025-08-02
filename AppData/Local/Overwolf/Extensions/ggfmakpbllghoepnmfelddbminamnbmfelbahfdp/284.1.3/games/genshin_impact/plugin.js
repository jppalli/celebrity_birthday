"use strict";

define([
  "/games/service/PluginHandler.js",
  "/utils/io_plugin.js",
  "/games/genshin_impact/logs/log_listener.js",
], function (PluginHandler, IOPlugin, GenshinLogListener) {
  return class GiPluginHandler extends PluginHandler {

    constructor(config) {
      super(config);
      this._logListener = null;
      this.ioPlugin = null;
    }

    start(gameInfo, infoDB, featuresHandler, isDisabled) {
      super.start(gameInfo, infoDB, featuresHandler, isDisabled);

      const self = this;

      IOPlugin.asyncAssureCreation().then(function (ioPlugin) {
        self._logListener = new GenshinLogListener(gameInfo, infoDB, featuresHandler);
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

      if (this._handlePlayerIdInfo(info)) {
        return;
      }

      if (this._handleCharNameInfo(info)) {
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

      switch (event.name) {
        case "character_switch":
          event.data = this._handleSwitchEvent(event);
          break;
      }

      super._handleSingleEvent(event);
    }

    _handlePlayerIdInfo(info) {
      if (!info.key.startsWith("player_id")) {
        return false;
      }

      info.value = parseInt(info.value);
    }

    _handleCharNameInfo(info) {
      if (!info.key.startsWith("character_name")) {
        return false;
      }

      info.value = this._changeNames(info.value);
    }


    _handleSwitchEvent(event) {

      event.data = this._changeNames(event.data);
      return event.data;
    }

    _changeNames(data) {

      data = data.replace("UI_AvatarIcon_", "");
      if (data == "Ambor") {
        data = "Amber";
      }
      return data;
    }
  };
});