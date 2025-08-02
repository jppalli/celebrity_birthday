"use strict";

define(['/utils/game_native_monitoring_util.js'],
  function (GameNativeMonitoringUtility) {
    return class NativeSDKGame {
      constructor() {
      }

           start(gameInfo, isDisabled) {
        if (this._started) {
          this._log("service already started: " + gameInfo.title);
          return;
        }

        this._game = {
          id: parseInt(gameInfo.id / 10),
          name: (gameInfo.displayName ?
           gameInfo.displayName : gameInfo.title)
        };

        this._logName = "[" + this._game.name.toUpperCase() + "]";
        if (!this._monitoring) {
          this._monitoring = new GameNativeMonitoringUtility({
            game: {
                name: this._game.name
            }
          });
        }

        this._log("starting service");
        let me = this;
        this._monitoring.start();
        this._started = true;
      }

      shutdown() {
        this._log("shutdown");
        this._monitoring.stop();
      }

      appInit() {
        this._log("onAppInit");
      }

      _log(line){
        console.log(this._logName + " " + line);
      }
    };
  });