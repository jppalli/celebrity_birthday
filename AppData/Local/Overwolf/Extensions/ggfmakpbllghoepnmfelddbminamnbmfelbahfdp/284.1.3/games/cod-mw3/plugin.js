define([
  '/games/service/PluginHandler.js',
  '/libs/js-uuid.js'
], function (PluginHandler, uuid) {
  const kUnknownMatchResult = "unknown";

  return class CoDMW3PluginHandler extends PluginHandler {
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

    _matchEnd() {
      if (!this._isMatchInProgress) {
        return;
      }

      this._isMatchInProgress = false;

      if (this._mode != "bo6") {
        super._handleSingleEvent({
          name: 'match_end',
          data: this._victory === true ? 'victory' : 'defeat'
        })
      } else {
        super._handleSingleEvent({

          name: 'match_end',
          data: null
        })
      }
    }

    _handleVictory() {
      this._victory = true;
      this._matchEnd();
    }

    _handleAirplane() {
      if (this._isMatchInProgress) {
        this._matchEnd();
      }

      this._handleInGame();
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

      this._mode = gameMode;
    }

    _handleSceneEvent(info) {
      switch (info.value) {
        case 'lobby_mw3': {
          this._handleGameMode('mw3');
          this._matchEnd();
          break;
        }
        case 'lobby_bo6': {
          this._handleGameMode('bo6');
          this._matchEnd();
          break;
        }
        case 'lobby_wz': {
          this._handleGameMode('warzone');
          this._matchEnd();
          break;
        }
        case 'airplane': {
          this._handleAirplane();
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