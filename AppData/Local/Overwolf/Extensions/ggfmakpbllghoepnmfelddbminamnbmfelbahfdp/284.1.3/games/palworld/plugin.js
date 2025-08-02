"use strict";

define([
  "/games/service/PluginHandler.js",
  "/libs/js-uuid.js",
  "/utils/base_utils.js",
], function (PluginHandler, uuid, BaseUtils) {
  return class PalPluginHandler extends PluginHandler {

    _featuresToClearOnMatchEnd = [
      {
        feature: this._supportedFeatures.location,
        infos: [
          'location'
        ]
      },
    ];

    constructor(config) {
      super(config);
      this.isFirstLobby = true;
    }

    stop() {
      super.stop();
    }

    _handleSingleGameInfo(info) {
      let whiteListInfo = this._pluginWhitelist.InfoDB[info.key];

      if (this._handleSceneInfo(info, whiteListInfo)) {
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
    _handleSceneInfo(info, whiteListInfo) {
      if (!info.key.startsWith("scene")) {
        return false;
      }

      let feature = this._supportedFeatures.match_info;
      if (info.value == "ingame") {
        this.isFirstLobby = false;
        this._featuresHandler.triggerEvent(
          feature.name,
          feature.events.match_start.name,
          null
        );
      }
      else if (info.value == "lobby" && !this.isFirstLobby) {
        this._featuresHandler.triggerEvent(
          feature.name,
          feature.events.match_end.name,
          null
        );
        this._clearData(this._featuresToClearOnMatchEnd);    
      }
    }
  };
});