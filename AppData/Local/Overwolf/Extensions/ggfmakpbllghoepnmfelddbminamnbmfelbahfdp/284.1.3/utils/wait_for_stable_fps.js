"use strict";

define(function () {
  const Constants = {
  };

  function waitForFPS(params) {
    var framerateStabilized = false;
    var requestingFps = false;
    var fpsCount = 0;
    var killTimer = null;

    return new Promise(function (resolve, reject) {

      function _onBenchmarkData(data) {
        var fps = Number(data.Fps);

        console.info('FPS ' + data.Fps);

        if (framerateStabilized) {
          overwolf.benchmarking.stopRequesting();
          requestingFps = false;
          return;
        }

        if (isNaN(fps)) {
          fpsCount = 0; 
          return;
        }

        if ((fps >= params.stableFPS) && 
            (fpsCount < params.consecutiveStableFPS)) {
          fpsCount++;
        } else if (fps < params.stableFPS) {
          fpsCount = 0; 
        } else {
          framerateStabilized = true;

                    if (killTimer != null) {
            clearTimeout(killTimer);
            killTimer = null;
          }
          return resolve();
        }
      }

      if (framerateStabilized) {
        return resolve();
      }

      overwolf.games.onGameInfoUpdated.addListener(function (changeData) {
        if (changeData.gameInfo &&
          changeData.gameInfo.isRunning &&
          changeData.gameInfo.isInFocus &&
          !requestingFps &&
          !framerateStabilized) {
          requestingFps = true;
          overwolf.benchmarking.requestFpsInfo(1000, function (data) {});
        }

        if (changeData.runningChanged &&
          (!changeData.gameInfo || !changeData.gameInfo.isRunning)) {
          framerateStabilized = false;
          fpsCount = 0;
          requestingFps = false;
        }
      });

      overwolf.benchmarking.onFpsInfoReady.removeListener(_onBenchmarkData);
      overwolf.benchmarking.onFpsInfoReady.addListener(_onBenchmarkData);
      overwolf.games.getRunningGameInfo(function (gameInfo) {
        if (gameInfo && gameInfo.isRunning && gameInfo.isInFocus) {
          requestingFps = true;
          overwolf.benchmarking.requestFpsInfo(1000, function (data) {});
        }
      });

      if (params.rejectAfterTimeout) {
        setTimeout(function () {
          framerateStabilized = true;
          overwolf.benchmarking.stopRequesting();
          requestingFps = false;
          return reject();
        }, params.rejectTimeoutInMilliseconds);
      }
    });
  }

	return {
    waitForFPS: waitForFPS
	}
});

