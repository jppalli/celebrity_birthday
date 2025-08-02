define([], function () {

    class Splitgate2LogParser {
        constructor(infoDB) {
            this._infoDB = infoDB;
            this.parse = this.parse.bind(this);
            this.matchStarted = false;
            this.roundStarted = false;
            this.roundCount = 0;
        }

        parse(line) {
            const result = {
                events: [],
                infoUpdates: []

            }
            this._state(line, result);
            this._mapName(line, result);
            this._matchStart(line, result);
            this._matchEnd(line, result);
            this._roundStart(line, result);
            this._roundEnd(line, result);
            this._playerName(line, result);
            return result;
        }

        _state(line, result) {
            const valuesToIgnore = ["BP", "EndTransition"];
            const regex = /for phase class \[Phase_[^_]+_([^_]+)_C\]/;
            const match = line.match(regex);
            if (match) {
                const phaseName = match[1]; 
                if (!valuesToIgnore.includes(phaseName)) {
                    const infoUpdate = {
                        feature: 'game_info',
                        key: 'scene',
                        value: phaseName
                    };
                    result.infoUpdates.push(infoUpdate);
                }
            }

            const lobbyRegex = /UEngine::LoadMap Load map complete \/Game\/Maps\/MainMenu\/MainMenu/;
            if (lobbyRegex.test(line)) {
                const infoUpdate = {
                    feature: 'game_info',
                    key: 'scene',
                    value: 'lobby'
                };
                result.infoUpdates.push(infoUpdate);

                if (this.matchStarted) {
                    const event = {
                        feature: 'match_info',
                        name: 'match_end',
                        value: null
                    };
                    result.events.push(event);
                    this.matchStarted = false;
                    this.roundCount = 0;
                }
            }
        }

        _mapName(line, result) {
            const regex = /Load map complete \/MAP_([^\/]+)/;
            const match = line.match(regex);
            if (match) {
                const mapName = match[1]; 
                const infoUpdate = {
                    feature: 'match_info',
                    key: 'map',
                    value: mapName
                };
                result.infoUpdates.push(infoUpdate);
            }
        }

        _matchStart(line, result) {
            const regex = /for phase class \[Phase_PreRound_Countdown_C\]/;
            const regex1 = /for phase class \[(Phase_PreRound_Countdown_C|Phase_Gameplay_WaitForPlayers_C)\]/;
            const match = line.match(regex1);
            if (match && !this.matchStarted) {
                const event = {
                    feature: 'match_info',
                    name: 'match_start',
                    value: null
                };
                result.events.push(event);
                this.matchStarted = true;
            }
        }        

        _matchEnd(line, result) {
            const regex = /for phase class \[Phase_EndOfMatch_C\]/;
            const match = line.match(regex);
            if (match && this.matchStarted) {
                const event = {
                    feature: 'match_info',
                    name: 'match_end',
                    value: null
                };
                result.events.push(event);
                this.matchStarted = false;
                this.roundCount = 0;
            }
        }


        _roundStart(line, result) {
            const regex = /for phase class \[Phase_PreRound_Countdown_C\]/;
            const match = line.match(regex);
            if (match && !this.roundStarted) {
                this.roundCount++;
                const event = {
                    feature: 'match_info',
                    name: 'round_start',
                    value: this.roundCount
                };
                result.events.push(event);
                this.roundStarted = true;
            }
        }

        _roundEnd(line, result) {
            const regex = /for phase class \[Phase_EndOfRound[^]*?_C\]/;
            const match = line.match(regex);
            if (match && this.roundStarted) {
                const event = {
                    feature: 'match_info',
                    name: 'round_end',
                    value: null
                };
                result.events.push(event);
                this.roundStarted = false;
            }
        }

        _playerName(line, result) {
            const regex = /Successfully logged in as \[Steam:1 \(([^ ]+) \[/;
            const match = line.match(regex);
            if (match) {
                const displayName = match[1]; 
                const infoUpdate = {
                    feature: 'game_info',
                    key: 'player_name',
                    value: displayName
                };
                result.infoUpdates.push(infoUpdate);
                this.localPlayer = displayName;
            }
        }
    }
    return Splitgate2LogParser;
})