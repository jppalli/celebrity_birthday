define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InfoDB = void 0;
    class InfoDB {
        constructor(launcherClassId) {
            this._categories = {};
            this._launcherClassId = null;
            this._infoCounter = 0;
            this._launcherClassId = launcherClassId;
            this._infoCounter = 0;
        }
        get launcherClassId() {
            if (!this._launcherClassId) {
                return 0;
            }
            return this._launcherClassId;
        }
        set(feature, category, key, value, verbose = true) {
            if (value != null && value !== "") {
                this.incrementCounter();
            }
            let changed = false;
            const cat = this._categories[category];
            if (typeof cat === 'undefined' || cat === null) {
                changed = true;
                this._categories[category] = {};
            }
            if (this._categories[category][key] === null) {
                changed = true;
                this._categories[category][key] = value;
            }
            if (this._categories[category][key] !== value) {
                changed = true;
                this._categories[category][key] = value;
            }
            if (!changed) {
                return;
            }
            const info = {
                feature,
                category,
                key,
                value
            };
            try {
                if (verbose) {
                    console.log("[InfoDBContainer] UPDATING INFO (decoded): " +
                        decodeURI(JSON.stringify(info)));
                }
            }
            catch (e) {
                console.error(e);
            }
            if (this._launcherClassId) {
                overwolf.games.launchers.events.provider.updateInfo(this._launcherClassId, info);
            }
            else {
                overwolf.games.events.provider.updateInfo(info);
            }
        }
        get(category, key) {
            if (this._categories.hasOwnProperty(category) &&
                this._categories[category].hasOwnProperty(key)) {
                return this._categories[category][key];
            }
            return null;
        }
        getCounter() {
            return this._infoCounter;
        }
        resetCounter() {
            this._infoCounter = 0;
            console.log(`[InfoDBContainer] reset counters for ${this._launcherClassId}`);
        }
        incrementCounter() {
            try {
                if (this._infoCounter == 0) {
                    console.log(`[InfoDBContainer] first info counter (${this._launcherClassId})...`);
                }
                this._infoCounter++;
            }
            catch (_a) {
            }
        }
    }
    exports.InfoDB = InfoDB;
});
