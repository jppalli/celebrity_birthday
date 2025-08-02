"use strict";

define(['/games/lol/supported_features.js',
	'/games/lol/spectator_detection.js',
	'/games/lol/SummonerInfoFetcher.js',
	'/games/lol/match_fetcher.js',
	'/games/lol/monitoring/crash_dmp_monitor.js',
	'/utils/ac_monitor.js',
	'/games/lol/plugin.js',
	'/games/lol/lol_live_client_data.js',
	'/utils/InfoDBContainer.js',
	'/utils/FeaturesHandler.js',
	'/utils/gep_internal_info_tracker.js',
	'/games/lol/monitoring/monitoring_util.js',
	'/utils/io_plugin.js'],
	function (SUPPORTED_FEATURES,
		_spectatorDetection,
		_summonerFetcher,
		_matchFetcher,
		_crashDmpMonitor,
		_acMonitor,
		_plugin,
		LoLLiveClientData,
		InfoDBContainer,
		FeaturesHandler,
		GepInternalInfo,
		LoLMonitoringUtility,
		IOPlugin) {

		const LOG_BLACK_LIST = [
			'gold',
			'minionKills',
			'minions_kills',
			'ping',
			'local_player_damage',
			'damage',
			'heal',
			'ability',
			'all_players',
			'game_data',
			'active_player',
			'events',
			'team_frames',
			'chat'
		];
		const LOL_GAME_ID = 5426;
		const LEP_ID = 10902;
		const TFT_ID = 21570;
		const ARENA_ID = 21556;
		const SWARM_ID = 13956;
		const BRAWL_ID = 21568;
		const kTFTname = 'TFT';
		const kLOLname = 'LOL';
		const kARENAname = 'ARENA';
		const kSWARMname = 'SWARM';
		const kBRAWLname = 'BRAWL';

		let _featuresHandler;
		let _infoDB = new InfoDBContainer({
			logBlacklist: LOG_BLACK_LIST
		}, (window.___gameid___ || 5426));

		let _started = false;
		let _monitoring;
		let _lolLiveClientData = null;
		let _gameVersion = null;

		async function start(gameInfo, isDisabled, gamesStatus, gepVersion) {
			if (_started) {
				console.info("LOL SPECIFIC SERVICE ALREADY STARTED");
				return;
			}

			_monitoring = new LoLMonitoringUtility({
				infoDB: _infoDB
			});

			_monitoring.setDisabled(isDisabled)

			let isTtf = undefined;
			let isArena = undefined;
			let isSwarm = undefined;
			let isBrawl = undefined;
			let disabledRegions = [];
			try {
				await _setLauncherRequiredFeatures();
				const { res: { game_info: { selected_game } } } = await _getLauncherInfo();
				const { res: { game_info: { game_version } } } = await _getLauncherInfo();
				const { res: { summoner_info: { player_info } } } = await _getLauncherInfo();
				const { res: { summoner_info: { region } } } = await _getLauncherInfo();
				const { res: { lobby_info: { queueId } } } = await _getLauncherInfo();
				const tftStatus = gamesStatus.find((game) => game.game_id === TFT_ID);
				const arenaStatus = gamesStatus.find((game) => game.game_id === ARENA_ID);
				const swarmStatus = gamesStatus.find((game) => game.game_id === SWARM_ID);
				const brawlStatus = gamesStatus.find((game) => game.game_id === BRAWL_ID);

				if (player_info) {
					let summoner = JSON.parse(player_info);
					let summoner_name = summoner.gameName;
					_infoDB.set(SUPPORTED_FEATURES.summoner_info.name,
						SUPPORTED_FEATURES.summoner_info.info.name.category,
						SUPPORTED_FEATURES.summoner_info.info.name.key,
						summoner_name);
				}

				if (region && disabledRegions.includes(region)) {
					console.info(`Game was remotely disabled in region '${region}'`);
					return;
				}

				if (queueId) {
					_infoDB.set(SUPPORTED_FEATURES.matchState.name,
						SUPPORTED_FEATURES.matchState.info.queueId.category,
						SUPPORTED_FEATURES.matchState.info.queueId.key,
						queueId);
				}

				if (selected_game) {
					if (selected_game == "tft") {
						isTtf = true;
					}

					if (selected_game == "arena") {
						isArena = true;
					}

					if (selected_game == "swarm") {
						isSwarm = true;
					}

					if (selected_game == "brawl") {
						isBrawl = true;
					}

					if (isTtf && tftStatus.disabled) {
						console.info("[LOL Service] TFT was remotely disabled.");
						_monitoring.sendTftDisabled(gepVersion);
						return;
					}

					if (isArena && arenaStatus.disabled) {
						console.info("[LOL Service] ARENA was remotely disabled.");
						_monitoring.sendArenaDisabled(gepVersion);
						return;
					}

					if (isSwarm && swarmStatus.disabled) {
						console.info("[LOL Service] SWARM was remotely disabled.");
						_monitoring.sendSwarmDisabled(gepVersion);
						return;
					}

					if (isBrawl && brawlStatus.disabled) {
						console.info("[LOL Service] BRAWL was remotely disabled.");
						_monitoring.sendBrawlDisabled(gepVersion);
						return;
					}
				}

				if (selected_game == undefined) {
					const { res: { lobby_info: { queueId } } } = await _getLauncherInfo();
					let gamePlaying = kLOLname;
					if (queueId == 1090 || queueId == 1100 || queueId == 1110 || queueId == 1111 || queueId == 1130 || queueId == 1092) {
						gamePlaying = kTFTname;
					}
					else if (queueId == 1700) {
						gamePlaying = kARENAname;
					}
					else if (queueId == 1840) {
						gamePlaying = kSWARMname;
					}
					else if (queueId == 2300) {
						gamePlaying = kBRAWLname;
					}
					_plugin.setOld();
					_plugin.setGame(gamePlaying);
				}

				if (game_version) {
					_gameVersion = game_version;
				}
			} catch (error) {
				console.log('[LOL Service] TFT Remote disable check failed:', error);
			}

			console.log("STARTING LOL SPECIFIC SERVICE");
			const isTFT = isTtf != undefined && isTtf;

			_featuresHandler = new FeaturesHandler({
				logBlacklist: ['counters', 'damage', 'heal', 'abilities', 'chat'],
				monitoring: _monitoring,
				gepInternalInfoTracker: new GepInternalInfo({ infoDB: _infoDB })
			}, window.___gameid___ | LOL_GAME_ID);

			if (gameInfo) {
				_infoDB.setGameProcessId(gameInfo.processId);
				_featuresHandler.setGameProcessId(gameInfo.processId);
			}

			let game_mode;
			if (isTtf === true) {
				console.log("TFT game detected [LEP]");
				_plugin.setGame(kTFTname);
				_infoDB.setGameId(TFT_ID);
				_featuresHandler.setGameId(TFT_ID);
				_monitoring.setTFTGameMode(kTFTname);
				game_mode = kTFTname;
			} else if (isArena === true) {
				console.log("ARENA game detected [LEP]");
				game_mode = kARENAname;
				_plugin.setGame(kARENAname);
				_infoDB.setGameId(ARENA_ID);
				_featuresHandler.setGameId(ARENA_ID);
				_monitoring.setARENAGameMode(kARENAname);
			} else if (isSwarm === true) {
				console.log("SWARM game detected [LEP]");
				game_mode = kSWARMname;
				_plugin.setGame(kSWARMname);
				_infoDB.setGameId(SWARM_ID);
				_featuresHandler.setGameId(SWARM_ID);
				_monitoring.setSWARMGameMode(kSWARMname);
			} else if (isBrawl === true) {
				console.log("BRAWL game detected [LEP]");
				game_mode = kBRAWLname;
				_plugin.setGame(kBRAWLname);
				_infoDB.setGameId(BRAWL_ID);
				_featuresHandler.setGameId(BRAWL_ID);
				_monitoring.setBRAWLGameMode(kBRAWLname);
			} else {
				console.log("LOL game detected [LEP]");
				game_mode = kLOLname;
				_plugin.setGame(kLOLname);
				_infoDB.setGameId(window.___gameid___ || LOL_GAME_ID);
				_featuresHandler.setGameId(window.___gameid___ || LOL_GAME_ID);
			}

			_featuresHandler.addSupportedFeatures(SUPPORTED_FEATURES);
			_featuresHandler.setSupportedFeatures();
			_infoDB.reset();

			overwolf.games.events.provider.onRequiredFeaturesChanged
				.removeListener(onRequiredFeaturesChanged);
			overwolf.games.events.provider.onRequiredFeaturesChanged
				.addListener(onRequiredFeaturesChanged);

			if (_lolLiveClientData) {
				_lolLiveClientData.stop();
			}

			_lolLiveClientData = new LoLLiveClientData({
				infoDB: _infoDB,
				featuresHandler: _featuresHandler,
				monitoring: _monitoring,
			});


			_lolLiveClientData.start(_onLiveDataSetGameMode.bind(this));

			IOPlugin.asyncAssureCreation().then(function (_ioPlugin) {
				_detectSpectatorMode(gameInfo);

				_summonerFetcher.start(gameInfo, _infoDB, _ioPlugin, _monitoring);
				_matchFetcher.start(gameInfo,
					_infoDB,
					_featuresHandler,
					_ioPlugin,
					_monitoring,
					isDisabled,
					game_mode);
				_crashDmpMonitor.start(gameInfo, _ioPlugin, _monitoring, _gameVersion);
				_acMonitor.start(gameInfo, _ioPlugin);

				_started = true;
			}).catch(_ => {
				console.log("[LOL SERVICE] failed to create io plugin service");
			});
		}

		function shutdown() {
			console.log("LoL: shutdown");
			_summonerFetcher.stop();
			_matchFetcher.stop();
			_crashDmpMonitor.stop();
			_acMonitor.stop();
			_plugin.stop();
			_monitoring.stop();

			if (_lolLiveClientData) {
				_lolLiveClientData.stop();
				_lolLiveClientData = null;
			}

			_started = false;
		}

		function onAppInit() {
			console.log("[LoL] onAppInit");
			IOPlugin.asyncAssureCreation().then(_ => {
			}).catch(_ => {
			})
		}


		function onRequiredFeaturesChanged(requiredFeatures) {
			console.log("onRequiredFeaturesChanged: " +
				JSON.stringify(requiredFeatures));
		}

		function _detectSpectatorMode(gameInfo) {
			var spectatorMode = _spectatorDetection.inSpectatorMode(gameInfo);

			if (spectatorMode) {
				console.log('Detected spectator mode: ' + gameInfo.commandLine);
				_infoDB.set(SUPPORTED_FEATURES.game_mode.name,
					SUPPORTED_FEATURES.match_info.info.game_mode.category,
					SUPPORTED_FEATURES.match_info.info.game_mode.key,
					"spectator");
			}
		}

		function _onLiveDataSetGameMode() {
			_plugin.didSetGameMode();
		}

		function _setLauncherRequiredFeatures() {
			return new Promise((resolve, reject) => {
				overwolf.games.launchers.events.setRequiredFeatures(
					LEP_ID,
					['lobby_info', 'game_info', 'summoner_info'],
					(result) => {
						if (result.status !== 'success') {
							console.log('[LOL Service] Failed to set LEP required features.');
							reject(result);
							return;
						}
						setTimeout(resolve, 500, result);
					})
			})
		}

		function _getLauncherInfo() {
			return new Promise((resolve, reject) => {
				overwolf.games.launchers.events.getInfo(LEP_ID, (result) => {
					if (result.status !== 'success') {
						console.log('[LOL Service] Failed to get info from LEP.');
						reject(result);
						return;
					}
					resolve(result);
				})
			})
		}
		return {

			start: start,
			shutdown: shutdown,
			appInit: onAppInit
		}
	});
