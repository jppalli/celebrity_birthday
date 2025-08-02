"use strict";

define([
  "/games/service/PluginHandler.js",
], function (PluginHandler) {
  return class SpectrePluginHandler extends PluginHandler {

    _match_started = false;

    _featuresToClearOnMatchEnd = [
      {
         feature: this._supportedFeatures.match_info,
         infos: [
           'kills',
           'deaths',
           'assists',
           `map`
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

      if (this._handleSceneInfo(info, whiteListInfo)) {
        return;
      }

            if (this._handleKillsInfo(info)) {
        return;
      }

      if (this._handleDeathsInfo(info)) {
        return;
      }

      if (this._handleAssistsInfo(info)) {
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

    _handleSceneInfo(info, whiteListInfo) {
      if (!info.key.startsWith("scene")) {
        return false;
      }

      const scene = info.value;
      const scene_allowlist = ["MainMenu", "SponsorSelect", "Greenbelt_P", "Tutorial_P", "ShootingRange_P", "Metro_P", "Junction_P", "Commons_P"];
      const maps = ["Greenbelt_P", "Tutorial_P", "ShootingRange_P", "Metro_P", "Junction_P", "Commons_P"];
      if (!scene_allowlist.includes(scene)) {
        return false;
      }

      this._infoDB.set(whiteListInfo.feature_id,
        whiteListInfo.config.category,
        whiteListInfo.config.key,
        scene);

      if (maps.includes(info.value) && !this._match_started) {
        this._match_started = true;

        this._featuresHandler.triggerEvent(
          this._supportedFeatures.match_info.name,
          this._supportedFeatures.match_info.events.match_start.name,
          null
        );

        info.value = info.value.replace('_P', '');
        let feature = this._supportedFeatures.match_info;
        this._infoDB.set(feature.name,
          feature.info.map.category,
          feature.info.map.key,
          info.value);

                } else if (info.value === "MainMenu" && this._match_started) {
        this._match_started = false;

        this._featuresHandler.triggerEvent(
          this._supportedFeatures.match_info.name,
          this._supportedFeatures.match_info.events.match_end.name,
          null
        );

        this._clearData(this._featuresToClearOnMatchEnd);
      }
    }

    _handleKillsInfo(info) {
      if (info.key != "kills") {
        return false;
      }

      this._featuresHandler.triggerEvent(
        this._supportedFeatures.match_info.name,
        this._supportedFeatures.match_info.events.kill.name,
        null
      ); 
    }

    _handleDeathsInfo(info) {
      if (info.key != "deaths") {
        return false;
      }

      this._featuresHandler.triggerEvent(
        this._supportedFeatures.match_info.name,
        this._supportedFeatures.match_info.events.death.name,
        null
      ); 
    }

    _handleAssistsInfo(info) {
      if (info.key != "assists") {
        return false;
      }

      this._featuresHandler.triggerEvent(
        this._supportedFeatures.match_info.name,
        this._supportedFeatures.match_info.events.assist.name,
        null
      ); 
    }
  };
});