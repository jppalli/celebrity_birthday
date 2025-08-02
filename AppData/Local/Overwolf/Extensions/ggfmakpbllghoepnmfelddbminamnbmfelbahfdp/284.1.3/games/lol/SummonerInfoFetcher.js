define([
  '/games/lol/SummonerIdParser.js',
  '/games/lol/supported_features.js',
  "/games/lol/plugin.js"

], function (_summonerIdParser,
  SUPPORTED_FEATURES,
  _lolPlugin) {
  const SUMMONER_INFO_FETCHER_INTERVAL_MS = 2000;
  const SUMMONER_INFO_FETCHER_MAX_RETRIES = 20;
  const LOL_CEF_CLIENT_LOG_LISTENER_ID = 'LOL_CEF_CLIENT_LOG_LISTENER_ID';
  const SUMMONER_MATCH_INFO_REGEX = /participant (\d+).*?level "(\d+)".*?tier "(.*?)".*?division "(.*?)".*?queue "(.*?)"/;

  let _infoDB = null;
  let _monitoring = null;
  let _gameInfo = null;
  let _timerId = null;
  let _cefSummonerNameTimer = null;
  let _retries = 0;
  let _clientSettingsParsingRetries = 0;
  let _clientLogsParsingRetries = 0;
  let _fileListenerRetries = 0;
  let _gameRoot;
  let _isGarena;
  let _ioPlugin;

  let _summonerId;

  async function start(gameInfo, infoDB, ioPlugin, monitoring) {
    stop();

    if (gameInfo == null) {
      console.error("[SUMMONER INFO FETCHER] passed null gameInfo");
      return false;
    }

    console.log('[SUMMONER INFO FETCHER] starting summoner info fetcher.');

    _infoDB = infoDB;
    _gameInfo = gameInfo;
    _gameRoot = _getGameRoot(gameInfo);
    _monitoring = monitoring;

    _retries = 0;
    _clientSettingsParsingRetries = 0;
    _clientLogsParsingRetries = 0;
    _fileListenerRetries = 0;
    _ioPlugin = ioPlugin;

    _isGarena = await _isGarenaClient();
    _timerId = setTimeout(_getSummonerInfo, 1);
    return true;
  }

  function stop() {
    clearTimeout(_timerId);
    clearTimeout(_cefSummonerNameTimer);

    if (_ioPlugin) {
      _ioPlugin.stopFileListen(LOL_CEF_CLIENT_LOG_LISTENER_ID);
      _ioPlugin.onFileListenerChanged.removeListener(_clientLogFileListener);
    }
  }

  function _getGameRoot(gameInfo) {
    let gameRoot;
    let gamePath = gameInfo.executionPath;
    let pathIndex = gamePath.indexOf("RADS") - 1;

    if (pathIndex < 0) {
      pathIndex = gamePath.lastIndexOf("/");
    }

    gameRoot = gamePath.substring(0, pathIndex);

    pathIndex = gameRoot.lastIndexOf("/Game");
    if (pathIndex >= 0 &&
      (gameRoot.endsWith("/Game/") || gameRoot.endsWith("/Game"))) {
      gameRoot = gameRoot.substring(0, pathIndex);
    }

    return gameRoot;
  }

  function _isGarenaClient() {
    return new Promise((resolve, reject) => {
      _ioPlugin.isDirectory(`${_gameRoot}/LeagueClient`, resolve);
    })
  }

  function _getSummonerInfo() {
    _summonerIdParser.extractSummonerId(_gameInfo, _infoDB, _monitoring);

    _summonerId = _infoDB.get(
      SUPPORTED_FEATURES.summoner_info.info.id.category,
      SUPPORTED_FEATURES.summoner_info.info.id.key);
    _summonerId = String(_summonerId);

    _getSummonerInfoFromSettingsFile().then(() => { });
    _getSummonerInfoFromClientLogs().then(() => { });
  }

  async function _getSummonerInfoFromClientLogs() {
    try {
      await _parseClientLogs();
    } catch (e) {
      console.error(`[SUMMONER INFO FETCHER] failed to get summoner name: ${e.message}`);
      setTimeout(_getSummonerInfoFromClientLogs, SUMMONER_INFO_FETCHER_INTERVAL_MS);
    }
  }

  async function _parseClientLogs() {
    _clientLogsParsingRetries++;
    if (_clientLogsParsingRetries >= SUMMONER_INFO_FETCHER_MAX_RETRIES) {
      console.error('[SUMMONER INFO FETCHER] summoner name reached max retries!');
      stop();
      return;
    }

    let lolClientLogFile = await _getLatestLoLClientLogFile();
    await _listenOnCefClientLog(lolClientLogFile);
  }

  function _getLatestLoLClientLogFile() {
    return new Promise((resolve, reject) => {
      if (!_ioPlugin) {
        return reject(new Error('no io plugin'));
      }

      let logsPath = `${_gameRoot}${_isGarena ? '/Game' : ''}/Logs/LeagueClient Logs`;
      let filePattern = `${logsPath}/*_LeagueClient.log`;

      _ioPlugin.getLatestFileInDirectory(filePattern, (status, logFileName) => {
        if (!status || !logFileName.endsWith(".log")) {
          return reject(new Error(`couldn't find log file`));
        }

        let fullLogPath = `${logsPath}/${logFileName}`;
        resolve(fullLogPath);
      });
    });
  }

  function _listenOnCefClientLog(fullLogPath) {
    return new Promise((resolve, reject) => {
      if (!_ioPlugin) {
        return reject(new Error('no io plugin'));
      }

      console.log(`starting to listen on ${fullLogPath}`);
      let skipToEnd = false;
      _ioPlugin.onFileListenerChanged.removeListener(_clientLogFileListener);
      _ioPlugin.onFileListenerChanged.addListener(_clientLogFileListener);
      _ioPlugin.listenOnFile(LOL_CEF_CLIENT_LOG_LISTENER_ID,
        fullLogPath,
        skipToEnd,
        function (id, status, data) {
          if (!status) {
            return reject(new Error(`failed to stream ${id} (${data})`));
          }

          console.log(`now streaming ${id}`);
          resolve();
        });
    });
  }

  function _clientLogFileListener(id, status, line) {
    if (id !== LOL_CEF_CLIENT_LOG_LISTENER_ID) {
      return;
    }

    if (!status) {
      console.error(`received an error on file: ${id}: ${line}`);
      return;
    }

    _parseRegalia(line);
  }


  function _parseRegalia(line) {
    if (!line.includes('lol-regalia|') || !line.includes(_summonerId)) {
      return;
    }

    const match = line.match(SUMMONER_MATCH_INFO_REGEX);

    if (match) {
      const participant = match[1];
      const summonerLevel = match[2] || "n/a";
      const summonerTier = match[3] || "n/a";
      const summonerDivision = match[4] || "n/a";
      const summonerQueue = match[5] || "n/a";

      if (participant === _summonerId) {
        _infoDB.set(SUPPORTED_FEATURES.summoner_info.name,
          SUPPORTED_FEATURES.summoner_info.info.level.category,
          SUPPORTED_FEATURES.summoner_info.info.level.key,
          summonerLevel);

        _infoDB.set(SUPPORTED_FEATURES.summoner_info.name,
          SUPPORTED_FEATURES.summoner_info.info.tier.category,
          SUPPORTED_FEATURES.summoner_info.info.tier.key,
          summonerTier);

        _infoDB.set(SUPPORTED_FEATURES.summoner_info.name,
          SUPPORTED_FEATURES.summoner_info.info.division.category,
          SUPPORTED_FEATURES.summoner_info.info.division.key,
          summonerDivision);

        _infoDB.set(SUPPORTED_FEATURES.summoner_info.name,
          SUPPORTED_FEATURES.summoner_info.info.queue.category,
          SUPPORTED_FEATURES.summoner_info.info.queue.key,
          summonerQueue);
      }
    }
  }

  async function _getSummonerInfoFromSettingsFile() {
    try {
      await _parseLoLClientSettingsFile();
    } catch (e) {
      console.error(`[SUMMONER INFO FETCHER] failed to parse LoL client settings: ${e.message}`);
      setTimeout(_getSummonerInfoFromSettingsFile, SUMMONER_INFO_FETCHER_INTERVAL_MS);
    }
  }

  async function _parseLoLClientSettingsFile() {
    _clientSettingsParsingRetries++;
    if (_clientSettingsParsingRetries >= SUMMONER_INFO_FETCHER_MAX_RETRIES) {
      console.error('[SUMMONER INFO FETCHER] parse LoL client settings reached max retries!');
      stop();
      return;
    }

    let fileContent = await _readLolClientSettingsFile();
    let region = _extractRegionFromFile(fileContent);
    if (region === 'PBE') {
      _lolPlugin.setPBEGameMode();
    }

    let accountId = _extractAccountIdFromFile(fileContent);

    _infoDB.set("summoner_info", "summoner_info", "region", region);
    _infoDB.set("summoner_info", "summoner_info", "accountId", accountId);
  }

  function _readLolClientSettingsFile() {
    return new Promise((resolve, reject) => {
      if (!_ioPlugin) {
        return reject(new Error('no IO plugin'));
      }

      let filename = `${_gameRoot}${_isGarena ? '/LeagueClient' : ''}/Config/LeagueClientSettings.yaml`;
      _ioPlugin.getTextFile(filename, false, function (status, data) {
        if (!status) {
          return reject(new Error(`failed to read ${filename}`));
        }

        resolve(data);
      });
    });
  }

  function _extractRegionFromFile(fileContent) {
    let regEx = /region:\s*"(.*)"/gmi;
    let match = regEx.exec(fileContent);

    if (!match || (match.length !== 2)) {
      console.error('did not find region in settings file');
      return null;
    }

    return match[1].toUpperCase();
  }

  function _extractAccountIdFromFile(fileContent) {
    let regEx = /accountId:\s*(\d+)/gmi;
    let match = regEx.exec(fileContent);

    if (!match || (match.length !== 2)) {
      console.error('did not find account id in settings file');
      return null;
    }

    return match[1];
  }


  return {
    start: start,
    stop: stop
  }
});