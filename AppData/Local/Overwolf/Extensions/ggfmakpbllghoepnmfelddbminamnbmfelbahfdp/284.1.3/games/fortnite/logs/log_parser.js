define([
  '/utils/analytics.js', '/libs/js-uuid.js'
], function (
  Analytics,
  uuid
) {

  this.server = null;
  this.gameTitle = null;
  this.localPlayer = null
  this.ko = false;
  this.game_type = '';

  class FortniteLogParser {
    constructor(infoDB, featuresHandler, gameStateManager, supportedFeatures, pluginWhitelist) {
      this._infoDB = infoDB;
      this._featuresHandler = featuresHandler;
      this._gameStateManager = gameStateManager;
      this._supportedFeatures = supportedFeatures;
      this._pluginWhitelist = pluginWhitelist

      this.parse = this.parse.bind(this);
      this.matchStarted = false;
      this.accumulatedRanks = [];
      this.ignoreRanksUntil = {};
      this.playerList = [];
      this.totalKills = 0;
      this.totalDeaths = 0;
      this.totalAssists = 0;
    }

    parse(line) {
      const result = {
        events: [],
        infoUpdates: []
      }

      this._parseServer(line, result);
      this._parsePrivacy(line, result);
      this._gameTitle(line, result);
      this._playersRank(line, result);
      this._matchSessionId(line, result);
      this._partyPlayers(line, result);
      this._matchStart(line, result);
      this._matchEnd(line, result);
      this._messageFeed(line, result);
      this._creativeMap(line, result);
      this._playerName(line, result);
      this._partyId(line, result);
      this._kill(line, result);
      this._balisticKill(line, result);
      this._death(line, result);
      this._balisticDeath(line, result);
      this._balisticAssist(line, result);
      this._revive(line, result);
      this._inVehicle(line, result);
      this._handlePhaseLanded(line, result);
      this._handlePhaseLoading(line, result);
      this._handleGoldDeath(line, result);
      this._handleEmote(line, result);

      const { events, infoUpdates } = result

      for (let event of events) {
        this._handleEvent(event);
      }

      for (let infoUpdate of infoUpdates) {
        this._handleInfoUpdate(infoUpdate);
      }

      return result;
    }

    _parseServer(line, result) {
      const regex1 = /changing our party's current region ID from '(\w+)' to '(\w+)'/;
      const regex2 = /Current selected:\s*"([^"]*)"/;
      const regex3 = /setting default from best \(([^)]+)\)/;
      const regex4 = /AutoRegion\s+(\w+):/;

      let match = line.match(regex1);
      if (match) {
        const fromServer = match[1];
        const toServer = match[2];
        this.server = toServer;
        const infoUpdate = {
          feature: 'game_info',
          key: 'server',
          value: toServer
        };
        result.infoUpdates.push(infoUpdate);
        return; 
      }

      match = line.match(regex2);
      if (match) {
        const selectedServer = match[1];
        this.server = selectedServer;
        const infoUpdate = {
          feature: 'game_info',
          key: 'server',
          value: selectedServer
        };
        result.infoUpdates.push(infoUpdate);
        return; 
      }

      match = line.match(regex3);
      if (match) {
        const defaultServer = match[1];
        this.server = defaultServer;
        const infoUpdate = {
          feature: 'game_info',
          key: 'server',
          value: defaultServer
        };
        result.infoUpdates.push(infoUpdate);
        return; 
      }

      match = line.match(regex4);
      if (match) {
        const autoRegionServer = match[1];
        this.server = autoRegionServer;
        const infoUpdate = {
          feature: 'game_info',
          key: 'server',
          value: autoRegionServer
        };
        result.infoUpdates.push(infoUpdate);
      }
    }

    _parsePrivacy(line, result) {
      const regex1 = /Privacy changed from \w+ to (\w+)/;
      const regex2 = /Privacy \[([^\]]+)\]/;
      const regex3 = /\[FFortMatchmakingUtility::HandlePrivacyChanged\]\s+Privacy:\s*(\w+)/;

      const convertPrivacy = (privacy) => {
        if (privacy === "NoFill") return "public";
        if (privacy === "Private" || privacy === "Fill") return "private";
        return privacy;
      };

      const processMatch = (match) => {
        let toPrivacy = match[1];
        toPrivacy = convertPrivacy(toPrivacy);

        if (toPrivacy && toPrivacy !== "Undefined") {
          const infoUpdate = {
            feature: 'game_info',
            key: 'privacy',
            value: toPrivacy
          };
          result.infoUpdates.push(infoUpdate);
        }
      };

      let match = line.match(regex1);
      if (match) {
        processMatch(match);
        return; 
      }

      match = line.match(regex2);
      if (match) {
        const privacy = convertPrivacy(match[1]);
        if (privacy) {
          const infoUpdate = {
            feature: 'game_info',
            key: 'privacy',
            value: privacy
          };
          result.infoUpdates.push(infoUpdate);
          return; 
        }
      }

      match = line.match(regex3);
      if (match) {
        processMatch(match);
      }
    }

    _gameTitle(line, result) {
      const regex = /Mnemonic=\[([^\]]+)\].*Title \[([^\]]+)\] - ProductTag \[([^\]]+)\]/;
      const regex2 = /to \[Mnemonic=\[([^\]]+)\] Version=\[latest\]\]/;

      let match = line.match(regex);
      if (match) {
        const mnemonic = match[1];
        const title = match[2];
        const productTag = match[3];
        this.gameTitle = mnemonic + '_' + title;

        if (title) {
          const infoUpdate1 = {
            feature: 'game_info',
            key: 'game_title',
            value: title
          };
          result.infoUpdates.push(infoUpdate1);
        }

        if (mnemonic && !mnemonic.includes("set_")) {
          const infoUpdate3 = {
            feature: 'game_info',
            key: 'title_mnemonic',
            value: mnemonic
          };
          result.infoUpdates.push(infoUpdate3);
        }

        if (productTag) {
          if (productTag.includes('FNE')) {
            this.game_type = 'Creative';
          } else if (productTag.includes('BR')) {
            this.game_type = 'Battle Royal';
          } else if (productTag.includes('BlastBerry')) {
            this.game_type = 'Reload';
          } else if (productTag.includes('Figment')) {
            this.game_type = 'OG Battle Royal';
          } else if (productTag.includes('Feral')) {
            this.game_type = 'Ballistic';
          } else if (productTag.includes('DelMar')) {
            this.game_type = 'Rocket Racing';
          } else if (productTag.includes('Juno')) {
            this.game_type = 'Lego Fortnite';
          } else if (productTag.includes('Sparks')) {
            this.game_type = 'Festival';
          } else {
            this.game_type = 'Unknown';
          }
          const infoUpdate2 = {
            feature: 'game_info',
            key: 'game_type',
            value: this.game_type
          };
          result.infoUpdates.push(infoUpdate2);
        }
      } else {
        match = line.match(regex2);
        if (match && match[1] !== '') {
          const mnemonic = match[1];
          this.gameTitle = mnemonic;  

          if (mnemonic) {
            const infoUpdate3 = {
              feature: 'game_info',
              key: 'title_mnemonic',
              value: mnemonic
            };
            result.infoUpdates.push(infoUpdate3);
          }
        }
      }
    }

    _playersRank(line, result) {
      const regex = /LogFortControllerComponentHabanero: \[([^\]]+)\] Progress: Type: ([\w-]+), Current Habanero (\d+), Place ([-]?\d+), Progress ([\d.]+)/;
      const match = line.match(regex);

      if (match) {
        let rank_type = match[2];
        const rank = parseInt(match[3]);
        const progress = parseFloat(match[5]);

        const rankTypeMapping = {
          'ranked-br': 'battle_royal',
          'ranked-zb': 'zero_build',
          'ranked_blastberry_build': 'reload_build',
          'ranked_blastberry_nobuild': 'reload_zero_build',
          'ranked-figment-build': 'OG_battle_royal',
          'ranked-figment-nobuild': 'OG_zero_build'
        };

        if (rank_type === 'delmar-competitive') {
          return;
        }

        if (rankTypeMapping[rank_type]) {
          rank_type = rankTypeMapping[rank_type];
        }

        const currentTime = Date.now();

        if (this.ignoreRanksUntil[rank_type] && currentTime < this.ignoreRanksUntil[rank_type]) {
          return;
        }

        this.ignoreRanksUntil[rank_type] = currentTime + 10000;  

        const existingRank = this.accumulatedRanks.find(item => item.rank_type === rank_type);

        if (existingRank) {
          existingRank.rank = rank;
          existingRank.progress = progress;
        } else {
          this.accumulatedRanks.push({ rank_type: rank_type, rank: rank, progress: progress });
        }

        const infoUpdate = {
          feature: 'game_info',
          key: 'player_rank',
          value: JSON.stringify([...this.accumulatedRanks])  
        };
        result.infoUpdates.push(infoUpdate);
      }
    }
    _matchSessionId(line, result) {
      const regex = /"matchId":"([a-f0-9]+)".*"sessionId":"([a-f0-9]+)"/;
      const match = line.match(regex);
      if (match) {
        const matchId = match[1];
        const sessionId = match[2];
        const infoUpdate1 = {
          feature: 'match',
          key: 'matchID',
          value: matchId
        }
        result.infoUpdates.push(infoUpdate1);

        const infoUpdate2 = {
          feature: 'match',
          key: 'sessionID',
          value: sessionId
        }
        result.infoUpdates.push(infoUpdate2);
      }
    }

    _partyPlayers(line, result) {
      const addRegex = /MatchmakingLog: \[[^\]]+\] Added (.+?) to matchmaking group!/i;

      const removeRegex = /LogParty: Verbose: Removing \[(.+?)\] Id \[.*?\] from \[.*?\]'s team\./i;

      let playerName = null;
      let action = null;

      const addMatch = line.match(addRegex);
      const removeMatch = line.match(removeRegex);

      if (addMatch) {
        action = 'added';
        playerName = addMatch[1];
      } else if (removeMatch) {
        action = 'removed';
        playerName = removeMatch[1];
      }

      if (playerName && action) {
        if (action === 'added') {
          if (!this.playerList.includes(playerName)) {
            this.playerList.push(playerName);
          }
        } else if (action === 'removed') {
          if (this.localPlayer != playerName) {
            this.playerList = this.playerList.filter(player => player !== playerName);
          }
        }

        const infoUpdate = {
          feature: 'game_info',
          key: 'party_players',
          value: JSON.stringify(this.playerList)
        };
        result.infoUpdates.push(infoUpdate);
      }
    }

    _matchStart(line, result) {
      const regex = /Phase\s*=\s*EAthenaGamePhase::(\w+)/;
      const regex2 = /location changed to:\s*(InGame\s+\w+)/;
      const match = line.match(regex);
      let phase = null;
      if (match) {
        phase = match[1];
      }
      const match2 = line.match(regex2);
      if (match || match2) {
        if ((phase == "Aircraft" || match2) && this.matchStarted === false) {
          const event = {
            feature: 'match',
            name: 'matchStart',
            value: null
          }
          result.events.push(event);

          let pseudo_match_id = uuid.v4();
          const infoUpdate = {
            feature: 'match_info',
            key: 'pseudo_match_id',
            value: pseudo_match_id
          }
          result.infoUpdates.push(infoUpdate);

          this.matchStarted = true;
        }
      }
    }

    _matchEnd(line, result) {
      const regex = /FortPostGameScreenRoot/;
      const regex2 = /HandleLocationChanged for \[(.*?)\] from \[.*?\] to \[(.*?)\]/;
      const match = line.match(regex);
      const match2 = line.match(regex2);

      if (match && this.matchStarted === true) {
        this.fireMatchEnd(result);
      }

      if (match2 && this.matchStarted === true) {
        const username = match2[1];  
        const destination = match2[2]; 
        if (this.localPlayer === username && destination === "PreLobby") {
          this.fireMatchEnd(result)
        }
      }
    }

    fireMatchEnd(result) {
      const event = {
        feature: 'match',
        name: 'matchEnd',
        value: null
      }
      result.events.push(event);

      let infoUpdate = {
        feature: 'match_info',
        key: 'pseudo_match_id',
        value: null
      }
      result.infoUpdates.push(infoUpdate);

      infoUpdate = {
        feature: 'map',
        key: 'creative_map',
        value: null
      };
      result.infoUpdates.push(infoUpdate);

      this.matchStarted = false;
      this.totalKills = 0;
      this.totalDeaths = 0;
      this.totalAssists = 0;
    }

    _messageFeed(line, result) {
      const regex = /LogHUDKillFeedListViewModel: Verbose: .*NewKillFeedEntryText: (.+)/;
      const match = line.match(regex);
      if (match) {
        let message = match[1];
        const excludePhrases = ["checked out early", "opted out"];
        if (excludePhrases.some(phrase => message.includes(phrase))) {
          return;
        }
        message = message.replace(/<\/?[^>]+(>|$)/g, "").trim();
        const event = {
          feature: 'match_info',
          name: 'message_feed',
          value: message
        };
        result.events.push(event);
      }
    }


    _creativeMap(line, result) {
      const regex = /Zone Config for Activity (\d{4}-\d{4}-\d{4})\?v=(\d+)/;
      const match = line.match(regex);
      if (match) {
        const map_id = match[1];
        const version = match[2];
        let title = this.gameTitle;

        if (title.startsWith(`${map_id}_`)) {
          title = title.slice(map_id.length + 1);
        }

        const jsonResult = {
          map_id: map_id,
          title: title,
          version: version
        };

        const infoUpdate = {
          feature: 'map',
          key: 'creative_map',
          value: JSON.stringify(jsonResult)
        };
        result.infoUpdates.push(infoUpdate);
      }
    }


    _playerName(line, result) {
      const regex = /ForceQueryProfile for (.+?) accountId=MCP:([a-f0-9]+)\b/;
      const match = line.match(regex);

      if (match) {
        if (this.localPlayer === undefined) {
          let whiteListInfo = this._pluginWhitelist.InfoDB['vehicle_state'];
          this._gameStateManager.setState("lobby", whiteListInfo.config, "lobby");
        }
        const displayName = match[1].trim();
        const userId = match[2];

        const infoUpdate = {
          feature: 'me',
          key: 'name',
          value: displayName
        };
        result.infoUpdates.push(infoUpdate);
        this.localPlayer = displayName;

        const infoUpdate1 = {
          feature: 'match',
          key: 'userID',
          value: userId
        };
        result.infoUpdates.push(infoUpdate1);
      }
    }

    _partyId(line, result) {
      const regex1 = /PartyId\(V2:([a-f0-9]+)\)/;
      const match1 = line.match(regex1);

      const regex2 = /local player's party \[V2:([a-f0-9]+)\]/;
      const match2 = line.match(regex2);

      const partyId = match1 ? match1[1] : match2 ? match2[1] : null;

      if (partyId) {
        const infoUpdate = {
          feature: 'match',
          key: 'partyID',
          value: partyId
        };
        result.infoUpdates.push(infoUpdate);
      }
    }


    _kill(line, result) {
      const ignoreActions = ["knocked out", "knocked down", "slightly \'sploded", "a mis K.-O.", "をダウンさせた", "을 쓰러뜨렸습니다.", "击枪击倒了", "zu Boden geschickt", "ha derribado", "powala", "вырубает игрока", "ha tramortito", "yere devirdi", "nocauteou"];
      const regex = /<(?:LocalKiller|GoldKiller)>([^<]+)<\/>\s*(?:,|\s*)?\s*([\p{L}\p{N}\p{Script=Han}\p{Script=Latin}\p{Script=Cyrillic}\s.'-]+?)?\s*(?:adlı oyuncuyu|ile|で)?\s*(?:bir tüfekle|yere)?\s*<(?:Victim|GoldVictim)>([^<]+)<\/>\s*([\p{L}\p{N}\p{Script=Han}\p{Script=Latin}\p{Script=Cyrillic}\s.'-]*)/u;

      const match = line.match(regex);
      if (match && this.matchStarted === true) {
        let localKiller = match[1];
        localKiller = localKiller.replace(/\s*\(\d+\)$/, "");
        const action = match[2];
        let victim = match[3];
        victim = victim.replace(/\s*\(\d+\)$/, "");
        const action2 = match[4];

        if (localKiller === this.localPlayer) {
          if (!ignoreActions.some(ignoredAction => action?.includes(ignoredAction)) &&
            !ignoreActions.some(ignoredAction => action2?.includes(ignoredAction))) {
            if (localKiller) {
              this.totalKills++;
            }
            const event = {
              feature: 'kill',
              name: 'kill',
              value: this.totalKills
            }
            result.events.push(event);

            const event1 = {
              feature: 'killed',
              name: 'killed',
              value: victim
            }
            result.events.push(event1);

            const infoUpdate = {
              feature: 'kill',
              key: 'kills',
              value: this.totalKills
            }
            result.infoUpdates.push(infoUpdate);
          } else {
            const event2 = {
              feature: 'kill',
              name: 'knockout',
              value: victim
            }
            result.events.push(event2);
          }
        }
      }
    }

    _balisticKill(line, result) {
      if (this.game_type != "Ballistic") {
        return;
      }

      const regex = /\bEliminations Player\b/;
      const match = line.match(regex);
      if (match) {
        this.totalKills++;
        const event = {
          feature: 'kill',
          name: 'kill',
          value: this.totalKills
        }
        result.events.push(event);


        const infoUpdate = {
          feature: 'kill',
          key: 'kills',
          value: this.totalKills
        }
        result.infoUpdates.push(infoUpdate);

      }
    }

    _death(line, result) {
      const ignoreActions = ["knocked out", "knocked down", "knocked themselves out", "sploded"];
      const reviveTerms = ["rebooted"]
      const regexWithKiller = /<(?:GoldKiller|Killer)>([^<]+)<\/>\s+([\w\sÀ-ÿ'-]+)\s+<TeamVictim>([^<]+)<\/>/;
      const regexWithoutKiller = /<TeamVictim>([^<]+)<\/>\s+([^\s]+(?:[\s\w'-]+)?)\s*(?:\(\d+ m\))?/;

      const matchWithKiller = line.match(regexWithKiller);
      const matchWithoutKiller = line.match(regexWithoutKiller);

      if (matchWithKiller && this.matchStarted === true) {
        if (matchWithKiller[1] && matchWithKiller[2] && matchWithKiller[3]) {
          let killer = matchWithKiller[1];
          const action = matchWithKiller[2];
          let teamVictim = matchWithKiller[3];
          teamVictim = teamVictim.replace(/\s*\(\d+\)$/, "");  
          killer = killer.replace(/\s*\(\d+\)$/, "");  

          if (teamVictim === this.localPlayer) {
            if (!ignoreActions.some(ignoredAction => action.includes(ignoredAction))) {
              const event = {
                feature: 'death',
                name: 'death',
                value: null
              }
              result.events.push(event);

              const event1 = {
                feature: 'killer',
                name: 'killer',
                value: killer
              }
              result.events.push(event1);
            } else {
              const event2 = {
                feature: 'death',
                name: 'knockedout',
                value: killer
              }
              result.events.push(event2);
            }
          }
        }
      } else if (matchWithoutKiller && this.matchStarted === true) {
        if (matchWithoutKiller[1] && matchWithoutKiller[2]) {
          let teamVictim = matchWithoutKiller[1];
          teamVictim = teamVictim.replace(/\s*\(\d+\)$/, "");  
          const action = matchWithoutKiller[2];

          if (reviveTerms.some(revivedTerms => action?.includes(revivedTerms)) && matchWithoutKiller[1] === this.localPlayer) {
            this._handleReboot(result);
            return;
          }

          if (teamVictim === this.localPlayer) {

            if (action.includes("bus driver")) {
              return;
            }

            if (!ignoreActions.some(ignoredAction => action?.includes(ignoredAction))) {
              const event3 = {
                feature: 'death',
                name: 'death',
                value: null
              }
              result.events.push(event3);
              return;
            }

            if (ignoreActions.some(ignoredAction => action?.includes(ignoredAction))) {
              const event4 = {
                feature: 'death',
                name: 'knockedout',
                value: null
              }
              result.events.push(event4);
              this.ko = true;
              return;
            }
          }
        }
      }
    }

    _balisticDeath(line, result) {
      const regex = /\bEliminated Player\b/;
      const match = line.match(regex);
      if (match) {
        this.totalDeaths++;
        const event = {
          feature: 'death',
          name: 'death',
          value: this.totalDeaths
        }
        result.events.push(event);

        const infoUpdate = {
          feature: 'death',
          key: 'deaths',
          value: this.totalDeaths
        }
        result.infoUpdates.push(infoUpdate);
      }
    }

    _balisticAssist(line, result) {
      const regex = /\bAssists Player\b/;
      const match = line.match(regex);
      if (match) {
        this.totalAssists++;
        const event = {
          feature: 'assist',
          name: 'assist',
          value: this.totalAssists
        }
        result.events.push(event);

        const infoUpdate = {
          feature: 'assist',
          key: 'assists',
          value: this.totalAssists
        }
        result.infoUpdates.push(infoUpdate);
      }
    }

    _handleReboot(result) {
      const event = {
        feature: 'revived',
        name: 'revived',
        value: null
      }
      result.events.push(event);
    }

    _revive(line, result) {
      const regex = /UFortHUDContext::EnterCameraMode\s*-\s*Entering camera mode/;
      const match = line.match(regex);
      if (match && this.ko == true) {
        const event = {
          feature: 'revived',
          name: 'revived',
          value: null
        }
        result.events.push(event);
        this.ko = false;
      }
    }

    _inVehicle(line, result) {
      const regex = /UDynamicUIManager \[.*?\]: (Adding|Removing) scene: VehicleHUD_Scene/;
      const match = line.match(regex);
      if (match) {
        const infoUpdate = {
          feature: 'phase',
          key: 'in_vehicle',
          value: match[1] === 'Adding' 
        };
        result.infoUpdates.push(infoUpdate);
      }
    }

    _handlePhaseLanded(line, result) {
      const regex = /Player is not skydiving from bus/;
      const match = line.match(regex);
      if (match) {
        const infoUpdate = {
          feature: 'phase',
          key: 'phase',
          value: 'landed'
        };
        result.infoUpdates.push(infoUpdate);
      }
    }

    _handlePhaseLoading(line, result) {
      const regex = / Display: Starting perf report/;
      const match = line.match(regex);
      if (match) {
        let lastPhase = this._infoDB.get("game_info", "phase");
        if (lastPhase === "lobby" || lastPhase === "landed") {
          let whiteListInfo = this._pluginWhitelist.InfoDB['vehicle_state'];
          this._gameStateManager.process(
            'phase',
            whiteListInfo.config,
            'loading_screen',
            false
          )

          this._gameStateManager.setState("loading", whiteListInfo.config, "loading_screen");
        }
      }
    }

    _handleGoldDeath(line, result) {
      const koTerms = [
        "knocked out",
        "knocked down",
        "knocked themselves out",
        "sploded"
      ];

      const regexWithKiller = /<(?:Killer|GoldKiller)>([^<]+)<\/>\s+([\w\s']+)\s+<GoldVictim>([^<]+)<\/>/i;

      const regexWithoutKiller = /<GoldVictim>([^<]+)<\/>\s+got\s+([\w\s']+)\b/i;

      const matchWithKiller = line.match(regexWithKiller);
      const matchWithoutKiller = line.match(regexWithoutKiller);

      if (matchWithKiller && this.matchStarted === true) {
        let goldVictim = matchWithKiller[3];
        goldVictim = goldVictim.replace(/\s*\(\d+\)$/, ""); 
        const action = matchWithKiller[2];

        if (goldVictim === this.localPlayer) {
          if (!koTerms.some(koTerm => action?.includes(koTerm))) {
            result.events.push({
              feature: 'death',
              name: 'death',
              value: null
            });
            return;
          }

          if (koTerms.some(koTerm => action?.includes(koTerm))) {
            result.events.push({
              feature: 'death',
              name: 'knockedout',
              value: null
            });
            this.ko = true;
          }
        }

      } else if (matchWithoutKiller && this.matchStarted === true) {
        let goldVictim = matchWithoutKiller[1];
        goldVictim = goldVictim.replace(/\s*\(\d+\)$/, ""); 
        const action = matchWithoutKiller[2];

        if (goldVictim === this.localPlayer) {
          if (!koTerms.some(koTerm => action?.includes(koTerm))) {
            result.events.push({
              feature: 'death',
              name: 'death',
              value: null
            });
            return;
          }

          if (koTerms.some(koTerm => action?.includes(koTerm))) {
            result.events.push({
              feature: 'death',
              name: 'knockedout',
              value: null
            });
            this.ko = true;
          }
        }
      }
    }

    _handleEvent(event) {
      this._featuresHandler.triggerEvent(event.feature, event.name, event.value);
    }

    _handleInfoUpdate(infoUpdate) {
      const feature = this._supportedFeatures[infoUpdate.feature];
      this._infoDB.set(
        feature.name,
        feature.info[infoUpdate.key].category,
        feature.info[infoUpdate.key].key,
        infoUpdate.value
      );
    }

    _handleEmote(line, result) {
      const regex = /\bPlayEmoteItem\b/;
      const match = line.match(regex);
      if (match) {
        const event = {
          feature: 'match_info',
          name: 'emote_start',
          value: null
        };
        result.events.push(event);
      }
    }

  }
  return FortniteLogParser;
});
