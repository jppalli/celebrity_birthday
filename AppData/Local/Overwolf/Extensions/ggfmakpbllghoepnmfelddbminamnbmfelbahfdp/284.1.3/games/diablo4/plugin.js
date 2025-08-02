"use strict";

define([
  "/games/service/PluginHandler.js",
  "/libs/js-uuid.js",
  "/utils/base_utils.js",
], function (PluginHandler, uuid, BaseUtils) {
  return class Diablo4PluginHandler extends PluginHandler {
    _featuresToClearOnMatchEnd = [
      {
         feature: this._supportedFeatures.me,
         infos: [
           'class',
           'level',
           'xp',
           'health',
           `name`,
           'paragon_level'
         ]
       },
       {
        feature: this._supportedFeatures.location,
        infos: [
          'map'
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

      if (this._handleMapInfo(info, whiteListInfo)) {
        return;
      }

      if (this._handleGoldInfo(info, whiteListInfo)) {
        return;
      }

      if (this._handlePlayerNameInfo(info, whiteListInfo)) {
        return;
      }

      if (this._handlePlayerLevelInfo(info, whiteListInfo)) {
        return;
      }

      if (this._handlePlayerParagonLevelInfo(info, whiteListInfo)) {
        return;
      }

      if (this._handlePlayerClassInfo(info, whiteListInfo)) {
        return;
      }

      if (this._handlePlayerXpInfo(info, whiteListInfo)) {
        return;
      }

      if (this._handlePlayerHealthInfo(info, whiteListInfo)) {
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
        case "match_start":
          this._handleMatchStartEvent(event, metadata);
          break;
        case "match_end":
          this._handleMatchEndEvent(event, metadata);
          break;
      }

      super._handleSingleEvent(event);

          }

    _handleMapInfo(info, whiteListInfo) {
      if (!info.key.startsWith("player_map")) {
        return false;
      }
      this._infoDB.set(whiteListInfo.feature_id,
        whiteListInfo.config.category,
        whiteListInfo.config.key,
        info.value);
    }

    _handleGoldInfo(info, whiteListInfo) {
      if (!info.key.startsWith("player_gold")) {
        return false;
      }

      info.value = parseInt(info.value);

      this._infoDB.set(whiteListInfo.feature_id,
        whiteListInfo.config.category,
        whiteListInfo.config.key,
        info.value);
    }

    _handlePlayerNameInfo(info, whiteListInfo) {
      if (!info.key.startsWith("player_name")) {
        return false;
      }

      info.value = BaseUtils.b64DecodeUnicode(info.value);

      this._infoDB.set(whiteListInfo.feature_id,
        whiteListInfo.config.category,
        whiteListInfo.config.key,
        info.value);
    }

    _handlePlayerLevelInfo(info, whiteListInfo) {
      if (!info.key.startsWith("player_level")) {
        return false;
      }

      info.value = parseInt(info.value);

      this._infoDB.set(whiteListInfo.feature_id,
        whiteListInfo.config.category,
        whiteListInfo.config.key,
        info.value);
    }

    _handlePlayerParagonLevelInfo(info, whiteListInfo) {
      if (!info.key.startsWith("player_paragon_level")) {
        return false;
      }

      info.value = parseInt(info.value);

      this._infoDB.set(whiteListInfo.feature_id,
        whiteListInfo.config.category,
        whiteListInfo.config.key,
        info.value);
    }

    _handlePlayerClassInfo(info, whiteListInfo) {
      if (!info.key.startsWith("player_class")) {
        return false;
      }

      info.value = parseInt(info.value);

      this._infoDB.set(whiteListInfo.feature_id,
        whiteListInfo.config.category,
        whiteListInfo.config.key,
        info.value);
    }

    _handlePlayerXpInfo(info, whiteListInfo) {
      if (!info.key.startsWith("player_xp")) {
        return false;
      }

      info.value = parseInt(info.value);

      this._infoDB.set(whiteListInfo.feature_id,
        whiteListInfo.config.category,
        whiteListInfo.config.key,
        info.value);
    }

    _handlePlayerHealthInfo(info, whiteListInfo) {
      if (!info.key.startsWith("player_health")) {
        return false;
      }

      info.value = parseInt(info.value);

      this._infoDB.set(whiteListInfo.feature_id,
        whiteListInfo.config.category,
        whiteListInfo.config.key,
        info.value);
    }


    _handleMatchStartEvent(eventInfo, metadata) {

      let feature = this._supportedFeatures.match_info;
      this._featuresHandler.triggerEvent(
        feature.name,
        feature.events.match_start.name,
        null
      );
    }


    _handleMatchEndEvent(eventInfo, metadata) {

      let feature = this._supportedFeatures.match_info;
      this._featuresHandler.triggerEvent(
        feature.name,
        feature.events.match_end.name,
        null
      );
      this._clearData(this._featuresToClearOnMatchEnd);
    }
  };
});