"use strict";

define([
  "/games/service/PluginHandler.js",
  "/libs/js-uuid.js",
  "/utils/base_utils.js",
], function (PluginHandler, uuid, BaseUtils) {
  return class StarfieldPluginHandler extends PluginHandler {

    constructor(config) {
      super(config);
    }

    stop() {
      super.stop();
    }

    _handleSingleGameInfo(info) {
      let whiteListInfo = this._pluginWhitelist.InfoDB[info.key];

      if (this._handlePlanetNameInfo(info, whiteListInfo)) {
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
    _handlePlanetNameInfo(info, whiteListInfo) {
      if (!info.key.startsWith("planet_name")) {
        return false;
      }

      let planet = info.value

            if (planet && planet.includes(".biom")) {
        planet = planet.replace(".biom", "");
      }

      this._infoDB.set(whiteListInfo.feature_id,
        whiteListInfo.config.category,
        whiteListInfo.config.key,
        planet);
    }
  };
});