"use strict";

define([
    "/games/pubg/supported_features.js"
  ],
  function (SupportedFeatures) {
    let _infoDB;
    let _teamMembers = [];


    function initialize(infoDB) {
      _infoDB = infoDB;
    }

    function process(info, ignoreEvents) {
      if (info.key === 'team_members') {
        _handleTeamMembers(info, ignoreEvents);
        return true;
      }

      if (info.key.startsWith('roster_')) {
        _handleRoster(info, ignoreEvents);
        return true;
      }

    }

    function _handleTeamMembers(info, ignoreEvents) {
      let value = info.value;
      if (value === '') {
        _teamMembers = [];
      } else {
        try {
          value = JSON.parse(value);
          for (let member of value.team_members) {
            let foundMember = _teamMembers.find((element) => {
              return (element.player === member.player);
            });

            if (!foundMember) {
              console.log(`[ROSTER] player joined our team ${JSON.stringify(member)}`);
              member.index = parseInt(member.index);
              _teamMembers.push(member);
            }
          }
        } catch(e) {
          console.log("[ROSTER] failed to parse team nicknames");
        }
      }

      if (!ignoreEvents) {
        _updateInfoTeamMembers();
      }
    }

    function _updateInfoTeamMembers() { 
      _infoDB.set(
        SupportedFeatures.team.name,
        SupportedFeatures.team.info.team_index.category,
        SupportedFeatures.team.info.team_index.key,
        JSON.stringify(_teamMembers));

      const nicknames = _teamMembers.map(teamMember => teamMember.player);
      let infoUpdateData = {team_members: nicknames};
      _infoDB.set(SupportedFeatures.team.name,
        SupportedFeatures.team.info.nicknames.category,
        SupportedFeatures.team.info.nicknames.key,
        JSON.stringify(infoUpdateData));
    }

    function _handleRoster(info, ignoreEvents) {
      let value;
      try {
        value = JSON.parse(info.value);

        if (value.player) {
          let rank = value.ranking;

          value.out = (rank !== "-1");

          delete value.team;
          delete value.ranking;
          delete value.killed_by;
        }
      } catch(e) {
        console.log("[ROSTER] failed to parse player in roster");
      }

      if (!ignoreEvents) {
        let key = info.key;
        _infoDB.set(SupportedFeatures.roster.name,
          SupportedFeatures.roster.info.roster.category,
          key,
          JSON.stringify(value));
      }
    }

    return {
      initialize: initialize,
      process: process
    }
  });
