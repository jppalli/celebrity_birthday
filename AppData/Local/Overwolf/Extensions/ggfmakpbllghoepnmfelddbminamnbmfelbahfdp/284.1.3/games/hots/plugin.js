'use strict';

define([
  '/games/service/PluginHandler.js',
  '/libs/js-uuid.js'
], function(PluginHandler,
            uuid) {

  return class HotsPluginHandler extends PluginHandler {

    constructor(config) {
      super(config);

      this._bansCount = 0;
      this._draftCount = 0;
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

      if (this._handlePlayerInfo(info, whiteListInfo)) {
        return;
      }

      if (this._handleRosterInfo(info, whiteListInfo)) {
        return;
      }

      if (this._handleTeamsLevelInfo(info, whiteListInfo)) {
        return;
      }

      if (this._handleScoreInfo(info, whiteListInfo)) {
        return;
      }
    }

    _handleSingleEvent(event) {
      super._handleSingleEvent(event);

      let pluginEventName = event.name;
      let metadata = this._pluginWhitelist.Events[pluginEventName];
      if(!metadata) {
        return;
      }

      if (this._handleMatchStartEvent(event, metadata)) {
        return;
      }

      if (this._handleMatchEndEvent(event, metadata)) {
        return;
      }

      if (this._handleDraftEvent(event, metadata)) {
        return;
      }

      if (this._handleBansEvent(event, metadata)) {
        return;
      }
    }

    _handlePlayerInfo(info, whiteListInfo) {
      if (info.key !== "player_info") {
        return false;
      }

      info = JSON.parse(info.value);
      const value = {
        battletag: info['player_name']
      };

      this._infoDB.set(
        whiteListInfo.feature_id,
        whiteListInfo.config.category,
        whiteListInfo.config.key,
        JSON.stringify(value)
      );

      return true;
    }

    _handleRosterInfo(info, whiteListInfo) {
      if (info.key !== "roster") {
        return false;
      }

      let roster = JSON.parse(info.value);
      for (let playerName in roster) {
        roster[playerName].local = roster[playerName].local === '1';
      }

      this._infoDB.set(
        whiteListInfo.feature_id,
        whiteListInfo.config.category,
        whiteListInfo.config.key,
        JSON.stringify(roster)
      );

      return true;
    }

    _handleTeamsLevelInfo(info, whiteListInfo) {
      if (info.key !== "teams_level") {
        return false;
      }

      let levels = JSON.parse(info.value);
      for (let team in levels) {
        levels[team] = parseInt(levels[team]);
      }

      this._infoDB.set(
        whiteListInfo.feature_id,
        whiteListInfo.config.category,
        whiteListInfo.config.key,
        JSON.stringify(levels)
      );

      return true;
    }

    _handleScoreInfo(info, whiteListInfo) {
      if (info.key !== "score") {
        return false;
      }

      let scores = JSON.parse(info.value);
      for (let team in scores) {
        scores[team] = parseInt(scores[team]);
      }

      this._infoDB.set(
        whiteListInfo.feature_id,
        whiteListInfo.config.category,
        whiteListInfo.config.key,
        JSON.stringify(scores)
      );

      return true;
    }

    _handleMatchStartEvent(event, metadata) {
      if (event.name !== 'match_start') {
        return false;
      }

      this._featuresHandler.triggerEvent(
        metadata.featureId,
        metadata.event.name,
        null
      );

      const feature = this._supportedFeatures.match_info;
      const value = JSON.stringify({ in_progress: true });
      this._infoDB.set(
        feature.name,
        feature.info.match_state.category,
        feature.info.match_state.key,
        value
      );

      this._infoDB.set(
        feature.name,
        feature.info.pseudo_match_id.category,
        feature.info.pseudo_match_id.key,
        uuid.v4()
      );

      return true;
    }

    _handleMatchEndEvent(event, metadata) {
      if (event.name !== 'match_end') {
        return false;
      }

      this._featuresHandler.triggerEvent(
        metadata.featureId,
        metadata.event.name,
        event.data
      );

      const feature = this._supportedFeatures.match_info;
      const value = JSON.stringify({ in_progress: false });
      this._infoDB.set(
        feature.name,
        feature.info.match_state.category,
        feature.info.match_state.key,
        value
      );

      this._clearMatchInfo();

      return true;
    }

    _handleDraftEvent(event, metadata) {
      if (event.name !== 'draft') {
        return false;
      }

      this._draftCount++;

      this._setDraftKey(this._draftCount, event.data);
    }

    _handleBansEvent(event, metadata) {
      if (event.name !== 'bans') {
        return false;
      }

      this._bansCount++;

      this._setBansKey(this._bansCount, event.data);
    }

    _setDraftKey(index, value) {
      this._infoDB.set(
        this._supportedFeatures.draft.name,
        this._supportedFeatures.draft.info.draft.category,
        `${this._supportedFeatures.draft.info.draft.key}${index}`,
        value
      );
    }

    _setBansKey(index, value) {
      this._infoDB.set(
        this._supportedFeatures.bans.name,
        this._supportedFeatures.bans.info.bans.category,
        `${this._supportedFeatures.bans.info.bans.key}${index}`,
        value
      );
    }

    _clearMatchInfo() {
      const feature = this._supportedFeatures.match_info;
      const infos = ['pseudo_match_id', 'teams_level', 'game_mode', 'score'];
      for (let info of infos) {
        this._infoDB.set(
          feature.name,
          feature.info[info].category,
          feature.info[info].key,
          null
        );
      }

      this._infoDB.set(
        this._supportedFeatures.roster.name,
        this._supportedFeatures.roster.info.roster.category,
        this._supportedFeatures.roster.info.roster.key,
        null
      );

      this._clearDraftKeys();
      this._clearBansKeys();
    }

    _clearDraftKeys() {
      for (let i = 1; i < this._draftCount; ++i) {
        this._setDraftKey(i, null);
      }

      this._draftCount = 0;
    }

    _clearBansKeys() {
      for (let i = 1; i < this._bansCount; ++i) {
        this._setBansKey(i, null);
      }

      this._bansCount = 0;
    }
  };
});
