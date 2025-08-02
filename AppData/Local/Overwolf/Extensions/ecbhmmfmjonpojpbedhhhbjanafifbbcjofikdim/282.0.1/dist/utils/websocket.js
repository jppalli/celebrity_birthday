define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OverwolfWebSocket = void 0;
    class OverwolfWebSocket {
        constructor(client) {
            this.client = client;
        }
        get onMessage() {
            return this.client.onMessage;
        }
        get onError() {
            return this.client.onError;
        }
        get onOpen() {
            return this.client.onOpen;
        }
        get onClosed() {
            return this.client.onClosed;
        }
        static createWebSocket(connectionParams) {
            return new Promise((resolve, reject) => {
                overwolf.web.createWebSocket(connectionParams, result => {
                    if (result.error) {
                        reject(result.error);
                    }
                    resolve(new OverwolfWebSocket(result.client));
                });
            });
        }
        connect() {
            return new Promise((resolve, reject) => {
                this.client.connect(result => {
                    if (result.status !== "success") {
                        reject(result.status);
                    }
                    resolve(result.status);
                });
            });
        }
        send(message) {
            return new Promise((resolve, reject) => {
                this.client.send(message, result => {
                    if (result.status !== "success") {
                        reject(result.status);
                    }
                    resolve(result.status);
                });
            });
        }
        close() {
            this.client.close();
        }
    }
    exports.OverwolfWebSocket = OverwolfWebSocket;
});
