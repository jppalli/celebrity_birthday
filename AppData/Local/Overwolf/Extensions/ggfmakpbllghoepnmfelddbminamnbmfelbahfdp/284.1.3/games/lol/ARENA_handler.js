define(["/libs/js-uuid.js"], function (uuid) {
  class ARENAHandler {

    constructor({
      infoDB,
      featuresHandler,
      pluginWhitelist,
      supportedFeatures,
    }) {
      this._infoDB = infoDB;
      this._featuresHandler = featuresHandler;
      this._pluginWhitelist = pluginWhitelist;
      this._supportedFeatures = supportedFeatures;

      this.handleInfoUpdate = this.handleInfoUpdate.bind(this);
    }

    handleInfoUpdate(info) {
      if (!info.key.startsWith("arena_")) {
        return;
      }

      switch (info.key) {
        case "arena_round":
          this._handleRoundUpdate(info);
          break;
        case "arena_augments":
          this._handleAugmentsUpdate(info);
          break;
        case "arena_teams":
          this._handleArenaTeamsUpdate(info);
          break;
        default:
          this._handleSingleUpdate(info);
      }
    }

    _handleSingleUpdate(infoUpdate) {
      const infos = this._pluginWhitelist.InfoDB[infoUpdate.key];
      for (let info of infos) {
        this._infoDB.set(
          info.feature_id,
          info.config.category,
          info.config.key,
          infoUpdate.value
        );
      }
    }

    handleEvent(eventData) {
      if (!eventData.name.startsWith("arena_")) {
        return;
      }

      switch (eventData.name) {
        case "arena_round_outcome":
          this._handleRoundOutcomeUpdate(eventData);
          break;
        case "arena_battle_start":
          this._handleBattleStartUpdate(eventData);
          break;
        default:
          this._handleSingleEvent(eventData);
      }
    }

    _handleSingleEvent(eventData) {
      const event = this._featuresHandler.Events[eventData.name];
      this._featuresHandler.triggerEvent(
        event.feature_id,
        event.event.name,
        eventData.data
      );
    }

    _handleRoundUpdate(info) {
      let value = info.value;
      value = value.replace(/round /i, '');
      value = parseInt(value);

      this._infoDB.set(
        this._supportedFeatures.match_info.name,
        this._supportedFeatures.match_info.info.round_number.category,
        this._supportedFeatures.match_info.info.round_number.key,
        value
      );

      this._featuresHandler.triggerEvent(
        this._supportedFeatures.match_info.name,
        this._supportedFeatures.match_info.events.round_start.name,
        value
      );
    }

    _handleAugmentsUpdate(info) {

      this._infoDB.set(
        this._supportedFeatures.augments.name,
        this._supportedFeatures.augments.info.augments.category,
        'augments',
        info.value
      );
    }

    _handleArenaTeamsUpdate(info) {

      let parsedValue = JSON.parse(info.value);

      parsedValue.forEach(team => {
        team.players.forEach(player => {
          if (player.hasOwnProperty('is_local')) {
            player.is_local = player.is_local === "1" ? true : false;
          }
        });
      });

      this._infoDB.set(
        this._supportedFeatures.teams.name,
        this._supportedFeatures.teams.info.arena_teams.category,
        this._supportedFeatures.teams.info.arena_teams.key,
        JSON.stringify(parsedValue)
      );
    }

    _handleRoundOutcomeUpdate(eventData) {

      this._featuresHandler.triggerEvent(
        this._supportedFeatures.match_info.name,
        this._supportedFeatures.match_info.events.round_outcome.name,
        eventData.data
      );

      this._featuresHandler.triggerEvent(
        this._supportedFeatures.match_info.name,
        this._supportedFeatures.match_info.events.round_end.name,
        null
      );

      this._featuresHandler.triggerEvent(
        this._supportedFeatures.match_info.name,
        this._supportedFeatures.match_info.events.battle_end.name,
        null
      );
    }

    _handleBattleStartUpdate(eventData) {

      this._featuresHandler.triggerEvent(
        this._supportedFeatures.match_info.name,
        this._supportedFeatures.match_info.events.battle_start.name,
        null
      );
    }

  }
  return ARENAHandler;
});
