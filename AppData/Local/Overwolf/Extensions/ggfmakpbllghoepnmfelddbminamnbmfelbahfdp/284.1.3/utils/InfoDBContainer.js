define([
  '/utils/simple_event.js',
  '/utils/game_events_monitor.js'
], function (
  SimpleEvent,
  GameEventsMonitor
) {

  function InfoDBContainer(config, gameid) {
    if (!(this instanceof InfoDBContainer)) {
      throw new TypeError(
        "InfoDBContainer constructor cannot be called as a function.");
    }

    this._logBlacklist = [];
    if (config && (typeof config === 'object')) {
      this._logBlacklist = this._logBlacklist.concat(config.logBlacklist);
    }
    this._categories = {};

    this._listeners = [];

    this._disabled = false;

    this._gameProcessId = 0;

    this._gameId = gameid;

    this._gameEventMonitor = new GameEventsMonitor();

  }

  InfoDBContainer.prototype = {
    constructor: InfoDBContainer,

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

    reset: function () {
      this._categories = {};
    },

    set: function (feature, category, key, value, inMemoryOnly = false) {
      if (this._disabled) {
        return;
      }

      let changed = false;

      let cat = this._categories[category];

      if (typeof cat === 'undefined' || cat === null) {
        changed = true;
        this._categories[category] = {};
      }

      if (this._categories[category][key] === null) {
        changed = true;
        this._categories[category][key] = value;
      }

      if (this._categories[category][key] !== value) {
        changed = true;
        this._categories[category][key] = value;
      }

      if (changed) {

        let info = {
          feature: feature,
          category: category,
          key: key,
          value: value
        };

        const blacklisted = this._logBlacklist.some(item => key.includes(item));

        if (!blacklisted && this._logBlacklist.indexOf(feature) < 0 && !inMemoryOnly) {
          try {
            console.log("[InfoDBContainer] UPDATING INFO (decoded): " +
              decodeURI(JSON.stringify(info)));
          }
          catch (e) { }
        }

        try {
          for (let i = 0; i < this._listeners.length; ++i) {
            this._listeners[i](info);
          }

          if (inMemoryOnly) {
            return;
          }

          overwolf.games.events.provider.updateInfo(info);

          if (this._gameEventMonitor) {
            let info = {
              gameId: this._gameId,
              key: key,
              value: value
            }

            this._gameEventMonitor.reportEvent(info, "info");
          }
        } catch (e) {
          console.error('error calling overwolf.games.events.provider.updateInfo(): ' +
            e.message);
        }
      }
    },

    get: function (category, key) {
      if (this._categories.hasOwnProperty(category) &&
        this._categories[category].hasOwnProperty(key)) {
        return this._categories[category][key];
      } else {
        return null
      }
    },

    addListener: function (listener) {
      this._listeners.push(listener);
    },

    removeListener: function (listener) {
      let i = this._listeners.indexOf(listener);
      if (i >= 0) {
        this._listeners.splice(i, 1);
      }
    }
  };

  return InfoDBContainer;
});
