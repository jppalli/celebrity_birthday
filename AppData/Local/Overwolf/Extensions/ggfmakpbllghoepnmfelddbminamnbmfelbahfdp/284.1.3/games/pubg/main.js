define(['/utils/InfoDBContainer.js',
	'/utils/FeaturesHandler.js',
	'/utils/gep_internal_info_tracker.js',
	'/games/pubg/supported_features.js',
	'/games/pubg/plugin.js',
	'/games/pubg/plugin_whitelists.js',
	'/utils/game_monitoring_util.js'
],
	function (InfoDBContainer,
		FeaturesHandler,
		GepInternalInfo,
		SupportedFeatures,
		Plugin,
		PluginWhitelist,
		GameMonitoringUtility) {

		const LOG_BLACK_LIST = ["location", "roster", "counters"];
    const PUBG_GAME_ID = 10906;
		let _gameTitle = 'PUBG';

		let _infoDB = new InfoDBContainer({
			logBlacklist: LOG_BLACK_LIST
		}, PUBG_GAME_ID);

		let _monitoring;

		let _featuresHandler;
		let _started = false;

		async function start(gameInfo, isDisabled) {

      _infoDB.gameId = gameInfo.classId;

			_monitoring = new GameMonitoringUtility({
				game: {
					name: _gameTitle,
					id: gameInfo.classId,
				},
				infoDB: _infoDB,
				supportedFeatures: SupportedFeatures,
				pluginWhiteList: PluginWhitelist
			});

			_featuresHandler = new FeaturesHandler({
				monitoring: _monitoring,
				logBlacklist: LOG_BLACK_LIST,
				gepInternalInfoTracker: new GepInternalInfo({ infoDB: _infoDB })
			},gameInfo.classId);

			if (gameInfo) {
				_infoDB.setGameProcessId(gameInfo.processId);
				_featuresHandler.setGameProcessId(gameInfo.processId);
			}

			if (_started) {
				console.info(`[${_gameTitle}] service already started`);
				return;
			}

			console.log(`[${_gameTitle}] starting service`);
			_featuresHandler.addSupportedFeatures(SupportedFeatures);
			_featuresHandler.setSupportedFeatures();

			_infoDB.reset();

			overwolf.games.events.provider
				.onRequiredFeaturesChanged
				.removeListener(onRequiredFeaturesChanged);
			overwolf.games.events.provider
				.onRequiredFeaturesChanged
				.addListener(onRequiredFeaturesChanged);

			Plugin.start(gameInfo, _infoDB, _featuresHandler, isDisabled);

			_started = true;
		}

		function shutdown() {
			console.log(`[${_gameTitle}] shutdown`);
			Plugin.stop();
			_monitoring.stop();
			_started = false;
		}

		function onAppInit() {
			console.log(`[${_gameTitle}] onAppInit`);
		}


		function onRequiredFeaturesChanged(requiredFeatures) {
			console.log(
				"onRequiredFeaturesChanged: " + JSON.stringify(requiredFeatures));
		}

		return {
			start: start,
			shutdown: shutdown,
			appInit: onAppInit
		};
	});
