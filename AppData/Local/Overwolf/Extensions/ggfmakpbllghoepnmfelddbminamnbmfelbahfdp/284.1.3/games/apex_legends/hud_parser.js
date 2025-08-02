define([
  '/games/apex_legends/localization/languages.js',
  '/utils/base_utils.js'
], function (Languages, BaseUtils) {

  const MessageType = {
    KILLFEED: "killfeed",
    LOCALIZED: "localized",
    CHAMPION: "champion",
    RANK: "rank",
    ULTIMATE_ABILITY: "ultimate_ability"
  }

  const Action = {
    KILL: "kill",
    HEADSHOT_KILL: "headshot_kill",
    KNOCKDOWN: "knockdown",
    BLEED_OUT: "Bleed_out",
    FINISHER: "Finisher",
    MELEE: "Melee",
    SMOKE_LAUNCHER: "Smoke Launcher",
    CREEPING_BARRAGE: "Creeping Barrage",
    CAUSTIC_GAS: "Caustic Gas",
    KUNAI_MELEE: "Kunai Melee",
    PERIMETER_SECURITY: "Perimeter Security",
    DEFENSIVE_BOMBARDMENT: "Defensive Bombardment"
  }

  const AssistType = {
    ELIMINATION: "elimination",
    KNOCKDOWN: "knockdown"
  }

  const ImpactToAction = {
    "kill": Action.KILL,
    "rui/hud/obituary/obituary_headshot": Action.HEADSHOT_KILL,
    "rui/hud/obituary/obituary_downed": Action.KNOCKDOWN,
    "Bleed Out": Action.BLEED_OUT,
    "Finisher": Action.FINISHER,
    "Melee": Action.MELEE,
    "Smoke Launcher": Action.SMOKE_LAUNCHER,
    "Creeping Barrage": Action.CREEPING_BARRAGE,
    "Caustic Gas": Action.CAUSTIC_GAS,
    "Kunai Melee": Action.KUNAI_MELEE,
    "Perimeter Security": Action.PERIMETER_SECURITY,
    "Defensive Bombardment": Action.DEFENSIVE_BOMBARDMENT
  }

  const WEAPON_PREFIX = "rui/weapon_icons/r5/weapon_";

  class HudParser {

    constructor(config) {
      this._local_player = config.local_player;
      this._messages = Languages[config.language];

      this._parseKillFeed = this._parseKillFeed.bind(this);
    }

    parse(event) {
      if (event.name !== 'hud') {
        return event;
      }

      let rawData = event.data;


      const data = JSON.parse(rawData);

      if (data['msg_text']) {
        data['msg_text'] = BaseUtils.b64DecodeUnicode(data['msg_text']);
      }

      console.log(`[HUD PARSER] Parsing HUD message: ${JSON.stringify(data)}`);

      const msgType = data['msg_type'];

      let parsed = {
        event: null,
        info: null
      }

      switch (msgType) {
        case MessageType.KILLFEED:
          parsed.event = this._parseKillFeed(data);
          break;
        case MessageType.LOCALIZED:
          parsed.event = this._parseLocalized(data);
          break;
        case MessageType.CHAMPION:
          parsed.info = this._parseChampion(data);
          break;
        case MessageType.RANK:
          parsed.info = this._parseRank(data);
          break;
        case MessageType.ULTIMATE_ABILITY:
          parsed.info = this._parseUltimateAbility(data);
          break;
      }

      if (parsed.event) {
        console.log(`[HUD PARSER] Parsed HUD event: ${JSON.stringify(parsed.event)}`);
      }

      if (parsed.info) {
        console.log(`[HUD PARSER] Parsed HUD info update: ${JSON.stringify(parsed.info)}`);
      }

      return parsed;
    }

    _parseUltimateAbility(data) {
      const info = {
        key: 'hud_ultimate_ability',
        value: JSON.stringify({
          ultimate_cooldown: data['cooldown'],
        })
      }

      return info;
    }

    _parseRank(data) {
      const info = {
        key: 'hud_match_summary',
        value: JSON.stringify({
          rank: data.rank,
          teams: data.teams,
          squadKills: data['squad_kills']
        })
      }

      return info;
    }

    _parseChampion(data) {
      const info = {
        key: 'hud_legend_select',
        value: JSON.stringify({
          playerName: data.nickname,
          legendName: data.champion,
          selectionOrder: data['selection_order'],
          lead: data.lead === "1"
        })
      }

      return info;
    }


    _parseKillFeed(data) {
      const { dictionary, regex } = this._messages.killfeed;
      let action = '';
      if (data.localized.length > 0) {
        action = BaseUtils.b64DecodeUnicode(data.localized);
        if (dictionary[action]) {
          action = dictionary[action];
        }
      } else {
        action = ImpactToAction[data.impact];
      }

      let attackerName = BaseUtils.b64DecodeUnicode(data.attacker);
      attackerName = this._removeSpaces(attackerName);

      let victimName = BaseUtils.b64DecodeUnicode(data.victim);
      victimName = this._removeSpaces(victimName);

      const killFeedEvent = {
        name: "kill_feed",
        data: {
          local_player_name: this._local_player,
          attackerName,
          victimName,
          weaponName: data.weapon.replace(WEAPON_PREFIX, ""),
          action,
        }
      }
      return killFeedEvent;
    }

    _removeSpaces(data) {
      if (data.match(new RegExp(/^\s/)) !== null) {
        data = data.slice(1);
      }

      let matchFound = /\[[^\]]+\]\s*/.test(data);
      if (matchFound) {
        data = data.replace(/\[[^\]]+\]\s*/, (match) => match.trim());
      }

      if (data.includes('"')) {
        data = data.replace(/"/g, '\\"');
      }
      return data;
    }

    _parseLocalized(data) {
      const { dictionary, regex } = this._messages.killfeed;
      const message = data['msg_text'];
      let event = null;

      if (this._isMatch(message, regex.match)) {
        const attackerName = message.match(regex.attackerName)[0];
        const victimName = message.match(regex.victimName)[0];
        let action = message.match(regex.action)[0];
        if (dictionary[action]) {
          action = dictionary[action];
        }
        const weaponName = action;
        event = {
          name: "kill_feed",
          data: {
            attackerName,
            victimName,
            weaponName,
            action
          }
        }
      }

      return event;
    }

    _isMatch(str, regex) {
      const matches = str.match(regex);
      if (matches) {
        return matches.length > 0;
      }
      return false;
    }
  }

  return HudParser;
});