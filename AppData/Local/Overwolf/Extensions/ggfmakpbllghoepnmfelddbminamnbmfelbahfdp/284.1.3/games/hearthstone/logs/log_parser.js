define([], function () {
  class HearthstoneLogParser {
    constructor(infoDB) {
      this._infoDB = infoDB;
      this.parse = this.parse.bind(this);
    }

    parse(line) {
      const result = {
        events: [],
        infoUpdates: []
      }

      this._parseMatchType(line, result);
      this._parseMatchOutcome(line, result);

      return result;
    }

    _parseMatchType(line, result) {
      const matches = line.match(/(?<=GameType=)(\w+)/);
      if (matches && matches[0]) {
        const infoUpdate = {
          feature: 'match',
          key: 'match_type',
          value: matches[0]
        }
        console.log('[HEARTHSTONE LOG PARSER] Parsed match type:', infoUpdate.value);
        result.infoUpdates.push(infoUpdate);
      }
    }

    _parseMatchOutcome(line, result) {
      const matches = line.match(/GameState.DebugPrintPower\(\) - TAG_CHANGE Entity=(GameEntity|UNKNOWN HUMAN PLAYER|\[.+\]|\d+|.+) tag=(\w+) value=(\w+)( DEF CHANGE)?/);
      let localPlayer = this._infoDB.get('playersInfo', 'localPlayer');
      localPlayer = JSON.parse(localPlayer);
      if (localPlayer && matches && matches[1] && matches[1].startsWith(localPlayer.name)) {
        if (matches[3] !== "WON" && matches[3] !== "LOST") {
          return;
        }
        const event = {
          feature: 'match',
          name: 'match_outcome',
          data: matches[3]
        }
        console.log('[HEARTHSTONE LOG PARSER] Parsed match outcome:', event.data);
        result.events.push(event);
      }
    }
  }

  return HearthstoneLogParser;
})