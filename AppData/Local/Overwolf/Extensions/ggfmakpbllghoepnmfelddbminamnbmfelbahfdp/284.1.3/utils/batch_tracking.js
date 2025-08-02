define(() => { return  (() => { 
 	var __webpack_modules__ = ({

 "./src/batch-tracking-service.ts":
 (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__( "./src/utils/gzip.ts"), __webpack_require__( "./src/events-queue.ts"), __webpack_require__( "./src/utils/logger.service.ts")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, gzip_1, events_queue_1, logger_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.BatchTrackingService = void 0;
    const kBatchedTrackingURL = 'https://health.overwolf.com/v1/status';
    const kMaxCompressedLength = 6000;
    const kLoggingPrefix = '[Monitoring batch service] - ';
    const kLocalStorageLastSendTSKey = 'last_events_ts';
    const kSendEventsIntervalSecond = 60 * 30; 
    const kLocalStorageSendEventsInternalKey = 'events_send_interval';
    class BatchTrackingService {
        constructor(options = {}) {
            this.options = options;
            this.init();
        }
        flush() {
            this.sendQueuedEvents();
        }
        enqueueEvent(event) {
            this.eventsQueue.queueEvent(event);
            const { id, extra } = event;
            logger_service_1.LoggerService.info(`${kLoggingPrefix} Adding event to queue, Id: ${id}, Extra: ${extra}`);
            this.sendEnqueueEventsIfNeeded();
        }
        sendImmediately(event) {
            this.sendNonCompressed([event]);
        }
        init() {
            this.eventsQueue = new events_queue_1.EventsQueue();
            this.emptyQueueIfShould();
            this.autoSendInterval = this.options.flushQueueTimer
                ? this.options.flushQueueTimer
                : kSendEventsIntervalSecond;
            if (!this.options.flushQueueTimer &&
                this.eventsQueue.getQueue().length > 0) {
                this.sendQueuedEvents();
            }
        }
        emptyQueueIfShould() {
            const lastQueuedEvent = localStorage[events_queue_1.kLocalStorageLastQueuedEventTSKey];
            if (!lastQueuedEvent) {
                return;
            }
            const anHourAgo = Date.now() - 1000 * 60 * 60 * 1;
            if (this.options.clearOldEvents &&
                lastQueuedEvent <= anHourAgo) {
                this.eventsQueue.emptyQueue();
            }
        }
        sendEnqueueEventsIfNeeded() {
            try {
                const lastSendTS = localStorage[kLocalStorageLastSendTSKey];
                if (!lastSendTS) {
                    this.setSendTS();
                    return;
                }
                const deltaSecond = Math.floor((Date.now() - lastSendTS) / 1000.0);
                let interval = localStorage[kLocalStorageSendEventsInternalKey] ||
                    this.autoSendInterval;
                interval = parseInt(interval);
                if (deltaSecond < interval) {
                    return;
                }
                logger_service_1.LoggerService.info(`${kLoggingPrefix} Auto send interval passed sending queue`);
                this.sendQueuedEvents();
            }
            catch (error) {
                logger_service_1.LoggerService.error(`${kLoggingPrefix} empty enqueue by time error`, error);
            }
        }
        sendQueuedEvents() {
            try {
                const queue = this.eventsQueue.getQueue();
                logger_service_1.LoggerService.info(`${kLoggingPrefix} Sending batched events: ${JSON.stringify(queue)}`);
                if (queue.length === 0) {
                    return;
                }
                this.compressAndSend(queue);
                this.eventsQueue.emptyQueue();
                this.setSendTS();
            }
            catch (error) {
                logger_service_1.LoggerService.error(`${kLoggingPrefix} Error sending queue events`, error);
            }
        }
        compressAndSend(events) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const compressed = yield this.getCompressed(events);
                    if (compressed.length < kMaxCompressedLength) {
                        yield this.send(compressed);
                        return;
                    }
                    const groupSize = Math.floor(events.length / 2) + 1;
                    const group1 = events.slice(0, groupSize);
                    const group2 = events.slice(groupSize + 1, events.length - 1);
                    yield this.compressAndSend(group1);
                    yield this.compressAndSend(group2);
                }
                catch (error) {
                    logger_service_1.LoggerService.error('Error while compressing and sending ', error);
                }
            });
        }
        send(compressedEvents) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const URIEncoded = encodeURIComponent(compressedEvents);
                    const requestUrl = new URL(`${kBatchedTrackingURL}?events=${URIEncoded}`);
                    yield this.actualSent(requestUrl, true);
                }
                catch (error) {
                    logger_service_1.LoggerService.error(`${kLoggingPrefix} Error sending events`, error);
                }
            });
        }
        sendNonCompressed(event) {
            return __awaiter(this, void 0, void 0, function* () {
                const baseEvent = btoa(JSON.stringify(event));
                const URIEncoded = encodeURIComponent(baseEvent);
                const requestUrl = new URL(`${kBatchedTrackingURL}?events=${URIEncoded}`);
                yield this.actualSent(requestUrl, false);
            });
        }
        actualSent(requestUrl, compressed) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const owVer = (_a = overwolf.version) !== null && _a !== void 0 ? _a : '0.0.0.0';
                    requestUrl.searchParams.append('compressed', compressed.toString());
                    requestUrl.searchParams.append('owver', owVer);
                    yield fetch(requestUrl);
                }
                catch (error) {
                    logger_service_1.LoggerService.error(`${kLoggingPrefix} Error sending event: ${JSON.stringify(event)}`, error);
                }
            });
        }
        getCompressed(events) {
            return __awaiter(this, void 0, void 0, function* () {
                const stringifiedQueue = JSON.stringify(events);
                return gzip_1.Gzip.compress(stringifiedQueue);
            });
        }
        setSendTS() {
            try {
                localStorage[kLocalStorageLastSendTSKey] = Date.now();
            }
            catch (ex) {
                logger_service_1.LoggerService.error(`${kLoggingPrefix} Error setting send TS`, ex);
            }
        }
    }
    exports.BatchTrackingService = BatchTrackingService;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


 }),

 "./src/events-queue.ts":
 ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.EventsQueue = exports.kLocalStorageLastQueuedEventTSKey = void 0;
    const kLocalStoragePersistanceKey = 'events_queue';
    exports.kLocalStorageLastQueuedEventTSKey = 'last_queued_event_ts';
    class EventsQueue {
        constructor() {
            this.init();
        }
        queueEvent(event) {
            this.queue.push(event);
            localStorage.setItem(kLocalStoragePersistanceKey, JSON.stringify(this.queue));
            localStorage.setItem(exports.kLocalStorageLastQueuedEventTSKey, Date.now().toString());
        }
        emptyQueue() {
            this.queue = [];
            localStorage.setItem(kLocalStoragePersistanceKey, JSON.stringify(this.queue));
        }
        getQueue() {
            return this.queue;
        }
        init() {
            try {
                const localStorageObject = localStorage[kLocalStoragePersistanceKey];
                if (!localStorageObject) {
                    this.queue = [];
                }
                this.queue = JSON.parse(localStorageObject);
            }
            catch (error) {
                this.queue = [];
            }
        }
    }
    exports.EventsQueue = EventsQueue;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


 }),

 "./src/utils/gzip.ts":
 (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Gzip = void 0;
    class Gzip {
        static decompress(baseString) {
            return __awaiter(this, void 0, void 0, function* () {
                const byteArray = Uint8Array.from(atob(baseString), (c) => c.charCodeAt(0));
                const encoding = 'gzip';
                const cs = new DecompressionStream(encoding);
                const writer = cs.writable.getWriter();
                writer.write(byteArray);
                writer.close();
                return new Response(cs.readable).arrayBuffer().then(function (arrayBuffer) {
                    return new TextDecoder().decode(arrayBuffer);
                });
            });
        }
        static compress(string) {
            return __awaiter(this, void 0, void 0, function* () {
                const encoding = 'gzip';
                const byteArray = new TextEncoder().encode(string);
                const cs = new CompressionStream(encoding);
                const writer = cs.writable.getWriter();
                writer.write(byteArray);
                writer.close();
                const arrayBuffer = yield new Response(cs.readable).arrayBuffer();
                const baseString = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
                return baseString;
            });
        }
    }
    exports.Gzip = Gzip;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


 }),

 "./src/utils/logger.service.ts":
 ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.LoggerService = void 0;
    const kLocalStorageDebugKey = 'events_queue_debug';
    class LoggerService {
        static info(message) {
            if (localStorage[kLocalStorageDebugKey]) {
                console.log(message);
            }
        }
        static warn(message) {
            if (localStorage[kLocalStorageDebugKey]) {
                console.warn(message);
            }
        }
        static error(message, exception = new Error()) {
            if (localStorage[kLocalStorageDebugKey]) {
                console.error(message, exception);
            }
        }
    }
    exports.LoggerService = LoggerService;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


 })

 	});
 	var __webpack_module_cache__ = {};
 	function __webpack_require__(moduleId) {
 		var cachedModule = __webpack_module_cache__[moduleId];
 		if (cachedModule !== undefined) {
 			return cachedModule.exports;
 		}
 		var module = __webpack_module_cache__[moduleId] = {
 			exports: {}
 		};
 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
 		return module.exports;
 	}
 	var __webpack_exports__ = __webpack_require__("./src/batch-tracking-service.ts");
 	return __webpack_exports__;
 })()
;
});;
