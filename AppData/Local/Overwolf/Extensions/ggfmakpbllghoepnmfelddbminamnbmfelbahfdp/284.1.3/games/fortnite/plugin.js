"use strict";

define([
  "/games/service/PluginHandler.js",
  "/games/fortnite/gameState/game_state_manager.js",
  "/games/fortnite/roster/roster_manager.js",
  "/games/fortnite/inventory/inventory_manager.js",
  "/libs/js-uuid.js",
  "/utils/base_utils.js",
  "/games/fortnite/logs/log_parser.js",
  "/games/fortnite/logs/log_listener.js",
  "/utils/io_plugin.js"
], function (
  PluginHandler,
  GameStateManagerFortnite,
  RosterManager,
  InventoryManager,
  uuid,
  base_utils,
  FortniteLogParser,
  FortniteLogListener,
  IOPlugin
) {
  let FortnitePluginHandler = class FortnitePluginHandler extends PluginHandler {

    constructor(config) {
      super(config);

      this._isSpectating = false;
      this._totalKills = 0;
      this._gameStateManager = null;
      this._lastMessage = null;
    }

    start(gameInfo, infoDB, featuresHandler, isDisabled) {
      super.start(gameInfo, infoDB, featuresHandler, isDisabled);

      this._inventoryManager = new InventoryManager({
        infoDB: infoDB,
      });

      this._rosterManager = new RosterManager({
        infoDB: infoDB,
        featuresHandler: featuresHandler,
      });

      this._gameStateManager = new GameStateManagerFortnite({
        infoDB: infoDB,
        featuresHandler: featuresHandler,
        plugin: this,

      });

      this._fortniteLogParser = new FortniteLogParser(
        infoDB,
        featuresHandler,
        this._gameStateManager,
        this._supportedFeatures,
        this._pluginWhitelist,
      );
      const self = this

      IOPlugin.asyncAssureCreation().then(function (ioPlugin) {
        const _logListener = new FortniteLogListener(gameInfo, infoDB, featuresHandler, self._fortniteLogParser);
        _logListener.start(ioPlugin);
      }).catch(_ => {
        console.log(" failed to create io plugin service");
      });

    }

    stop() {
      super.stop();
    }

    _handleSingleGameInfo(info) {
      if (this._rosterManager && this._rosterManager.process(info)) {
        return;
      }

      if (info.key == 'player_name') {
        console.log('player_name', JSON.stringify(info));
        info.value = base_utils.b64DecodeUnicode(info.value);
      }

      if (info.hasOwnProperty("me")) {
        console.log('me', JSON.stringify(info));
        info.me.name = base_utils.b64DecodeUnicode(info.me.name);
      }


      let whiteListInfo = this._pluginWhitelist.InfoDB[info.key];
      if (!whiteListInfo) {
        return;
      }

      if (info.value === "waiting_for_players" || info.value === "free_fly") {
        let feature = this._supportedFeatures.items;
        let featureInfo = feature.info.selected_slot;
        this._infoDB.set(
          feature.name,
          featureInfo.category,
          featureInfo.key,
          JSON.stringify({
            isPrimary: true,
            slot: "0",
          })
        );
      }



      if (this._inventoryManager.handleInventoryInfo(info)) {
        return;
      }

      if (this._handleInfoHealth(info)) {
        return;
      }

      if (this._handleInfoShield(info)) {
        return;
      }

       if (this._handleInfoOverShield(info)) {
        return;
      }

      if (this._handleInfoMode(info)) {
        return;
      }

      if (this._handleInfoSkirmish(info)) {
        return;
      }

      if (this._handleInfoTeamMembers(info)) {
        return;
      }

      if (this._handleInfoCreativeMap(info)) {
        return;
      }

      if (this._handleInfoMatchStats(info)) {
        return;
      }

      if (this._handleInfoVbucks(info)) {
        return;
      }

      super._handleSingleGameInfo(info);

      if (
        this._gameStateManager.process(
          info.key,
          whiteListInfo.config,
          info.value,
          this._ignoreEvents
        )
      ) {
        return;
      }
    }

    _handleInfoHealth(info) {
      if (info.key !== "health") {
        return false;
      }
      let feature = this._supportedFeatures.me;
      this._infoDB.set(
        feature.name,
        feature.info.health.category,
        feature.info.health.key,
        Math.floor(info.value)
      );

      return true;
    }

    _handleInfoShield(info) {
      if (info.key !== "shield") {
        return false;
      }
      let feature = this._supportedFeatures.me;
      this._infoDB.set(
        feature.name,
        feature.info.shield.category,
        feature.info.shield.key,
        Math.floor(info.value)
      );

      return true;
    }

    _handleInfoOverShield(info) {
      if (info.key !== "over_shield") {
        return false;
      }
      let feature = this._supportedFeatures.me;
      this._infoDB.set(
        feature.name,
        feature.info.over_shield.category,
        feature.info.over_shield.key,
        Math.floor(info.value)
      );

      return true;
    }


    _handleInfoSkirmish(info) {
      if (info.key !== "skirmish") {
        return false;
      }

      let value = JSON.parse(info.value);

      for (let i = 0; i < value.skirmish_data.length; i++) {
        value.skirmish_data[i] = base_utils.convertStringsToNumber(
          value.skirmish_data[i]
        );
      }

      info.value = JSON.stringify(value);
      let feature = this._supportedFeatures.match_info;
      this._infoDB.set(
        feature.name,
        feature.info.skirmish.category,
        feature.info.skirmish.key,
        info.value
      );

      return true;
    }

    _handleInfoTeamMembers(info) {
      if (info.key !== "team_members") {
        return false;
      }

      let value = JSON.parse(info.value);
      if (Array.isArray(value.team_members)) {
        value.team_members.forEach((val) => {
          val.player = base_utils.b64DecodeUnicode(val.player);
        })
      }

      info.value = JSON.stringify(value);

      let feature = this._supportedFeatures.team;
      this._infoDB.set(
        feature.name,
        feature.info.nicknames.category,
        feature.info.nicknames.key,
        info.value
      );

      console.log(`Analytics Nicknames  list - ${info.value}`);

      return true;
    }

    _handleInfoCreativeMap(info) {
      if (info.key !== "creative_map") {
        return false;
      }

      let value = JSON.parse(info.value);
      value.title = base_utils.b64DecodeUnicode(value.title);

      info.value = JSON.stringify(value);

      let feature = this._supportedFeatures.map;
      this._infoDB.set(
        feature.name,
        feature.info.creative_map.category,
        feature.info.creative_map.key,
        info.value
      );

      return true;
    }

    _handleInfoMode(info) {
      if (info.category === "game_info" && info.key === "game_type") {
        let value = info.value;
        if (value.startsWith("other-")) {
          value = value.replace("other-", "");
        }

        let feature = this._supportedFeatures.match;
        this._infoDB.set(
          feature.name,
          feature.info.mode.category,
          feature.info.mode.key,
          value
        );
      }
    }

    _handleEventPing(info) {
      if (info.name === "ping") {
        let value = parseInt(info.data);

        let feature = this._supportedFeatures.counters;
        this._infoDB.set(
          feature.name,
          feature.info.ping.category,
          feature.info.ping.key,
          value
        );
      }
    }


    _handleInfoMatchStats(info) {
      if (info.key !== "match_stats") {
        return false;
      }

      let value = JSON.parse(info.value);
      info.value = JSON.stringify(value);

      let feature = this._supportedFeatures.match_info;
      this._infoDB.set(
        feature.name,
        feature.info.match_stats.category,
        feature.info.match_stats.key,
        info.value
      );
    }

    _handleInfoVbucks(info) {
      if (info.key !== "vbucks") {
        return false;
      }

      let value = parseInt(info.value);

      let feature = this._supportedFeatures.game_info;
      this._infoDB.set(
        feature.name,
        feature.info.vbucks.category,
        feature.info.vbucks.key,
        value
      );
    }

    _handleSingleEvent(event) {


      if (this._handleEventRank(event)) {
        return;
      }

      if (this._handleLocationEvent(event)) {
        return;
      }

      if (this._handleEventInventory(event)) {
        return;
      }

      if (this._handleEventPing(event)) {
        return;
      }

      if (this._handleHitEvent(event)) {
        return;
      }

      if (this._handleHeadshotEvent(event)) {
        return;
      }

      if (this._handleAccuracyEvent(event)) {
        return;
      }

      if (this._handleGameStartEvent(event)) {
        return;
      }

      if (this._handleGameEndEvent(event)) {
        return;
      }

      if (this._handleKnockoutEvent(event)) {
        return;
      }

      if (this._handleKnockedoutEvent(event)) {
        return;
      }

      if (this._handleMessageFeedEvent(event)) {
        return;
      }

      super._handleSingleEvent(event);

      let pluginEventName = event.name;
      let metadata = this._pluginWhitelist.Events[pluginEventName];
      if (!metadata) {
        return;
      }

      switch (event.name) {
        case "kill":
          this._handleKillEvent(event, metadata);
          break;
        case "killer":
          this._handleKillerEvent(event, metadata);
          break;
        case "killed":
          this._handleKilledEvent(event, metadata);
          break;
        case "death":
          this._handleDeathEvent(metadata);
          break;
      }
    }

    _updatePseudoMatchId(id) {
      let feature = this._supportedFeatures.match_info;
      this._infoDB.set(
        feature.name,
        feature.info.pseudo_match_id.category,
        feature.info.pseudo_match_id.key,
        id
      );
    }

    _handleGameStartEvent(event) {
      if (event.name !== "game_start") {
        return false;
      }

      let feature = this._supportedFeatures.me;
      this._infoDB.set(
        feature.name,
        feature.info.shield.category,
        feature.info.shield.key,
        0
      );

      this._infoDB.set(
        feature.name,
        feature.info.over_shield.category,
        feature.info.over_shield.key,
        0
      );

      this._totalKills = 0;
      feature = this._supportedFeatures.kill;
      this._infoDB.set(
        feature.name,
        feature.info.kills.category,
        feature.info.kills.key,
        this._totalKills
      );

      feature = this._supportedFeatures.rank;
      this._infoDB.set(
        feature.name,
        feature.info.rank.category,
        feature.info.rank.key,
        null
      );

      feature = this._supportedFeatures.me;
      this._infoDB.set(
        feature.name,
        feature.info.accuracy.category,
        feature.info.accuracy.key,
        null
      );

      feature = this._supportedFeatures.match;
      this._featuresHandler.triggerEvent(
        feature.name,
        feature.events.matchStart.name,
        null
      );

      let pseudo_match_id = uuid.v4();
      this._updatePseudoMatchId(pseudo_match_id);




      return true;
    }

    _handleGameEndEvent(event) {
      if (event.name !== "game_end") {
        return false;
      }

      let feature = this._supportedFeatures.match;
      this._featuresHandler.triggerEvent(
        feature.name,
        feature.events.matchEnd.name,
        null
      );

      this._updatePseudoMatchId(null);
      let nicknamesReset = this._supportedFeatures.team;
      this._infoDB.set(
        nicknamesReset.name,
        nicknamesReset.info.nicknames.category,
        nicknamesReset.info.nicknames.key,
        null
      );

      let creativeMapReset = this._supportedFeatures.map;
      this._infoDB.set(
        creativeMapReset.name,
        creativeMapReset.info.creative_map.category,
        creativeMapReset.info.creative_map.key,
        null
      );

      this._lastMessage = null;

      return true;
    }

    _handleKnockoutEvent(event) {
      if (event.name !== "knockout") {
        return false;
      }


      event.data = base_utils.b64DecodeUnicode(event.data);
      let feature = this._supportedFeatures.kill
      this._featuresHandler.triggerEvent(
        feature.name,
        feature.events.knockout.name,
        event.data
      );

      return true;
    }

    _handleKnockedoutEvent(event) {
      if (event.name !== "knocked_out") {
        return false;
      }

      event.data = base_utils.b64DecodeUnicode(event.data);
      let feature = this._supportedFeatures.death
      this._featuresHandler.triggerEvent(
        feature.name,
        feature.events.knockedout.name,
        event.data
      );

      return true;
    }

    _handleHitOrHeadshot(event, isHeadshot) {
      if (
        (event.name !== "hit" || isHeadshot) &&
        (event.name !== "headshot" || !isHeadshot)
      ) {
        return false;
      }

      let feature = this._supportedFeatures.kill;
      let data = { isHeadshot };
      this._featuresHandler.triggerEvent(
        feature.name,
        feature.events.hit.name,
        data
      );
      return true;
    }

    _handleHitEvent(event) {
      const isNotHeadshot = false;
      return this._handleHitOrHeadshot(event, isNotHeadshot);
    }

    _handleHeadshotEvent(event) {
      const isHeadshot = true;
      return this._handleHitOrHeadshot(event, isHeadshot);
    }

    _handleAccuracyEvent(event) {
      if (event.name !== "accuracy") {
        return false;
      }

      let feature = this._supportedFeatures.me;
      this._infoDB.set(
        feature.name,
        feature.info.accuracy.category,
        feature.info.accuracy.key,
        event.data
      );
      return true;
    }

    _handleEventRank(event) {
      if (event.name === "rank") {
        let feature = this._supportedFeatures.rank;
        this._infoDB.set(
          feature.name,
          feature.info.rank.category,
          feature.info.rank.key,
          event.data
        );
        return true;
      } else {
        return false;
      }
    }

    _handleKillEvent(eventInfo, metadata) {
      let myName = this._infoDB.get("me", "name");
      if (myName && eventInfo.data === myName) {
        return;
      }

      let feature = this._supportedFeatures.kill;
      this._featuresHandler.triggerEvent(
        feature.name,
        feature.events.kill.name,
        eventInfo.data
      );

      this._totalKills = eventInfo.data;
      let killConfig = this._supportedFeatures.kill.info.kills;

      this._infoDB.set(
        metadata.featureId,
        killConfig.category,
        killConfig.key,
        this._totalKills
      );
    }

    _handleKillerEvent(eventInfo, metadata) {
      let myName = this._infoDB.get("me", "name");
      eventInfo.data = base_utils.b64DecodeUnicode(eventInfo.data);
      if (myName && eventInfo.data === myName) {
        return;
      }

      let feature = this._supportedFeatures.killer;
      this._featuresHandler.triggerEvent(
        feature.name,
        feature.events.killer.name,
        eventInfo.data
      );
    }

    _handleKilledEvent(eventInfo, metadata) {
      let myName = this._infoDB.get("me", "name");

      eventInfo.data = base_utils.b64DecodeUnicode(eventInfo.data);
      if (myName && eventInfo.data === myName) {
        return;
      }

      let feature = this._supportedFeatures.killed;
      this._featuresHandler.triggerEvent(
        feature.name,
        feature.events.killed.name,
        eventInfo.data
      );
    }

    _handleDeathEvent(metadata) {
      this._log("Player died, entering spectate mode");
      this._isSpectating = true;
    }

    _handleLocationEvent(event) {
      if (this._isSpectating) {
        this._log("player is spectating - not sending grid location");
        return false;
      }

      if (event.name !== "location") {
        return false;
      }

      this._infoDB.set(
        this._supportedFeatures.location.name,
        this._supportedFeatures.location.info.location.category,
        this._supportedFeatures.location.info.location.key,
        event.data
      );
    }

    _handleEventInventory(event) {
      return this._inventoryManager.handleInventoryEvent(event);
    }

    onStateChane(newState) {
      if (newState === "lobby") {
        this._isSpectating = false;
        overwolf.games.getRunningGameInfo(this.updateUserId.bind(this));
      }
    }

    updateUserId(res) {
      if (!res) {
        return;
      }

      const matches = res.commandLine.match(/(?<=-epicuserid\=)\S*/);
      if (!matches) {
        return;
      }

      const userID = matches[0];

      this._infoDB.set(
        this._supportedFeatures.match.name,
        this._supportedFeatures.match.info.userID.category,
        this._supportedFeatures.match.info.userID.key,
        userID
      );
    }

    _handleMessageFeedEvent(event) {
      if (event.name !== "message_feed") {
        return false;
      }

      event.data = base_utils.b64DecodeUnicode(event.data);
      event.data = event.data.replace(/<\/?[^>]+(>|$)/g, "");
      event.data = event.data.trim();

      if (event.data != this._lastMessage) {
        let feature = this._supportedFeatures.match_info;
        this._featuresHandler.triggerEvent(
          feature.name,
          feature.events.message_feed.name,
          event.data
        );
        this._lastMessage = event.data;
      }
      return true;
    }

  };

  return FortnitePluginHandler;
});
