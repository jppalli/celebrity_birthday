define([], function () {

  function FeaturesHandler(config, gameId) {
    if (!(this instanceof FeaturesHandler)) {
      throw new TypeError("InfoDBContainer constructor cannot be called as a function.");
    }
    this._supportedFeatures = [];

    this._logBlacklist = [];
    if (config && (typeof config === 'object')) {
      this._logBlacklist = this._logBlacklist.concat(config.logBlacklist);
    }

    this._monitoring = config.monitoring;

    this._disabled = false;

    this._gameProcessId = 0;
    this._gameId = gameId;

    const gepInternalInfo = config.gepInternalInfoTracker;
    if (gepInternalInfo) {
      this.addSupportedFeatures(gepInternalInfo.supportedFeatures);
    }
  }

  FeaturesHandler.prototype = {
    constructor: FeaturesHandler,

    addSupportedFeatures: function (features) {
      let featureKey, featureName;
      for (featureKey in features) {
        featureName = features[featureKey].name;

        if (!featureName) {
          featureName = features[featureKey].feature;
        }

        if (!featureName) {
          featureName = featureKey;
        }

        if (this._supportedFeatures.indexOf(featureName) < 0) {
          this._supportedFeatures.push(featureName);
        }
      }
    },

    setSupportedFeatures: function (callback) {
      callback = callback || function () { };

      console.log('[FeaturesHandler] setting supported features: ' + JSON.stringify(this._supportedFeatures));
      overwolf.games.events.provider.setSupportedFeatures(this._supportedFeatures, function (res) {
        console.log("[FeaturesHandler] setSupportedFeatures result: " + JSON.stringify(res));
        callback(res);
      });
    },


    disable: function () {
      this._disabled = true;
    },

    enable: function () {
      this._disabled = false;
    },

    setGameId: function (gameId) {
      this._gameId = gameId;
    },

    setGameProcessId: function (gamePID) {
      this._gameProcessId = gamePID || 0;
    },

    triggerEvent: function (feature, event, data) {
      if (this._disabled) {
        return;
      }

      if (this._logBlacklist.indexOf(feature) < 0 &&
        this._logBlacklist.indexOf(event) < 0) {
        console.log('[FeaturesHandler] TRIGGERING EVENT: FEATURE: ' + feature + '; EVENT: ' + event + '; DATA: ' + JSON.stringify(data));
      }
      overwolf.games.events.provider.triggerEvent(feature, event, data);

      if (this._monitoring) {
        let eventToTrack = {
          name: data && data.label ? data.label : event,
          data: data
        };

        if (event === "announcer") {
          eventToTrack = data;
        }
        this._monitoring.handleGameTrackingEvent(eventToTrack);

        let info = {
          gameId: this._gameId,
          key: event,
          value: data
        }
        this._monitoring.reportEvent(info, "event");
      }
    },

    concat: function (featuresArray) {
      if (featuresArray == null) {
        return;
      }

      featuresArray.forEach(function (newFeature) {
        if (this._supportedFeatures.indexOf(newFeature) < 0) {
          this._supportedFeatures.push(newFeature);
        }
      }, this);
    }
  };

  return FeaturesHandler;
});
