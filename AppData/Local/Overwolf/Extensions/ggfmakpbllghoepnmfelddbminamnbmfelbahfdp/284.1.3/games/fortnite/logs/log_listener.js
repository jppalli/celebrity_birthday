"use strict";

define([
  "/utils/InfoDBContainer.js",
  "/utils/io_plugin.js",
  "/games/fortnite/supported_features.js",
  "/games/fortnite/logs/log_parser.js",
  "/utils/FeaturesHandler.js",
  "/utils/game_monitoring_util.js",
  "/utils/gep_internal_info_tracker.js",
  "/utils/analytics.js"
], function (
  InfoDBContainer,
  IOPlugin,
  SupportedFeatures,
  FortniteLogParser,
  FeaturesHandler,
  GameMonitoringUtility,
  GepInternalInfo,
  Analytics
) {

  const FILE_LISTENER_ID = "fortnite_listener";

  return class FortniteLogListener {
    _gameId = 21216;
    _gameName = "Fortnite";
    _logFileClosing = false;
    _listeningOnLogFile = false;
    _registeredOnLogFile = false;
    _linesSinceLastSessionIndicator = [];
    _waitingForNewLogLine = true;
    _lastPartyId = null;

    constructor(gameInfo, infoDB, featuresHandler, logParser) {
      this._infoDB = infoDB

      this._logParser = logParser;
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
      let fortniteLogsPath = `${localAppDataDirectory}\\FortniteGame\\Saved\\Logs`;
      const latestFile = await this._getLatestLogFile(fortniteLogsPath);

      await this._asyncStartListeningOnFile(latestFile);
    }

    stop() {
      super.stop();
    }

    shutdown() {
      console.log("shutdown");
      this._ioPlugin.stopFileListen(FILE_LISTENER_ID)
    }

    _getLatestLogFile(logsPath) {
      return new Promise((res, rej) => {
        let filePattern = `${logsPath}/FortniteGame.log`;

        this._ioPlugin.getLatestFileInDirectory(
          filePattern,
          (status, logFileName) => {
            if (!status || !logFileName.endsWith(".log")) {
              return reject(new Error(`couldn't find log file`));
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


      this._logParser.parse(data);
    }


  };
});
