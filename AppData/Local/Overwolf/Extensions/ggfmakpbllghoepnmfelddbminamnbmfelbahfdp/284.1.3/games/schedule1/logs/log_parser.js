define([], function () {

    this.matchStarted = false;

    class Schedule1LogParser {
        constructor(infoDB) {
            this._infoDB = infoDB;
            this.parse = this.parse.bind(this);
        }

        parse(line) {
            const result = {
                events: [],
                infoUpdates: []

            }
            this._matchStart(line, result);
            this._matchEnd(line, result);
            this._sleepStart(line, result);
            this._sleepEnd(line, result);
            this._playerName(line, result);
            this._playerRank(line, result);
            this._pursuitLevel(line, result);
            return result;
        }

        _matchStart(line, result) {
            const regex = /Starting game!/;
            const match = line.match(regex);
            if (match && !this.matchStarted) {
                const event = {
                    feature: 'match_info',
                    name: 'match_start',
                    value: null
                };
                result.events.push(event);
                this.matchStarted = true;

                const infoUpdate = {
                    feature: 'match_info',
                    key: 'pursuit_level',
                    value: 'regular'
                };
                result.infoUpdates.push(infoUpdate);
            }
        }

        _matchEnd(line, result) {
            const regex = /Exiting to menu/;
            const match = line.match(regex);
            if (match && this.matchStarted) {
                const event = {
                    feature: 'match_info',  
                    name: 'match_end',
                    value: null
                };
                result.events.push(event);
                this.matchStarted = false;
            }
        }

        _sleepStart(line, result) {
            const regex = /Start sleep/;
            const match = line.match(regex);
            if (match) {
                const event = {
                    feature: 'match_info',
                    name: 'sleep_start',
                    value: null
                };
                result.events.push(event);
            }
        }

        _sleepEnd(line, result) {
            const regex = /End sleep/;
            const match = line.match(regex);
            if (match) {
                const event = {
                    feature: 'match_info',  
                    name: 'sleep_end',
                    value: null
                };
                result.events.push(event);
            }
        }

        _playerName(line, result) {
            const regex = /Creating player variables for ([^\(]+\([^\)]+\)) \((\d+)\)/;
            const match = line.match(regex);
            if (match) {
                const displayName = match[1].trim(); 
                const userId = match[2]; 

                const infoUpdate = {
                    feature: 'game_info',
                    key: 'player_name',
                    value: displayName
                };
                result.infoUpdates.push(infoUpdate);
                this.localPlayer = displayName;

                const infoUpdate1 = {
                    feature: 'game_info',
                    key: 'player_id',
                    value: userId
                };
                result.infoUpdates.push(infoUpdate1);
            }
        }

        _playerRank(line, result) {
            const regex = /^(.+?)\s+(\d+)\s+->\s+(\d+)/;
            const match = line.match(regex);
            if (match) {
                const rankName = match[1].trim(); 
                const rankFrom = parseInt(match[2], 10); 
                const rankTo = parseInt(match[3], 10); 

                const rankData = {
                    name: rankName,
                    value: rankFrom,
                    total: rankTo
                };

                const infoUpdate = {
                    feature: 'match_info',
                    key: 'player_rank',
                    value: JSON.stringify(rankData)
                };
                result.infoUpdates.push(infoUpdate);
            }
        }

        _pursuitLevel(line, result) {
            let pursuitLevel = null;

            if (/Conducting body search on/.test(line)) {
                pursuitLevel = "body_search";
            } else if (/Escalating!/.test(line)) {
                pursuitLevel = "escalating";
            } else if (/New pursuit level: Arresting/.test(line)) {
                pursuitLevel = "arresting";
            } else if (/New pursuit level: None/.test(line)) {
                pursuitLevel = "regular";
            } else if (/Player arrested/.test(line)) {
                pursuitLevel = "arrested";
            }

            if (pursuitLevel) {
                const infoUpdate = {
                    feature: 'match_info',
                    key: 'pursuit_level',
                    value: pursuitLevel
                };
                result.infoUpdates.push(infoUpdate);
            }
        }
    }
    return Schedule1LogParser;
})