define([
  '/games/service/PluginHandler.js',
  '/libs/js-uuid.js'
], function (PluginHandler, uuid) {
    const kUnknownMatchResult = "unknown";

  return class VanguardPluginHandler extends PluginHandler {
    _isMatchInProgress = false;
    _lastRoundResult = kUnknownMatchResult;

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
      if  (event.name === 'round_outcome') {
        this._lastRoundResult = event.data;
      }

      super._handleSingleEvent(event);
    }

    _handleSceneEvent(info) {
      if (this._isMatchInProgress){
        if (info.value === 'lobby') {
          this._isMatchInProgress = false;
          super._handleSingleEvent({
            name: 'match_end', 
            data : this._lastRoundResult
          });
        }
      } else if(info.value === 'inGame') {
        this._isMatchInProgress = true;
        this._lastRoundResult = kUnknownMatchResult;
        super._handleSingleEvent({ name: 'match_start' });
      }
    }
  }
});