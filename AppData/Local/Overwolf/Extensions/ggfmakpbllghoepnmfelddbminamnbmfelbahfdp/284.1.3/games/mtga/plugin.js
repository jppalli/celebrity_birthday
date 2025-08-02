"use strict";

define(["/games/service/PluginHandler.js", "/libs/js-uuid.js"], function (
  PluginHandler,
  uuid
) {
  return class MtgaPluginHandler extends PluginHandler {

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
      super._handleSingleGameInfo(info);

      if (info.key === 'scene_manager' && info.value === 'scene_home') {
        this._handleMatchEnd();
      }
    }

    _handleMatchEnd() {
      this._infoDB.set(
        this._supportedFeatures.match_info.name,
        this._supportedFeatures.match_info.info.draft_pack.category,
        this._supportedFeatures.match_info.info.draft_pack.key,
        null
      );

      this._infoDB.set(
        this._supportedFeatures.match_info.name,
        this._supportedFeatures.match_info.info.draft_cards.category,
        this._supportedFeatures.match_info.info.draft_cards.key,
        null
      );

      this._infoDB.set(
        this._supportedFeatures.match_info.name,
        this._supportedFeatures.match_info.info.draft_picked_card.category,
        this._supportedFeatures.match_info.info.draft_picked_card.key,
        null
      );
    }
  };
});
