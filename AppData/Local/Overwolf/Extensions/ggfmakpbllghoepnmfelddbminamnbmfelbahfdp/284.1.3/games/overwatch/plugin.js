define([
  '/games/service/PluginHandler.js',
  '/libs/js-uuid.js',
  '/games/overwatch/game_constants.js'
], function (PluginHandler, uuid, Constants) {

  return class OverwatchPluginHandler extends PluginHandler {
    _featuresToClearOnMatchEnd = [
      {
        feature: this._supportedFeatures.game_info,
        infos: [
          'game_mode',
          'game_type',
          `game_queue_type`
        ]
      },
      {
        feature: this._supportedFeatures.kill,
        infos: [
          'eliminations'
        ]
      },
      {
        feature: this._supportedFeatures.death,
        infos: [
          'deaths'
        ]
      },
      {
        feature: this._supportedFeatures.assist,
        infos: [
          'assists'
        ]
      },
      {
        feature: this._supportedFeatures.match_info,
        infos: [
          'map',
          'pseudo_match_id'
        ]
      }
    ];

    _featuresToClearOnMatchStart = [
      {
        feature: this._supportedFeatures.match_info,
        infos: [
          'match_outcome'
        ]
      }
    ];

    constructor(config) {
      super(config);

      this.hero_id = Constants.hero_id;
      this.hero_role = Constants.hero_role;
      this.game_type = Constants.game_type;
      this.game_queue_type = Constants.game_queue_type;
      this.roster_delay = Constants.roster_delay;
      this.clearTimeoutId = null;
      this.roster_ready = false;
      this.game_mode = null;
    }

    _handleSingleGameInfo(info) {

      switch (info.key) {
        case (info.key.match(/roster_/) || {}).input:
          const value = JSON.parse(info.value);
          const allowRoster = !this.roster_delay.hasOwnProperty(this.game_mode);

          value.player_name = value.player_name;
          value.battlenet_tag = value.battle_tag;
          value.is_local = !!+value.is_local;
          value.hero_id = value.hero_name;
          value.hero_name = this.hero_id[value.hero_name] !== undefined ? this.hero_id[value.hero_name] : "UNKNOWN";
          value.hero_role = this.hero_role[value.hero_role] !== undefined ? this.hero_role[value.hero_role] : "UNKNOWN";

          if (value.is_myteam === 0 && !this.roster_ready && !allowRoster) {
            value.hero_name = null
            value.hero_role = null
          }

          value.team = value.is_myteam === 0 ? 0 : 1;
          value.is_teammate = value.is_myteam === 0 ? false : true;
          value.kills = +value.kills;
          value.deaths = +value.deaths;
          value.assists = +value.assists;
          value.damage = +value.damage;
          value.healed = +value.healed;
          value.mitigated = +value.mitigated;
          delete value.is_myteam;
          delete value.battle_tag;
          info.value = JSON.stringify(value);
          break;


        case ("match_outcome"): {
          if (info.value === "1") {
            info.value = "victory";
          } else if (info.value === "2") {
            info.value = "draw";
          } else {
            info.value = "defeat";
          }
          break;
        }

        case ("game_mode"): {
          this.game_mode = info.value;
          break;
        }

        case ("party_player_count"): {
          info.value = parseInt(info.value);
          break;
        }

        case ("game_type"): {
          if (this.game_type.hasOwnProperty(info.value)) {
            info.value = this.game_type[info.value];
          } else {
            info.value = "unknown";
          }
          break;
        }

        case ("game_queue_type"): {
          if (this.game_queue_type.hasOwnProperty(info.value)) {
            info.value = this.game_queue_type[info.value];
          } else {
            info.value = "unknown";
          }
          break;
        }
      }

      super._handleSingleGameInfo(info);
    }

    _handleSingleEvent(event) {

      let pluginEventName = event.name;
      let metadata = this._pluginWhitelist.Events[pluginEventName];
      if (!metadata) {
        return;
      }

      switch (event.name) {
        case "match_start":
          this._handleMatchStartEvent(event, metadata);
          break;
        case "match_end":
          this._handleMatchEndEvent(event, metadata);
          break;
        case "round_start":
          this._handleRoundStartEvent();
          break;
        case "round_end":
          this._handleRoundEndEvent();
          break;
        case "kill_feed":
          this._handleKillFeed(event);
          break;
      }

      super._handleSingleEvent(event);
    }


    _handleMatchStartEvent(eventInfo, metadata) {

      let feature = this._supportedFeatures.match_info;
      this._featuresHandler.triggerEvent(
        feature.name,
        feature.events.match_start.name,
        null
      );

      this._infoDB.set(feature.name,
        feature.info.pseudo_match_id.category,
        feature.info.pseudo_match_id.key,
        uuid.v4());
      this._clearData(this._featuresToClearOnMatchStart);
    }


    _handleRoundStartEvent() {

      const timer = this.roster_delay[this.game_mode] !== undefined ? this.roster_delay[this.game_mode] : 0;

      if (!this.clearTimeoutId) {
        this.clearTimeoutId = setTimeout(() => {
          this.roster_ready = true;
          console.log(`roster_ready set to: ${this.roster_ready}`);
          this.clearTimeoutId = null; 
        }, timer);
      }
    }


    _handleMatchEndEvent(eventInfo, metadata) {

      let feature = this._supportedFeatures.match_info;
      this._featuresHandler.triggerEvent(
        feature.name,
        feature.events.match_end.name,
        null
      );
      this._clearData(this._featuresToClearOnMatchEnd);
    }


    _handleRoundEndEvent() {
      this._cancelClearRosterTimout();
    }


    _handleKillFeed(event) {
      try {
        let fixedData = event.data
          .replace(/: *,/g, ': null,')
          .replace(/: *}/g, ': null}');

        let value = JSON.parse(fixedData);

        value.is_victim_teammate = value.is_victim_teammate === 1;
        value.is_attacker_teammate = value.is_attacker_teammate === 1;
        value.is_supporter_teammate = value.is_supporter_teammate === 1;
        value.is_revived_teammate = value.is_revived_teammate === 1;
        value.attacker_hero_name = value.attacker_hero_id === null
          ? null
          : (this.hero_id[value.attacker_hero_id] !== undefined ? this.hero_id[value.attacker_hero_id] : "UNKNOWN");

        value.victim_hero_name = value.victim_hero_id === null
          ? null
          : (this.hero_id[value.victim_hero_id] !== undefined ? this.hero_id[value.victim_hero_id] : "UNKNOWN");

        value.supporter_hero_name = value.supporter_hero_id === null
          ? null
          : (this.hero_id[value.supporter_hero_id] !== undefined ? this.hero_id[value.supporter_hero_id] : "UNKNOWN");

        value.revived_hero_name = value.revived_hero_id === null
          ? null
          : (this.hero_id[value.revived_hero_id] !== undefined ? this.hero_id[value.revived_hero_id] : "UNKNOWN");


        let feature = this._supportedFeatures.match_info;
        this._featuresHandler.triggerEvent(
          feature.name,
          feature.events.kill_feed.name,
          JSON.stringify(value)
        );
      } catch (error) {
        console.error('Failed to handle kill feed event:', error);
      }
    }

    _cancelClearRosterTimout() {
      if (this.clearTimeoutId) {
        clearTimeout(this.clearTimeoutId);
        this.clearTimeoutId = null; 
        console.log("Clear data action canceled.");
      }
      this.roster_ready = false;
      console.log(`roster_ready set to: ${this.roster_ready}`);
    }
  }
});