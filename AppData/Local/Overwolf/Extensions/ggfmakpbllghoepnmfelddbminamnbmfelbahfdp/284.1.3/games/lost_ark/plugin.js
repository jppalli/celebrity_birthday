"use strict";

define(["/games/service/PluginHandler.js",
  "/libs/js-uuid.js",
  "/utils/base_utils.js"], function (
    PluginHandler,
    uuid,
    BaseUtils
  ) {
  return class LostArkPluginHandler extends PluginHandler {

    constructor(config) {
      super(config);
    }

    stop() {
      super.stop();
    }

    _handleSingleGameInfo(info) {
      let whiteListInfo = this._pluginWhitelist.InfoDB[info.key];
      if (this._handlePlayerClassInfo(info, whiteListInfo)) {
        return;
      }

      if (this._handleMobDetailsInfo(info, whiteListInfo)) {
        return;
      }

      super._handleSingleGameInfo(info);
    }

    _handleSingleEvent(event) {

      super._handleSingleEvent(event);
      let pluginEventName = event.name;
      let metadata = this._pluginWhitelist.Events[pluginEventName];
      if (!metadata) {
        return;
      }
    }

    _handlePlayerClassInfo(info, whiteListInfo) {
      if (!info.key.startsWith('player_class')) {
        return false;
      }

      if (info.value == "") {
        info.value = null;
      }
      this._infoDB.set(whiteListInfo.feature_id,
        whiteListInfo.config.category,
        info.key,
        info.value);

      return true;
    }

    _handleMobDetailsInfo(info, whiteListInfo) {
      if (!info.key.startsWith('mob_details')) {
        return false;
      }

      this._infoDB.set(whiteListInfo.feature_id,
        whiteListInfo.config.category,
        info.key,
        info.value);

      return true;
    }
  };
});
