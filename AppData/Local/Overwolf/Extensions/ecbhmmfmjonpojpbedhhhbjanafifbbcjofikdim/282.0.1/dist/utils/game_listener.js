define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GameListener = void 0;
    class GameListener {
        constructor(onGameStarted, onGameEnded) {
            this.onGameInfoUpdated = (update) => {
                if (!update || !update.gameInfo) {
                    return;
                }
                if (!update.runningChanged && !update.gameChanged) {
                    return;
                }
                if (update.gameInfo.isRunning) {
                    this._gameStarted(update.gameInfo);
                }
                else {
                    this._gameEnded(update.gameInfo);
                }
            };
            this.onRunningGameInfo = (info) => {
                if (!info) {
                    return;
                }
                if (info.isRunning) {
                    this._gameStarted(info);
                }
            };
            this._gameStarted = onGameStarted;
            this._gameEnded = onGameEnded;
        }
        start() {
            overwolf.games.onGameInfoUpdated.removeListener(this.onGameInfoUpdated);
            overwolf.games.onGameInfoUpdated.addListener(this.onGameInfoUpdated);
            overwolf.games.getRunningGameInfo(this.onRunningGameInfo);
        }
        stop() {
            overwolf.games.onGameInfoUpdated.removeListener(this.onGameInfoUpdated);
        }
    }
    exports.GameListener = GameListener;
});
