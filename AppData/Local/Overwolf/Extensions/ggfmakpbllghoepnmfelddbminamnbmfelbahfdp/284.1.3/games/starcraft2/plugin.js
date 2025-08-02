"use strict";

define(["/games/service/PluginHandler.js", "/libs/js-uuid.js"], function(
  PluginHandler,
  uuid
) {
  let SC2PluginHandler = class SC2PluginHandler extends PluginHandler {

    constructor(config) {
      super(config);
    }

    start(gameInfo, infoDB, featuresHandler, isDisabled) {
      super.start(gameInfo, infoDB, featuresHandler, isDisabled);
    }

    stop() {
      super.stop();
    }

    _handleSingleGameInfo(info) {
      super._handleSingleGameInfo(info);

      let whiteListInfo = this._pluginWhitelist.InfoDB[info.key];
      if (!whiteListInfo) {
        return;
      }
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

  return SC2PluginHandler;
});
