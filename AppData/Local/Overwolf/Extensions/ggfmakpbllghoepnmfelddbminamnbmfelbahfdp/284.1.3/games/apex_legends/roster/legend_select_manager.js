"use strict";

define([
  "/games/apex_legends/supported_features.js",
  '/utils/base_utils.js',
],
  function (SupportedFeatures, BaseUtils) {

    class LegendSelectManager {
      constructor(config) {
        this._infoDB = config.infoDB;
        this._maxIndex = 0;

        this.process = this.process.bind(this);
        this.clear = this.clear.bind(this);
      }

      process(info) {
        if (info.key !== "hud_legend_select") {
          return false;
        }

        const data = JSON.parse(info.value);
        const index = parseInt(data.selectionOrder);
        this._maxIndex = Math.max(this._maxIndex, index);
        this._report(index, info.value);
        return true;
      }

      clear() {
        for (let index = 0; index <= this._maxIndex; index++) {
          this._infoDB.set(
            SupportedFeatures.team.name,
            SupportedFeatures.team.info.legendSelect.category,
            SupportedFeatures.team.info.legendSelect.key + index,
            null
          );
        }

        this._maxIndex = 0;
      }

      _report(index, data) {
        if (!data) {
          return;
        }

        let value = JSON.parse(data);
        value.is_local = false;
        if (value.playerName) {
          value.playerName = BaseUtils.b64DecodeUnicode(value.playerName);
        }

        let local_player = JSON.parse(this._infoDB.get("game_info", "player"));
        let tmpPlayerName = value.playerName.replace(/\[.*?\]/g, "");
        value.playerName = value.playerName.trimStart();
        tmpPlayerName = tmpPlayerName.trimStart();
        const res1 = this.checkSimilarity (tmpPlayerName.replace(/\[.*?\]/g, ""),local_player.in_game_player_name.replace(/\[.*?\]/g, ""));
        const res2 = this.checkSimilarity (tmpPlayerName.replace(/\[.*?\]/g, ""),local_player.player_name.replace(/\[.*?\]/g, ""));
        if (res1 >= 0.80 || res2 >= 0.80) {
          value.is_local = true;
        }

        data = JSON.stringify(value);

        this._infoDB.set(
          SupportedFeatures.team.name,
          SupportedFeatures.team.info.legendSelect.category,
          SupportedFeatures.team.info.legendSelect.key + index,
          data
        );
      }

      checkSimilarity(str1, str2) {
        const set1 = new Set(str1.split(''));
        const set2 = new Set(str2.split(''));

        const intersection = new Set([...set1].filter(char => set2.has(char)));

        return intersection.size / (set1.size + set2.size - intersection.size);
      }
    }

    return LegendSelectManager;
  });
