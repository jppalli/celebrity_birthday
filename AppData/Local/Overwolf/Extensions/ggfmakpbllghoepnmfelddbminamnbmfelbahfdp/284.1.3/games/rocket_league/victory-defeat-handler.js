'use strict';

define([
  "/games/rocket_league/supported_features.js"],
  function (SUPPORTED_FEATURES) {
    function handleInfo(info, featuresHandlers, infoDB) {
      if (info.key != "game_state") {
        return;
      }

      if (info.value != "PodiumSpotlight") {
        return;
      }

      let scores = _getScores(infoDB);
      if (scores == null) {
        return;
      }

      let isVictory = scores.myScore > scores.otherTeamScore;

      if (isVictory) {
        featuresHandlers.triggerEvent(
          SUPPORTED_FEATURES.match.name,
          SUPPORTED_FEATURES.match.events.victory.name,
          {
            team_score: scores.myScore
          });
      } else {
        featuresHandlers.triggerEvent(
          SUPPORTED_FEATURES.match.name,
          SUPPORTED_FEATURES.match.events.defeat.name,
          {
            team_score: scores.otherTeamScore
          });
      }
    }

    function _getScores(infoDB) {
      let myTeam = infoDB.get(SUPPORTED_FEATURES.me.info.team.category,
        SUPPORTED_FEATURES.me.info.team.key);

      let team1Score = infoDB.get(
        SUPPORTED_FEATURES.roster.info.team1Score.category,
        SUPPORTED_FEATURES.roster.info.team1Score.key);
      let team2Score = infoDB.get(
        SUPPORTED_FEATURES.roster.info.team2Score.category,
        SUPPORTED_FEATURES.roster.info.team2Score.key);

      let myScore, otherTeamScore;

      if (myTeam === "1") {
        myScore = parseInt(team1Score) || 0;
        otherTeamScore = parseInt(team2Score) || 0;
      } else {
        myScore = parseInt(team2Score) || 0;
        otherTeamScore = parseInt(team1Score) || 0;
      }

      console.log("[END GAME] my score: " + myScore);
      console.log("[END GAME] other team score: " + otherTeamScore);

      if (myScore === otherTeamScore) {
        let msg =
          "[END GAME] Draw detected - possible player leave, not sending event";
        console.log(msg);
        return null;
      }

      return {
        myScore: myScore,
        otherTeamScore: otherTeamScore
      };
    }

    return {
      handleInfo: handleInfo
    }
  });