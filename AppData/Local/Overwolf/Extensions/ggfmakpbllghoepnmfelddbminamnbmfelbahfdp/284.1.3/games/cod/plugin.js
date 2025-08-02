define([
  '/games/service/PluginHandler.js',
  '/libs/js-uuid.js'
], function (PluginHandler, uuid) {
  const kUnknownMatchResult = "unknown";

  return class CODPluginHandler extends PluginHandler {
    _isMatchInProgress = false;
    _victory = undefined;
    _mode = undefined;

    constructor(config) {
      super(config);
    }

    start(gameInfo, infoDB, featuresHandler, isDisabled) {
      this._isMatchInProgress = false;
      this._victory = undefined;
      this._mode = undefined;
      infoDB.reset();
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
      if (event.name === 'victory') {
        return this._handleVictory();
      }
    }

    _handleGameMode(gameMode) {
      if (this._mode === gameMode) {
        return;
      }

      this._infoDB.set(
        this._supportedFeatures.game_info.name,
        this._supportedFeatures.game_info.info.mode.category,
        this._supportedFeatures.game_info.info.mode.key,
        gameMode
      );
    }

    _matchEnd() {
      if (!this._isMatchInProgress) {
        return;
      }

      this._isMatchInProgress = false;
      super._handleSingleEvent({
        name: 'match_end',
        data: this._victory === true ? 'victory' : 'defeat'
      });
    }

    _handleVictory() {
      this._victory = true;
      this._matchEnd();
    }

    _handleInGame() {
      if (this._isMatchInProgress) {
        return;
      }

      this._victory = undefined;
      this._isMatchInProgress = true;
      super._handleSingleEvent({
        name: 'match_start',
        data: null
      });
    }

    _handleSceneEvent(info) {
      switch (info.value) {
        case 'lobby_mw2': {
          this._handleGameMode('mw2');
          this._matchEnd();
          break;
        }
        case 'in_game': {
          this._handleInGame();
          break;
        }
      }
    }
  };
});