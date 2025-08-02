define([
  '/games/lol/spectator_detection.js',
  '/games/lol/supported_features.js'
],function (_spectatorDetection,
            SupportedFeatures) {

  function extractMatchId(gameInfo, infoDB, monitoring) {
    if (_spectatorDetection.inSpectatorMode(gameInfo)) {
      infoDB.set(SupportedFeatures.matchState.name,
        SupportedFeatures.matchState.info.matchId.category,
        SupportedFeatures.matchState.info.matchId.key,
        "n/a");
      return false;
    }

    if (!gameInfo.commandLine) {
      console.error('[MATCH ID PARSER] no command line');
      infoDB.set(SupportedFeatures.matchState.name,
        SupportedFeatures.matchState.info.matchId.category,
        SupportedFeatures.matchState.info.matchId.key,
        "n/a");
      monitoring.sendTrack(monitoring.TRACKING_KINDS.ERROR_EXTRACTING_MATCH_ID);
      return false;
    }

    if (_getMatchId(gameInfo, infoDB)) {
      return true;
    }

    monitoring.sendTrack(monitoring.TRACKING_KINDS.ERROR_EXTRACTING_MATCH_ID);
    return false;
  }

  function _getMatchId(gameInfo, infoDB) {
    let regEx = /GameID=(\d+)/gmi;
    let match = regEx.exec(gameInfo.commandLine);

    if (!match || (match.length !== 2)) {
      return false;
    }

    let matchId = parseInt(match[1]);
    if (isNaN(matchId)) {
      console.error('[MATCH ID PARSER] could not parse match id');
      infoDB.set(SupportedFeatures.matchState.name,
        SupportedFeatures.matchState.info.matchId.category,
        SupportedFeatures.matchState.info.matchId.key,
        "n/a");
      return false;
    }

    infoDB.set(SupportedFeatures.matchState.name,
      SupportedFeatures.matchState.info.matchId.category,
      SupportedFeatures.matchState.info.matchId.key,
      String(matchId)); 

    return true;
  }

  return {
    extractMatchId
  }
});
