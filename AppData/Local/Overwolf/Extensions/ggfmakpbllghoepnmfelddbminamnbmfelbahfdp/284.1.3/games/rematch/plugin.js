"use strict";

define([
  "/games/service/PluginHandler.js",
  "/utils/io_plugin.js",
  "/games/rematch/logs/log_listener.js",
], function (PluginHandler, IOPlugin, RematchLogListener) {
  return class RematchPluginHandler extends PluginHandler {

    _isMatchInProgress = false;
    _leftScore = 0;
    _rightScore = 0;

    constructor(config) {
      super(config);
      this._logListener = null;
      this.ioPlugin = null;
    }

    start(gameInfo, infoDB, featuresHandler, isDisabled) {
      super.start(gameInfo, infoDB, featuresHandler, isDisabled);

      const self = this;

      IOPlugin.asyncAssureCreation().then(function (ioPlugin) {
        self._logListener = new RematchLogListener(gameInfo, infoDB, featuresHandler);
        self._logListener.setPluginHandler(self);
        self.ioPlugin = ioPlugin;
        self._logListener.start(self.ioPlugin);
      }).catch(_ => {
        console.log(" failed to create io plugin service");
      });

    }

    stop() {
      super.stop();
    }

    _handleSingleGameInfo(info) {
      let whiteListInfo = this._pluginWhitelist.InfoDB[info.key];
      if (!whiteListInfo) {
        return;
      }

      switch (info.key) {
        case 'scene': {
          this._handleSceneEvent(info);
          break;
        }
      }

      super._handleSingleGameInfo(info);
    }

    _handleSceneEvent(info) {
      switch (info.value) {
        case 'lobby': {
          this._handleLobbyScene();
          break;
        }
      }
    }

    _handleLobbyScene() {
      if (!this._isMatchInProgress) {
        return;
      }

      this._handleMatchEnd();
    }

    _handleMatchStart() {
      if (this._isMatchInProgress) {
        return;
      }

      this._isMatchInProgress = true;

      if (this._logListener && typeof this._logListener.setMatchStarted === 'function') {
        this._logListener.setMatchStarted(true);
      }


      const matchInfo = this._supportedFeatures.match_info;
      const value = {
        right_score: 0,
        left_score: 0
      };

      this._infoDB.set(
        matchInfo.name,
        matchInfo.info.score.category,
        matchInfo.info.score.key,
        JSON.stringify(value)
      );

      this._infoDB.set(
        matchInfo.name,
        matchInfo.info.match_outcome.category,
        matchInfo.info.match_outcome.key,
        null
      );
    }

    _handleLeftGoal(data) {

      this._leftScore = data;
      const side = "left";
      this._handleGoal(side)
      this._handleScore();
    }

    _handleRightGoal(data) {

      this._rightScore = data;
      const side = "right";
      this._handleGoal(side)
      this._handleScore();
    }

    _handleScore() {

      let value = {
        left_score: this._leftScore,
        right_score: this._rightScore
      };

      const matchInfo = this._supportedFeatures.match_info;
      this._infoDB.set(
        matchInfo.name,
        matchInfo.info.score.category,
        matchInfo.info.score.key,
        JSON.stringify(value)
      );
    }

    _handleGoal(data) {

      let key = undefined;
      if (data === "left") {
        key = "team_goal"
      } else key = "opponent_goal"

      const feature = this._supportedFeatures.match_info;
      this._featuresHandler.triggerEvent(
        feature.name,
        feature.events[key].name,
        null
      );
    }

    _handleSingleEvent(event) {
      let pluginEventName = event.name;
      let metadata = this._pluginWhitelist.Events[pluginEventName];
      if (!metadata) {
        return;
      }

      switch (event.name) {
        case 'match_end': {
          this._handleMatchOutcome();
          this._handleMatchEnd();
          break;
        }
        case 'match_start': {
          this._handleMatchStart();
          break;
        }
        case 'score_left': {
          this._handleLeftGoal(event.data);
          break;
        }
        case 'score_right': {
          this._handleRightGoal(event.data);
          break;
        }
      }

      super._handleSingleEvent(event);
    }

    _handleMatchEnd() {
      if (!this._isMatchInProgress) {
        return;
      }

      this._leftScore = 0;
      this._rightScore = 0;

      let feature = this._supportedFeatures.match_info;
      this._featuresHandler.triggerEvent(
        feature.name,
        feature.events.match_end.name,
        null
      );

      this._isMatchInProgress = false;

      if (this._logListener && typeof this._logListener.setMatchStarted === 'function') {
        this._logListener.setMatchStarted(false);
      }
    }

    _handleMatchOutcome() {
      let value = null;
      if (this._leftScore > this._rightScore) {
        value = "victory";
      } else if (this._leftScore < this._rightScore) {
        value = "defeat";
      } else if (this._leftScore === this._rightScore) {
        value = "draw";
      }

      const matchInfo = this._supportedFeatures.match_info;
      this._infoDB.set(
        matchInfo.name,
        matchInfo.info.match_outcome.category,
        matchInfo.info.match_outcome.key,
        value
      );
    }
  };
});