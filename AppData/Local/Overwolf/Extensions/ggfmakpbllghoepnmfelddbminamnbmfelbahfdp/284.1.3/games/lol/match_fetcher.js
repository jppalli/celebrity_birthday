define([
  "/games/lol/plugin.js",
  "/games/lol/supported_features.js",
  "/games/lol/match_id_parser.js",
  "/utils/wait_for_stable_fps.js",
  "/utils/io_plugin.js"
], function (
  _lolPlugin,
  SUPPORTED_FEATURES,
  _matchIdParser,
  _waitForStableFPS,
  IOPlugin
) {
  const Constants = {
    LOL_PLUGIN_FALLBACK_TIMEOUT_IN_MS: 1000
  };

  const FETCHER_INTERVAL_MS = 200;
  const FETCHER_MAX_RETRIES = 20;
  const FETCHER_FILE_LISTENER_ID = "fetcherFile";
  const PROCESS_NAME = "League of Legends";

  let _started = false;

  let _gameInfo = null;
  let _infoDB = null;
  let _featuresHandler = null;
  let _timerId = null;

  let _retries = 0;

  let _spectatorMode = false;
  let _teams = [];
  let _tftPlayers = {};
  let _heroesFound = 0;
  let _fileClosing = false;
  let _listeningOnFile = false;
  let _registerListeningOnFile = false;
  let _ioPlugin;
  let _monitoring;
  let _isDisabled;
  let _gameMode;
  let _tagline = [];

  function start(
    gameInfo,
    infoDB,
    featuresHandler,
    ioPlugin,
    monitoring,
    isDisabled,
    gameMode
  ) {
    _monitoring = monitoring;
    _isDisabled = isDisabled;
    let force = true;
    console.log("[MATCH FETCHER] starting");

    stop(force);

    if (gameInfo == null) {
      console.error("[MATCH FETCHER] received null gameInfo");
      return false;
    }

    if (infoDB == null) {
      console.log("[MATCH FETCHER]  received null infoDB");
      return false;
    }

    _started = true;

    _gameInfo = gameInfo;
    _infoDB = infoDB;
    _featuresHandler = featuresHandler;
    _retries = 0;
    _ioPlugin = ioPlugin;
    _gameMode = gameMode;
    _matchIdParser.extractMatchId(_gameInfo, _infoDB, _monitoring);

    _timerId = setTimeout(_getMatchInfo, 1);

    setTimeout(
      _lolPluginStartFallback,
      Constants.LOL_PLUGIN_FALLBACK_TIMEOUT_IN_MS
    );

    return true;
  }

  function stop(force) {
    _started = false;

    if (_timerId != null) {
      clearTimeout(_timerId);
      _timerId = null;
    }

    if (force) {
      _closeLogFile();
    } else {
      setTimeout(_closeLogFile, 1000);
    }

    if (_infoDB != null) {
      _infoDB.set(
        SUPPORTED_FEATURES.matchState.name,
        SUPPORTED_FEATURES.matchState.info.matchStarted.category,
        SUPPORTED_FEATURES.matchState.info.matchStarted.key,
        null
      );

      _infoDB.removeListener(_handleInfoDBUpdate);
    }
  }


  function _getMatchInfo() {
    _retries++;
    if (_retries >= FETCHER_MAX_RETRIES) {
      console.error("[MATCH FETCHER] reached max retries");
      stop();
      return;
    }

    _getOutputDebugString(function (status, reason, data) {
      if (status) {
        _tryParseChampionInfo(data);
      } else {
        console.error(
          "[MATCH FETCHER] Error listening on process debug output: " + data
        );
        console.log("[MATCH FETCHER] Retrying...");
        _timerId = setTimeout(_getMatchInfo, FETCHER_INTERVAL_MS);
      }
    });

    _getLatestLogFile(function (status, reason, latestFilename) {
      if (!status) {
        console.error(reason);
        _timerId = setTimeout(_getMatchInfo, FETCHER_INTERVAL_MS);
        return;
      }

      if (!_ioPlugin) {
        console.error("[MATCH FETCHER] no IO plugin");
        _timerId = setTimeout(_getMatchInfo, FETCHER_INTERVAL_MS);
        return;
      }

      _teams = [];
      _tagline = [];
      _tftPlayers = {};
      _heroesFound = 0;
      _fileClosing = false;
      _listeningOnFile = false;
      if (!_registerListeningOnFile) {
        _ioPlugin.onFileListenerChanged.addListener(_matchFetcherLogListener);
        _registerListeningOnFile = true;
      }

      _ioPlugin.listenOnFile(
        FETCHER_FILE_LISTENER_ID,
        latestFilename,
        false,
        function (id, status, error) {
          if (!status) {
            if (_fileClosing) {
              return;
            }

            console.log(
              "[MATCH FETCHER] Error listening on match log file: " +
              latestFilename
            );
            console.log("[MATCH FETCHER] Retrying...");
            _timerId = setTimeout(_getMatchInfo, FETCHER_INTERVAL_MS);
            return;
          } else {
            console.log("[MATCH FETCHER] Listen Started:", id);
          }
        }
      );
    });
  }

  async function _getLatestLogFile(callback) {
    let gameRoot;
    let isGarena;
    let gamePath = _gameInfo.executionPath;
    let pathIndex = gamePath.indexOf("RADS");

    if (pathIndex < 0) {
      pathIndex = gamePath.lastIndexOf("/") + 1;
    }

    gameRoot = gamePath.substring(0, pathIndex);

    pathIndex = gameRoot.lastIndexOf("/Game");
    if (
      pathIndex >= 0 &&
      (gameRoot.endsWith("/Game/") || gameRoot.endsWith("/Game"))
    ) {
      gameRoot = gameRoot.substring(0, pathIndex);
    }

    isGarena = await _isGarenaClient(gameRoot);

    if (gameRoot == null || gameRoot.length == 0) {
      return callback(
        false,
        "failed to get game root from: " + gamePath,
        null,
        null
      );
    }

    if (!_ioPlugin) {
      return callback(false, "no IO plugin", null);
    }

    let logsDir = `${gameRoot}${isGarena ? "/Game" : ""}/Logs/GameLogs`;
    _ioPlugin.isDirectory(logsDir, exist => {
      if (exist) {
        _getLatestGameLogsDirectory(logsDir)
          .then(latestDirName => {
            let logFile = `${logsDir}/${latestDirName}/${latestDirName}_r3dlog.txt`;
            setTimeout(function () {
              callback(true, null, logFile);
            }, 1);
          })
          .catch(() => {
            return callback(false, "can't find logs directory for game", null);
          });

        return;
      }

      _ioPlugin.getLatestFileInDirectory(
        gameRoot + "Logs/Game - R3d Logs/*_r3dlog.txt",
        function (status, filename) {
          if (!status) {
            return callback(
              false,
              "Couldn't find latest air client version - failed to list directory!",
              null
            );
          }

          console.log("[MATCH FETCHER] latest match file: " + filename);
          setTimeout(function () {
            callback(true, null, gameRoot + "Logs/Game - R3d Logs/" + filename);
          }, 1);
        }
      );
    });
  }

  function _isGarenaClient(_gameRoot) {
    return new Promise((resolve, reject) => {
      _ioPlugin.isDirectory(`${_gameRoot}/LeagueClient`, resolve);
    });
  }

  function _getLatestGameLogsDirectory(root) {
    return new Promise((resolve, reject) => {
      _ioPlugin.listDirectory(root, (success, result) => {
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

  function _getOutputDebugString(callback) {
    if (!_ioPlugin) {
      return callback(false, "no IO plugin", null);
    }

    _ioPlugin.onOutputDebugString.addListener(function (
      processId,
      processName,
      line
    ) {
      callback(true, null, line);
    });

    _ioPlugin.listenOnProcess(PROCESS_NAME, function (status, data) {
      if (status) {
        console.log(
          "[MATCH FETCHER] Started listening on process debug output: " +
          status +
          " " +
          JSON.stringify(data)
        );
      } else {
        callback(
          false,
          "Failed to start listening to process debug output",
          null
        );
      }
    });
  }

  function _matchFetcherLogListener(id, status, data) {
    if (id !== FETCHER_FILE_LISTENER_ID) {
      return;
    }

    _listeningOnFile = true;

    if (!status) {
      if (_fileClosing) {
        return;
      }

      console.log("[MATCH FETCHER] Error listening on match log file: " + data);
      console.log("[MATCH FETCHER] Retrying...");
      _timerId = setTimeout(_getMatchInfo, FETCHER_INTERVAL_MS);
      return;
    }

    if (!data) {
      return;
    }

    _tryParseMatchStart(data);
    _tryParseMatchEnd(data);
    _tryParseChampionInfo(data);
    _tryParseTFTPlayer(data);
    _tryParseMatchOutcome(data);
    _tryParseEndOfTeamsInfo(data);
    _tryParseTagLine(data);
    _trySpawnCompleteLine(data);
  }

  function _tryParseMatchStart(data) {
    if (_didMatchStart()) {
      return;
    }

    if (data.includes("ALWAYS| Start Main Loop") || data.includes("FLOW| Start Main Loop")) {
      console.log("[MATCH FETCHER] FOUND GAME LOOP - STARTING MATCH");
      _setMatchStarted();
      _lolPlugin.start(
        _gameInfo,
        _infoDB,
        _featuresHandler,
        _monitoring,
        _isDisabled
      );
    }
  }

  function _setMatchStarted() {
    if (_didMatchStart()) {
      return;
    }

    _featuresHandler.triggerEvent(
      SUPPORTED_FEATURES.match.name,
      SUPPORTED_FEATURES.match.events.matchStart.name,
      SUPPORTED_FEATURES.match.events.matchStart.data
    );

    _featuresHandler.triggerEvent(
      SUPPORTED_FEATURES.matchState.name,
      SUPPORTED_FEATURES.matchState.events.matchStart.name,
      SUPPORTED_FEATURES.matchState.events.matchStart.data
    );

    _infoDB.set(
      SUPPORTED_FEATURES.match.name,
      SUPPORTED_FEATURES.match.info.match_started.category,
      SUPPORTED_FEATURES.match.info.match_started.key,
      true
    );

    _infoDB.set(
      SUPPORTED_FEATURES.matchState.name,
      SUPPORTED_FEATURES.matchState.info.matchStarted.category,
      SUPPORTED_FEATURES.matchState.info.matchStarted.key,
      true
    );
  }

  function _tryParseMatchEnd(data) {
    if (data.includes("ALWAYS| Finished Main Loop")) {
      console.log("[MATCH FETCHER] END MATCH");

      _featuresHandler.triggerEvent(
        SUPPORTED_FEATURES.match.name,
        SUPPORTED_FEATURES.match.events.matchEnd.name,
        SUPPORTED_FEATURES.match.events.matchEnd.data
      );

      _featuresHandler.triggerEvent(
        SUPPORTED_FEATURES.matchState.name,
        SUPPORTED_FEATURES.matchState.events.matchEnd.name,
        SUPPORTED_FEATURES.matchState.events.matchEnd.data
      );

      _infoDB.set(
        SUPPORTED_FEATURES.match_info.name,
        SUPPORTED_FEATURES.match_info.info.pseudo_match_id.category,
        SUPPORTED_FEATURES.match_info.info.pseudo_match_id.key,
        null
      );
    }
  }

  function _tryParseTFTPlayer(data) {
    if (
      data.includes("CONNECTION READY") &&
      data.includes("TFTChampion") &&
      Object.keys(_tftPlayers).length == 8
    ) {
      console.log(
        "[MATCH FETCHER] Already found 8 players, probably a player reconnected"
      );
      return;
    }

    if (!data.includes("CONNECTION READY")) {
      return;
    }


    const regex = /CONNECTION READY \| Team[a-zA-Z]+\s+\d+\) '([^']+)'\s*(?:\([^()]*\))?\s*(\*\*LOCAL\*\*)? - Champion\(([^()]+)\)/;
    const matches = regex.exec(data);

    if (!matches) {
      return;
    }

    const summoner = matches[1];
    const isLocal = matches[3] === "**LOCAL**";
    const isTFT = matches[4] === "TFTChampion";

    if (!isTFT) {
      return;
    }

    if (
      !Object.keys(_tftPlayers).some(player => player.summoner === summoner)
    ) {
      const player = {
        localplayer: isLocal
      };
      _tftPlayers[summoner] = player;
    }
  }


  function _tryParseChampionInfo(data) {
    if (data.includes("CONNECTION READY") && _heroesFound == 10 && _gameMode != 'ARENA') {
      console.log(
        "[MATCH FETCHER] LOL - Already found 10 champions, probably had " +
        "disconnection"
      );
      return;
    }

    if (data.includes("CONNECTION READY") && _heroesFound == 16 && _gameMode == 'ARENA') {
      console.log(
        "[MATCH FETCHER] Arena - Already found 16 champions, probably had " +
        "disconnection"
      );
      return;
    }



    if (!data.includes("CONNECTION READY")) {
      return;
    }

    const regEx = /CONNECTION READY \| Team[a-zA-Z]+\s+\d+\) '([^']+)'(?: \([^()]*\))?(?: (\*\*LOCAL\*\*))? - Champion\(([^()]+)\) SkinID\((\d+)\) TeamBuilderRole\(([^()]*)\) PUUID\(([a-f0-9-]+)\) ConnectionState(?:\(([a-zA-Z]*)\))?/;
    const match = regEx.exec(data);

    if (null == match || match.length != 8) {
      return;
    }

    _tryParseMyChampion(match);

    let championName = match[3];
    if (championName.includes("Strawberry_")) {
      championName = championName.replace("Strawberry_", "");
    }
    let team = match[0];
    if (championName != "TFTChampion") {
      if (team.includes("TeamOrder")) {
        team = "Order";
      } else if (team.includes("TeamChaos")) {
        team = "Chaos";
      }
    } else {
      let teamOrderMatch = data.match(/TeamOrder (\d+)/);
      if (teamOrderMatch) {
        team = teamOrderMatch[1];
      }
    }
    let summoner = match[1].toLowerCase();
    let skinId = match[4];

    let playerExists = false;

    if (_gameMode != 'ARENA') {
      for (let playerConfig of _teams) {
        if (
          playerConfig.team === team &&
          playerConfig.champion === championName
        ) {
          console.log(
            "[MATCH FETCHER] Player already exists, skipping: " +
            JSON.stringify(playerConfig)
          );
          playerExists = true;
          break;
        }
      }
    } else {
      console.log("[MATCH FETCHER] [ARENA] allow multiple players");
    }

    if (!playerExists) {
      _teams.push({
        team: team,
        champion: championName,
        skinId: skinId,
        summoner: summoner
      });

      _heroesFound++;
      console.log(
        "[MATCH FETCHER] Found line for summoner: " +
        summoner +
        "(" +
        championName +
        ")"
      );
    }
  }

  function _tryParseTagLine(data) {

    if (!data.includes("gameNameAndTagline")) {
      return;
    }

    const regex = /v2 gameNameAndTagline (.+?) is in buddy list returned (true|false)/;

    const match = data.match(regex);

    if (match) {
      const result1 = match ? match[1] : null;

      const regex1 = /^(.+?)#(.+)$/;
      const parts = result1.match(regex1);
      if (parts) {
        const name = parts[1];

        const tagline = parts[2];

        const result = {
          playerName: name,
          tagline: tagline
        };

        _tagline.push(result);
      }
    }
  }

  function _trySpawnCompleteLine(data) {

    if (!data.includes("Spawning completed")) {
      return;
    }

    console.log("[MATCH FETCHER] Found tagline array:" + JSON.stringify(_tagline));

    _infoDB.set(
      SUPPORTED_FEATURES.match_info.name,
      SUPPORTED_FEATURES.match_info.info.players_tagline.category,
      SUPPORTED_FEATURES.match_info.info.players_tagline.key,
      JSON.stringify(_tagline)
    );
  }

  function _tryParseMyChampion(match) {
    let availableChampion = _infoDB.get("summoner_info", "champion");

    if (availableChampion) {
      return;
    }

    let summoner = match[1].toLowerCase();
    let champion = match[3];

    let isLocal = match[2];
    if (isLocal && isLocal === "**LOCAL**") {
      console.log(`[MATCH FETCHER] found local player`);
      updateChampionInfo(champion);
      return;
    }

    let curSummonerName = _infoDB.get("summoner_info", "name");

    console.log(
      "[MATCH FETCHER] tryParseMyChampion - curSummonerName = " +
      curSummonerName +
      " , summoner from log = " +
      summoner
    );

    if (curSummonerName) {
      if (curSummonerName === summoner) {
        console.log("[MATCH FETCHER] found champion: " + champion);
        updateChampionInfo(champion);
      }
      else {
        for (let playerConfig of _teams) {
          if (playerConfig.summoner === curSummonerName) {
            console.log("[MATCH FETCHER] found champion: " + champion);
            updateChampionInfo(champion);
            break;
          }
        }
      }
    }
  }

  function updateChampionInfo(champion) {
    if (champion.includes("Strawberry_")) {
      champion = champion.replace("Strawberry_", "");
    }
    _infoDB.set(
      SUPPORTED_FEATURES.summoner_info.name,
      SUPPORTED_FEATURES.summoner_info.info.champion.category,
      SUPPORTED_FEATURES.summoner_info.info.champion.key,
      champion
    );
  }

  function _tryParseMatchOutcome(data) {
    if (data.includes("EXITCODE_WIN")) {
      console.log("[MATCH FETCHER] FOUND MATCH WIN!");
      _updateInfo(
        SUPPORTED_FEATURES.matchState,
        SUPPORTED_FEATURES.matchState.info.matchOutcome,
        "win"
      );
      _updateInfo(
        SUPPORTED_FEATURES.match,
        SUPPORTED_FEATURES.match.info.match_outcome,
        "win"
      );
    } else if (data.includes("EXITCODE_LOSE")) {
      console.log("[MATCH FETCHER] FOUND MATCH LOSE!");
      _updateInfo(
        SUPPORTED_FEATURES.matchState,
        SUPPORTED_FEATURES.matchState.info.matchOutcome,
        "lose"
      );
      _updateInfo(
        SUPPORTED_FEATURES.match,
        SUPPORTED_FEATURES.match.info.match_outcome,
        "lose"
      );
    }
  }

  function _tryParseEndOfTeamsInfo(data) {
    if (_fileClosing) {
      return;
    }

    let availableTeams = _infoDB.get("game_info", "teams");
    if (availableTeams) {
      return;
    }
    if (data.includes("Server Connection Established") || _heroesFound >= 10) {
      let teamsString = JSON.stringify(_teams);
      let teamsStringEncoded = encodeURI(teamsString);
      _updateInfo(
        SUPPORTED_FEATURES.teams,
        SUPPORTED_FEATURES.teams.info.teams,
        teamsStringEncoded
      );
    }

    if (
      data.includes("Server Connection Established") ||
      Object.keys(_tftPlayers).length === 8
    ) {
      _updateInfo(
        SUPPORTED_FEATURES.roster,
        SUPPORTED_FEATURES.roster.info.player_status,
        JSON.stringify(_tftPlayers)
      );
    }
  }

  function _closeLogFile() {
    if (!_fileClosing && _listeningOnFile) {
      _fileClosing = true;
      console.log("Closing match fetcher file in 2 seconds...");

      setTimeout(function () {
        if (!_ioPlugin) {
          console.error("no IO plugin");
          _fileClosing = false;
          _listeningOnFile = false;
          return;
        }
        _ioPlugin.onFileListenerChanged.removeListener(
          _matchFetcherLogListener
        );
        _registerListeningOnFile = false;
        _ioPlugin.stopFileListen(FETCHER_FILE_LISTENER_ID);
        console.log("Match fetcher file closed.");
        _fileClosing = false;
        _listeningOnFile = false;
      }, 2000);
    }
  }

  function _updateInfo(feature, infoConfig, value) {
    _infoDB.set(feature.name, infoConfig.category, infoConfig.key, value);
  }

  function _didMatchStart() {
    let matchStarted = _infoDB.get(
      SUPPORTED_FEATURES.matchState.info.matchStarted.category,
      SUPPORTED_FEATURES.matchState.info.matchStarted.key
    );

    return matchStarted;
  }

  function _lolPluginStartFallback() {
    if (!_started) {
      return;
    }

    if (_didMatchStart()) {
      return;
    }

    _infoDB.removeListener(_handleInfoDBUpdate);
    _infoDB.addListener(_handleInfoDBUpdate);

    _setMatchStarted();
    _lolPlugin.start(
      _gameInfo,
      _infoDB,
      _featuresHandler,
      _monitoring,
      _isDisabled
    );
  }

  function _handleInfoDBUpdate(info) {
    if (info == null) {
      return;
    }

    if (_didMatchStart()) {
      _infoDB.removeListener(_handleInfoDBUpdate);
      return;
    }

    let category = info.category;
    let key = info.key;
    let val = info.value;

    if (
      category == SUPPORTED_FEATURES.gold.info.gold.category ||
      category == SUPPORTED_FEATURES.level.info.level.category
    ) {
      if (
        key == SUPPORTED_FEATURES.gold.info.gold.key ||
        key == SUPPORTED_FEATURES.level.info.level.key
      ) {
        _infoDB.removeListener(_handleInfoDBUpdate);
        console.log("FALLBACK: Got gold/level - match started...");
        _setMatchStarted();
      }
    }
  }

  return {
    start: start,
    stop: stop
  };
});
