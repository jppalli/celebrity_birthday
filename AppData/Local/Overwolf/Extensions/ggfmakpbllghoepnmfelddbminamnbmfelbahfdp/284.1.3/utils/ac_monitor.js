define([
  "/games/lol/plugin.js",
  '/utils/ow-api.js',
  '/utils/base_utils.js'
], function (_lolPlugin, owAPI, BaseUtils) {
  const LOG_PREFIX = `[AC Monitor]`;
  const LOG_COLLECTION_PHASING = 1;
  const LOG_COLLECTION_RANDOMIZER = 0.1;
  const LOG_PBE = true;
  const LOG_REGULAR = true;
  const LAST_REPORTED = 'last_reported_ac'

  let _ioPlugin;
  let _started;
  let _lolVariant;

  function start(gameInfo, ioPlugin) {
    if (gameInfo == null) {
      console.error(`${LOG_PREFIX} received null gameInfo`);
      return false;
    }

    let path = gameInfo.executionPath;
    _lolVariant = path.includes("(PBE)") ? "PBE" : "Regular";

    _gameInfo = gameInfo;
    _ioPlugin = ioPlugin;
    _started = true;

    return true;
  }

  async function stop() {
    try {
      _started = false;

      if (!_ioPlugin) {
        return;
      }

      if ((_lolVariant === "PBE" && !LOG_PBE) ||
        (_lolVariant === "Regular" && !LOG_REGULAR)) {
        return;
      }

      _phasedPercent = await owAPI.getPhasedPercent();
      if ( _phasedPercent > LOG_COLLECTION_PHASING) {
        return;
      }

      const rand = Math.random();
      if (rand > LOG_COLLECTION_RANDOMIZER) {
        return;
      }

      const dateFromStorage = new Date(localStorage.getItem(LAST_REPORTED));
      const lastReportDate = new Date(dateFromStorage);
      if (!lastReportDate || !BaseUtils.isBeforeToday(lastReportDate)) {
        return;
      }

      const programFilesDir = _ioPlugin.PROGRAMFILES;
      const logsDir = `${programFilesDir}\\Riot Vanguard\\Logs`

      _ioPlugin.getLatestFileInDirectory(
        `${logsDir}\\vgk_*.log`,
        function (status, filename) {
          if (!status) {
            console.warn(`${LOG_PREFIX}, No Dir found: ${logsDir}`)
            return;
          }

          try {
            _ioPlugin.copyFile(
              `${logsDir}\\${filename}`,
              `${_ioPlugin.LOCALAPPDATA}\\OVERWOLF\\LOG\\Apps\\Overwolf General GameEvents Provider`,
              true,
              function (success, res) {
                if (success) {
                  _uploadClientLogs()
                }
              }
            )
          } catch (error) {
            console.error(error);
          }
        }
      );
    } catch (error) {}

  }

  function _uploadClientLogs() {
    let gameId = _gameInfo.classId ? _gameInfo.classId : "Undefiend";
    overwolf.utils.uploadClientLogs({
      filePrefix: gameId + '_ac_monitor_' + (_lolVariant || '')
    }, (e) => {
      if (!e.success) {
        console.error(`Error sending client logs ${JSON.stringify(e)}`);
      }
    });

    localStorage.setItem(
      LAST_REPORTED,
      new Date().toString()
    );
  }



  return {
    start: start,
    stop: stop,
  };
});
