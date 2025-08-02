'use strict';

define([
  '/games/rocket_league/playersInfoService.js',
  '/games/rocket_league/supported_features.js',
  '/libs/js-uuid.js',
  '/utils/base_utils.js'
],
  function (playersInfoService,
    SUPPORTED_FEATURES,
    uuid,
    BaseUtils) {

    let _lastPlayersList = null;
    let _leftPlayers = {};
    let _areTeamsBalanced = true;

    let _featuresHandlers, _infoDB;

    function handlePlayersList(value, featuresHandlers, infoDB) {

      if (!_featuresHandlers) {
        _featuresHandlers = featuresHandlers;
      }

      if (!_infoDB) {
        _infoDB = infoDB;
      }

      let diffList;
      let players;

      players = playersInfoService.parse(value);

      if (!players) {
        return;
      }

      diffList = playersInfoService.diff(players, _lastPlayersList);

      for (let diff of diffList) {
        switch (diff.type) {
          case playersInfoService.DIFF.NEW_LIST:
            _handleCaseNewList(players);
            break;
          case playersInfoService.DIFF.CLEAR_LIST:
            _handleCaseClearList(players);
            break;
          case playersInfoService.DIFF.PLAYER_LEFT:
            _handleCasePlayerLeft(players, diff);
            break;
          case playersInfoService.DIFF.PLAYER_JOINED:
            _handleCasePlayerJoined(players, diff);
            break;
          case playersInfoService.DIFF.CHANGE:
            _handleCaseStatsChange(players, diff);
            break;
        }
      }

      _lastPlayersList = players;
    }

    function _handleCaseNewList(players) {
      _leftPlayers = {};
      _areTeamsBalanced = true;

      let fullRoster = _updateRosterInfo(players);
      console.info('full roster: ', fullRoster);
      let eventData = {
        roster: fullRoster
      };
      _featuresHandlers.triggerEvent(SUPPORTED_FEATURES.roster.name,
        SUPPORTED_FEATURES.roster.events.rosterChange.name,
        eventData);
      _featuresHandlers.triggerEvent(SUPPORTED_FEATURES.match.name,
        SUPPORTED_FEATURES.match.events.matchStart.name,
        null);
      _infoDB.set(SUPPORTED_FEATURES.match.name,
        SUPPORTED_FEATURES.match.info.started.category,
        SUPPORTED_FEATURES.match.info.started.key,
        true);

      _infoDB.set(SUPPORTED_FEATURES.match_info.name,
        SUPPORTED_FEATURES.match_info.info.pseudo_match_id.category,
        SUPPORTED_FEATURES.match_info.info.pseudo_match_id.key,
        uuid.v4());
    }

    function _handleCaseClearList(players) {

      let fullRoster = _updateRosterInfo(players);
      console.info('full roster: ', fullRoster);

      _featuresHandlers.triggerEvent(SUPPORTED_FEATURES.match.name,
        SUPPORTED_FEATURES.match.events.matchEnd.name,
        null);

      _infoDB.set(SUPPORTED_FEATURES.match_info.name,
        SUPPORTED_FEATURES.match_info.info.game_arena.category,
        SUPPORTED_FEATURES.match_info.info.game_arena.key,
        null);

      _infoDB.set(SUPPORTED_FEATURES.match.name,
        SUPPORTED_FEATURES.match.info.ended.category,
        SUPPORTED_FEATURES.match.info.ended.key,
        true);

      _infoDB.set(SUPPORTED_FEATURES.match_info.name,
        SUPPORTED_FEATURES.match_info.info.pseudo_match_id.category,
        SUPPORTED_FEATURES.match_info.info.pseudo_match_id.key,
        null);

        _infoDB.set(SUPPORTED_FEATURES.roster.name,
        SUPPORTED_FEATURES.roster.info.players_boost.category,
        SUPPORTED_FEATURES.roster.info.players_boost.key,
        null);

      _clearRoster(_lastPlayersList);
    }

    function _handleCasePlayerLeft(players, diff) {
      let didReallyLeave = _handlePlayerLeft(diff.data);

      if (didReallyLeave) {
        let fullRoster = _updateRosterInfo(players);
        console.info('full roster: ', fullRoster);

        _featuresHandlers.triggerEvent(SUPPORTED_FEATURES.roster.name,
          SUPPORTED_FEATURES.roster.events.playerLeft.name,
          diff.data);

        let eventData = {
          roster: fullRoster
        };
        _featuresHandlers.triggerEvent(SUPPORTED_FEATURES.roster.name,
          SUPPORTED_FEATURES.roster.events.rosterChange.name,
          eventData);

        markReplaced();
      }
    }

    function _handleCasePlayerJoined(players, diff) {
      let didReallyJoin = _handlePlayerJoined(diff.data);

      if (didReallyJoin) {
        let fullRoster = _updateRosterInfo(players);
        console.info('full roster: ', fullRoster);
        diff.data.name = BaseUtils.b64DecodeUnicode(diff.data.name);

        _featuresHandlers.triggerEvent(SUPPORTED_FEATURES.roster.name,
          SUPPORTED_FEATURES.roster.events.playerJoined.name,
          diff.data);

        let eventData = {
          roster: fullRoster
        };
        _featuresHandlers.triggerEvent(SUPPORTED_FEATURES.roster.name,
          SUPPORTED_FEATURES.roster.events.rosterChange.name,
          eventData);
        markReplaced();
      }
    }

    function _updateRosterInfo(roster) {
      let fullRoster = [];
      let team1 = {
        players: [],
        team_score: null
      };
      let team2 = {
        players: [],
        team_score: null
      };
      let id, player;

      for (id in roster) {
        if (roster.hasOwnProperty(id)) {
          player = roster[id];
          player.name = BaseUtils.b64DecodeUnicode(player.name);
          if (player.team == 1) {
            team1.players.push('player' + player.index);
            if (team1.team_score === null) {
              team1.team_score = player.team_score || 0;
            }

          } else {
            team2.players.push('player' + player.index);
            if (team2.team_score === null) {
              team2.team_score = player.team_score || 0;
            }
          }
          _updatePlayerInfo(player, SUPPORTED_FEATURES.roster.name);
          fullRoster.push(player);
        }
      }

      _updateTeamsInfo(team1, team2);
      _areTeamsBalanced = (team1.length == team2.length);
      return fullRoster;
    }

    function _checkEventType(playerInfo) {
      const playerTeam = _infoDB.get('me', 'team');

      if (playerInfo.local === "1") {
        return ['goal', 'teamGoal'];
      }
      if (playerInfo.team === playerTeam) {
        return ['teamGoal'];
      }
      if (playerInfo.team !== playerTeam) {
        return ['opposingTeamGoal'];
      }

      return null;
    }

    function _handleCaseStatsChange(players, info) {
      let event = info.key;
      let playerInfo = info.data;
      playerInfo.name = BaseUtils.b64DecodeUnicode(playerInfo.name);

      _updatePlayerInfo(playerInfo, SUPPORTED_FEATURES.stats.name);

      switch (event) {
        case 'goals':
          _updateRosterInfo(players);

          const eventTypes = _checkEventType(playerInfo);
          const feature = SUPPORTED_FEATURES.stats;

          const events = eventTypes.map(type => feature.events[type]);

          if (!events) {
            return;
          }

          events.forEach(event => {
            _featuresHandlers.triggerEvent(
              feature.name,
              event.name,
              playerInfo
            )
          });

          break;
        case 'deaths':
          break;
        case 'score':
          _featuresHandlers.triggerEvent(SUPPORTED_FEATURES.stats.name,
            SUPPORTED_FEATURES.stats.events.score.name,
            playerInfo);
          break;
      }
    }

    function _handlePlayerLeft(data) {
      let id = data.steamId + ':' + data.name;
      if (_leftPlayers[id]) {
        return false;
      }

      _leftPlayers[id] = data;

      return true;
    }

    function _handlePlayerJoined(data) {
      let id = data.steamId + ':' + data.name;

      if (_leftPlayers[id] && !(_leftPlayers[id].wasReplaced)) {
        return false;
      }

      if (_leftPlayers[id]) {
        delete _leftPlayers[id];
      }

      return true;
    }

    function markReplaced() {
      let tempId;
      if (_areTeamsBalanced) {
        for (tempId in _leftPlayers) {
          if (_leftPlayers.hasOwnProperty(tempId)) {
            _leftPlayers[tempId].wasReplaced = true;
          }
        }
      }
    }

    function _clearRoster(roster) {
      let id, player;

      for (id in roster) {
        if (roster.hasOwnProperty(id)) {
          player = roster[id];
          _infoDB.set(SUPPORTED_FEATURES.roster.name,
            SUPPORTED_FEATURES.roster.info.player.category,
            SUPPORTED_FEATURES.roster.info.player.key + player.index,
            null);
        }
      }
    }

    function _updatePlayerInfo(playerData, feature) {
      let encodedData = JSON.stringify(playerData);
      encodedData = encodeURI(encodedData);

      _infoDB.set(feature,
        SUPPORTED_FEATURES.roster.info.player.category,
        SUPPORTED_FEATURES.roster.info.player.key + playerData.index,
        encodedData);

      if (playerData.local === "1") { 
        _infoDB.set(SUPPORTED_FEATURES.me.name,
          SUPPORTED_FEATURES.me.info.steamId.category,
          SUPPORTED_FEATURES.me.info.steamId.key,
          playerData.steamId);
        _infoDB.set(SUPPORTED_FEATURES.me.name,
          SUPPORTED_FEATURES.me.info.name.category,
          SUPPORTED_FEATURES.me.info.name.key,
          BaseUtils.b64DecodeUnicode(playerData.name));
        _infoDB.set(SUPPORTED_FEATURES.me.name,
          SUPPORTED_FEATURES.me.info.goals.category,
          SUPPORTED_FEATURES.me.info.goals.key,
          playerData.goals);
        _infoDB.set(SUPPORTED_FEATURES.me.name,
          SUPPORTED_FEATURES.me.info.score.category,
          SUPPORTED_FEATURES.me.info.score.key,
          playerData.score);
        _infoDB.set(SUPPORTED_FEATURES.me.name,
          SUPPORTED_FEATURES.me.info.team.category,
          SUPPORTED_FEATURES.me.info.team.key,
          playerData.team);
        _infoDB.set(SUPPORTED_FEATURES.me.name,
          SUPPORTED_FEATURES.me.info.team_score.category,
          SUPPORTED_FEATURES.me.info.team_score.key,
          playerData.team_score);

      }
    }

    function _updateTeamsInfo(team1, team2) {

      let team1Players = team1.players;
      let team1Score = team1.team_score;
      let team2Players = team2.players;
      let team2Score = team2.team_score;

      let encodedData = JSON.stringify(team1Players);
      encodedData = encodeURI(encodedData);

      _infoDB.set(SUPPORTED_FEATURES.roster.name,
        SUPPORTED_FEATURES.roster.info.team1.category,
        SUPPORTED_FEATURES.roster.info.team1.key,
        encodedData);

      _infoDB.set(SUPPORTED_FEATURES.roster.name,
        SUPPORTED_FEATURES.roster.info.team1Score.category,
        SUPPORTED_FEATURES.roster.info.team1Score.key,
        team1Score);

      encodedData = JSON.stringify(team2Players);
      encodedData = encodeURI(encodedData);

      _infoDB.set(SUPPORTED_FEATURES.roster.name,
        SUPPORTED_FEATURES.roster.info.team2.category,
        SUPPORTED_FEATURES.roster.info.team2.key,
        encodedData);

      _infoDB.set(SUPPORTED_FEATURES.roster.name,
        SUPPORTED_FEATURES.roster.info.team2Score.category,
        SUPPORTED_FEATURES.roster.info.team2Score.key,
        team2Score);
    }

    return {
      handlePlayersList: handlePlayersList
    }
  });