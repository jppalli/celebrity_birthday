"use strict";

define(["/games/service/PluginHandler.js",
         "/libs/js-uuid.js",
        "/utils/base_utils.js"], function (
  PluginHandler,
  uuid,
  BaseUtils
) {
  return class Diablo2PluginHandler extends PluginHandler {
    _featuresToClearOnMatchEnd = [
      {
         feature: this._supportedFeatures.game_info,
         infos: [
           'player_class',
           'player_experience',
           'player_level'
         ]
       },
       {
        feature: this._supportedFeatures.match_info,
        infos: [
          'act',
          'character_name',
          'player_stats'
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
      if (this._handleInfoWithValueConversion(info, whiteListInfo)) {
        return;
      }

      if (this._handleItemXInfo(info)) {
        return;
      }

      if (this._handleCharacterNameInfo(info, whiteListInfo)) {
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
        case "match_end":
          this._handleMatchEndEvent();
          break;
      }

      super._handleSingleEvent(event);

          }

    _handleInfoWithValueConversion(info, whiteListInfo) {
      if (info.key != "player_level" && info.key != "act" &&
          info.key != "player_experience") {
            return false;
      }

      let value = parseInt(info.value);

        this._infoDB.set(whiteListInfo.feature_id,
          whiteListInfo.config.category,
          whiteListInfo.config.key,
          value);

        return true;
    }
    _handleItemXInfo(info ) {
      if (!info.key.startsWith('item_') ) {
            return false;
      }

      let whiteListInfo = this._pluginWhitelist.InfoDB['item_'];

      this._infoDB.set(whiteListInfo.feature_id,
          whiteListInfo.config.category,
          info.key,
          info.value);

        return true;
    }

    _handleCharacterNameInfo(info, whiteListInfo) {
      if (!info.key.startsWith('character_name')) {
        return false;
      }

      info.value = BaseUtils.b64DecodeUnicode(info.value);
      this._infoDB.set(whiteListInfo.feature_id,
        whiteListInfo.config.category,
        info.key,
        info.value);

      return true;
    }

    _handleMatchEndEvent() {

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
