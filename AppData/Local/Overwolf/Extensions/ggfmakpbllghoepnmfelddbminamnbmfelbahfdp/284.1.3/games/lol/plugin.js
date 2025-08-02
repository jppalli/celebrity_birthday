'use strict';

define([
  '/games/lol/spectator_detection.js',
  '/games/lol/supported_features.js',
  '/games/lol/plugin_whitelist.js',
  '/games/lol/game_events/kill_event_handler.js',
  '/libs/js-uuid.js',
  '/games/lol/TFT_handler.js',
  '/games/lol/ARENA_handler.js',
  '/utils/plugin/game_plugin_gep.js',
  '/utils/base_utils.js',
  '/utils/version_compare.js',
], function (_spectatorDetection,
  SupportedFeatures,
  PluginWhitelist,
  KillEventHandler,
  uuid,
  TFTHandler,
  ARENAHandler,
  GamePluginGep,
  BaseUtils,
  VersionComparer) {

  const LOG_BLACK_LIST = [
    'gold', 'minionKills', 'minions_kills', 'ability', 'ping', 'tft_damage',
    'physical_damage_dealt_player', 'magic_damage_dealt_player', 'true_damage_dealt_player',
    'physical_damage_dealt_to_champions', 'magic_damage_dealt_to_champions', 'clock',
    'true_damage_dealt_to_champions', 'physical_damage_taken', 'magic_damage_taken',
    'true_damage_taken', 'total_damage_dealt', 'total_damage_dealt_to_champions',
    'total_damage_taken', 'total_damage_dealt_to_buildings', 'total_damage_dealt_to_turrets',
    'total_damage_dealt_to_objectives', 'total_damage_self_mitigated',
    'total_heal', 'total_heal_on_teammates', 'total_units_healed', 'spell1', 'spell2',
    'spell3', 'spell4', 'team_frames_0', 'team_frames_1', 'team_frames_2', 'team_frames_3', 'chat'
  ];
  let _gameInfo = null;
  let _infoDB = null;
  let _featuresHandler = null;

  let _gameMode = null;
  let _playType = null;
  let _declaredGameMode = false;
  let _matchEnded = false;

  let _gamePlugin = new GamePluginGep(); 
  let _killEventHandler;
  let _monitoring;

  let _pseudoMatchIdTriggers = ['announcer', 'gold', 'tft_match'];
  let _tftHandler = null;
  let _arenaHandler = null;
  let _gameModeTimer = null;
  let _isPbe = false;

  let _isTFT = undefined;
  let _isARENA = undefined;
  let _isSWARM = undefined;
  let _isBRAWL = undefined;
  let _isOld = undefined;


  const LOL_GAME_ID = 5426;
  const TFT_ID = 21570;
  const ARENA_ID = 21556;
  const SWARM_ID = 13956;
  const BRAWL_ID = 21568;
  const kTFTname = 'TFT';
  const kLOLname = 'lol'
  const kARENAname = 'ARENA';
  const kSWARMname = 'SWARM';
  const kBRAWLname = 'BRAWL';


  function start(gameInfo,
    infoDB,
    featuresHandler,
    monitoring,
    isDisabled,
    isTFTSession) {


    _monitoring = monitoring;
    _gameInfo = gameInfo;
    _infoDB = infoDB;
    _featuresHandler = featuresHandler;

    _killEventHandler = new KillEventHandler({
      infoDB: infoDB,
      featuresHandler: featuresHandler
    });

    _tftHandler = new TFTHandler({
      infoDB: infoDB,
      featuresHandler: featuresHandler,
      pluginWhitelist: PluginWhitelist,
      supportedFeatures: SupportedFeatures
    });

    _arenaHandler = new ARENAHandler({
      infoDB: infoDB,
      featuresHandler: featuresHandler,
      pluginWhitelist: PluginWhitelist,
      supportedFeatures: SupportedFeatures
    });

    if (_isTFT) {
      _setGameModeInfo(kTFTname);
    }

    if (_isARENA) {
      _setGameModeInfo(kARENAname);
    }

    if (_isSWARM) {
      _setGameModeInfo(kSWARMname);
    }

    if (_isBRAWL) {
      _setGameModeInfo(kBRAWLname);
    }

    if (_isTFT == false && _isARENA == false && _isSWARM == false && _isBRAWL == false) {
      _setGameModeInfo(kLOLname);
    }


    if (_isPbe || window.___gameid___ == 22848) {
      console.info(`***** plugin for PBE *****`);
    }

    if (isDisabled) {
      console.log("[LOL SERVICE] game events are disabled for this game");
      return;
    }

    _matchEnded = false;
    _gamePlugin.start({
      game: {
        id: LOL_GAME_ID,
        name: kLOLname,
      },
      eventsWhiteList: PluginWhitelist,
      logBlackList: LOG_BLACK_LIST,
      monitoring: _monitoring
    },
      _onGamePluginLoaded);

  }

  function setOld() {
    _isOld = true;
  }

  function stop() {
    _gamePlugin.stop();


    _matchEnded = false;
  }


  function didSetGameMode() {
    if (!_gameModeTimer) {
      return;
    }

    console.info(`Game mode detected clear timer externally`);
    clearTimeout(_gameModeTimer);
  }

  function setGame(game) {
    if (game === "TFT") {
      console.info('Set plugin as TFT');
      _isTFT = true;
    }
    else _isTFT = false;

    if (game === "ARENA") {
      console.info('Set plugin as ARENA');
      _isARENA = true;
    }
    else _isARENA = false;

    if (game === "SWARM") {
      console.info('Set plugin as SWARM');
      _isSWARM = true;
    }
    else _isSWARM = false;

    if (game === "BRAWL") {
      console.info('Set plugin as BRAWL');
      _isBRAWL = true;
    }
    else _isBRAWL = false;
  }


  function _onGamePluginLoaded(result) {
    if (result.status === "success") {
      _gamePlugin.addListener(_gamePlugin.EVENT_TYPES.info_update, _onPluginInfoUpdate);
      _gamePlugin.addListener(_gamePlugin.EVENT_TYPES.event, _onPluginEvent);
    }
  }

  function _onPluginInfoUpdate(info) {
    if (info.category === "game_info") {
      _handleGameInfo(info);
    }

    if (info.key === "is_pbe" && info.value == 'true') {
      setPBEGameMode();
    }
    if (info.key === "process") {
      _handleProcessInfo(info);
    }
  }

  function _onPluginEvent(currentEvent) {

    if (currentEvent.name.startsWith('arena_')) {
      _setGameModeInfo(kARENAname);
      _arenaHandler.handleEvent(currentEvent);
      return;
    }

    if (currentEvent.name.startsWith('tft_')) {
      _setGameModeInfo(kTFTname);
      _tftHandler.handleEvent(currentEvent);
      return;
    }

    let currentEventMetadataList, eventData;

    if (_isPseudoMatchIdTrigger(currentEvent.name) && !_isPseudoMatchIdSet()) {
      _setPseudoMatchIdInfo();
    }

    currentEventMetadataList = PluginWhitelist.Events[currentEvent.name];
    let currentEventMetadataListString = JSON.stringify(currentEventMetadataList);

    if (!currentEventMetadataListString) {
      console.warn("'[LOL SERVICE] plugin event is whitelisted, skipping: ", currentEvent.name);
      return;
    }

    currentEventMetadataListString = currentEventMetadataListString.length > 200 ?
      currentEventMetadataListString.slice(0, 200) + "..." : currentEventMetadataListString;

    for (let metadata of currentEventMetadataList) {
      eventData = metadata.event.data || {};

      if (currentEvent.data && metadata.no_count !== true) {
        eventData.count = currentEvent.data;
      }

      switch (metadata.event.name) {
        case SupportedFeatures.damage.events.physical_damage_dealt_player.name:
        case SupportedFeatures.damage.events.magic_damage_dealt_player.name:
        case SupportedFeatures.damage.events.true_damage_dealt_player.name:
        case SupportedFeatures.damage.events.physical_damage_dealt_to_champions.name:
        case SupportedFeatures.damage.events.magic_damage_dealt_to_champions.name:
        case SupportedFeatures.damage.events.true_damage_dealt_to_champions.name:
        case SupportedFeatures.damage.events.physical_damage_taken.name:
        case SupportedFeatures.damage.events.magic_damage_taken.name:
        case SupportedFeatures.damage.events.true_damage_taken.name:
          eventData = parseFloat(currentEvent.data);
          break;
        case SupportedFeatures.counters.events.match_clock.name:
          eventData = parseFloat(currentEvent.data);
          break;
        case SupportedFeatures.death.name:
          _infoDB.set(SupportedFeatures.death.name,
            SupportedFeatures.death.info.deaths.category,
            SupportedFeatures.death.info.deaths.key,
            eventData.count);

          _infoDB.set(SupportedFeatures.deathAndRespawn.name,
            SupportedFeatures.deathAndRespawn.info.deaths.category,
            SupportedFeatures.deathAndRespawn.info.deaths.key,
            eventData.count);
          break;
        case SupportedFeatures.assist.events.assist.name:
          _infoDB.set(SupportedFeatures.assist.name,
            SupportedFeatures.assist.info.assists.category,
            SupportedFeatures.assist.info.assists.key,
            eventData.count);
          break;
        case SupportedFeatures.match_info.events.chat.name:
          let tmpEventData = BaseUtils.b64DecodeUnicode(currentEvent.data);
          tmpEventData = tmpEventData.replace(/(<([^>]+)>)/ig, '');
          eventData = tmpEventData.replace(/(\r\n|\n|\r)/gm, '');
          break;

        case SupportedFeatures.kill.events.kill.name:
        case SupportedFeatures.kill.events.doubleKill.name:
        case SupportedFeatures.kill.events.tripleKill.name:
        case SupportedFeatures.kill.events.quadraKill.name:
        case SupportedFeatures.kill.events.pentaKill.name:
          _killEventHandler.handleEvent(eventData, metadata.kill_rank);

          break;
        case SupportedFeatures.announcer.name:
          eventData = announcerEvent(currentEvent.data);
          if (!eventData) {
            console.log('[LOL SERVICE] Announcer EVENT [' + metadata.feature_id + '] not mapped: ' + currentEvent.data);
            continue;
          }

          if (!_matchEnded) {
            _matchEnded = (eventData.name == 'defeat' || eventData.name == 'victory');
          }

          break;
      }

      if (metadata.feature_id !== SupportedFeatures.kill.name) {

        _featuresHandler.triggerEvent(metadata.feature_id, metadata.event.name, eventData);
      }
    }

    _killEventHandler.triggerDelayedKill(eventData);
  }

  function announcerEvent(announcer_type) {
    let data = JSON.parse(announcer_type);
    let announcerData;

    if (!SupportedFeatures.announcer.events.hasOwnProperty(data.key)) {
      announcerData = {
        name: data.id,
        data: null
      };
    } else {
      announcerData = SupportedFeatures.announcer.events[data.key];
    }

    let res = {
      name: announcerData.name,
      data: announcerData.data
    };

    return res;
  }


  function _handleGameInfo(info) {
    let i, infoConfig, infos, isSpectatorMode, isGameModeKey, isPlayTypeKey;

    if (info.key.startsWith('tft_')) {
      if (info.key == 'tft_match' ||
        (info.key == 'tft_mode' && info.value === "on")) {
        console.log('[LOL SERVICE] tft_mode detected.')
        clearTimeout(_gameModeTimer);
        _setGameModeInfo(kTFTname);
      }

      _tftHandler.handleInfoUpdate(info);
      return;
    }

    if (info.key.startsWith('arena_')) {
      _setGameModeInfo(kARENAname);
      clearTimeout(_gameModeTimer);
      _arenaHandler.handleInfoUpdate(info);
      return;
    }

    if (info.key.startsWith('jungle_camp_')) {
      _jungleCampInfoUpdate(info);
      return;
    }

    isSpectatorMode = _spectatorDetection.inSpectatorMode(_gameInfo);
    if (isSpectatorMode) {
      _declaredGameMode = true;
      return;
    }

    if (_isPseudoMatchIdTrigger(info.key) && !_isPseudoMatchIdSet()) {
      _setPseudoMatchIdInfo();
    }

    if (info.key.startsWith('team_frames_')) {
      _teamFramesInfoUpdate(info)
      return;
    }

    isGameModeKey = info.key === 'game_mode';
    isPlayTypeKey = info.key === 'play_type';

    if (isPlayTypeKey) {
      _playType = info.value;
      console.log('[LOL SERVICE] got play type mode from plugin: ' + _playType);
      if (_playType === "aram") {
        infos = PluginWhitelist.InfoDB['is_aram'];
        _setInfoUpdates(infos, _playType);
      }
    }

    if (isGameModeKey) {
      _gameMode = info.value;
      console.log('[LOL SERVICE] got game mode from plugin: ' + _gameMode);
    }

    if (info.key === 'champion_name') {
      let champion = info.value;
      if (champion.includes("Strawberry_")) {
        champion = champion.replace("Strawberry_", "");
      }
      console.log('[LOL SERVICE] got champion name from plugin: ' + champion);


      _infoDB.set(SupportedFeatures.summoner_info.name,
        SupportedFeatures.summoner_info.info.champion.category,
        SupportedFeatures.summoner_info.info.champion.key, champion);

      return;
    }

    if (info.key === 'match_paused') {
      info.value = info.value === 'true';

      _infoDB.set(SupportedFeatures.match_info.name,
        SupportedFeatures.match_info.info.match_paused.category,
        SupportedFeatures.match_info.info.match_paused.key,
        info.value);
    }

    if (_gameMode && _playType && !_declaredGameMode) {
      if (_playType === 'tutorial') {
        info.value = _playType;
      } else {
        info.value = _gameMode;
      }
      console.log('[LOL SERVICE] declaring game mode = ' + info.value);

      if (!_declaredGameMode) {
        console.log('devlared game mode');
        infos = PluginWhitelist.InfoDB['game_mode'];
        _setInfoUpdates(infos, info.value);
      }

      _declaredGameMode = true;
    }

    infos = PluginWhitelist.InfoDB[info.key];
    if (!infos) {
      return;
    }

    if (!isPlayTypeKey && !isGameModeKey) {
      _setInfoUpdates(infos, info.value);
    }
  }


  function _setPseudoMatchIdInfo() {
    _infoDB.set(
      SupportedFeatures.match_info.name,
      SupportedFeatures.match_info.info.pseudo_match_id.category,
      SupportedFeatures.match_info.info.pseudo_match_id.key,
      uuid.v4()
    );
  }

  function _isPseudoMatchIdSet() {
    const id = _infoDB.get(
      SupportedFeatures.match_info.info.pseudo_match_id.category,
      SupportedFeatures.match_info.info.pseudo_match_id.key
    );

    if (id) {
      return true;
    }

    return false;
  }

  function _isPseudoMatchIdTrigger(eventName) {
    return _pseudoMatchIdTriggers.includes(eventName);
  }

  function _jungleCampInfoUpdate(info) {
    try {
      let key = info.key;

      let nativeCamp = JSON.parse(info.value);

      const jangleCamp = {
        name: nativeCamp.camp_name,
        alive: nativeCamp.alive === "1",
        vision: nativeCamp.vision === "1",
        icon_status: nativeCamp.icon_status
      };

      _infoDB.set(
        SupportedFeatures.jungle_camps.name,
        SupportedFeatures.jungle_camps.info.jungle_camps.category,
        key,
        JSON.stringify(jangleCamp)
      );
    } catch (e) {
      console.error("jungle camp parse error", info, e);
      return;
    }

  }

  function _teamFramesInfoUpdate(info) {
    try {
      let key = info.key;
      let pluginValue = JSON.parse(info.value);
      let ult_cd = pluginValue.ult_cd;

      pluginValue.ult_cd = parseInt(ult_cd);

      _infoDB.set(
        SupportedFeatures.team_frames.name,
        SupportedFeatures.team_frames.info.team_frames.category,
        key,
        JSON.stringify(pluginValue)
      );

    } catch (e) {
      console.error("team_frames parse error", info, e);
    }
  }

  function _setGameModeInfo(gameMode) {
    if (gameMode === kTFTname) {
      _infoDB.setGameId(TFT_ID);
      _featuresHandler.setGameId(TFT_ID);
      _monitoring.setTFTGameMode(kTFTname);
    }

    if (gameMode === kARENAname) {
      _infoDB.setGameId(ARENA_ID);
      _featuresHandler.setGameId(ARENA_ID);
      _monitoring.setARENAGameMode(kARENAname);
    }

    if (gameMode === kSWARMname) {
      _infoDB.setGameId(SWARM_ID);
      _featuresHandler.setGameId(SWARM_ID);
      _monitoring.setSWARMGameMode(kSWARMname);
    }

    if (gameMode === kBRAWLname) {
      _infoDB.setGameId(BRAWL_ID);
      _featuresHandler.setGameId(BRAWL_ID);
      _monitoring.setBRAWLGameMode(kBRAWLname);
    }

    _infoDB.set(
      SupportedFeatures.match_info.name,
      SupportedFeatures.match_info.info.game_mode.category,
      SupportedFeatures.match_info.info.game_mode.key,
      gameMode
    );

    if (_gameModeTimer) {
      console.info(`Game mode detected '${gameMode}' clear timer`);
      clearTimeout(_gameModeTimer);
      _gameModeTimer = null;
    }
  }

  function _setInfoUpdates(infos, value) {
    let infoConfig;
    let i = 0;
    for (i; i < infos.length; i++) {
      infoConfig = infos[i];
      try {
        _infoDB.set(infoConfig.feature_id,
          infoConfig.config.category,
          infoConfig.config.key, value);
      } catch (e) {
        console.error(infoConfig)
      }
    }
  }

  function setPBEGameMode() {
    _isPbe = true;
    if (typeof _monitoring === 'undefined') {
      setTimeout(() => {
        _monitoring.setPBEGameMode(true);
        _isPbe = true;
      }, 1000)
    } else {
      _monitoring.setPBEGameMode(true);
      _isPbe = true;
    }
  }

  function _handleProcessInfo(info) {

    let val = JSON.parse(info.value);
    val.elevated = val.elevated ? 'true' : 'false';

    _monitoring.sendElevated(val);
    console.info(`[GAME ELEVATED] Game elevated detected '${val.elevated}'`);
  }

  return {
    start: start,
    stop: stop,
    didSetGameMode: didSetGameMode,
    setPBEGameMode: setPBEGameMode,
    setGame: setGame,
    setOld: setOld
  }
});
