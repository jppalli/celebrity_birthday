"use strict";

define([
  "/utils/io_plugin.js",
  "/utils/FeaturesHandler.js",
  "/utils/InfoDBContainer.js",
  "/games/roblox/supported_features.js",
  "/utils/game_monitoring_util.js",
  "/utils/gep_internal_info_tracker.js",
  "/games/roblox/log_parser.js",
], function (
  IOPlugin,
  FeaturesHandler,
  InfoDBContainer,
  SupportedFeatures,
  GameMonitoringUtility,
  GepInternalInfo,
  RobloxLogParser
) {
  const FILE_LISTENER_ID = "roblox_listener";
  return class RobloxLogListener {
    _gameId = 4688;
    _gameName = "Roblox";
    _ioPlugin;
    _logFileClosing = false;
    _listeningOnLogFile = false;
    _registeredOnLogFile = false;
    _linesSinceLastSessionIndicator = [];
    _waitingForNewLogLine = true;

    constructor() {
      this._infoDB = new InfoDBContainer({ logBlacklist: [] }, this._gameId);
      this._monitoring = new GameMonitoringUtility({
        game: {
          name: this._gameName,
          id: this._gameId,
        },
        infoDB: this._infoDB,
        supportedFeatures: SupportedFeatures,
      });
      this._featuresHandler = new FeaturesHandler(
        {
          monitoring: this._monitoring,
          gepInternalInfoTracker: new GepInternalInfo({ infoDB: this._infoDB }),
        },
        this._gameId,
        this._logParser = new RobloxLogParser({ infoDB: this._infoDB })
      );
    }

    async start(gameInfo, ioPlugin) {
      if (!gameInfo || !gameInfo.processId) {
        return console.error("missing gameInfo or executionPath ?!");
      }

      this._setFeatures()

      this._ioPlugin = ioPlugin;
      console.log("Does IO plugin support listDirectory?", typeof this._ioPlugin.listDirectory);
      this._infoDB.setGameProcessId(gameInfo.processId);
      this._featuresHandler.setGameProcessId(gameInfo.processId);
      let localAppDataDirectory = IOPlugin.get().LOCALAPPDATA;
      let robloxLogsPath = null
      let latestFile = null
      if (gameInfo.classId === 4688) {
        console.log("Roblox regular version");
        robloxLogsPath = `${localAppDataDirectory}\\Roblox\\logs`;
        latestFile = await this._getLatestLogFile(robloxLogsPath);
      } else if (gameInfo.classId === 22174) {
        console.log("Roblox microsoft version");
        const robloxPackagesPath = `${localAppDataDirectory}\\Packages`;
        const robloxFolder = await this._getLatestFolder(robloxPackagesPath);
        const robloxLogsPath = `${robloxFolder}\\LocalState\\logs`;
        latestFile = await this._getLatestLogFile(robloxLogsPath);
      }

      await this._asyncStartListeningOnFile(latestFile);
    }

    shutdown() {
      console.log("shutdown");
      this._ioPlugin.stopFileListen(FILE_LISTENER_ID)
      this._monitoring.stop();
    }

    _getLatestLogFile(logsPath, attempts = 30) {
      return new Promise((res, reject) => {
        let filePattern = `${logsPath}/*_Player_*_last.log`;

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

    _getLatestFolder(basePath, prefix = 'ROBLOXCORPORATION.ROBLOX', attempts = 10) {
      return new Promise((resolve, reject) => {
        const tryFind = (remaining) => {
          this._ioPlugin.listDirectory(basePath, (success, result) => {
            if (!success) {
              if (remaining > 1) {
                return setTimeout(() => tryFind(remaining - 1), 10000);
              }
              return reject(new Error(`listDirectory failed at ${basePath}`));
            }

                let entries;
            try {
              entries = JSON.parse(result);
            } catch (e) {
              return reject(new Error("Failed to parse directory listing."));
            }

                const matchingFolders = entries
              .filter(entry =>
                entry.name &&
                typeof entry.name === 'string' &&
                entry.name.toLowerCase().startsWith(prefix.toLowerCase())
              )
              .sort((a, b) => a.name.localeCompare(b.name)); 

                if (matchingFolders.length === 0) {
              if (remaining > 1) {
                return setTimeout(() => tryFind(remaining - 1), 10000);
              }
              return reject(new Error(`No folders found matching prefix '${prefix}'`));
            }

                const latestFolderName = matchingFolders[matchingFolders.length - 1].name;
            const fullPath = `${basePath}\\${latestFolderName}`;
            resolve(fullPath);
          });
        };

            tryFind(attempts);
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

    _setFeatures() {
      console.log("setting features...");
      this._featuresHandler.addSupportedFeatures(SupportedFeatures);
      this._featuresHandler.setSupportedFeatures();
    }

  };
});
