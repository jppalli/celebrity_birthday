define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HandlerBase {
        constructor(featuresHandler, infoDB, credentials) {
            this.featuresHandler = featuresHandler;
            this.infoDB = infoDB;
            this.credentials = credentials;
            this.handle = this.handle.bind(this);
        }
        get pollOnce() { return false; }
    }
    exports.default = HandlerBase;
});
