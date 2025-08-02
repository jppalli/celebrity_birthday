"use strict";

define([
	"/games/native_sdk/native_sdk_game.js"
], function(NativeSDKGame) {

  let _nativeSdkGame = new NativeSDKGame();
	async function onAppInit() {
	}

	async function start(gameInfo, isDisabled) {
    _nativeSdkGame.start(gameInfo, isDisabled);
	}

	function shutdown() {
		console.log("[NativeSDKGame] shutdown");
		_nativeSdkGame.shutdown();
	}

	return {
		start:start,
		shutdown: shutdown,
		appInit: onAppInit
	}
});
