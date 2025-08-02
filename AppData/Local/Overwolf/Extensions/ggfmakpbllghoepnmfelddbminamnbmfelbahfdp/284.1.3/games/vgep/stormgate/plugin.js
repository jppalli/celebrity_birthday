define([
  '/games/service/PluginHandler.js',
], function (PluginHandler) {

  return class SgPluginHandler extends PluginHandler {
    _isMatchInProgress = false;

    constructor(config) {
      super(config);
    }

    start(gameInfo, infoDB, featuresHandler, isDisabled) {
      super.start(gameInfo, infoDB, featuresHandler, isDisabled);
    }

    _handleSingleGameInfo(info) {
      switch (info.key) {
        case 'scene': {
          this._handleSceneEvent(info);
          break;
        }
      }

      super._handleSingleGameInfo(info);
    }

    _handleSingleEvent(event) {

      super._handleSingleEvent(event)

    }

    _handleSceneEvent(info) {
      switch (info.value) {
        case 'lobby': {
            this._matchEnd();
          break;
        }
        case 'ingame': {
          this._isMatchInProgress = true;
          break;
        }
      }
    }

    _matchEnd() {
      if (!this._isMatchInProgress) {
        return;
      }

      this._isMatchInProgress = false;
      super._handleSingleEvent({
        name: 'match_end',
        data: null
      });
    }
  };
});