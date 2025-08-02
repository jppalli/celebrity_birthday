var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExtractCredentials = void 0;
    class ExtractCredentials {
        static extract(info) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!info) {
                    return null;
                }
                if (!info.path) {
                    return null;
                }
                let cmdFallback = this.getCMDFallbackOverride();
                if (cmdFallback) {
                    console.log("[LoL] force extract LCU credentials from file");
                    return this.readCredentialsFromFile(info.path);
                }
                if (!info.commandLine) {
                    console.log("[LoL] Can't extract LCU credentials from launcher info," +
                        "trying fallback");
                    return this.readCredentialsFromFile(info.path);
                }
                const credentials = this.extractFromCommandLine(info);
                if (credentials) {
                    return credentials;
                }
                console.log('[LoL] Trying to fallback to file...');
                return this.readCredentialsFromFile(info.path);
            });
        }
        static getLockFile(path) {
            if (!path) {
                return;
            }
            path = path.replace(/\//g, "\\");
            return path.substring(0, path.lastIndexOf("\\") + 1).concat("lockfile");
        }
        static readTextFile(path) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    overwolf.io.readTextFile(path, { encoding: "UTF8" }, (res) => {
                        if (!res.success) {
                            reject(res);
                        }
                        resolve(res);
                    });
                });
            });
        }
        static extractFromCommandLine(info) {
            try {
                const args = {};
                const regexp = /--([^\s"]+)=([^\s"]+)/g;
                let match = regexp.exec(info.commandLine);
                while (match !== null) {
                    const [, key, value] = match;
                    args[key] = value;
                    match = regexp.exec(info.commandLine);
                }
                const token = args["remoting-auth-token"];
                if (!token || token.length <= 0) {
                    console.error("[LoL] Couldn't extract LCU token from launcher info");
                    return null;
                }
                const port = parseInt(args["app-port"], 10);
                if (port <= 0 || isNaN(port)) {
                    console.error("[LoL] Couldn't extract LCU port from launcher info");
                    return null;
                }
                const credentials = {
                    token: btoa(`riot:${token}`),
                    port,
                };
                return credentials;
            }
            catch (e) {
                console.error(e);
                return null;
            }
        }
        static readCredentialsFromFile(path) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let lockFile = yield this.readTextFile(this.getLockFile(path));
                    let array = lockFile.content.split(":");
                    let port = parseInt(array[2]);
                    let token = array[3];
                    const credentials = {
                        token: btoa(`riot:${token}`),
                        port,
                    };
                    return credentials;
                }
                catch (e) {
                    console.error(`[LoL] Couldn't extract credentials from file`, e);
                    return null;
                }
            });
        }
        static getCMDFallbackOverride() {
            let overrideCMD = localStorage.getItem("cmdFallback");
            if (overrideCMD === "true") {
                return overrideCMD;
            }
            return null;
        }
    }
    exports.ExtractCredentials = ExtractCredentials;
});
