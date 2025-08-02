"use strict";

define([
  "/games/service/PluginHandler.js",
  "/libs/js-uuid.js",
  "/utils/base_utils.js",
], function (PluginHandler, uuid, BaseUtils) {
  return class SupervivePluginHandler extends PluginHandler {

    _match_started = false;
    _kills = 0;
    _deaths = 0;
    _assists = 0;

    constructor(config) {
      super(config);
    }



    start(gameInfo, infoDB, featuresHandler, isDisabled) {
      super.start(gameInfo, infoDB, featuresHandler, isDisabled);

    }

    stop() {
      super.stop();
    }

    _handleSingleGameInfo(info) {
      let whiteListInfo = this._pluginWhitelist.InfoDB[info.key];

      switch (info.key) {
        case (info.key.match(/roster_/) || {}).input: {
          this._handleRoster(info);
          break;
        }
        case "scene":
          this._handleScene(info);
          break;
      }

      super._handleSingleGameInfo(info);
    }

    _handleSingleEvent(event) {
      let pluginEventName = event.name;
      let metadata = this._pluginWhitelist.Events[pluginEventName];
      if (!metadata) {
        return;
      }

      super._handleSingleEvent(event);
    }

    _handleRoster(info) {
      let value = JSON.parse(info.value);
      value.is_local = value.is_local === 1 ? true : false;

      if (value.is_local == true) {
        this._handleLocalKDA(info);
      }

      value = JSON.stringify(value);

      let featureInfo = this._supportedFeatures.match_info;

      this._infoDB.set(featureInfo.name,
        featureInfo.info.roster_.category,
        info.key,
        value);


           }

    _handleScene(info) {
      let value = info.value;

      if (value === "Battle Royale" || value === "Practice") {
        this._handleMatchStart();
      } else if (value === "Lobby") {
        this._handleMatchEndEvent()
      }

    }

    _handleMatchStart() {
      if (this._match_started) {
        super._log("skip match started (already started) ")
        return;
      }

      let feature = this._supportedFeatures.match_info;
      this._featuresHandler.triggerEvent(
        feature.name,
        feature.events.match_start.name,
        null
      );

      this._match_started = true;

    }


    _handleMatchEndEvent() {

      if (this._match_started) {
        let feature = this._supportedFeatures.match_info;
        this._featuresHandler.triggerEvent(
          feature.name,
          feature.events.match_end.name,
          null
        );

        this._match_started = false;
        this._kills = 0;
        this._deaths = 0;
        this._assists = 0;
      }
    }


    _handleLocalKDA(info) {
      let value = JSON.parse(info.value);
      if (value.kills > this._kills) {
        let feature = this._supportedFeatures.match_info;
        this._featuresHandler.triggerEvent(
          feature.name,
          feature.events.kill.name,
          value.kills
        );
        this._kills = value.kills;
      }

      if (value.deaths > this._deaths) {
        let feature = this._supportedFeatures.match_info;
        this._featuresHandler.triggerEvent(
          feature.name,
          feature.events.death.name,
          value.deaths
        );
        this._deaths = value.deaths;
      }

      if (value.assists > this._assists) {
        let feature = this._supportedFeatures.match_info;
        this._featuresHandler.triggerEvent(
          feature.name,
          feature.events.assist.name,
          value.assists
        );
        this._assists = value.assists;
      }
    }

  };
});