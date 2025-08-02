define([], function () {
  class RobloxLogParser {
    constructor(infoDB) {
      this._infoDB = infoDB;
      this.parse = this.parse.bind(this);
      this.matchStarted = false;
    }

    parse(line) {
      const result = {
        events: [],
        infoUpdates: []
      }

      this._parseUserId(line, result);
      this._parseGameId(line, result);
      this._parseUniverseId(line, result);
      this._parseMatchStart(line, result);
      this._parseMatchEnd(line, result);
      this._parseRecordStart(line, result);
      this._parseRecordEnd(line, result);

      return result;
    }

    _parseUserId(line, result) {
      let userId = null;

      const loginMatch = line.match(/DID_LOG_IN.*?"userId"\s*:\s*(\d+)/);
      if (loginMatch) {
        userId = loginMatch[1];
      }

      const urlEncodedMatch = line.match(/userId%3[dD](\d+)/);
      if (!userId && urlEncodedMatch) {
        userId = urlEncodedMatch[1];
      }

      const rawKVMatch = line.match(/game_join_loadtime.*?\buserid\s*:\s*(\d+)/i);
      if (!userId && rawKVMatch) {
        userId = rawKVMatch[1];
      }

      if (userId) {
        const infoUpdate = {
          feature: 'game_info',
          key: 'user_id',
          value: userId
        };
        result.infoUpdates.push(infoUpdate);
      }
    }


    _parseGameId(line, result) {
      const matches = line.match(/placeid:(\d+)/);
      if (matches && matches[1]) {
        const infoUpdate = {
          feature: 'match_info',
          key: 'game_id',
          value: matches[1]
        }
        result.infoUpdates.push(infoUpdate);
      }
    }

    _parseUniverseId(line, result) {
      const matches = line.match(/universeid:(\d+)/);
      if (matches && matches[1]) {
        const infoUpdate = {
          feature: 'match_info',
          key: 'universe_id',
          value: matches[1]
        }
        result.infoUpdates.push(infoUpdate);
      }
    }

    _parseMatchStart(line, result) {
      if (this.matchStarted == false) {
        if (line.includes('game_join_loadtime')) {
          this.matchStarted = true;
          const event = {
            feature: 'match_info',
            name: 'match_start',
            value: null
          }
          result.events.push(event);
        }
      }
    }

    _parseMatchEnd(line, result) {
      if (this.matchStarted == true) {
        if (line.includes('leaveUGCGameInternal')) {
          this.matchStarted = false;
          const event = {
            feature: 'match_info',
            name: 'match_end',
            value: null
          }
          result.events.push(event);

          const infoUpdate = {
            feature: 'match_info',
            key: 'game_id',
            value: null
          }
          result.infoUpdates.push(infoUpdate);

          const infoUpdate1 = {
            feature: 'match_info',
            key: 'universe_id',
            value: null
          }
          result.infoUpdates.push(infoUpdate1);
        }
      }
    }

    _parseRecordStart(line, result) {
      if (line.includes('Video recording started')) {
        const event = {
          feature: 'match_info',
          name: 'record_start',
          value: null
        }
        result.events.push(event);
      }
    }

    _parseRecordEnd(line, result) {
      if (line.includes('Video recording stopped')) {
        const event = {
          feature: 'match_info',
          name: 'record_end',
          value: null
        }
        result.events.push(event);
      }
    }
  }
  return RobloxLogParser;
})