"use strict";

define([
    "/games/apex_legends/supported_features.js",
    '/utils/base_utils.js'
  ],
  function (SupportedFeatures, BaseUtils) {

    class TeamManager {
      constructor(config) {
        this._infoDB = config.infoDB;
        this._rosterIdxToTeamIdx = {};
        this._maxIndex = 0;

        this.process = this.process.bind(this);
        this.clearTeam = this.clearTeam.bind(this);
      }

      process(info) {
        if (info.key.startsWith("roster_")) {
          try {
            let key = info.key;
            let indexStr = key.replace("roster_", "");
            let index = parseInt(indexStr);
            let value = JSON.parse(info.value);

            if (value.teammate === "1") {
              const nextTeamIndex =
                Object.keys(this._rosterIdxToTeamIdx).length;
              let teamIndex = this._rosterIdxToTeamIdx[index];
              this._rosterIdxToTeamIdx[index] = Number.isInteger(teamIndex) ?
                teamIndex : nextTeamIndex;

              teamIndex = this._rosterIdxToTeamIdx[index];
              this._maxIndex = Math.max(this._maxIndex, teamIndex);

              const teammate = {
                name: BaseUtils.b64DecodeUnicode(value.player),
                state: value.state
              };

              if (teammate.state === "respawn" || teammate.state === "healed_from_ko") {
                teammate.state = "alive"
              }

              this._reportTeam(teamIndex, teammate);
            } else if (Number.isInteger(this._rosterIdxToTeamIdx[index])) {
              const teamIndex = this._rosterIdxToTeamIdx[index];
              delete this._rosterIdxToTeamIdx[index];
              this._reportTeam(teamIndex, null);
            }
          } catch (e) {
            console.log(`[Apex Team] failed to parse index from ${JSON.stringify(info)}`);
          }
        }
      }

      _reportTeam(index, teammate) {
        this._infoDB.set(
          SupportedFeatures.team.name,
          SupportedFeatures.team.info.teammate.category,
          SupportedFeatures.team.info.teammate.key + index,
          JSON.stringify(teammate)
        );
      }

      clearTeam() {
        for (let index = 0; index <= this._maxIndex; index++) {
          this._reportTeam(index, null);
        }
        this._rosterIdxToTeamIdx = {};
        this._maxIndex = 0;
      }
    }

    return TeamManager;
  });
