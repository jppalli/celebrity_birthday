"use strict";

define([
	"/games/roblox/log_listener.js",
	'/utils/io_plugin.js',
], function(RobloxLogListener, IOPlugin) {

	  let _logListener = new RobloxLogListener();

	async function onAppInit() {
	}

	async function start(gameInfo) {

		overwolf.games
		.events
		.provider
		.onRequiredFeaturesChanged.removeListener(function (res) {
			onRequiredFeaturesChanged(res);
		});

	overwolf.games
		.events
		.provider
		.onRequiredFeaturesChanged.addListener(function (res) {
			onRequiredFeaturesChanged(res)
		});

		IOPlugin.asyncAssureCreation().then(function (ioPlugin) {
			_logListener.start(gameInfo, ioPlugin);
		}).catch(_ => {
			console.log(" failed to create io plugin service");
		});
	}

	function shutdown() {
		console.log("[Roblox] shutdown");
		_logListener.shutdown();

		overwolf.games
		.events
		.provider
		.onRequiredFeaturesChanged.removeListener(function (res) {
			onRequiredFeaturesChanged(res);
		});
	}

	function onRequiredFeaturesChanged(requiredFeatures) {
		console.log("onRequiredFeaturesChanged: " + JSON.stringify(requiredFeatures));
	}

	return {
		start:start,
		shutdown: shutdown,
		appInit: onAppInit,

			}
});
