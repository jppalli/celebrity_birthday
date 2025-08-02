'use strict';

define(function () {
  let DIFF = {
    NEW_LIST: 'NEW_LIST',
    CLEAR_LIST: 'CLEAR_LIST',
    PLAYER_LEFT: 'PLAYER_LEFT',
    PLAYER_JOINED: 'PLAYER_JOINED',
    CHANGE: "CHANGE"
  };

  function parse(playersList) {
    try {
      const escapeQuotesRegex = /(?<![{:, \\])"(?![}:, \\])/g;
      playersList = playersList.replace(escapeQuotesRegex, "\\\"");
      playersList = JSON.parse(playersList);
      playersList = playersList.players;
    } catch (e) {
      console.error('failed to parse value of players list for from plugin');
      return null;
    }

    const players = playersList.reduce((players, currPlayer, i) => {
      if (currPlayer.score) {
        currPlayer.score = parseInt(currPlayer.score);
      }

      if (currPlayer.team_score) {
        currPlayer.team_score = parseInt(currPlayer.team_score);
      }

      currPlayer.index = i;
      const playerId = currPlayer.steamId + ':' + currPlayer.name;
      players[playerId] = currPlayer;

      return players;
    }, {})

    return players;
  }

  function diff(players, oldPlayers) {
    let changes = [];
    let diff, id, playerInfo, oldPlayerInfo, prop;

    let ids = players ? Object.keys(players) : [];
    let oldIds = oldPlayers ? Object.keys(oldPlayers) : [];

    if ((ids.length === 0) && (oldIds.length > 0)) {
      diff = new Diff(DIFF.CLEAR_LIST, oldPlayers);
      changes.push(diff);
      return changes;
    }

    if ((ids.length > 0) && (oldIds.length === 0)) {
      diff = new Diff(DIFF.NEW_LIST, players);
      changes.push(diff);
      return changes;
    }

    for (id in players) {
      if (players.hasOwnProperty(id)) {
        playerInfo = players[id];
        oldPlayerInfo = oldPlayers[id];
      }

      if (oldPlayerInfo) {
        for (prop in playerInfo) {
          if (playerInfo.hasOwnProperty(prop)) {
            if (playerInfo[prop] !== oldPlayerInfo[prop]) {
              diff = new Diff(DIFF.CHANGE, playerInfo, prop);
              changes.push(diff);
            }
          }
        }
      } else {
        diff = new Diff(DIFF.PLAYER_JOINED, playerInfo);
        changes.push(diff);
      }
    }

    for (id in oldPlayers) {
      if (oldPlayers.hasOwnProperty(id)) {
        playerInfo = players[id];
        oldPlayerInfo = oldPlayers[id];
      }

      if (!playerInfo) {
        diff = new Diff(DIFF.PLAYER_LEFT, oldPlayerInfo);
        changes.push(diff);
      }
    }

    return changes;
  }

  function Diff(type, data, key) {
    this.type = type;
    this.data = data;
    this.key = key;
  }

  return {
    parse: parse,
    diff: diff,
    DIFF: DIFF
  };
});