"use strict";

define([
  "/games/service/PluginHandler.js",
  "/libs/js-uuid.js",
  "/utils/base_utils.js",
], function (PluginHandler, uuid, BaseUtils) {
  return class SotfPluginHandler extends PluginHandler {

    constructor(config) {
      super(config);
    }

    stop() {
      super.stop();
    }

    _handleSingleGameInfo(info) {
      let whiteListInfo = this._pluginWhitelist.InfoDB[info.key];

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
  };
});