define([], function () {

    this.matchStarted = false;

    class GILogParser {
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
            return result;
        }

        _matchStart(line, result) {
            const regex = /LoadingManager AfterEnterSceneDone/;
            const match = line.match(regex);
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
            const regex = /ChangeGameWorld Home/;
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

    }
    return GILogParser;
})