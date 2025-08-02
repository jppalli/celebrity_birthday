'use strict';

define([
  '/games/rocket_league/playersInfoService.js',
  '/games/rocket_league/plugin_whitelist.js',
  '/games/rocket_league/roster-handler.js',
  '/games/rocket_league/victory-defeat-handler.js',
  '/games/rocket_league/supported_features.js',
  '/utils/plugin/game_plugin_gep.js',
  '/utils/base_utils.js',
], function (playersInfoService,
  PluginWhitelist,
  RosterHandler,
  VictoryDefeatHandler,
  SUPPORTED_FEATURES,
  GamePluginGep,
  BaseUtils) {

  let _totalNumOfEvents = 0;

  let _infoDB = null;
  let _featuresHandlers = null;
  let _isSurrender = false;
  let _gamePlugin = new GamePluginGep();

  const LOG_BLACK_LIST = ["players_list"];


  function start(infoDB, featuresHandler, isDisabled) {
    if (isDisabled) {
      console.log("[ROCKET LEAGUE SERVICE] game events are disabled for this" +
        " game");
      return;
    }

    _totalNumOfEvents = 0;
    _infoDB = infoDB;
    _featuresHandlers = featuresHandler;
    _gamePlugin.start({
      game: {
        id: 10798,
        name: "RL",
      },
      eventsWhiteList: PluginWhitelist,
      logBlackList: LOG_BLACK_LIST
    },
      _onGamePluginLoaded);
  }

  function stop() {
    _gamePlugin.stop();
  }

  function getNumOfEvents() {
    return _totalNumOfEvents;
  }



  function _onGamePluginLoaded(result) {
    if (result.status === "success") {
      _gamePlugin.addListener(_gamePlugin.EVENT_TYPES.info_update, _onPluginInfoUpdate);
      _gamePlugin.addListener(_gamePlugin.EVENT_TYPES.event, _onPluginEvent);
    }
  }

  function _onPluginEvent(event) {
    _totalNumOfEvents++;
    _handleSingleEvent(event);
  }

  function _handleSingleEvent(event) {
    let pluginEventName = event.name;
    let metadata = PluginWhitelist.Events[pluginEventName];

    if (!metadata) {
      return;
    }

    if (_handleRoundResultEvent(event, metadata)) {
      return;
    }

    if (_handleShuffleRoundEvent(event, metadata)) {
      return;
    }

    if (_handleSurrenderEvent(event, metadata)) {
      return;
    }

    let data = metadata.event.data;
    if (metadata.useEventData) {
      data = event.data;
    }

    _featuresHandlers.triggerEvent(metadata.featureId,
      metadata.event.name,
      data);
  }

  function _onPluginInfoUpdate(info) {
    _totalNumOfEvents++;

    switch (info.category) {
      case 'game_info':
        _handleSingleGameInfoUpdate(info);
        break;
      case 'plugin_status':
        if (info.key === "state") {
          console.log("[ROCKET LEAGUE SERVICE] Plugin status: ", info.value);
        }
        break;
    }
  }

  function _handleSingleGameInfoUpdate(info) {
    if (info.key === "players_list") {
      return RosterHandler.handlePlayersList(info.value,
        _featuresHandlers,
        _infoDB);
    } else if (info.key === "players_rank") {
      _handlePlayersRankInfo(info);
    } else if (info.key === "training_pack") {
      _handleTrainingPackInfo(info);
    } else if (info.key === "players_boost") {
      _handlePlayersBoostInfoUpdate(info);
    } else if (info.category === "game_info") {

      if (!_isSurrender) {
        VictoryDefeatHandler.handleInfo(info, _featuresHandlers, _infoDB);
      }

      if (info.key === "game_state" && info.value === "PodiumSpotlight") {
        _isSurrender = false;
      }

      let whiteListInfo = PluginWhitelist.InfoDB[info.key];
      _infoDB.set(whiteListInfo.feature_id,
        whiteListInfo.config.category,
        whiteListInfo.config.key,
        info.value);
    }
  }


  function _handlePlayersBoostInfoUpdate(info) {

    const value = JSON.parse(info.value);
    value.forEach(player => {
      player.player_name = BaseUtils.b64DecodeUnicode(player.player_name);
      player.boost = Math.ceil(player.boost * 10) * 10;
    });

    info.value = JSON.stringify(value);

    let whiteListInfo = PluginWhitelist.InfoDB[info.key];
    _infoDB.set(whiteListInfo.feature_id,
      whiteListInfo.config.category,
      whiteListInfo.config.key,
      info.value);
  }



  function _handleTrainingPackInfo(info) {

    const value = JSON.parse(info.value);
    value.pack_name = BaseUtils.b64DecodeUnicode(value.pack_name);
    value.pack_author = BaseUtils.b64DecodeUnicode(value.pack_author);

    info.value = JSON.stringify(value);

    let whiteListInfo = PluginWhitelist.InfoDB[info.key];
    _infoDB.set(whiteListInfo.feature_id,
      whiteListInfo.config.category,
      whiteListInfo.config.key,
      info.value);
  }

  function _handlePlayersRankInfo(info) {

    const value = JSON.parse(info.value);

    value.forEach(item => {
      item.name = BaseUtils.b64DecodeUnicode(item.name);
    });

    info.value = JSON.stringify(value);

    let whiteListInfo = PluginWhitelist.InfoDB[info.key];
    _infoDB.set(whiteListInfo.feature_id,
      whiteListInfo.config.category,
      whiteListInfo.config.key,
      info.value);
  }


  function _handleRoundResultEvent(event, metadata) {

    if (event.name !== "training_round_result") {
      return false;
    }

    let data = JSON.parse(event.data);
    if (data.result == 0) {
      data.result = "fail";
    }
    else if (data.result == 1) {
      data.result = "complete"
    }
    _featuresHandlers.triggerEvent(
      metadata.featureId,
      metadata.event.name,
      JSON.stringify(data)
    );

    return true;
  }

  function _handleShuffleRoundEvent(event, metadata) {

    if (event.name !== "training_shuffle_mode") {
      return false;
    }

    let data = event.data;
    data = data == 1 ? true : false;

    _featuresHandlers.triggerEvent(
      metadata.featureId,
      metadata.event.name,
      data
    );

    return true;
  }

  function _handleSurrenderEvent(event, metadata) {

    if (event.name !== "surrender") {
      return false;
    }

    _isSurrender = true;
    _featuresHandlers.triggerEvent(
      metadata.featureId,
      metadata.event.name,
      event.data
    );

    return true;
  }


  return {
    start: start,
    stop: stop,
    getNumOfEvents: getNumOfEvents
  }
});
