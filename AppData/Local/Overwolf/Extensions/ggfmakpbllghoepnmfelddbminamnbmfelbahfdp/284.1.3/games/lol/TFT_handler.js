define(["/libs/js-uuid.js"], function (uuid) {
  class TFTHandler {

    constructor({
      infoDB,
      featuresHandler,
      pluginWhitelist,
      supportedFeatures
    }) {
      this._infoDB = infoDB;
      this._featuresHandler = featuresHandler;
      this._pluginWhitelist = pluginWhitelist;
      this._supportedFeatures = supportedFeatures;

      this.handleInfoUpdate = this.handleInfoUpdate.bind(this);
    }

    handleInfoUpdate(info) {
      if (!info.key.startsWith("tft_")) {
        return;
      }

      switch (info.key) {
        case "tft_roster":
          this._handleRosterUpdate(info);
          break;
        case "tft_xp":
          this._handleXpUpdate(info);
          break;
        case "tft_gold":
          this._handleGoldUpdate(info);
          break;
        case "tft_combat":
          this._handleCombatUpdate(info);
          break;
        case "tft_match":
          this._handleMatchUpdate(info);
          break;
        case "tft_round":
          this._handleRoundUpdate(info);
          break;
        case "tft_round_outcome":
          this._handleRoundOutcomeUpdate(info);
          break;
        case "tft_opp":
          this._handleOpponentUpdate(info);
          break;
        case "tft_damage":
          this._handleDamageUpdate(info);
          break;
        case "tft_shop":
        case "tft_carousel":
        case "tft_bench":
        case "tft_board":
          this._handleShopUpdate(info);
          break;
        default:
          this._handleUpdate(info);
      }
    }

    _handleUpdate(infoUpdate) {
      const infos = this._pluginWhitelist.InfoDB[infoUpdate.key];
      for (let info of infos) {
        this._infoDB.set(
          info.feature_id,
          info.config.category,
          info.config.key,
          infoUpdate.value
        );
      }
    }

    handleEvent(eventData) {
      if (!eventData.name.startsWith("tft_")) {
        return;
      }

      switch (eventData.name) {
        case "tft_picked_item":
          this._handlePickedItemEvent(eventData);
          break;
        default:
          this._handleSingleEvent(eventData);
      }
    }

    _handleSingleEvent(eventData) {
      const event = this._featuresHandler.Events[eventData.name];
      this._featuresHandler.triggerEvent(
        event.feature_id,
        event.event.name,
        eventData.data
      );
    }

    _handleRosterUpdate(info) {
      let playersList = JSON.parse(info.value);
      let localPlayer = null;
      let localPlayerName = null;
      let roster = playersList.reduce((roster, player) => {
        roster[player.summoner] = {
          index: parseInt(player.index),
          health: parseInt(player.health),
          xp: parseInt(player.xp),
          localplayer: player.localplayer === "1",
          rank: parseInt(player.rank),
          tag_line: player.tag_line
        };

        if (roster[player.summoner].localplayer) {
          localPlayerName = player.summoner;
          localPlayer = roster[player.summoner];
        }

        return roster;
      }, {});

      this._infoDB.set(
        this._supportedFeatures.roster.name,
        this._supportedFeatures.roster.info.player_status.category,
        this._supportedFeatures.roster.info.player_status.key,
        JSON.stringify(roster)
      );

      this._infoDB.set(
        this._supportedFeatures.me.name,
        this._supportedFeatures.me.info.summoner_name.category,
        this._supportedFeatures.me.info.summoner_name.key,
        localPlayerName
      );

      if (localPlayer && typeof localPlayer.health !== 'undefined') {
        this._infoDB.set(
          this._supportedFeatures.me.name,
          this._supportedFeatures.me.info.health.category,
          this._supportedFeatures.me.info.health.key,
          localPlayer.health
        );
      }

      if (localPlayer && typeof localPlayer.rank !== 'undefined') {
        this._infoDB.set(
          this._supportedFeatures.me.name,
          this._supportedFeatures.me.info.rank.category,
          this._supportedFeatures.me.info.rank.key,
          localPlayer.rank
        );
      }
    }

    _handleXpUpdate(info) {
      const value = JSON.parse(info.value);
      const data = {
        level: parseInt(value.xp_level),
        current_xp: parseInt(value.xp_progress),
        xp_max: parseInt(value.xp_progress_max)
      };

      this._infoDB.set(
        this._supportedFeatures.me.name,
        this._supportedFeatures.me.info.xp.category,
        this._supportedFeatures.me.info.xp.key,
        JSON.stringify(data)
      );
    }

    _handleGoldUpdate(info) {
      this._infoDB.set(
        this._supportedFeatures.me.name,
        this._supportedFeatures.me.info.gold.category,
        this._supportedFeatures.me.info.gold.key,
        parseInt(info.value)
      );
    }

    _handleCombatUpdate(info) {
      const inProgress = info.value === "combat_begin";
      const roundType = JSON.parse(
        this._infoDB.get(
          this._supportedFeatures.match_info.info.round_type.category,
          this._supportedFeatures.match_info.info.round_type.key,
        )
      );

      this._infoDB.set(
        this._supportedFeatures.match_info.name,
        this._supportedFeatures.match_info.info.battle_state.category,
        this._supportedFeatures.match_info.info.battle_state.key,
        JSON.stringify({ in_progress: inProgress })
      );

      if (inProgress) {
        this._featuresHandler.triggerEvent(
          this._supportedFeatures.match_info.name,
          this._supportedFeatures.match_info.events.battle_start.name,
          roundType ? roundType.name : null
        );
      } else {
        this._featuresHandler.triggerEvent(
          this._supportedFeatures.match_info.name,
          this._supportedFeatures.match_info.events.battle_end.name,
          null
        );
      }
    }

    _handleMatchUpdate(info) {
      const inProgress = info.value === "match_start";

      this._infoDB.set(
        this._supportedFeatures.match_info.name,
        this._supportedFeatures.match_info.info.match_state.category,
        this._supportedFeatures.match_info.info.match_state.key,
        JSON.stringify({ in_progress: inProgress })
      );

      if (inProgress) {
        this._featuresHandler.triggerEvent(
          this._supportedFeatures.match_info.name,
          this._supportedFeatures.match_info.events.match_start.name,
          null
        );
      } else {
        this._featuresHandler.triggerEvent(
          this._supportedFeatures.match_info.name,
          this._supportedFeatures.match_info.events.match_end.name,
          null
        );
      }
    }

    _handleRoundUpdate(info) {
      const value = JSON.parse(info.value);
      let name = '';
      let native_name = "";
      if (value.type.length > 0) {
        let regexRes = value.type.match(/TFT.*_Round_(.*)/);
        name = regexRes[1]
        native_name = name;
      }

      let type = null;

      switch (name) {
        case "Combat":
          name = "PVP";
          type = name;
          break;
        case "Combat_Set6_Standard_AugmentEarly":
          name = "PVP";
          type = "Augment_1";
          break;
        case "Encounter_Group":
          name = "PVP";
          type = name;
          break;
        case "Encounter_Board":
          name = "PVP";
          type = name;
          break;
        case "Encounter_Carousel":
          name = "Carousel";
          type = name;
          break;
        case "Combat_PairsAssistLate_PartnerA":
          name = "PVP";
          type = "Assist_Armoury";
          break;
        case "Combat_PairsAssistLate_PartnerB":
          name = "PVP";
          type = "Assist_Armoury";
          break;
        case "Combat_PairsAssistEarly_PartnerA":
          name = "PVP";
          type = "Assist_Armoury";
          break;
        case "Combat_PairsAssistEarly_PartnerB":
          name = "PVP";
          type = "Assist_Armoury";
          break;
        case "Combat_Set6_Standard_AugmentMid":
          name = "PVP";
          type = "Augment_2";
          break;
        case "Combat_Set6_Standard_AugmentLate":
          name = "PVP";
          type = "Augment_3";
          break;
        case "Combat_Hyperroll_Set6_Standard_AugmentMid":
          name = "PVP";
          type = "Augment_2";
          break;
        case "Combat_Hyperroll_Items":
          name = "PVP";
          type = name;
          break;
        case "Combat_Hyperroll_Set6_Standard_AugmentLate":
          name = "PVP";
          type = "Augment_3";
          break;
        case "Combat_HyperRoll_Stage9_CompleteItemArmory":
          name = "PVP";
          type = name;
          break;
        case "RegionPortalSelect":
          name = "Portal";
          type = name;
          break;
        case "Carousel":
          name = "Carousel";
          type = name;
          break;
        case "Intro_Carousel":
          name = "Carousel";
          type = name;
          break;
        case "Combat_HyperRoll":
          name = "PVP";
          type = name;
          break;
        case "Intro1":
          name = "PVE";
          type = "Minions_1";
          break;
        case "Intro2":
          name = "PVE";
          type = "Minions_2";
          break;
        case "Intro3":
          name = "PVE";
          type = "Minions_3";
          break;
        default:
          name = "PVE";
          type = name;
      }

      const round = {
        stage: value.stage,
        name,
        type,
        native_name
      };

      this._infoDB.set(
        this._supportedFeatures.match_info.name,
        this._supportedFeatures.match_info.info.round_type.category,
        this._supportedFeatures.match_info.info.round_type.key,
        JSON.stringify(round)
      );

      this._featuresHandler.triggerEvent(
        this._supportedFeatures.match_info.name,
        this._supportedFeatures.match_info.events.round_start.name,
        round.name
      );
    }

    _handleRoundOutcomeUpdate(info) {
      let playersList = JSON.parse(info.value);
      let outcomes = playersList.reduce((outcomes, player) => {
        outcomes[player.summoner] = {
          outcome: player.round_outcome,
          tag_line: player.tag_line
        };

        return outcomes;
      }, {});

      this._infoDB.set(
        this._supportedFeatures.match_info.name,
        this._supportedFeatures.match_info.info.round_outcome.category,
        this._supportedFeatures.match_info.info.round_outcome.key,
        JSON.stringify(outcomes)
      );

      this._featuresHandler.triggerEvent(
        this._supportedFeatures.match_info.name,
        this._supportedFeatures.match_info.events.round_end.name,
        null
      );
    }

    _handleOpponentUpdate(info) {

      let value = info.value;
      let parts = value.split("#");
      let opName = parts[0];
      let opTagLine = parts[1];

      this._infoDB.set(
        this._supportedFeatures.match_info.name,
        this._supportedFeatures.match_info.info.opponent.category,
        this._supportedFeatures.match_info.info.opponent.key,
        JSON.stringify({ name: opName, tag_line: opTagLine })
      );
    }

    _handleDamageUpdate(info) {
      const units = JSON.parse(info.value);

      for (let unit in units) {
        units[unit].damage = parseInt(units[unit].damage);
        units[unit].level = parseInt(units[unit].level);
      }

      this._infoDB.set(
        this._supportedFeatures.match_info.name,
        this._supportedFeatures.match_info.info.local_player_damage.category,
        this._supportedFeatures.match_info.info.local_player_damage.key,
        JSON.stringify(units)
      );
    }

    _handleShopUpdate(info) {

      try {
        const check_json = JSON.parse(info.value);
        const metadata = this._pluginWhitelist.InfoDB[info.key];
        this._infoDB.set(
          metadata[0].feature_id,
          metadata[0].config.category,
          metadata[0].config.key,
          info.value
        );

      } catch (error) {
        console.log("Error parsing JSON data");
        return;
      }
    }

    _handlePickedItemEvent(eventData) {

      this._featuresHandler.triggerEvent(
        this._supportedFeatures.match_info.name,
        this._supportedFeatures.match_info.events.picked_item.name,
        eventData.data
      );

      this._infoDB.set(
        this._supportedFeatures.match_info.name,
        this._supportedFeatures.match_info.info.item_select.category,
        this._supportedFeatures.match_info.info.item_select.key,
        null
      );
    }
  }
  return TFTHandler;
});
