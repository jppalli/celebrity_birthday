'use strict';

define([
  '/games/dota/plugin_whitelist.js',
  '/games/dota/supported_features.js',
  '/games/dota/hero_detection.js',
  '/utils/plugin/game_plugin_gep.js',
  '/utils/game_monitoring_util.js',
  '/utils/base_utils.js'
], function (PluginWhitelist,
  SupportedFeatures,
  HeroDetection,
  GamePluginGep,
  GameMonitoringUtility,
  BaseUtils) {

  let _infoDB = null;
  let _featuresHandler = null;
  let _gamePlugin = new GamePluginGep();
  let _monitoring;

  const CODES = {
    DOTA_START: 40031
  };

  const LOG_BLACK_LIST = ["players_list", "bans_list", "draft_list"];


  function start(infoDB, featuresHandler, isDisabled) {
    _infoDB = infoDB;
    _featuresHandler = featuresHandler;

    _monitoring = new GameMonitoringUtility({
      game: {
        name: "DOTA",
        id: 7314,
      },
      infoDB: _infoDB,
      supportedFeatures: SupportedFeatures,
      pluginWhiteList: PluginWhitelist
    });

    if (isDisabled) {
      console.log("[DOTA SERVICE] game events are disabled for this game");
      return;
    }

    _gamePlugin.start({
      game: {
        id: 7314,
        name: "DOTA",
      },
      eventsWhiteList: PluginWhitelist,
      logBlackList: LOG_BLACK_LIST
    },
      _onGamePluginLoaded);

    _addMonitoringEvents();
    _monitoring.sendTrack(_monitoring.TRACKING_KINDS.DOTA_START);
  }

  function stop() {
    _gamePlugin.stop();
  }


  function _onGamePluginLoaded(result) {
    if (result.status === "success") {
      _gamePlugin.addListener(_gamePlugin.EVENT_TYPES.info_update,
        _onPluginInfoUpdate);
      _gamePlugin.addListener(_gamePlugin.EVENT_TYPES.event, _onPluginEvent);

    }
  }

  function _onPluginEvent(currentEvent) {
    _handleSingleEvent(currentEvent);
  }

  function _handleSingleEvent(event) {
    if (event.name === 'plugin_crashed') {
      console.error('[DOTA plugin] plugin crashed');
    }

        if (event.name === "game_over") {
      _infoDB.set("me", "me", "hero", null);
      HeroDetection.resetHeroDetection ();
    }

    let metaData = PluginWhitelist.Events[event.name];

    if (_handleRoundEvent(event, metaData)) {
      return;
    }

    if (_handleRoundWinEvent(event, metaData)) {
      return;
    }

    if (_handleRoundLoseEvent(event, metaData)) {
      return;
    }

    if (_handleGameWonEvent(event, metaData)) {
      return;
    }

    if (_handleGameLoseEvent(event, metaData)) {
      return;
    }


    _featuresHandler.triggerEvent(metaData.featureId, metaData.event.name, null)
  }

  function _onPluginInfoUpdate(info) {
    _handleSingleGameInfo(info);
  }

  function _handleSingleGameInfo(info) {

    if (info.category === 'plugin_status') {
      console.log('[DOTA SERVICE] plugin status: ' + info.value);
    }

    if (info.category !== 'game_info' && info.key !== "last_error") {
      return;
    }

    let whiteListInfo = PluginWhitelist.InfoDB[info.key];
    let value = info.value;

    if (_handleShopListInfo(info, whiteListInfo)) {
      return;
    }

    if (_handleBenchStateInfo(info, whiteListInfo)) {
      return;
    }

    if (_handleBoardStateInfo(info, whiteListInfo)) {
      return;
    }

    if (_handleTeamScoreInfo(info, whiteListInfo)) {
      return;
    }

    if (['players_list', 'bans_list', 'draft_list', 'party_list'].includes(info.key)) {
      const escapeQuotesRegex = /(?<![{:, \\])"(?![}:, \\])/g;
      info.value = info.value.replace(escapeQuotesRegex, "\\\"");
    }

    if (info.key === "players_list") {
      try {
        let list = JSON.parse(info.value);
        for (let item of list) {
          item.hero = item.hero.replace("npc_dota_hero_", "");
        }
        value = JSON.stringify(list);
      }
      catch (e) {

      }
    }
    else if (info.key === "party_list") {
      let partyList = JSON.parse(value);
      for (let player of partyList) {
        player.isLeader = player.isLeader === "1";
        player.isCoach = player.isCoach === "1";
      }
      value = JSON.stringify(partyList);
    }

    if (whiteListInfo) {
      _infoDB.set(whiteListInfo.feature_id,
        whiteListInfo.config.category,
        whiteListInfo.config.key,
        value);
    }

    if (info.key === "players_list") {
      HeroDetection.tryDetectHero(_infoDB);
      if (info.value === '[]') {
        _clearDraft();
        _clearBans();
        _clearPlayers();
      }
    }
  }

  function _handleRoundEvent(event, metadata) {
    if (event.name !== "round") {
      return false;
    }

    const feature = SupportedFeatures.roundNumber;
    _infoDB.set(
      feature.name,
      feature.info.roundNumber.category,
      feature.info.roundNumber.key,
      event.data
    );

    return true;
  }

  function _handleRoundWinEvent(event, metadata) {
    if (event.name !== "round_won") {
      return false;
    }

    _featuresHandler.triggerEvent(metadata.featureId, metadata.event.name, "victory");

    const feature = SupportedFeatures.roundOutcome;
    const { category, key } = feature.info.totalWon;
    let totalWon = _infoDB.get(category, key) || 0;
    _infoDB.set(feature.name, category, key, ++totalWon);

    return true;
  }

  function _handleRoundLoseEvent(event, metadata) {
    if (event.name !== "round_lose") {
      return false;
    }

    _featuresHandler.triggerEvent(metadata.featureId, metadata.event.name, "defeat");

    const feature = SupportedFeatures.roundOutcome;
    const { category, key } = feature.info.totalLost;
    let totalLosts = _infoDB.get(category, key) || 0;
    _infoDB.set(feature.name, category, key, ++totalLosts);

    return true;
  }

  function _handleGameWonEvent(event, metadata) {
    if (event.name !== "game_won") {
      return false;
    }
    _featuresHandler.triggerEvent(metadata.featureId, metadata.event.name, "victory");
    return true;
  }

  function _handleGameLoseEvent(event, metadata) {
    if (event.name !== "game_lose") {
      return false;
    }
    _featuresHandler.triggerEvent(metadata.featureId, metadata.event.name, "defeat");
    return true;
  }




  function _handleBoardStateInfo(info, whiteListInfo) {
    if (info.key !== "board_state") {
      return false;
    }

    const board = BaseUtils.createMatrix(8, 8);

    const occupiedCells = JSON.parse(info.value);
    for (let occupiedCell of occupiedCells) {
      const chesspieceName =
        occupiedCell.chess.match(/(?<=\/.*\/.*\/).*(?=\.vmdl)/)[0];
      const [x, y] = occupiedCell.cell.split(':');
      board[x][y] = {
        name: chesspieceName,
        level: occupiedCell.level
      };
    }

    for (let x = 0; x < board.length; x++) {
      for (let y = 0; y < board[x].length; y++) {
        const key = whiteListInfo.config.key + `${x}_${y}`;
        const prevCell = _infoDB.get(whiteListInfo.config.category, key);
        if (!board[x][y] && !prevCell) {
          continue;
        }
        const value = board[x][y] ? JSON.stringify(board[x][y]) : null;
        _infoDB.set(whiteListInfo.feature_id,
          whiteListInfo.config.category,
          key,
          value);
      }
    }

    return true;
  }

  function _handleShopListInfo(info, whiteListInfo) {
    if (info.key !== "shop_list") {
      return false;
    }

    const shopList = JSON.parse(info.value);
    for (let shopItem of shopList) {
      const chesspieceName =
        shopItem.chess.match(/(?<=\/.*\/.*\/).*(?=\.vmdl)/)[0];

      _infoDB.set(whiteListInfo.feature_id,
        whiteListInfo.config.category,
        whiteListInfo.config.key + shopItem.slot,
        chesspieceName);
    }

    return true;
  }

  function _handleBenchStateInfo(info, whiteListInfo) {
    if (info.key !== "bench_state") {
      return false;
    }

    const bench = JSON.parse(info.value);
    for (let chesspiece of bench) {
      let data = null;
      if (chesspiece.chess) {
        const chesspieceName =
          chesspiece.chess.match(/(?<=\/.*\/.*\/).*(?=\.vmdl)/)[0];
        data = JSON.stringify({
          name: chesspieceName,
          level: chesspiece.level
        })
      }

      const key = whiteListInfo.config.key + chesspiece.slot;
      const prevCell =
        _infoDB.get(whiteListInfo.config.category, key);
      if (!data && !prevCell) {
        continue;
      }

      _infoDB.set(whiteListInfo.feature_id,
        whiteListInfo.config.category,
        key,
        data);
    }

    return true;
  }

  function _handleTeamScoreInfo(info, whiteListInfo) {
    if (info.key !== 'team_score') {
      return false;
    }

    let value = JSON.parse(info.value);
    value = BaseUtils.convertStringsToNumber(value);

    _infoDB.set(
      whiteListInfo.feature_id,
      whiteListInfo.config.category,
      info.key,
      JSON.stringify(value));

    return true;
  }

  function _clearBans() {
    let {
      feature_id,
      config: { category, key }
    } = PluginWhitelist.InfoDB.bans_list;

    _infoDB.set(feature_id, category, key, '[]');
  }

  function _clearDraft() {
    let {
      feature_id,
      config: { category, key }
    } = PluginWhitelist.InfoDB.draft_list;

    _infoDB.set(feature_id, category, key, '[]');
  }

  function _clearPlayers() {
    let {
      feature_id,
      config: { category, key }
    } = PluginWhitelist.InfoDB.players_list;

    _infoDB.set(feature_id, category, key, '[]');
  }

  function _addMonitoringEvents() {
    _monitoring.addTracking("DOTA_START", CODES.DOTA_START);
  }

  return {
    start: start,
    stop: stop
  }
});
