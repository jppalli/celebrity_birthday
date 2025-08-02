"use strict";

define([
  "/games/apex_legends/supported_features.js",
  '/utils/base_utils.js'
],
  function (SupportedFeatures, BaseUtils) {

    class RosterManager {
      constructor(config) {
        this._infoDB = config.infoDB;
        this._inMatch = false;
        this._playerIndices = new Set();
        this._maxIndex = 0;

        this.process = this.process.bind(this);
        this.clearRoster = this.clearRoster.bind(this);
      }

      setInMatch() {
        this._inMatch = true;
      }

      setNotInMatch() {
        this._inMatch = false;
      }

      process(config, info) {
        if (info.key.startsWith("roster_")) {

          try {
            let key = info.key;
            let indexStr = key.replace("roster_", "");
            let index = parseInt(indexStr);
            let val = JSON.parse(info.value);
            if (val.player) {
              val.player = BaseUtils.b64DecodeUnicode(val.player);
            }

            this._maxIndex = Math.max(this._maxIndex, index);

            if (Object.keys(val).length !== 0) {
              const player = {
                name: val.player,
                isTeammate: val.teammate === "1",
                team_id: +val.team_id,
                platform_hw: +val.platform_hw,
                state: val.state,
	          		is_local: val.is_local,
                platform_id: val.platform_id,
                origin_id: val.origin_id,
              };

              if (player.state === "respawn" || player.state === "healed_from_ko") {
                player.state = "alive"
              }

              this._playerIndices.add(index);
              this._reportRoster(index, player);
            }
            else if (this._playerIndices.size > 10 || !this._inMatch) {
              this._playerIndices.delete(index);
              this._reportRoster(index, null);
            }

            return true;
          }
          catch (e) {
            console.log(`[Apex Roster] failed to parse index from ${JSON.stringify(info)}`);
          }
          return false;
        }
        else {
          return false;
        }
      }

      _reportRoster(index, player) {
        this._infoDB.set(
          SupportedFeatures.roster.name,
          SupportedFeatures.roster.info.roster.category,
          SupportedFeatures.roster.info.roster.key + index,
          JSON.stringify(player)
        );
      }

      clearRoster() {
        for (let index = 0; index <= this._maxIndex; index++) {
          this._reportRoster(index, null);
        }
        this._playerIndices = new Set();
        this._maxIndex = 0;
      }
    }

    return RosterManager;
  });
