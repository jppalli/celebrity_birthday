define([], function () {

    class RematchLogParser {
        constructor(infoDB) {
            this._infoDB = infoDB;
            this.parse = this.parse.bind(this);
            this.matchStarted = false;
            this.localPlayer = null;
            this.localPlayerId = null;
        }

        setMatchStarted(val) {
            this.matchStarted = val;
        }

        parse(line) {
            const result = {
                events: [],
                infoUpdates: []

            }
            this._playerName(line, result);
            this._playerId(line, result);
            this._scene(line, result);
            this._matchStart(line, result);
            this._matchEnd(line, result);
            this._gameMode(line, result);

            return result;
        }

        _playerName(line, result) {
            const regex = /localPlayerNickname:\s*([^\s,}][^,}]*)/;
            const match = line.match(regex);
            if (match) {
                const displayName = match[1].trim();
                if (displayName !== "" && this.localPlayer === null) {
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

        _playerId(line, result) {
            const regex = /Set SCLocalPlayer_(\d+) to Primary Player/;
            const match = line.match(regex);
            if (match) {
                const playerId = match[1]; 
                const infoUpdate = {
                    feature: 'game_info',
                    key: 'player_id',
                    value: playerId
                };
                result.infoUpdates.push(infoUpdate);
                this.localPlayerId = playerId;
            }
        }

        _scene(line, result) {
            const valuesToIgnore = [];
            const regex = /GameFlow\.States\.(In Match Menu|MainTabNavigation).*GameFlow\.States\.Menu Main Home/;
            const match = line.match(regex);
            if (match) {
                const phaseName = "lobby";
                if (!valuesToIgnore.includes(phaseName)) {
                    const infoUpdate = {
                        feature: 'game_info',
                        key: 'scene',
                        value: phaseName
                    };
                    result.infoUpdates.push(infoUpdate);
                }
            }

            const ingameRegex = /GameFlow\.States\.Match CountdownOver/;
            if (ingameRegex.test(line)) {
                const infoUpdate = {
                    feature: 'game_info',
                    key: 'scene',
                    value: 'ingame'
                };
                result.infoUpdates.push(infoUpdate);
            }

            const replayRegex = /GameFlow\.States\.Celebration\.FreeRun.*GameFlow\.States\.Celebration\.Qte/;
            if (replayRegex.test(line)) {
                const infoUpdate = {
                    feature: 'game_info',
                    key: 'scene',
                    value: 'replay'
                };
                result.infoUpdates.push(infoUpdate);
            }
        }

        _matchStart(line, result) {
            const regex = /GameFlow\.States\.Match CountdownOver/;
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
            const regex = /GameFlow\.States\.(EndMatchWhistle|MatchEnd)/;
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


        _gameMode(line, result) {
            const valuesToIgnore = ["Invalid"];

            const quickMatchRegex = /LogBlueprintUserMessages:\s+\[WBP_Menu_Quickmatch_C_\d+\]\s+(\w+)/;
            const match = line.match(quickMatchRegex);
            if (match) {
                const gameMode = match[1]; 
                if (!valuesToIgnore.includes(gameMode)) {
                    result.infoUpdates.push({
                        feature: 'game_info',
                        key: 'game_mode',
                        value: gameMode
                    });
                }
            }

            if (/Display:\s+StartCustomMatch begin/.test(line)) {
                result.infoUpdates.push({
                    feature: 'game_info',
                    key: 'game_mode',
                    value: 'Custom'
                });
            }

            if (/LogUIActionRouter:\s+Display:\s+\[User \d+\]\s+Focused desired target Btn_RankedMatch/.test(line)) {
                result.infoUpdates.push({
                    feature: 'game_info',
                    key: 'game_mode',
                    value: 'Ranked'
                });
            }
        }
    }
    return RematchLogParser;
})