define([
  "/games/hearthstone/logs/log_parser.js",
  "/games/hearthstone/supported_features.js",
  "/utils/io_plugin.js"
], function (HearthstoneLogParser, SupportedFeatures, IOPlugin) {
  const POWER_LOG_LISTENER_ID = "powerlog";
  let _ioPlugin;
  class HearthstoneLogListener {

    constructor(gameInfo, ioPlugin, featuresHandler, infoDB) {
      this._gameInfo = gameInfo;
      this._ioPlugin = ioPlugin;
      this._featuresHandler = featuresHandler;
      this._infoDB = infoDB;

      this._logParser = new HearthstoneLogParser(infoDB);
      this._fileListenerChangedFailCounter = 0;
      this.start = this.start.bind(this);
    }

    start() {
      const { executionPath } = this._gameInfo;
      const hearthstoneFolder = executionPath.replace("Hearthstone.exe", "Logs");
      this._ioPlugin.get().isDirectory(hearthstoneFolder, exist => {
        if (exist) {
          _getLatestGameLogsDirectory(hearthstoneFolder)
            .then(latestDirName => {
              let logFileName = `${hearthstoneFolder}/${latestDirName}/Power.log`;
              this._registerListener(logFileName);
              this._listen(logFileName);
            })
            .catch(() => {
              return callback(false, "can't find logs directory for game", null);
            });

          return;
        }
      });
    }

    _registerListener(logFileName) {
      this._ioPlugin
        .get()
        .onFileListenerChanged.addListener((id, status, line) => {
          if (!status) {
            console.log("[HS LOG LISTENER] error: " + id + ": " + line);

            if (this._fileListenerChangedFailCounter < 10) {
              this._fileListenerChangedFailCounter++;
              const skipToEndOfFile = id !== "powerlog" || line !== "truncated";

              setTimeout((logFileName, skipToEndOfFile) => {
                console.log("[HS LOG LISTENER] Retrying to listen...");
                this._listen(logFileName, skipToEndOfFile);
              }, 5000, logFileName, skipToEndOfFile);
            } else {
              this._ioPlugin
                .get()
                .onFileListenerChanged.removeListener();
            }

            return;
          }

          if (id == POWER_LOG_LISTENER_ID) {
            this._handleLogLine(line);
          }
        });
    }

    _listen(logFileName, skipToEndOfFile = true) {
      this._ioPlugin.get().stopFileListen(POWER_LOG_LISTENER_ID);
      this._ioPlugin
        .get()
        .listenOnFile(
          POWER_LOG_LISTENER_ID,
          logFileName,
          skipToEndOfFile,
          (fileId, status, data) => {
            if (status) {
              console.log(
                "[HEARTHSTONE LOG LISTENER] Listening to Power log..."
              );
            } else {
              console.log(
                "[HEARTHSTONE LOG LISTENER] Failed to listen: " + fileId
              );
              console.log(JSON.stringify(data, null, 2));
              setTimeout(() => this._listen(logFileName), 1500)
            }
          }
        );
    }

    _handleLogLine(line) {
      const result = this._logParser.parse(line);
      for (let event of result.events) {
        this._handleEvent(event);
      }
      for (let infoUpdate of result.infoUpdates) {
        this._handleInfoUpdate(infoUpdate);
      }
    }

    _handleEvent(event) {
      this._featuresHandler.triggerEvent(event.feature, event.name, event.data);
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
  }


  function _getLatestGameLogsDirectory(root) {
    return new Promise((resolve, reject) => {
      IOPlugin.get().listDirectory(root, (success, result) => {
        if (success) {
          let directory = JSON.parse(result);
          directory.sort(function (a, b) {
            var nameA = a.name.toUpperCase(); 
            var nameB = b.name.toUpperCase(); 
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }

            return 0;
          });

          let latestDirectory = directory.pop();
          let latestDirectoryName = latestDirectory.name;

          return resolve(latestDirectoryName);
        }

        return reject();
      });
    });
  }

  return HearthstoneLogListener;
});
