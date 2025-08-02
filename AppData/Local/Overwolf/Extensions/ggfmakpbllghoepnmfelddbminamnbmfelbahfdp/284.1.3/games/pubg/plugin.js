"use strict";

define([
  '/games/pubg/plugin_whitelists.js',
  '/games/pubg/supported_features.js',
  '/games/pubg/gameState/game_state_manager.js',
  '/games/pubg/roster/roster_manager.js',
  '/utils/plugin/game_plugin_gep.js',
  '/utils/analytics.js',
  '/libs/js-uuid.js'
], function (PluginWhitelist,
  SupportedFeatures,
  GameStateManager,
  RosterManager,
  GamePluginGep,
  Analytics,
  uuid) {

  const LOG_BLACK_LIST = ["zones_time", "location", "ping",
    "roster_0", "roster_1", "roster_2", "roster_3", "roster_4",
    "roster_5", "roster_6", "roster_7", "roster_8", "roster_9",
    "roster_10", "roster_11", "roster_12", "roster_13", "roster_14",
    "roster_15", "roster_16", "roster_17", "roster_18", "roster_19",
    "roster_20", "roster_21", "roster_22", "roster_23", "roster_24",
    "roster_25", "roster_26", "roster_27", "roster_28", "roster_29",
    "roster_30", "roster_31", "roster_32", "roster_33", "roster_34",
    "roster_35", "roster_36", "roster_37", "roster_38", "roster_39",
    "roster_40", "roster_41", "roster_42", "roster_43", "roster_44",
    "roster_45", "roster_46", "roster_47", "roster_48", "roster_49",
    "roster_50", "roster_51", "roster_52", "roster_53", "roster_54",
    "roster_55", "roster_56", "roster_57", "roster_58", "roster_59",
    "roster_60", "roster_61", "roster_62", "roster_63", "roster_64",
    "roster_65", "roster_66", "roster_67", "roster_68", "roster_69",
    "roster_70", "roster_71", "roster_72", "roster_73", "roster_74",
    "roster_75", "roster_76", "roster_77", "roster_78", "roster_79",
    "roster_80", "roster_81", "roster_82", "roster_83", "roster_84",
    "roster_85", "roster_86", "roster_87", "roster_88", "roster_89",
    "roster_90", "roster_91", "roster_92", "roster_93", "roster_94",
    "roster_95", "roster_96", "roster_97", "roster_98", "roster_99"
  ];

  let _gameInfo = null;
  let _infoDB = null;
  let _featuresHandler = null;
  let _gamePlugin = new GamePluginGep();
  let _monitoring;
  let _isSpectating = false;
  let _ignoreEvents = false;
  let _gameStateManager;
  let _lastKillCount = 0;
  let _headshotCount = 0;
  let _ignoreTimeout = null;
  let _isAimingDownSights = false;
  let _gameTitle = 'PUBG';


  function start(gameInfo, infoDB, featuresHandler, isDisabled) {
    _gameTitle = gameInfo.title || 'PUBG';
    if (isDisabled) {
      console.log(`[${_gameTitle} SERVICE] game events are disabled for this game`);
      return;
    }
    console.log(`[${_gameTitle} SERVICE] starting plugin`);
    _gameInfo = gameInfo;
    _infoDB = infoDB;
    _featuresHandler = featuresHandler;

    _gamePlugin.start({
      game: {
        id: 10906,
        name: "PUBG"
      },
      eventsWhiteList: PluginWhitelist,
      logBlackList: LOG_BLACK_LIST
    },
      _onGamePluginLoaded
    );

    _gameStateManager = new GameStateManager({
      infoDB: infoDB,
      featuresHandler: featuresHandler,
      plugin: this
    });

    RosterManager.initialize(infoDB);
  }

  function stop() {
    _gamePlugin.stop();
  }

  function onStateChane(name) {
    if (name === "lobby") {
      _ignoreEvents = false;
      _updateMovement(null);
      _updateTilt(null);
      _updateVehicle(null);
      _updateView("TPP");
    }
  }


  function _onGamePluginLoaded(result) {
    if (result.status === "success") {
      _gamePlugin.addListener(
        _gamePlugin.EVENT_TYPES.info_update,
        _onPluginInfoUpdate
      );
      _gamePlugin.addListener(_gamePlugin.EVENT_TYPES.event, _onPluginEvent);
    }
  }

  function _onPluginEvent(currentEvent) {
    let pluginEventName = currentEvent.name;
    let metadata = PluginWhitelist.Events[pluginEventName];
    if (!metadata) {
      return;
    }

    let event = metadata.event;
    let ignoreWhileSpectating = event.hasOwnProperty("ignoreWhileSpectating")
      ? event.ignoreWhileSpectating
      : true;
    let ignore = _ignoreEvents && ignoreWhileSpectating;
    if (!ignore) {
      _handleSingleEvent(currentEvent, metadata);
    }
  }

  function _onPluginInfoUpdate(info) {
    _handleSingleGameInfo(info);
  }

  function _handleSingleEvent(event, metadata) {
    if (_handleEventRank(event)) {
      return;
    }

    if (_handleLocationEvent(event)) {
      return;
    }

    if (_handleHeadshotEvent(metadata, event)) {
      return;
    }

    if (_handleDamageDealtEvent(metadata, event)) {
      return;
    }

    if (_handleMaxKillDistanceEvent(metadata, event)) {
      return;
    }

    if (_handleMatchIdEvent(metadata, event)) {
      return;
    }

    if (_handleTiltEvent(metadata, event)) {
      return;
    }

    if (_handleVehicleEvent(metadata, event)) {
      return;
    }

    if (_handleAimingEvent(metadata, event)) {
      return;
    }

    if (_handleViewEvent(metadata, event)) {
      return;
    }

    if (_handleFreeLook(metadata, event)) {
      return;
    }

    if (_handleMovementEvent(metadata, event)) {
      return;
    }

    if (_handleShootingEvent(metadata, event)) {
      return;
    }

    if (_handleJumpEvent(metadata, event)) {
      return;
    }

    if (_handleStanceEvent(metadata, event)) {
      return;
    }

    if (_handleZoneEvent(metadata, event)) {
      return;
    }

    if (event.name === "game_start" || event.name === "game_end") {
      _gameStateManager.processEvent(event.name, event.value);
    }

    if (event.name === "game_start") {
      _lastKillCount = 0;
      _headshotCount = 0;
      _infoDB.set(
        SupportedFeatures.rank.name,
        SupportedFeatures.rank.info.me.category,
        SupportedFeatures.rank.info.me.key,
        null
      );
      _infoDB.set(
        SupportedFeatures.rank.name,
        SupportedFeatures.rank.info.total.category,
        SupportedFeatures.rank.info.total.key,
        null);
      _infoDB.set(SupportedFeatures.kill.name,
        SupportedFeatures.kill.info.headshots.category,
        SupportedFeatures.kill.info.headshots.key,
        _headshotCount);
      _infoDB.set(SupportedFeatures.kill.name,
        SupportedFeatures.kill.info.total_damage_dealt.category,
        SupportedFeatures.kill.info.total_damage_dealt.key,
        0);
      _infoDB.set(SupportedFeatures.kill.name,
        SupportedFeatures.kill.info.max_kill_distance.category,
        SupportedFeatures.kill.info.max_kill_distance.key,
        event.data);
      _infoDB.set(SupportedFeatures.kill.name,
        SupportedFeatures.kill.info.kills.category,
        SupportedFeatures.kill.info.kills.key,
        0);
      _infoDB.set(SupportedFeatures.location.name,
        SupportedFeatures.location.info.safe_zone.category,
        SupportedFeatures.location.info.safe_zone.key,
        null);
      _infoDB.set(SupportedFeatures.location.name,
        SupportedFeatures.location.info.blue_zone.category,
        SupportedFeatures.location.info.blue_zone.key,
        null);
      _infoDB.set(SupportedFeatures.location.name,
        SupportedFeatures.location.info.red_zone.category,
        SupportedFeatures.location.info.red_zone.key,
        null);
      _infoDB.set(SupportedFeatures.match_info.name,
        SupportedFeatures.match_info.info.pseudo_match_id.category,
        SupportedFeatures.match_info.info.pseudo_match_id.key,
        uuid.v4());

      _infoDB.set(SupportedFeatures.match.name,
        SupportedFeatures.match.info.match_id.category,
        SupportedFeatures.match.info.match_id.key,
        null)

    }

    let pluginEventName = event.name;
    let data = metadata.event.data;
    if (metadata.useEventData) {
      data = event.data;
    }

    if (_handleKillerEvent(pluginEventName, metadata, data)) {
      return;
    }

    _featuresHandler.triggerEvent(
      metadata.featureId,
      metadata.event.name,
      data
    );

    switch (pluginEventName) {
      case "kill":
        _handleKillEvent(metadata, event.data);
        break;
      case "death":
        _handleDeathEvent(metadata);
        break;
    }
  }

  function _handleZoneEvent(metadata, event) {
    const zones = ['safe_zone', 'blue_zone', 'red_zone'];
    if (!zones.includes(event.name)) {
      return false;
    }

    const feature = SupportedFeatures.location.info[event.name];
    let data = JSON.parse(event.data)
    data.radius = data.r;
    delete data.r;
    data = JSON.stringify(data);
    _infoDB.set(metadata.featureId, feature.category, feature.key, data);

    return true;
  }

  function _handleStanceEvent(metadata, event) {
    if (event.name !== "charstate_stance") {
      return false;
    }

    const feature = metadata.event.info.stance;
    _infoDB.set(metadata.featureId, feature.category, feature.key, event.data);

    return true;
  }

  function _handleJumpEvent(metadata, event) {
    if (event.name !== "charstate_jump") {
      return false;
    }

    if (event.data === "end") return true;

    _featuresHandler.triggerEvent(
      metadata.featureId,
      metadata.event.name,
      null
    );

    return true;
  }

  function _handleShootingEvent(metadata, event) {
    if (event.name !== "charstate_shooting") {
      return false;
    }

    if (event.data === "end") return true;

    _featuresHandler.triggerEvent(
      metadata.featureId,
      metadata.event.name,
      null
    );

    return true;
  }

  function _handleMovementEvent(metadata, event) {
    let move = "normal";
    switch (event.name) {
      case "charstate_normal_move":
        break;
      case "charstate_stels_move":
        move = "stealth";
        break;
      case "charstate_run":
        move = "fast";
        break;
      default:
        return false;
    }

    _updateMovement(move, metadata);
    return true;
  }

  function _updateMovement(move, metadata = null) {
    metadata = metadata
      ? metadata
      : PluginWhitelist.Events["charstate_normal_move"];
    const feature = SupportedFeatures.me.info.movement;
    _infoDB.set(metadata.featureId, feature.category, feature.key, move);
  }

  function _handleFreeLook(metadata, event) {
    if (event.name !== "charstate_free_look") {
      return false;
    }

    const value = event.data === "on";
    const feature = SupportedFeatures.me.info.freeView;
    _infoDB.set(metadata.featureId, feature.category, feature.key, value);

    return true;
  }

  function _handleViewEvent(metadata, event) {
    if (
      event.name !== "charstate_fpp_view" &&
      event.name !== "charstate_tpp_view"
    ) {
      return false;
    }

    const value = event.name === "charstate_fpp_view" ? "FPP" : "TPP";
    _updateView(value);

    return true;
  }

  function _updateView(view) {
    let featureId = SupportedFeatures.me.name;
    const feature = SupportedFeatures.me.info.view;
    _infoDB.set(featureId, feature.category, feature.key, view);
  }

  function _handleAimingEvent(metadata, event) {
    let value = null;
    if (
      event.name !== "charstate_aiming_tpp" &&
      event.name !== "charstate_aiming_fpp" &&
      event.name !== "charstate_breath"
    ) {
      return false;
    }

    if (event.name === "charstate_aiming_tpp") {
      value = event.data === "on" ? "focusedAim" : null;
      if (event.data === "off" && _isAimingDownSights) {
        return true;
      }
    } else if (event.name === "charstate_aiming_fpp") {
      value = null;
      _isAimingDownSights = false;
      if (event.data === "on") {
        _isAimingDownSights = true;
        value = "aimDownSight";
      }
    } else if (event.name === "charstate_breath") {
      value =
        event.data === "hold" ? "aimDownSight_holding_breath" : "aimDownSight";

      if (!_isAimingDownSights) return true;
    }

    const feature = SupportedFeatures.me.info.aiming;
    _infoDB.set(metadata.featureId, feature.category, feature.key, value);

    return true;
  }

  function _handleVehicleEvent(metadata, event) {
    if (event.name !== "charstate_vehicle") {
      return false;
    }

    const inVehicle = event.data === "join";
    _updateVehicle(inVehicle);
    return true;
  }

  function _updateVehicle(inVehicle) {
    const metadata = PluginWhitelist.Events["charstate_vehicle"];
    const feature = SupportedFeatures.me.info.inVehicle;
    _infoDB.set(metadata.featureId, feature.category, feature.key, inVehicle);
  }

  function _handleTiltEvent(metadata, event) {
    let tilt = "straight";
    switch (event.name) {
      case "charstate_staying_straight":
        break;
      case "charstate_tilt_right":
        tilt = "leanRight";
        break;
      case "charstate_tilt_left":
        tilt = "leanLeft";
        break;
      default:
        return false;
    }

    _updateTilt(tilt, metadata);
    return true;
  }

  function _updateTilt(tilt, metadata = null) {
    metadata = metadata
      ? metadata
      : PluginWhitelist.Events["charstate_staying_straight"];
    const feature = SupportedFeatures.me.info.bodyPosition;
    _infoDB.set(metadata.featureId, feature.category, feature.key, tilt);
  }

  function _handleMatchIdEvent(metadata, event) {
    const feature = SupportedFeatures.match.info.match_id;
    if (event.name !== "matchid") {
      return false;
    }

    _infoDB.set(metadata.featureId, feature.category, feature.key, event.data);
    return true;
  }

  function _handleHeadshotEvent(metadata, event) {
    const feature = SupportedFeatures.kill.info.headshots;
    if (event.name !== "headshot") {
      return false;
    }

    let data = null;
    _headshotCount++;
    _featuresHandler.triggerEvent(
      metadata.featureId,
      metadata.event.name,
      data
    );
    _infoDB.set(
      metadata.featureId,
      feature.category,
      feature.key,
      _headshotCount
    );
    return true;
  }

  function _handleDamageDealtEvent(metadata, event) {
    const feature = SupportedFeatures.kill.info.total_damage_dealt;
    if (event.name !== "damage_given") {
      return false;
    }

    try {
      const data = JSON.parse(event.data);
      _featuresHandler.triggerEvent(
        metadata.featureId,
        metadata.event.name,
        data.last
      );
      _infoDB.set(
        metadata.featureId,
        feature.category,
        feature.key,
        data.total
      );
      return true;
    } catch (error) {
      console.log(`[${_gameTitle} SERVICE] Failed to parse damage_given data`);
      return false;
    }
  }

  function _handleMaxKillDistanceEvent(metadata, event) {
    const feature = SupportedFeatures.kill.info.max_kill_distance;
    if (event.name !== "max_distance_kill") {
      return false;
    }

    _infoDB.set(metadata.featureId, feature.category, feature.key, event.data);
    return true;
  }

  function _handleKillEvent(metadata, data) {
    let feature = SupportedFeatures.kill.info.kills;
    let kills = parseInt(data);

    let diff = kills - _lastKillCount;
    if (diff > 0) {
      for (let i = 1; i < diff; i++) {
        _featuresHandler.triggerEvent(
          metadata.featureId,
          metadata.event.name,
          data
        );
      }
    }
    _lastKillCount = data;

    _infoDB.set(metadata.featureId, feature.category, feature.key, data);
  }

  function _handleDeathEvent(metadata) {
    console.log(`[${_gameTitle} SERVICE] Player died, entering spectate mode`);
    _isSpectating = true;
  }

  function _handleEventRank(event) {
    if (event.name === "rank") {
      let rankArr = event.data.split("/");
      if (rankArr.length === 2) {
        let myRank = rankArr[0].trim();
        let total = rankArr[1].trim();
        if (parseInt(myRank) > 0) {
          _infoDB.set(
            SupportedFeatures.rank.name,
            SupportedFeatures.rank.info.me.category,
            SupportedFeatures.rank.info.me.key,
            myRank
          );
          _infoDB.set(
            SupportedFeatures.rank.name,
            SupportedFeatures.rank.info.total.category,
            SupportedFeatures.rank.info.total.key,
            total
          );
        }
        _startIgnoreEvents();
      }
      return true;
    } else {
      return false;
    }
  }

  function _handleLocationEvent(event) {
    if (_isSpectating || _ignoreEvents) {
      console.log(
        `[${_gameTitle} SERVICE] player is spectating - not sending grid" + " location`
      );
      return false;
    }

    if (event.name !== "location") {
      return false;
    }

    _infoDB.set(
      SupportedFeatures.location.name,
      SupportedFeatures.location.info.location.category,
      SupportedFeatures.location.info.location.key,
      event.data
    );

    return true;
  }

  function _handleKillerEvent(pluginEventName, metadata, data) {
    if (pluginEventName === "killer") {
      try {
        data = JSON.parse(data);
        data = {
          killer_name: data.kill_name
        };
        _featuresHandler.triggerEvent(
          metadata.featureId,
          metadata.event.name,
          data
        );
        _startIgnoreEvents();
        return true;
      } catch (e) {
        console.log(`[${_gameTitle} SERVICE] Failed to parse killer data`);
        return false;
      }
    } else {
      return false;
    }
  }

  function _handleSingleGameInfo(info) {
    if (info.category === "plugin_status") {
      console.log(`[${_gameTitle} SERVICE] plugin status: ` + info.value);
      return;
    }

    let whiteListInfo = PluginWhitelist.InfoDB[info.key];
    if (!whiteListInfo) {
      return;
    }

    let ignoreWhileSpectating = whiteListInfo.hasOwnProperty(
      "ignoreWhileSpectating"
    )
      ? whiteListInfo.ignoreWhileSpectating
      : true;
    let ignore = _ignoreEvents && ignoreWhileSpectating;

    const processed = _gameStateManager.process(info.key,
      whiteListInfo.config,
      info.value,
      ignore);
    if (processed) {
      return;
    }

    if (RosterManager.process(info, ignore)) {
      return;
    }

    if (ignore) {
      return;
    }

    if (_handleInventoryInfo(info, whiteListInfo)) {
      return;
    }

    if (_handleEquippableInfo(info, whiteListInfo)) {
      return;
    }

    if (_handleVictimName(info, whiteListInfo)) {
      return;
    }

    if (_handleTeamLocationInfo(info, whiteListInfo)) {
      return;
    }

    if (_handleHealthInfo(info, whiteListInfo)) {
      return;
    }

    if (_handlePutDownInfo(info)) {
      return;
    }

    _infoDB.set(whiteListInfo.feature_id,
      whiteListInfo.config.category,
      whiteListInfo.config.key,
      info.value);
  }

  function _startIgnoreEvents() {
    if (_ignoreTimeout) {
      clearTimeout(_ignoreTimeout);
    }
    _ignoreTimeout = setTimeout(function () {
      _ignoreEvents = true;
    }, 3000);
  }

  function _handleVictimName(info, whiteListInfo) {
    if (info.key !== "victim_name") {
      return false;
    }

    const event = whiteListInfo.config;
    _featuresHandler.triggerEvent(
      whiteListInfo.feature_id,
      event.name,
      info.value
    );

    return true;
  }

  function _handleInventoryInfo(info, whiteListInfo) {
    if (!info.key.startsWith("inventory_")) {
      return false;
    }

    let index = info.key.replace("inventory_", "");

    _infoDB.set(
      whiteListInfo.feature_id,
      whiteListInfo.config.category,
      whiteListInfo.config.key + index,
      info.value
    );
    return true;
  }

  function _handleEquippableInfo(info, whiteListInfo) {
    if (!info.key.startsWith("equippable_")) {
      return false;
    }

    let index = info.key.replace("equippable_", "");

    _infoDB.set(
      whiteListInfo.feature_id,
      whiteListInfo.config.category,
      whiteListInfo.config.key + index,
      info.value
    );
    return true;
  }

  function _handleTeamLocationInfo(info, whiteListInfo) {
    if (info.key !== "team_location") {
      return false;
    }

    const { category, key } = whiteListInfo.config

    const data = JSON.parse(info.value);
    const newLocations = data.team_location;
    const oldLocations = JSON.parse(_infoDB.get(category, key));
    if (oldLocations) {
      for (let oldLocation of oldLocations) {
        const newLocation = newLocations.find((location) => {
          return location.player === oldLocation.player;
        })

        if (!newLocation) {
          newLocations.push(oldLocation);
        }
      }
    }

    _infoDB.set(
      whiteListInfo.feature_id,
      category,
      key,
      JSON.stringify(newLocations)
    );

    return true;
  }

  function _handleHealthInfo(info, whiteListInfo) {
    if (info.key !== "health_state") {
      return false;
    }

    const { category, key } = whiteListInfo.config;

    let value = JSON.parse(info.value);
    value = { health: value.health, ko_health: value.groggy_health };

    _infoDB.set(
      whiteListInfo.feature_id,
      category,
      key,
      JSON.stringify(value)
    );

    return true;
  }

  function _handlePutDownInfo(info) {
    if (info.key !== "put_down_message") {
      return false;
    }

    let whitelistEvent;
    let data;
    const value = JSON.parse(info.value);

    if (value.message === 'YouPutDownPlayer') {
      const { weapon, victim } = value;
      data = { weapon, victim };
      whitelistEvent = PluginWhitelist.Events.knockout;
    } else {
      data = value;
      whitelistEvent = PluginWhitelist.Events.team_feed;
    }

    _featuresHandler.triggerEvent(
      whitelistEvent.featureId,
      whitelistEvent.event.name,
      data
    );

        return true;
  }

  return {
    start: start,
    stop: stop,
    onStateChane: onStateChane
  };
});
