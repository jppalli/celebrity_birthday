'use strict';

define("main", [
  '/games/SupportedGames.js',
  '/utils/game_monitoring_util.js',
  '/utils/base_utils.js',
  '/utils/ow-api.js',
  '/utils/version_compare.js',
  '/utils/monitoring_statics.js'
],
  function (SupportedGames,
    Monitoring,
    BaseUtils,
    owAPI,
    VersionComparer,
    MonitoringStatics) {

    const SHUTDOWN_DELAY = 10000;
    const RESTART_DELAY = 10000;
    const GEP_STATUS_LOCALSTORAGE = "lastPluginDecision";
    const GEP_STATUS_JSON_URL = "https://game-events-status.overwolf.com/gamestatus_prod.json";
    const DEFAULT_GAME_EVENTS = [{
      "game_id": 10878,
      "state": 0
    }, {
      "game_id": 7314,
      "state": 1
    }, {
      "game_id": 21216,
      "state": 1
    }, {
      "game_id": 5426,
      "state": 1
    }, {
      "game_id": 10906,
      "state": 1
    }, {
      "game_id": 10798,
      "state": 1
    }];

    let curGameService;
    let _shutdownTimer = null;
    let _monitoring = new Monitoring();
    let _gepVersion = null;
    let _phasedPercent = null;
    let _owAPI = owAPI;

    let OWGEP = function OWGEP() {
      let self = this;
      console.log('[GEP] launched');


      window.addEventListener('error', function (e) {
        self.safeSendException();
      });

      _initOWGEP(self);
    };

    async function _initOWGEP(self) {
      if (!_gepVersion) {
        _gepVersion = await (async () => {
          return new Promise(resolve => {
            overwolf.extensions.current.getManifest(function (manifest) {
              manifest.meta.version;
              localStorage.setItem("appVersion", manifest.meta.version);
              console.log('[GEP] Running version ' + manifest.meta.version);
              resolve(manifest.meta.version);
            });
          })
        })();

        window.__appVersion__ = _gepVersion;
      }

      overwolf.profile.getCurrentUser(function (resUser) {
        let userId = "NA";
        if (resUser.status === "success") {
          userId = resUser.username;
          window.__userId__ = resUser.userId;
          Sentry.setTag("UID", resUser.userId || '');

          if (resUser.channel &&
            (resUser.channel.indexOf('QA') === 0)) {
            self._debugMode = true;
          }

        }
        else if (resUser.status === "error" && resUser.userId) {
          userId = resUser.userId;
          window.__userId__ = resUser.userId;
        }
        localStorage.setItem("userId", userId);

        if (localStorage.debugMode) {
          self._debugMode = true;
        }

        let source = location.search.split('source=')[1];
        if (source === "GameEventsProviderInitialization" ||
          source === "wakeup&wows" || source === "wakeup&wot") {
          self.appInit();
        } else {
          self.init();
        }
      });

      overwolf.utils.getSystemInformation(result => {
        if (!result.success || !result.systemInfo || !result.systemInfo.OSBuild) {
          console.log(`[GEP] failed to get system information`)

          if (result.error) {
            console.log(JSON.stringify(result.error));
          }

          return;
        }

        const lastReport = localStorage.getItem('gep-last-reported-osbuild');

        const lastReportDate = BaseUtils.tryParseDate(lastReport);

        if (!lastReportDate || BaseUtils.isBeforeToday(lastReportDate)) {
          console.log('[GEP] reporting osbuild')

          _monitoring.sendTrack(
            _monitoring.TRACKING_KINDS.OSBUILD,
            result.systemInfo.OSBuild.replace(/\./g, '_')
          );
        } else {
          console.log('[GEP] skipped reporting osbuild')
        }

        localStorage.setItem(
          'gep-last-reported-osbuild',
          new Date().toString()
        );
      });
    }

    OWGEP.prototype = {
      constructor: OWGEP,

      _debugMode: false,
      _hasRenderer: false,
      _gameStarted: false,
      _closeTimeout: null,
      _restartTimeout: null,
      _detectedRendererTimeout: null,

      debug: function debug() {
        if (this._debugMode) {
          console.log.apply(console, arguments);
        }
      },

      init: function init(closeTimeout) {
        console.log('[GEP] init');

        this._closeTimeout = closeTimeout;

        this._detectedRendererTimeout =
          setTimeout(this.onDetectedRenderer.bind(this), 30000);
        overwolf.games.onGameRendererDetected
          .removeListener(this.onDetectedRenderer.bind(this));
        overwolf.games.onGameRendererDetected
          .addListener(this.onDetectedRenderer.bind(this));

        overwolf.games.onGameInfoUpdated
          .addListener(this.onGameInfoUpdated.bind(this));

        overwolf.games.getRunningGameInfo(this.handleCurrentRunningGame.bind(this));
      },

      appInit: function appInit() {
        let mains = [];
        let self = this;
        console.log('[GEP] appInit');

        for (let key in SupportedGames) {
          if (SupportedGames.hasOwnProperty(key)) {
            mains.push(SupportedGames[key].main);
          }
        }

        this._tryLoadMains(mains);
      },

      _tryLoadMains: async function (mains) {
        let self = this;

        let closeTimeout = setTimeout(window.close, 20000);

        self.init(closeTimeout);

        let reportedGepFailedToLoadServices = false;

        for (let mainPath of mains) {
          let gameId = Object.keys(SupportedGames).find(key => {
            return SupportedGames[key].main === mainPath
          });
          let extra = gameId + "." + _gepVersion.replace(/\./g, "_");

          let main = null;

          try {
            main = await this._requireSingleModule(mainPath);
          } catch (err) {
            if (!reportedGepFailedToLoadServices) {
              reportedGepFailedToLoadServices = true;
              console.warn(`[GEP] failed to load game service scripts ` +
                `[${err.message}] :` +
                `${JSON.stringify(err)}`);

              this._reportDailyGepLoadFail();
              const eventName = "Failed to load main"
              Sentry.withScope((scope) => {
                scope.setExtra("gameId", gameId);
                Sentry.captureMessage(eventName);
              });

              _monitoring.sendTrack(
                _monitoring.TRACKING_KINDS.GEP_FAILED_TO_LOAD_GAME_SERVICES);
            }

            console.warn(`[GEP] failed to load game ${gameId} service script ` +
              `[${err.message}] :` +
              `${JSON.stringify(err)}`);
            _monitoring.sendTrack(
              _monitoring.TRACKING_KINDS.GEP_FAILED_TO_LOAD_GAME_MAIN, extra);

            continue;
          }

          try {
            await main.appInit();
          } catch (error) {
            console.log(`[GEP] failed to init game ${gameId}`);
            _monitoring.sendTrack(
              _monitoring.TRACKING_KINDS.GAME_INIT_FAILED, gameId);
          }
        }
      },

      _requireSingleModule: function (path) {
        return new Promise((resolve, reject) => {
          require([path], function (module) {
            resolve(module);
          }, function (err) {
            reject(err);
          });
        })
      },

      _reportDailyGepLoadFail: function () {
        const lastReportedFailureDate = "lastReportedFailureDate";
        const dateFromStorage = parseInt(localStorage.getItem(lastReportedFailureDate))
        const lastReportDate = new Date(dateFromStorage);
        const extra = _gepVersion.replace(/\./g, "_");
        if (BaseUtils.isBeforeToday(lastReportDate)) {
          _monitoring.sendTrack(
            _monitoring.TRACKING_KINDS.GEP_FAILED_TO_LOAD_GAME_SERVICES_DAILY, extra);
        }
        localStorage.setItem(lastReportedFailureDate, Date.now().toString());
      },

      handleCurrentRunningGame: function (res) {
        if (!res || !res.isRunning) {
          console.log("[GEP] Loaded but no game is currently running");
          let extra = _gepVersion.replace(/\./g, "_");
          _monitoring.sendTrack(_monitoring.TRACKING_KINDS.GEP_VERSION, extra);
          return;
        }

        if (!this._hasRenderer &&
           (!res.detectedRenderer || (res.detectedRenderer === 'Unknown'))) {
          clearTimeout(this._closeTimeout);
          console.log("[GEP] unknown renderer, waiting...");
          return;
        }

        console.log("[GEP] Loaded while game already running");
        console.log(JSON.stringify(res));
        let gameId = Math.floor(res.id / 10);
        let gameName = res.title;

        window.__gameDetails__ = {
          gameId,
          game: gameName,
        };

        let extra = gameId + "." + _gepVersion.replace(/\./g, "_");

        if (SupportedGames[gameId]) {
          _monitoring.sendTrack(_monitoring.TRACKING_KINDS.GEP_VERSION_GAME, extra);
          this.onGameStart(gameId, res);
        }
      },

      onGameInfoUpdated: function (res) {
        if (!res || !res.gameInfo) {
          console.log("[GEP] no data on game info update");
          return;
        }

        let gameId = Math.floor(res.gameInfo.id / 10);
        if ((res.runningChanged || res.gameChanged)
             && res.gameInfo && !res.gameInfo.isRunning) {
          let infoJson = "";
          try{infoJson = JSON.stringify(res.gameInfo);}catch{};
          console.log("[GEP] Supported game ended " + gameId, infoJson);
          this._restartTimeout = null;
          this.onGameEnd(gameId);
          return;
        }


        const isRunning = (res.runningChanged || res.gameChanged) && res.gameInfo.isRunning;

        const waitingForeRenderer =
          !res.gameInfo.detectedRenderer ||
          (res.gameInfo.detectedRenderer === 'Unknown') ||
          res.gameInfo.detectedRenderer === undefined ;

        if (waitingForeRenderer && !res.gameInfo.oopOverlay) {
          clearTimeout(this._closeTimeout);  
          this._hasRenderer = false;
          console.log("[GEP] game info updated - unknown renderer, waiting...", res.gameInfo.id);
          if (isRunning && SupportedGames[gameId]) {
            if (_shutdownTimer) {
              console.log('[GEP] termination canceled due to new session', res.gameInfo.id);
              clearTimeout(_shutdownTimer);
            }
          }
          return;
        }

        if ((res.runningChanged || res.gameChanged) && res.gameInfo.isRunning) {
          if (SupportedGames[gameId]) {
            console.log(`[GEP] Supported game launched: ${gameId} [oop: ${res.gameInfo.oopOverlay}]`);

            if (this._closeTimeout) {
              console.log('[GEP] termination canceled due to new session, clearing timeout: _closeTimeout');
              clearTimeout(this._closeTimeout);
            }

            if (_shutdownTimer) {
              console.log('[GEP] termination canceled due to new session, clearing timeout: _shutdownTimer');
              clearTimeout(_shutdownTimer);
            }

            this.onGameStart(gameId, res.gameInfo);
          }
        }

        if (isRunning && !this._hasRenderer && !waitingForeRenderer) {
          console.log(
            '[GEP] game info with renderer detected trigger onDetectedRenderer',
            res.gameInfo.detectedRenderer
          );
          this.onDetectedRenderer(res.info);
        }
      },

      onDetectedRenderer: function (info = {}) {
        if (this._hasRenderer) {
          return;
        }

        if (!info.detectedRenderer || info.detectedRenderer === undefined) {
          console.log(`[GEP] detected undefined renderer, keep waiting`);
          return;
        }

        console.log(`[GEP] detected renderer: ${info.detectedRenderer}`);
        this._hasRenderer = true;
        clearTimeout(this._detectedRendererTimeout);
        overwolf.games.onGameRendererDetected
          .removeListener(this.onDetectedRenderer.bind(this));
        overwolf.games.getRunningGameInfo(this.handleCurrentRunningGame.bind(this));
      },

      onGameStart: function onGameStart(gameId, gameInfo) {
        if (this._gameStarted && _currentGameServiceAlreadyLoaded(gameId)) {
          console.log(
            `[GEP] called onGameStart() twice, for the same game(${gameId}) ignoring...`
            );
          return;
        }

        clearTimeout(this._closeTimeout);
        _closeOldSessionAndStartDelayed(this, gameId, gameInfo)
      },

      onGameEnd: function onGameEnd(gameId, close = true) {
        if (close && !curGameService) {
          console.log('[GEP] terminating game events provider - game ended before game service was set');
          performUpdateAndClose();
          return;
        }

        this._hasRenderer = false;
        this._gameStarted = false;
        clearTimeout(this._closeTimeout);

        if (curGameService && typeof curGameService.shutdown === 'function') {
          if (typeof curGameService.getNumOfEvents === 'function') {
            if (curGameService.getNumOfEvents() <= 0) {
              _monitoring.sendTrack(
                _monitoring.TRACKING_KINDS.SESSION_WITH_NO_EVENTS,
                gameId);
            }
          }

          curGameService.shutdown();
        }
        curGameService = null;

        MonitoringStatics.flush();
        if (!close) {
          return;
        }

        _shutdownTimer = setTimeout(function () {
          console.log('[GEP] terminating game events provider after session end');
          performUpdateAndClose();
        }, SHUTDOWN_DELAY); 
      },

      safeSendException: function safeSendException() {
        function sendException() {
          console.log('[GEP] sending exception for ' + _gepVersion);
          _monitoring.sendTrack(_monitoring.TRACKING_KINDS.EXCEPTION,
            _gepVersion);
        }
        try {
          if (_gepVersion) {
            sendException();
          }
          else {
            overwolf.extensions.current.getManifest(function (manifest) {
              _gepVersion = manifest.meta.version;
              sendException();
            });
          }

        } catch (e) {
        }
      },
    };

    async function _isGameEventsDisabled(gameId) {
      let gameEventsStatus = null;
      try {
        gameEventsStatus = await _fetchGameEventsStatus(gameId);
        for (let gameStatus of gameEventsStatus) {
          if (gameStatus.game_id !== gameId) {
            continue;
          }

          let disabled = gameStatus.disabled;
          if (disabled) {
            console.log("[GEP] GEPPlugin was remotely disabled for this game");
          }

          const min_gep_version = gameStatus.min_gep_version;
          const current_version = _gepVersion || window.__appVersion__;
          if (!disabled && min_gep_version && current_version) {
            if (VersionComparer.compare(current_version, min_gep_version) < 0) {
              disabled = true;
              console.log(
                '[GEP] GEPPlugin disabled for this game (min version)',
                min_gep_version
              );
            }
          }


          if (disabled) {
            let extra = gameId + "." + _gepVersion.replace(/\./g, "_");
            _monitoring.sendTrack(
              _monitoring.TRACKING_KINDS.REMOTE_CONFIG_DISABLED,
              JSON.stringify(extra)
            );
            return { isDisabled: true, gamesStatus: gameEventsStatus };
          }
        }
      } catch (error) {
        console.error(`fail to use fetched events status`,
          gameEventsStatus,
          error);
      }

      return { isDisabled: false, gamesStatus: gameEventsStatus };
    }

    function _fetchGameEventsStatus(currGameId) {
      return new Promise((resolve, reject) => {

        let lastValue = localStorage[GEP_STATUS_LOCALSTORAGE];
        fetch(GEP_STATUS_JSON_URL)
          .then(function (response) {
            return response.json();

          })
          .then(function (myJson) {
            console.log(`[GEP] got GEP status json`);
            localStorage[GEP_STATUS_LOCALSTORAGE] = JSON.stringify(myJson);
            resolve(myJson);
          })
          .catch(function (error) {
            let extra = currGameId + "." + _gepVersion.replace(/\./g, "_");
            console.log(`[GEP] Failed to get GEP status from server. ${error}`);
            if (lastValue && JSON.parse(lastValue) != null) {
              console.log(`[GEP] Using last saved status`);
              _monitoring.sendTrack(_monitoring.TRACKING_KINDS.REMOTE_CONFIG_ERROR_LAST_VALUE, JSON.stringify(extra));
              resolve(JSON.parse(lastValue));
            }
            else {
              console.log(`[GEP] No last value, using default status`);
              _monitoring.sendTrack(_monitoring.TRACKING_KINDS.REMOTE_CONFIG_ERROR, JSON.stringify(extra));
              resolve(DEFAULT_GAME_EVENTS);
            }
          });
      });
    }

    async function _startCurrentGameService(gameId, gameInfo, isDisabled, gamesStatus, _gepVersion) {
       await curGameService.start(gameInfo, isDisabled, gamesStatus, _gepVersion)
        .catch(
          () => {
            let extra = gameId + "." + _gepVersion.replace(/\./g, "_");
            _monitoring.sendTrack(
              _monitoring.TRACKING_KINDS.GEP_FAILED_TO_LOAD_GAME_SERVICE, extra);
          }
        );
    }

    function _currentGameServiceAlreadyLoaded (gameId) {
      if (!window.___gameid___) {
        return false;
      }

      return window.___gameid___ === gameId;
    }

    function _closeOldSessionAndStartDelayed(self, gameId, gameInfo) {
      if (self._restartTimeout) {
        console.log('Already waiting for Gep Restart')
        return;
      }

      self.onGameEnd(window.___gameid___, false);

      if (window.___gameid___ && gameId) {
        _monitoring.sendTrack(
          _monitoring.TRACKING_KINDS.SECOND_GAME_LAUNCHED,
          `${window.___gameid___}_${gameId}`);
      }

      self._restartTimeout = setTimeout(()=>{
        self._gameStarted = true;
        self._gameId = gameId;


        if (_shutdownTimer) {
          console.log('[GEP] termination canceled due to new session');
          clearTimeout(_shutdownTimer);
        }

        _isGameEventsDisabled(gameId).then(function ({ isDisabled, gamesStatus }) {
          window.___gameid___ = gameId;
          require([SupportedGames[gameId].main], function (gameService) {
            curGameService = gameService;

            if (typeof curGameService.start === 'function') {
              _startCurrentGameService(gameId, gameInfo, isDisabled, gamesStatus, _gepVersion);
            }
            else {
              console.log("[GEP] Game Service for game " + gameId + " does not contain a start function");
            }
          }, function (err) {
            console.warn(`[GEP] failed to load game ${gameId} [${err.message}]: service script ${JSON.stringify(err)}`);
            let extra = gameId + "." + _gepVersion.replace(/\./g, "_");
            _monitoring.sendTrack(
              _monitoring.TRACKING_KINDS.GEP_FAILED_TO_LOAD_GAME_SERVICE, extra);
          })
        })

      self._restartTimeout = null;
      }, RESTART_DELAY);
    }

    async function performUpdateAndClose() {
      return new Promise((res) => {
        overwolf.extensions.updateExtension((info) => {
          console.log(`Update info:`, JSON.stringify(info));
          window.close()
          res()
        })
      })

          }

    window.OWGEP = new OWGEP();

    return window.OWGEP;
  });
