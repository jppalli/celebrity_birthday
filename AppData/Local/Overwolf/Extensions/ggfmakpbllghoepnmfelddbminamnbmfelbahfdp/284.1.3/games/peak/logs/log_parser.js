define([], function () {

    this.matchStarted = false;

    class PeakLogParser {
        constructor(infoDB) {
            this._infoDB = infoDB;
            this.parse = this.parse.bind(this);
            this.playerList = [];
            this.itemList = {};
            this.currentScene = "main_menu";
            this.isCheckPoint = false;
            this.localPlayer = null;
        }

        parse(line) {
            const result = {
                events: [],
                infoUpdates: []

            }

            this._playerName(line, result);
            this._playerScene(line, result);
            this._partyPlayers(line, result);
            this._death(line, result);
            this._gameMode(line, result);
            this._checkpoint(line, result);

            return result;
        }

        _handleMatchEnd(result) {
            const event = {
                feature: 'match_info',  
                name: 'match_end',
                value: null
            };
            result.events.push(event);
            this.matchStarted = false;
            this.playerList = [];
        }

        _death(line, result) {
            const regex = /Character \[([^\]:]+?)\s*:\s*\d+\] died/;
            const match = line.match(regex);

            if (match && this.matchStarted) {
                const playerName = match[1].trim();

                if (playerName === this.localPlayer) {
                    const event = {
                        feature: 'match_info',
                        name: 'death',
                        value: null
                    };
                    result.events.push(event);
                } else {
                    const event = {
                        feature: 'match_info',
                        name: 'teammate_death',
                        value: playerName
                    };
                    result.events.push(event);
                }
            }
        }

        _playerName(line, result) {
            const regex = /Initialized with name:\s*(.+)/;
            const match = line.match(regex);
            if (match) {
                const displayName = match[1].trim(); 

                const infoUpdate = {
                    feature: 'game_info',
                    key: 'player_name',
                    value: displayName
                };
                result.infoUpdates.push(infoUpdate);
                this.localPlayer = displayName;
            }
        }


        _playerScene(line, result) {

            const regex = /(?:Set current scene to|Update current scene|Network Connector is starting in scene):\s*(\S+)/i;
            const regex1 = /Leaving Photon room and returning to main menu/;

            let scene = null;

            if (regex1.test(line)) {
                scene = "main_menu";
                this.currentScene = scene;

                let infoUpdate = {
                    feature: 'game_info',
                    key: 'game_mode',
                    value: null
                };
                result.infoUpdates.push(infoUpdate);
            } else {
                const match = line.match(regex);
                if (match) {
                    scene = match[1].trim().toLowerCase();
                    if (scene !== "airport") {
                        scene = "ingame";
                        this.currentScene = scene;
                    }
                }
            }

            if (scene) {
                result.infoUpdates.push({
                    feature: 'game_info',
                    key: 'scene',
                    value: scene
                });

                if (scene === "airport" && !this.matchStarted) {
                    result.events.push({
                        feature: 'match_info',
                        name: 'match_start',
                        value: null
                    });
                    this.matchStarted = true;
                    this.currentScene = scene;
                    return;
                }

                if (scene === "airport" && this.currentScene === "ingame") {
                    this._handleMatchEnd(result);
                }

                if (scene === "main_menu" && this.matchStarted) {
                    this._handleMatchEnd(result);
                    this.currentScene = scene;
                }
            }
        }

        _partyPlayers(line, result) {
            const registerRegex = /Registering Player object for\s+(.+?)\s*:\s*(\d+)/;
            const removeRegex = /Remote voice #\d+ of player (\d+)\s+not found when trying to remove/i;

            const registerMatch = line.match(registerRegex);
            const removeMatch = line.match(removeRegex);

            if (registerMatch) {
                const playerName = registerMatch[1].trim();
                const position = parseInt(registerMatch[2], 10);

                if (!this.playerList.includes(playerName)) {
                    if (this.playerList.length < position) {
                        this.playerList.length = position;
                    }
                    this.playerList[position - 1] = playerName;
                }

            } else if (removeMatch) {
                const position = parseInt(removeMatch[1], 10);
                const index = position - 1;

                if (
                    index >= 0 &&
                    index < this.playerList.length &&
                    this.playerList[index] !== this.localPlayer
                ) {
                    this.playerList.splice(index, 1);
                }
            }

            const seen = new Set();
            const compactList = [];

            for (const name of this.playerList) {
                if (!name) continue;
                if (name === this.localPlayer || !seen.has(name)) {
                    compactList.push(name);
                    seen.add(name);
                }
            }

            if (this.localPlayer && !seen.has(this.localPlayer)) {
                compactList.push(this.localPlayer);
            }

            const infoUpdate = {
                feature: 'game_info',
                category: 'game_info',
                key: 'party_players',
                value: JSON.stringify(compactList)
            };
            result.infoUpdates.push(infoUpdate);
        }

        _itemList(line, result) {
            const regex = /Granting Player:\s*(.+?):\s*(.+?)\s+and added to slot:\s*(\d+)/;
            const match = line.match(regex);

            if (match) {
                const displayName = match[1].trim();    
                const itemName = match[2].trim();       
                const rawSlot = parseInt(match[3], 10); 
                const slot = rawSlot + 1;               

                if (displayName === this.localPlayer) {
                    const slotKey = `slot_${slot}`;
                    this.itemList[slotKey] = itemName;

                    const allSlotNums = Object.keys(this.itemList).map(k =>
                        parseInt(k.split('_')[1])
                    );
                    const maxSlot = Math.max(...allSlotNums, slot);

                    const normalized = {};
                    for (let i = 1; i <= maxSlot; i++) {
                        const key = `slot_${i}`;
                        normalized[key] = this.itemList[key] || "";
                    }

                    const infoUpdate = {
                        feature: 'match_info',
                        key: 'items',
                        value: JSON.stringify(normalized)
                    };
                    result.infoUpdates.push(infoUpdate);
                }
            }
        }

        _gameMode(line, result) {

            let gameMode = null;

            if (/Add status: IsDisconnectingForOfflineMode/.test(line)) {
                gameMode = "offline";
            } else if (/Switched State to: HostState/.test(line)) {
                gameMode = "host";
            }

            if (gameMode && !this.matchStarted) {
                const infoUpdate = {
                    feature: 'game_info',
                    key: 'game_mode',
                    value: gameMode
                };
                result.infoUpdates.push(infoUpdate);
            }
        }

        _checkpoint(line, result) {
            const regex = /Waitng for fog to catch up/;
            const regex1 = /Enabling substep: Ground/;
            const match = line.match(regex);
            const match1 = line.match(regex1);
            if (match && this.matchStarted && !this.isCheckPoint) {
                const event = {
                    feature: 'match_info',
                    name: 'checkpoint',
                    value: null
                };
                result.events.push(event);
                this.isCheckPoint = true
            }

            if (match1 && this.matchStarted && this.isCheckPoint) {
                this.isCheckPoint = false
            }
        }
    }
    return PeakLogParser;
})