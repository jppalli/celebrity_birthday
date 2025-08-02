define([
    '/games/lol/spectator_detection.js'
  ], function (_spectatorDetection) {

    var SUPPORTED_FEATURES = {
        summoner_info: {
            name: 'summoner_info',
            info: {
                id: {
                    category: 'summoner_info',
                    key: 'id'
                }
            }
        }
    };

    function extractSummonerId(gameInfo, infoDB, monitoring) {
      if (_spectatorDetection.inSpectatorMode(gameInfo)) {
        infoDB.set(SUPPORTED_FEATURES.summoner_info.name,
          SUPPORTED_FEATURES.summoner_info.info.id.category,
          SUPPORTED_FEATURES.summoner_info.info.id.key,
          "n/a");
        return false;
      }

      if (gameInfo.commandLine == null) {
        console.error('SummonerIdParser - null command line');
        infoDB.set(SUPPORTED_FEATURES.summoner_info.name,
          SUPPORTED_FEATURES.summoner_info.info.id.category,
          SUPPORTED_FEATURES.summoner_info.info.id.key,
          "n/a");
        monitoring.sendTrack(monitoring.TRACKING_KINDS.ERROR_EXTRACTING_SUMMONER_ID);
        return false;
      }

      if (_tryGetSummonerIdRegEx(gameInfo, infoDB)) {
        return true;
      }

      if (_tryGetSummonerId(gameInfo, infoDB)) {
        return true;
      }

      monitoring.sendTrack(
        monitoring.TRACKING_KINDS.ERROR_EXTRACTING_SUMMONER_ID);
      return false;
    }

    function _tryGetSummonerIdRegEx(gameInfo, infoDB) {
        var regEx = /^.*\d+\.\d+\.\d+\.\d+ \d+ .* (\d+).*$/gmi;
        var match = regEx.exec(gameInfo.commandLine);

        if ((match == null) || (match.length != 2)) {
            return false;
        }

        var summonerId = parseInt(match[1]);
        if (isNaN(summonerId)) {
            console.error('SummonerIdParser - could not parse id');
            infoDB.set(SUPPORTED_FEATURES.summoner_info.name, SUPPORTED_FEATURES.summoner_info.info.id.category, SUPPORTED_FEATURES.summoner_info.info.id.key, "n/a");
            return false;
        }

        console.log(
            "SummonerIdParser - summonerId = " + summonerId.toString());
        infoDB.set(SUPPORTED_FEATURES.summoner_info.name, SUPPORTED_FEATURES.summoner_info.info.id.category, SUPPORTED_FEATURES.summoner_info.info.id.key, summonerId);

        return true;
    }

    function _tryGetSummonerId(gameInfo, infoDB) {
        var end = gameInfo.commandLine.lastIndexOf("\"");
        if ((end == -1) || (end != (gameInfo.commandLine.length-1))) {
            return _tryGetSummonerIdBugFixPatch(gameInfo, infoDB);
        }

        var start = gameInfo.commandLine.lastIndexOf(" ");
        if ((start == -1) || (start+1 >= end)) {
            console.error('SummonerIdParser - could not parse id');
            infoDB.set(SUPPORTED_FEATURES.summoner_info.name, SUPPORTED_FEATURES.summoner_info.info.id.category, SUPPORTED_FEATURES.summoner_info.info.id.key, "n/a");
            return false;
        }

        var summonerId = parseInt(gameInfo.commandLine.substring(start+1,end));
        if (isNaN(summonerId)) {
            console.error('SummonerIdParser - could not parse id');
            infoDB.set(SUPPORTED_FEATURES.summoner_info.name, SUPPORTED_FEATURES.summoner_info.info.id.category, SUPPORTED_FEATURES.summoner_info.info.id.key, "n/a");
            return false;
        }

        console.log(
            "SummonerIdParser - summonerId = " + summonerId.toString());
        infoDB.set(SUPPORTED_FEATURES.summoner_info.name, SUPPORTED_FEATURES.summoner_info.info.id.category, SUPPORTED_FEATURES.summoner_info.info.id.key, summonerId);
        return true;
    }

    function _tryGetSummonerIdBugFixPatch(gameInfo, infoDB) {
        console.log("_tryGetSummonerIdBugFixPatch called with: ", JSON.stringify(gameInfo));

        var start = gameInfo.commandLine.lastIndexOf(" ");
        if (start == -1) {
            console.error('SummonerIdParser - could not parse id');
            infoDB.set(SUPPORTED_FEATURES.summoner_info.name, SUPPORTED_FEATURES.summoner_info.info.id.category, SUPPORTED_FEATURES.summoner_info.info.id.key, "n/a");
            return false;
        }

        var summonerId = parseInt(gameInfo.commandLine.substring(start+1));
        if (isNaN(summonerId)) {
            console.error('SummonerIdParser - could not parse id');
            infoDB.set(SUPPORTED_FEATURES.summoner_info.name, SUPPORTED_FEATURES.summoner_info.info.id.category, SUPPORTED_FEATURES.summoner_info.info.id.key, "n/a");
            return false;
        }

        console.log(
            "SummonerIdParser - summonerId = " + summonerId.toString());
        infoDB.set(SUPPORTED_FEATURES.summoner_info.name, SUPPORTED_FEATURES.summoner_info.info.id.category, SUPPORTED_FEATURES.summoner_info.info.id.key, "n/a");
        return true;
    }

	return {
        extractSummonerId: extractSummonerId
	}
});
