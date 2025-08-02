'use strict';

define([
  '/games/service/PluginHandler.js',
  '/libs/js-uuid.js',
  "/utils/base_utils.js",
], function (PluginHandler,
  uuid, base_utils) {
  return class PluginHandlerPoE2 extends PluginHandler {

    _matchstarted = false;
    constructor(config) {
      super(config);

      this._language = null;
      this._defaultLang = "en";
    }

    _handleSingleGameInfo(info) {
      const whiteListInfo = this._pluginWhitelist.InfoDB[info.key];
      if (!whiteListInfo) {
        return;
      }

      if (this._handleOpenedPageInfo(info, whiteListInfo)) {
        return;
      }

      if (this._handleLanguageInfo(info, whiteListInfo)) {
        return;
      }

      if (this._handleChatLanguageInfo(info, whiteListInfo)) {
        return;
      }

      if (this._handleCharacterNameInfo(info, whiteListInfo)) {
        return;
      }

      if (this._handleCurrentZoneInfo(info, whiteListInfo)) {
        return;
      }

      if (this._handleLevelInfo(info, whiteListInfo)) {
        return;
      }

      if (this._handleExpInfo(info, whiteListInfo)) {
        return;
      }

      if (this._handleInTownInfo(info, whiteListInfo)) {
        return;
      }

      if (this._handleSceneInfo(info, whiteListInfo)) {
        return;
      }

      super._handleSingleGameInfo(info);

    }

    _handleSingleEvent(event) {
      super._handleSingleEvent(event);

      const pluginEventName = event.name;
      const metadata = this._pluginWhitelist.Events[pluginEventName];
      if (!metadata) {
        return;
      }

      this._handleMatchOutcomeEvent(event);

      this._handleChatEvent(event, metadata);

      this._handleBossKillEvent(event, metadata);

    }

    _handleOpenedPageInfo(info, whiteListInfo) {
      const shouldClearConversionMap = {
        'opened_page': false,
        'closed_page': true
      };

      if (!Object.keys(shouldClearConversionMap).includes(info.key)) {
        return false;
      }

      const shouldClear = shouldClearConversionMap[info.key];
      const val = shouldClear ? null : info.value;

      this._infoDB.set(
        whiteListInfo.feature_id,
        whiteListInfo.config.category,
        whiteListInfo.config.key,
        val
      );

      return true;
    }

    _handleLanguageInfo(info, whiteListInfo) {

      if (!info.key.startsWith('language')) {
        return false;
      }

      if (info.value == "unknown") {
        info.value = this._defaultLang;
      }

      this._language = info.value;

      this._infoDB.set(
        whiteListInfo.feature_id,
        whiteListInfo.config.category,
        whiteListInfo.config.key,
        info.value
      );

      return true;
    }
    _handleChatLanguageInfo(info, whiteListInfo) {

      if (!info.key.startsWith('chat_language')) {
        return false;
      }

      if (info.value == "" || info.value == null || info.value == "unknown") {
        info.value = this._language;
      }

      this._infoDB.set(
        whiteListInfo.feature_id,
        whiteListInfo.config.category,
        whiteListInfo.config.key,
        info.value
      );

      return true;
    }

    _handleCharacterNameInfo(info, whiteListInfo) {

      if (!info.key.startsWith('character_name')) {
        return false;
      }

      this._infoDB.set(
        whiteListInfo.feature_id,
        whiteListInfo.config.category,
        whiteListInfo.config.key,
        JSON.stringify(info.value)
      );

      return true;
    }

    _handleCurrentZoneInfo(info, whiteListInfo) {

      if (!info.key.startsWith('current_zone')) {
        return false;
      }

      this._infoDB.set(
        whiteListInfo.feature_id,
        whiteListInfo.config.category,
        whiteListInfo.config.key,
        JSON.stringify(info.value)
      );

      return true;
    }

    _handleLevelInfo(info, whiteListInfo) {

      if (!info.key.startsWith('character_level')) {
        return false;
      }


      this._infoDB.set(
        whiteListInfo.feature_id,
        whiteListInfo.config.category,
        whiteListInfo.config.key,
        info.value
      );

      return true;
    }
    _handleExpInfo(info, whiteListInfo) {

      if (!info.key.startsWith('character_experience')) {
        return false;
      }

      info.value = parseInt(info.value);

      this._infoDB.set(
        whiteListInfo.feature_id,
        whiteListInfo.config.category,
        whiteListInfo.config.key,
        info.value
      );

      return true;
    }

    _handleInTownInfo(info, whiteListInfo) {

      if (!info.key.startsWith('in_town')) {
        return false;
      }

      info.value = info.value === "1" ? true : false;

      this._infoDB.set(
        whiteListInfo.feature_id,
        whiteListInfo.config.category,
        whiteListInfo.config.key,
        info.value
      );

      return true;
    }

    _handleSceneInfo(info, whiteListInfo) {

      this._infoDB.set(whiteListInfo.feature_id,
        whiteListInfo.config.category,
        whiteListInfo.config.key,
        info.value);

      if (!info.key.startsWith('scene')) {
        return false;
      }

      if (info.value === "in_game" && !this._matchstarted) {
        this._handleMatchStartEvent();
      }

      if ((info.value === "select_character" || info.value === "login") && this._matchstarted) {
        this._handleMatchEndEvent();
      }

      return true;
    }

    _handleMatchOutcomeEvent(event) {
      const conversionMap = {
        'death': 'defeat',
        'boss_kill': 'victory'
      };

      const data = conversionMap[event.name];

      if (!data) {
        return;
      }

      const matchInfo = this._supportedFeatures.match_info;

      this._featuresHandler.triggerEvent(
        matchInfo.name,
        matchInfo.events.match_outcome.name,
        conversionMap[event.name]
      );
    }

    _handleChatEvent(event, metadata) {
      if (event.name !== "chat_message") {
        return false;
      }

      event.data = base_utils.b64DecodeUnicode(event.data);

      this._featuresHandler.triggerEvent(
        metadata.featureId,
        metadata.event.name,
        event.data
      );
    }

    _handleBossKillEvent(event, metadata) {
      if (event.name !== "boss_kill") {
        return false;
      }

      this._featuresHandler.triggerEvent(
        metadata.featureId,
        metadata.event.name,
        event.data
      );
    }

    _handleMatchStartEvent() {
      let feature = this._supportedFeatures.match_info;
      this._featuresHandler.triggerEvent(
        feature.name,
        feature.events.match_start.name,
        null
      );
      this._matchstarted = true;
    }

    _handleMatchEndEvent() {
      let feature = this._supportedFeatures.match_info;
      this._featuresHandler.triggerEvent(
        feature.name,
        feature.events.match_end.name,
        null
      );
      this._matchstarted = false;
    }
  }
});
