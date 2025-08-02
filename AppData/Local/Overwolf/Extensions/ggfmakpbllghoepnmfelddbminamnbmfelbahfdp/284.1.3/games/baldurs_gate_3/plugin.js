"use strict";

define([
  "/games/service/PluginHandler.js",
  "/libs/js-uuid.js",
  "/utils/base_utils.js",
], function (PluginHandler, uuid, BaseUtils) {
  return class Bg3PluginHandler extends PluginHandler {

    _match_started = false;

    _featuresToClearOnMatchEnd = [
      {
        feature: this._supportedFeatures.location,
        infos: [
          'main_map',
          'sub_map'
        ]
      }
    ];


    constructor(config) {
      super(config);
    }

    stop() {
      super.stop();
    }

    _handleSingleGameInfo(info) {
      let whiteListInfo = this._pluginWhitelist.InfoDB[info.key];
      if (!whiteListInfo) {
        return;
      }

      if (this._handleSceneInfo(info, whiteListInfo)) {
        return;
      }

      if (this._handleMainMapInfo(info)) {
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

      const scene = info.value;
      const scene_allowlist = ["Menu", "Running", "Save"];

      if (!scene_allowlist.includes(scene)) {
        return false;
      }

      this._infoDB.set(whiteListInfo.feature_id,
        whiteListInfo.config.category,
        whiteListInfo.config.key,
        scene);

      if (info.value === "Running" && !this._match_started) {
        this._match_started = true;

        this._featuresHandler.triggerEvent(
          this._supportedFeatures.match_info.name,
          this._supportedFeatures.match_info.events.match_start.name,
          null
        );
      } else if (info.value === "Menu" && this._match_started) {
        this._match_started = false;

        this._featuresHandler.triggerEvent(
          this._supportedFeatures.match_info.name,
          this._supportedFeatures.match_info.events.match_end.name,
          null
        );

        this._clearData(this._featuresToClearOnMatchEnd);
      }
    }

    _handleMainMapInfo(info) {
      if (!info.key.startsWith("main_map")) {
        return false;
      }

      switch (info.value) {
        case "TUT_Avernus_C": {
          info.value = "Nautiloid"
          break;
        }
        case "WLD_Main_A": {
          info.value = "Wilderness"
          break;
        }
        case "SCL_Main_A": {
          info.value = "Shadow-Cursed Lands"
          break;
        }
        case "BGO_Main_A":
        case "CTY_Main_A": {
          info.value = "Baldurs Gates"
          break;
        }

      }
    }
  };
});