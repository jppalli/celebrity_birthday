"use strict";

define([
  "/utils/io_plugin.js",
  "/games/splitgate_2/supported_features.js",
  "/utils/game_monitoring_util.js",
  "/games/splitgate_2/logs/log_parser.js",
], function (
  IOPlugin,
  SupportedFeatures,
  GameMonitoringUtility,
  Splitgate2LogParser
) {

  const FILE_LISTENER_ID = "splitgate_2_listener";

  return class Splitgate2LogListener {
    _gameId = 25884;
    _gameName = "Splitgate 2";
    _logFileClosing = false;
    _listeningOnLogFile = false;
    _registeredOnLogFile = false;
    _linesSinceLastSessionIndicator = [];
    _waitingForNewLogLine = true;

    constructor(gameInfo, infoDB, featuresHandler) {
      this._infoDB = infoDB

      this._featuresHandler = featuresHandler,

        this._game = gameInfo,

        this._monitoring = new GameMonitoringUtility({
          game: {
            name: this._gameName,
            id: this._gameId,
          },
          infoDB: this._infoDB,
          supportedFeatures: SupportedFeatures,
        })

      this._logParser = new Splitgate2LogParser({ infoDB: this._infoDB })
    }

    async start(ioPlugin) {

      if (!this._game || !this._game.processId) {
        return console.error("missing gameInfo or executionPath ?!");
      }

      this._ioPlugin = ioPlugin;
      this._infoDB.setGameProcessId(this._game.processId);
      this._featuresHandler.setGameProcessId(this._game.processId);
      let localAppDataDirectory = IOPlugin.get().LOCALAPPDATA;
      let logsPath = `${localAppDataDirectory}\\PortalWars2\\Saved\\Logs`;
      let attempts = 10;
      const latestFile = await this._getLatestLogFile(logsPath, attempts);

      await this._asyncStartListeningOnFile(latestFile);
    }

    stop() {
      super.stop();
    }

    shutdown() {
      console.log("shutdown");
      this._ioPlugin.stopFileListen(FILE_LISTENER_ID)
    }

    _getLatestLogFile(logsPath, attempts) {
      return new Promise((res, reject) => {
        let filePattern = `${logsPath}/PortalWars2.log`;

        this._ioPlugin.getLatestFileInDirectory(
          filePattern,
          (status, logFileName) => {
            if (!status || !logFileName.endsWith(".log")) {
              if (attempts > 1) {
                setTimeout(() => {
                  console.log(`Retrying find txt file - Attempts left: ${attempts - 1}`);
                  this._getLatestLogFile(logsPath, attempts - 1).then(res).catch(reject);
                }, 10000);
              } else {
                reject(new Error(`Couldn't find txt file after 30 attempts`));
              }
              return;
            }

            let fullLogPath = `${logsPath}/${logFileName}`;
            res(fullLogPath);
          }
        );
      });
    }

    _asyncStartListeningOnFile(logPath) {
      return new Promise((resolve, reject) => {
        this._ioPlugin.fileExists(logPath, (status) => {
          if (!status) {
            return reject("game log file doesn't exist!");
          }

          if (!this._registeredOnLogFile) {
            this._ioPlugin.onFileListenerChanged2.addListener(
              this._logFileChanged.bind(this)
            );
            this._registeredOnLogFile = true;
          }

          this._logFileClosing = false;
          this._listeningOnLogFile = false;

          this._ioPlugin.listenOnFile(
            FILE_LISTENER_ID,
            logPath,
            false, 
            (id, status, error) => {
              if (!status) {
                return reject("failed to listen on log file: " + error);
              }

              console.log("Listen Started: ", id);
              this._listeningOnLogFile = true;
            }
          ); 
        });
      });
    }

    _logFileChanged(id, status, data, isNew) {
      if (id !== FILE_LISTENER_ID) {
        return;
      }


      const result = this._logParser.parse(data);
      for (let event of result.events) {
        this._handleEvent(event);
      }
      for (let infoUpdate of result.infoUpdates) {
        this._handleInfoUpdate(infoUpdate);
      }
    }

    _handleEvent(event) {
      this._featuresHandler.triggerEvent(event.feature, event.name, event.value);
    }

    _handleInfoUpdate(infoUpdate) {
      const feature = SupportedFeatures[infoUpdate.feature];
      this._infoDB.set(
        feature.name,
        feature.info[infoUpdate.key].category,
        feature.info[infoUpdate.key].key,
        infoUpdate.value
      );
    }
  };
});
