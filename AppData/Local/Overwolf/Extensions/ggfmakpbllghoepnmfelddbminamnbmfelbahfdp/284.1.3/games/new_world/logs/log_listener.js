"use strict";

define([
  "/utils/InfoDBContainer.js",
  "/utils/io_plugin.js",
  "/games/new_world/supported_features.js",
  "/utils/FeaturesHandler.js",
  "/utils/game_monitoring_util.js",
  "/utils/gep_internal_info_tracker.js",
], function (
  InfoDBContainer,
  IOPlugin,
  SupportedFeatures,
  FeaturesHandler,
  GameMonitoringUtility,
  GepInternalInfo
) {

  const FILE_LISTENER_ID = "newWorld_impact_listener";

  return class NewWorldLogListener {
    _gameId = 21816;
    _gameName = "New World";
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

    }

    async start(ioPlugin) {

      if (!this._game || !this._game.processId) {
        return console.error("missing gameInfo or executionPath ?!");
      }

      this._ioPlugin = ioPlugin;
      this._infoDB.setGameProcessId(this._game.processId);
      this._featuresHandler.setGameProcessId(this._game.processId);
      let localAppDataDirectory = IOPlugin.get().LOCALAPPDATA;
      let newWorldLogsPath = `${localAppDataDirectory}\\AGS\\New World`;
      const latestFile = await this._getLatestLogFile(newWorldLogsPath);

      await this._asyncStartListeningOnFile(latestFile);
    }

    stop() {
      super.stop();
    }

    shutdown() {
      console.log("shutdown");
      this._ioPlugin.stopFileListen(FILE_LISTENER_ID)
    }

    _getLatestLogFile(logsPath, attempts = 30) {
      return new Promise((res, reject) => {
        let filePattern = `${logsPath}/Game.log`;

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


      const result = {
        events: [],
        infoUpdates: []
      }

      this._parseMapName(data, result);

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

    _parseMapName(line, result) {
      const regex = /Loading level (\w+)/;
      const match = line.match(regex);

          if (match && match[1]) {
        const map = match[1];

        if (map.startsWith("NewWorld_") || map.startsWith("NW_")) {
          const infoUpdate = {
            feature: 'game_info',
            key: 'map',
            value: map
          };
          result.infoUpdates.push(infoUpdate);
        }
      }
    }


          };
});
