define([
  '/games/service/PluginHandler.js',
  '/libs/js-uuid.js',
  "/utils/base_utils.js",
  '/utils/io_plugin.js',
  '/utils/ac_monitor.js',
  "/games/valorant/game_constants.js",
  '/games/valorant/eligibility-tester.js',

], function (
  PluginHandler,
  uuid,
  base_utils,
  IOPlugin,
  _acMonitor,
  Constants,
  valorantEligibilityTester,
) {

  return class ValorantPluginHandler extends PluginHandler {
    _featuresToClearOnMatchStart = [
      {
        feature: this._supportedFeatures.match_info,
        infos: [
          'match_outcome'
        ]
      },
    ];

    _match_started = false;
    _mapName = null;
    _matchId = null;

    _featuresToClearOnMatchEnd = [
      {
        feature: this._supportedFeatures.me,
        infos: [
          'agent',
          'health',
          `abilities`
        ]
      },
      {
        feature: this._supportedFeatures.match_info,
        infos: [
          'game_mode',
          'round_number',
          'round_phase',
          'round_report',
          'score',
          'match_score',
          'team',
          'pseudo_match_id',
          'map',
          `escalation_stage`,
          'observing',
          'ui_team_order_allies',
          'ui_team_order_enemies'
        ]
      },
      {
        feature: this._supportedFeatures.kill,
        infos: [
          'kills',
          'headshots',
          'assists'
        ]
      },
      {
        feature: this._supportedFeatures.death,
        infos: [
          'deaths'
        ]
      }
    ];

    constructor(config) {
      super(config);

    }

    testMemoryIntegrity() {
      return true;
    }

    async start(gameInfo, infoDB, featuresHandler, isDisabled) {
      const eligible =
        await valorantEligibilityTester.isEligible(gameInfo.executionPath);
      if (!eligible) {
        console.log("[Valorant] - Game is not Eligible to run");
        return;
      }

      await super.start(gameInfo, infoDB, featuresHandler, isDisabled);
      IOPlugin.asyncAssureCreation().then(function (_ioPlugin) {
        _acMonitor.start(gameInfo, _ioPlugin);
        _started = true;
      }).catch(_ => {
        console.log("[Valorant SERVICE] failed to create io plugin service");
      });

      this.getServerRegion(gameInfo);
    }

    stop() {
      super.stop();
      _acMonitor.stop();
    }

    _handleSingleGameInfo(info) {
      switch (info.key) {
        case 'round': {
          this._handleSideSwitch(info.value);
        }
        case 'kills':
        case 'headshots':
        case 'assists':
        case 'deaths': {
          info.value = parseInt(info.value);
          break;
        }
        case 'health': {
          info.value = Math.ceil(info.value);
          break;
        }
        case 'game_mode': {
          const value = JSON.parse(info.value);
          value.custom = !!+value.custom;
          info.value = JSON.stringify(value);
          break;
        }
        case 'abilities': {
          const value = JSON.parse(info.value);
          value.C = value.C === 1 ? true : false;
          value.Q = value.Q === 1 ? true : false;
          value.E = value.E === 1 ? true : false;
          value.X = value.X === 1 ? true : false;
          info.value = JSON.stringify(value);
          break;
        }
        case 'round_report': {
          const value = JSON.parse(info.value);
          value.damage = parseFloat(value.damage);
          value.hit = parseInt(value.hit);
          value.headshot = parseInt(value.headshot);
          value.final_headshot = parseInt(value.final_headshot);
          info.value = JSON.stringify(value);
          break;
        }
        case 'round_outcome': {
          const value = JSON.parse(info.value);
          value.won = parseInt(value.won);
          value.lost = parseInt(value.lost);
          info.value = JSON.stringify(value);
          break;
        }
        case (info.key.match(/roster_/) || {}).input: {
          const value = JSON.parse(info.value);
          value.rank = +value.rank;
          value.locked = !!+value.locked;
          value.local = !!+value.local;
          value.teammate = !!+value.teammate;
          info.value = JSON.stringify(value);
          break;
        }
        case (info.key.match(/scoreboard_/) || {}).input: {
          const value = JSON.parse(info.value);
          value.name = base_utils.b64DecodeUnicode(value.name);
          value.character = value.character;
          value.kills = +value.kills;
          value.deaths = +value.deaths;
          value.assists = +value.assists;
          value.money = +value.money;
          value.is_local = !!+value.is_local;
          value.teammate = !!+value.teammate;
          value.alive = !!+value.alive;
          value.weapon = value.weapon;
          value.spike = value.spike === 'TX_Hud_Bomb_S' ? true : false;
          info.value = JSON.stringify(value);
          break;
        }
        case 'killfeed': {
          const value = JSON.parse(info.value);
          value.attacker = base_utils.b64DecodeUnicode(value.attacker);
          value.victim = base_utils.b64DecodeUnicode(value.victim);
          value.assist1 = value.assist1;
          value.assist2 = value.assist2;
          value.assist3 = value.assist3;
          value.assist4 = value.assist4;
          value.weapon = value.weapon;
          value.ult = value.ult;
          value.headshot = !!+value.headshot;
          value.is_attacker_teammate = !!+value.is_attacker_teammate;
          value.is_victim_teammate = !!+value.is_victim_teammate;
          info.value = JSON.stringify(value);
          break;
        }
        case 'escalation_stage': {
          const value = JSON.parse(info.value);
          let { team_1: attacker, team_2: defender } = value;
          let newData = { attacker, defender };
          info.value = JSON.stringify(newData);
          break;
        }
        case 'spectated': {
          info.value = base_utils.b64DecodeUnicode(info.value);
          break;
        }
        case 'planted_site': {
          const value = JSON.parse(info.value);
          this._bombSites(value);
        }
      }

      super._handleSingleGameInfo(info);
      this._handleEvents(info);
    }

    _handleSingleEvent(event) {

      let pluginEventName = event.name;
      let metadata = this._pluginWhitelist.Events[pluginEventName];
      if (!metadata) {
        return;
      }

      switch (event.name) {
        case "shop":
        case "tabmenu":
          this._handleScreeens(event);
          break;
        case "killfeed":
          this._handleKillfeedEvent(event)
        case "planted":
        case "defused":
        case "detonated":
          super._handleSingleEvent(event)
          break;
        case 'planted_location': {
          const value = JSON.parse(event.data);
          this._bombSitesRound(value);
        }
      }
    }

    _handleSideSwitch(roundNum) {
      const { category: modeCategory, key: modeKey } =
        this._supportedFeatures.match_info.info.game_mode;

      const rawMode = this._infoDB.get(modeCategory, modeKey);
      const gameMode = JSON.parse(rawMode);

      if (!gameMode || !gameMode.mode) {
        return;
      }

      let switchRound = null;
      if (gameMode.mode == 'bomb') {
        switchRound = '13';
      } else if (gameMode.mode == "quick_bomb") {
        switchRound = '4';
      } else {
        switchRound = '5';
      }

      if (roundNum === switchRound || parseInt(roundNum) > 24) {
        const { category: sideCategory, key: sideKey } =
          this._supportedFeatures.match_info.info.team;

        const side = this._infoDB.get(sideCategory, sideKey);
        const newSide = side === 'attack' ? 'defense' : 'attack';

        this._infoDB.set(
          this._supportedFeatures.match_info.name,
          sideCategory,
          sideKey,
          newSide
        )
      }
    }

    _handleEvents(info) {
      switch (info.key) {
        case 'scene':
        case 'round_phase':
        case 'matchstate': {
          this._handleMatchState(info);

          break;
        }
        case 'kills': {
          this._handleKill(info);

          break;
        }
        case 'headshots': {
          this._handleHeadshots(info);

          break;
        }
        case 'assists': {
          this._handleAssist(info);

          break;
        }
        case 'deaths': {
          this._handleDeath(info);

          break;
        }
      }
    }

    _handleMatchState(info) {
      if (
        info.key === 'matchstate' &&
        info.value === 'InProgress'
      ) {
        this._handleMatchStart();
      } else if (
        info.key === 'round_phase' &&
        info.value === 'game_end'
      ) {
        this._handleMatchEnd();
      }
      else if (
        info.key === 'scene' &&
        info.value === 'MainMenu'
      ) {
        this._handleMatchEnd();
        let _ClearGameMode = [
          {
            feature: this._supportedFeatures.match_info,
            infos: [
              'game_mode',
              'map'
            ]
          }
        ];
        this._clearData(_ClearGameMode);
      }
    }

    _handleMatchStart() {
      super._handleSingleEvent({ name: 'match_start' })
      this._clearData(this._featuresToClearOnMatchStart);

      const id = uuid.v4();
      const { name, info } = this._supportedFeatures.match_info;
      const { category, key } = info.pseudo_match_id;
      this._checkForPbe();
      this._infoDB.set(
        name,
        category,
        key,
        id
      );

      const mapInfo = this._supportedFeatures.match_info.info.map;
      const mapCategory = mapInfo.category;
      const mapKey = mapInfo.key;
      this._mapName = this._infoDB.get(mapCategory, mapKey);

      const matchIdNum = this._supportedFeatures.match_info.info.match_id;
      const matchCategory = matchIdNum.category;
      const matchKey = matchIdNum.key;
      this._matchId = this._infoDB.get(matchCategory, matchKey);

      if (this._match_started) {
        super._log("skip match started (already started) ")
        return;
      }
      this._match_started = true;

      const { category: modeCategory, key: modeKey } =
        this._supportedFeatures.match_info.info.game_mode;

      const rawMode = this._infoDB.get(modeCategory, modeKey);
      const gameMode = JSON.parse(rawMode);

      if (!gameMode || !gameMode.mode) {
        return;
      }

      if (gameMode.mode === 'escalation') {
        const data = { "attacker": 0, "defender": 0 };
        this._infoDB.set(
          this._supportedFeatures.match_info.name,
          this._supportedFeatures.match_info.info.escalation_stage.category,
          this._supportedFeatures.match_info.info.escalation_stage.key,
          JSON.stringify(data)
        )
      }
    }

    _handleMatchEnd() {
      if (!this._match_started) {
        super._log("skip match end (already ended) ")
        return;
      }

      if (this._match_started) {
        super._handleSingleEvent({ name: 'match_end' })
      }
      this._handleMatchOutcome();
      this._clearData(this._featuresToClearOnMatchEnd);

      this._match_started = false;
    }

    _handleMatchOutcome() {
      const { category, key } = this._supportedFeatures.match_info.info.score;

      const rawScore = this._infoDB.get(category, key);
      const score = JSON.parse(rawScore);

      if (!score) {
        return;
      }

      const matchOutcome = this._calculateMatchOutcome(score);
      this._infoDB.set(
        this._supportedFeatures.match_info.name,
        this._supportedFeatures.match_info.info.match_outcome.category,
        this._supportedFeatures.match_info.info.match_outcome.key,
        matchOutcome
      )
    }

    _calculateMatchOutcome(score) {
      let outcome = null;

      if (score.won > score.lost) {
        outcome = 'victory';
      } else if (score.lost > score.won) {
        outcome = 'defeat';
      } else {
        outcome = 'draw';
      }

      return outcome;
    }

    _handleKill(info) {
      super._handleSingleEvent({ name: 'kill', data: info.value })
    }

    _handleHeadshots(info) {
      super._handleSingleEvent({ name: 'headshot', data: info.value })
    }

    _handleAssist(info) {
      super._handleSingleEvent({ name: 'assist', data: info.value })
    }

    _handleDeath(info) {
      super._handleSingleEvent({ name: 'death', data: info.value })
    }

    _handleScreeens(info) {
      let is_open = info.data;
      is_open = is_open === "1" ? "open" : "close";
      if (info.name === "shop") {
        super._handleSingleEvent({ name: 'shop', data: is_open })
      } else if (info.name === "tabmenu") {
        super._handleSingleEvent({ name: 'tabmenu', data: is_open })
      }
    }

    _handleKillfeedEvent(event) {
      const value = JSON.parse(event.data);
      value.attacker = base_utils.b64DecodeUnicode(value.attacker);
      value.victim = base_utils.b64DecodeUnicode(value.victim);
      value.headshot = !!+value.headshot;
      value.is_attacker_teammate = !!+value.is_attacker_teammate;
      value.is_victim_teammate = !!+value.is_victim_teammate;
      event.data = JSON.stringify(value);
      super._handleSingleEvent({ name: 'kill_fedd', data: event })
    }

    _checkForPbe() {
      overwolf.games.getRunningGameInfo((res) => {
        if (!res || !res.isRunning) {
          return;
        }

        const { name, info } = this._supportedFeatures.game_info;
        const { key, category } = info.is_pbe;
        const gameId = Math.floor(res.id / 10);
        const isPbe = gameId === 22904 ? true : false;
        this._infoDB.set(
          name,
          category,
          key,
          isPbe
        );
      });
    }

    getServerRegion(gameInfo) {
      try {
        const commandLine = gameInfo.commandLine;
        if (!commandLine) {
          return false;
        }

        if (!this._infoDB) {
          return false;
        }

        const matches = commandLine.match(/(?<=-ares-deployment\=)\S*/);
        if (!matches) {
          return;
        }

        const serverRegion = matches[0];

        this._infoDB.set(
          this._supportedFeatures.me.name,
          this._supportedFeatures.me.info.server.category,
          this._supportedFeatures.me.info.server.key,
          serverRegion
        );
      } catch (err) {
        console.error('getServerRegion error ', err);
      }
    }

    _bombSites(value) {
      const roundSites = [];
      const mapData = Constants.maps.find(map => map.name === this._mapName);

      console.log(`Saved match id --> "${this._matchId}" || event match id --> ${value.match}`);
      if (mapData && this._matchId === value.match) {
        const numOfSites = mapData.bomb_sites_count;
        const coordIndex = mapData.coord_index;
        const invert = mapData.invert;
        const sitesMap = mapData.sites_map || [];
        const [siteA, siteB, siteC] = sitesMap;
        const radius = mapData.radius;

        switch (numOfSites) {
          case 2:
            for (const roundKey in value) {
              if (roundKey.startsWith('round_')) {  
                const round = value[roundKey];
                const xValue = round.x;
                const yValue = round.y;
                let site;

                if ((invert === 0) || (coordIndex === "X")) {
                  if (xValue > 0) {
                    site = 'A';
                  } else if (xValue < 0) {
                    site = 'B';
                  } else {
                    site = 'not_planted';
                  }
                } else if (invert === 1) {
                  if (xValue < 0) {
                    site = 'A';
                  } else if (xValue > 0) {
                    site = 'B';
                  } else {
                    site = 'not_planted';
                  }
                }

                if (coordIndex === "Y") {
                  if (yValue > 0) {
                    site = 'A';
                  } else if (yValue < 0) {
                    site = 'B';
                  } else {
                    site = 'not_planted';
                  }
                }

                const roundNumber = parseInt(roundKey.split('_')[1], 10);
                roundSites.push({ round: roundNumber, site: site });
              }
            }
            this._infoDB.set(
              this._supportedFeatures.match_info.name,
              this._supportedFeatures.match_info.info.planted_site.category,
              this._supportedFeatures.match_info.info.planted_site.key,
              JSON.stringify(roundSites)
            );
            break;
          case 3:
            for (const roundKey in value) {
              if (roundKey.startsWith('round_')) {  
                const round = value[roundKey];
                const xValue = round.x;
                const yValue = round.y;
                let site;

                if (!siteA || !siteB || !siteC) {
                  return;
                }

                if (xValue === 0 || yValue === 0) {
                  site = 'not_planted';
                } else if (coordIndex) {
                  if (coordIndex === "X") {
                    if (Math.abs(xValue - siteA) <= radius) {
                      site = 'A';
                    } else if (Math.abs(xValue - siteB) <= radius) {
                      site = 'B';
                    } else if (Math.abs(xValue - siteC) <= radius) {
                      site = 'C';
                    } else {
                      site = 'not_planted';
                    }
                  } else if (coordIndex === "Y") {
                    if (Math.abs(yValue - siteA) <= radius) {
                      site = 'A';
                    } else if (Math.abs(yValue - siteB) <= radius) {
                      site = 'B';
                    } else if (Math.abs(yValue - siteC) <= radius) {
                      site = 'C';
                    } else {
                      site = 'not_planted';
                    }
                  }
                } else {
                  site = 'not_planted'; 
                }

                const roundNumber = parseInt(roundKey.split('_')[1], 10);
                roundSites.push({ round: roundNumber, site: site });
              }
            }
            this._infoDB.set(
              this._supportedFeatures.match_info.name,
              this._supportedFeatures.match_info.info.planted_site.category,
              this._supportedFeatures.match_info.info.planted_site.key,
              JSON.stringify(roundSites)
            );
            break;
          default:
            break;
        }
      } else {
      }
    }

    _bombSitesRound(value) {
      const xValue = value.x;
      const yValue = value.y;

      const mapData = Constants.maps.find(map => map.name === this._mapName);
      if (!mapData) {
        return;
      }

      const numOfSites = mapData.bomb_sites_count;
      const coordIndex = mapData.coord_index;
      const invert = mapData.invert;
      const sitesMap = mapData.sites_map || [];
      const [siteA, siteB, siteC] = sitesMap;
      const radius = mapData.radius;
      let site = 'not_planted';

      if (numOfSites === 2) {
        if ((invert === 0) || (coordIndex === "X")) {
          site = xValue > 0 ? 'A' : (xValue < 0 ? 'B' : 'not_planted');
        } else if (invert === 1) {
          site = xValue < 0 ? 'A' : (xValue > 0 ? 'B' : 'not_planted');
        }

        if (coordIndex === "Y") {
          site = yValue > 0 ? 'A' : (yValue < 0 ? 'B' : 'not_planted');
        }

      } else if (numOfSites === 3) {
        if (coordIndex === "X") {
          if (Math.abs(xValue - siteA) <= radius) {
            site = 'A';
          } else if (Math.abs(xValue - siteB) <= radius) {
            site = 'B';
          } else if (Math.abs(xValue - siteC) <= radius) {
            site = 'C';
          }
        } else if (coordIndex === "Y") {
          if (Math.abs(yValue - siteA) <= radius) {
            site = 'A';
          } else if (Math.abs(yValue - siteB) <= radius) {
            site = 'B';
          } else if (Math.abs(yValue - siteC) <= radius) {
            site = 'C';
          }
        }
      }

      super._handleSingleEvent({name: 'planted_location', data: site });
    }
  };
});