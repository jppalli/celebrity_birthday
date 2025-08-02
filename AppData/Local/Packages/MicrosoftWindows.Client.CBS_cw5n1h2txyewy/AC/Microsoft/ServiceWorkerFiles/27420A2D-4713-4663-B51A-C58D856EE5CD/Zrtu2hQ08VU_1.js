let qs = "";
let swSNRBuild = "2025.04.02.55147014";
let exports = {};
let swSelf = self;
let config = {"enableSmallerBundle":false,"enableResourceFetchError":false,"betterErrors":false,"skipSearchCache":false,"reduceCacheInstance":false,"initResponseCacheExpirationTime":43200000,"setInitResponseExpiration":false,"checkResourceExistBeforeFetch":false,"checkCachedResByteSize":true,"minValidCacheValueByteSize":20,"enableGenericThumbCacheInSW":false,"checkInitResponseExpiration":false,"checkCacheBeforeFetchWhenHandleManifest":true,"enableGenericCacheInAllWebView":true,"avoidFetchOptionsInNavigateMode":true,"cacheClientInitHeaders":false,"cleanUpExpiredGenericCache":false,"genericCacheExpirationTime":1728000000,"checkVersionBasedCacheFirst":false,"genericCacheUpdateInterval":864000000,"clearCacheResourceMissing":false,"enableCheckBeforeUpdateCacheValueInIDB":true,"disableWSBServerTelemetry":true,"skipWaitingSW":false,"fixEmptyResponseError":false};
var WSB;
(function (WSB) {
    class Flag {
        constructor() {
            this.promise = new Promise(resolve => this.signal = resolve);
        }
    }
    WSB.Flag = Flag;
    class Mutex {
        constructor() {
            this.flags = [];
            this.locked = false;
        }
        /** Locks the mutex or waits until it can be locked if it is already locked */
        lock() {
            // javascript is single threaded, so we can consider this whole block atomic.
            if (this.locked) {
                const flag = new Flag();
                this.flags.push(flag);
                return flag.promise;
            }
            else {
                this.locked = true;
                return Promise.resolve();
            }
        }
        /** Releases the lock allowing other protected blocks to execute */
        release() {
            if (this.flags.length > 0) {
                // remove the first in the array and signal it
                const flag = this.flags.shift();
                flag.signal();
            }
            else {
                this.locked = false;
            }
        }
        /** gets if the mutex is locked */
        isLocked() {
            return this.locked;
        }
    }
    WSB.Mutex = Mutex;
})(WSB || (WSB = {}));
;/// <reference lib="webworker" />
/// <reference path="ServiceWorkerConstants.d.ts" />
/// <reference path="ServiceWorker.ts" />
//https://w3c.github.io/ServiceWorker/
var WSBServiceWorker;
(function (WSBServiceWorker) {
    const LogTimerTimeout = 5000;
    // credits to: https://gist.github.com/jed/982883
    function createCleanGuid(internalArg) {
        return internalArg
            ? (internalArg ^ Math.random() * 16 >> internalArg / 4).toString(16)
            : ("" + 1e7 + 1e3 + 4e3 + 8e3 + 1e11).replace(/[018]/g, createCleanGuid);
    }
    class Log {
        static finalizeImpression(impression) {
            // don't log if there are no events
            if (!impression.hasEvents()) {
                return;
            }
            Log.impressions.push(impression);
            // to reduce the number of log requests we make, batch the requests
            Log.startSendTimer();
        }
        static startSendTimer() {
            // only start the timer if there isn't one already
            if (!Log.sendTimer) {
                Log.sendTimer = setTimeout(() => {
                    Log.instrument();
                    Log.sendTimer = null;
                }, LogTimerTimeout);
            }
        }
        static async instrument() {
            // we can't instrument without muid.
            if (!Log.muid || Log.impressions.length == 0) {
                return;
            }
            // [DMA] For DMA region we want to disable telemetry
            // In SW code we dont have access to the VK enablement, so rely on config only
            if (config.disableWSBServerTelemetry) {
                return;
            }
            // Reset the impression queue in case more impressions are added 
            let impressions = Log.impressions;
            Log.impressions = [];
            for (const imp of impressions) {
                imp.finalizePerfEvent();
            }
            const mpis = impressions.map(imp => imp.getMpiXml()).join("");
            const events = impressions.map(imp => imp.getEventsXml()).join("");
            let body = `<ClientInstRequest><CID>${Log.muid}</CID><Group>${mpis}</Group><Events>${events}</Events></ClientInstRequest>`;
            let swHeaders = WSBServiceWorker.appHeaders;
            if (!swHeaders && config.cacheClientInitHeaders) {
                swHeaders = WSBServiceWorker.lkgAppHeaders;
            }
            let headers = Object.assign(Object.assign({}, swHeaders), { "Content-Type": "text/xml" });
            let resp = await fetch("/threshold/xls.aspx", { body, method: "POST", headers });
            //TODO: for service worker impression related events, call project API to upload to Windows if it is Windows data
            // if we fail to send, put the impressions back on the stack to send out
            if (!resp.ok) {
                Log.impressions.push(...impressions);
            }
        }
    }
    Log.impressions = [];
    WSBServiceWorker.Log = Log;
    class Impression {
        constructor() {
            this.ig = createCleanGuid();
            this.events = [];
            this.time = new Date().getTime();
            if (!Impression.cid) {
                Impression.cid = createCleanGuid();
            }
            this.perfTiming = {};
        }
        log(type, data) {
            const event = { data: Object.assign({ T: `CI.${type}` }, data), timeStamp: new Date().getTime() };
            this.events.push(event);
        }
        getMpiXml() {
            return `<M><IG>${this.ig}</IG><D><![CDATA[${JSON.stringify(this.createMasterImpression())}]]></D><Page><Name>Page.SmartSearch.AS.ServiceWorker</Name><L><![CDATA[[]]]></L></Page><TS>${this.time}</TS></M>`;
        }
        getEventsXml() {
            return this.events.map(event => this.createEventXml(event)).join("");
        }
        /**
         * ⛔ Deprecated: use config.betterErrors to determine if logError or logError2 should be used ⛔
         * @deprecated use config.betterErrors to determine if logError or logError2 should be used
         * @param error the error or error message to log
         */
        async logError(error) {
            if (isError(error)) {
                this.log("Error", { Text: error.message, stack: error.stack });
            }
            else {
                this.log("Error", { Text: error });
            }
        }
        /**
         * Logs an error to cosmos as "[key] error"
         * ⚠️ Use config.betterErrors to determine if logError or logError2 should be used ⚠️
         * @param key The key of the error.
         * @param extraInfo Extra information. Not part of the error message, but still included in the log.
         *                  Use this for providing additional details to an error message
         * @param error The actual error or error message
         */
        async logError2(key, extraInfo, error) {
            var _a, _b;
            const message = `[${key}] ${((_b = (_a = error === null || error === void 0 ? void 0 : error.toString()) !== null && _a !== void 0 ? _a : extraInfo) !== null && _b !== void 0 ? _b : "")}`;
            let stack = undefined;
            if (error) {
                const insert = extraInfo ? `\n${extraInfo}` : "";
                if (isError(error)) {
                    stack = message + insert + error.stack.substring(error.toString().length);
                }
                else {
                    stack = message + insert;
                }
            }
            else {
                stack = message;
            }
            this.log("Error", { message, stack });
        }
        logPerfEvent(event) {
            // if perfTiming is undefined we've already finalized the perf event
            if (!this.perfTiming) {
                return;
            }
            this.perfTiming[event] = new Date().getTime() - this.time;
        }
        hasEvents() {
            return this.events.length > 0 || (this.perfTiming && Object.keys(this.perfTiming).length > 0);
        }
        finalizePerfEvent() {
            // if perfTiming is undefined we've already finalized the perf event
            if (!this.perfTiming || Object.keys(this.perfTiming).length == 0) {
                return;
            }
            this.log("PerfPing", { ST: "ServiceWorker", Offsets: [this.perfTiming] });
            this.perfTiming = undefined;
        }
        createEventXml(event) {
            return `<E><T>Event.ClientInst</T><IG>${this.ig}</IG><D><![CDATA[${JSON.stringify(event.data)}]]></D><TS>${event.timeStamp}</TS></E>`;
        }
        // This function has been inspired from:
        // private/frontend/Answers/services/VisualSystem/Src/Content/Script/PerfPingV2/perfLogBeacon.ts
        // 
        createMasterImpression() {
            const windowLocation = swSelf.location;
            let impressionUrl = windowLocation.protocol + "//" + windowLocation.host + "/QF_KEYSTROKE_VIRTUAL_URL?cvid=" + Impression.cid;
            let userAgent = navigator.userAgent;
            return {
                CurUrl: windowLocation.href,
                Pivot: "QF",
                IsNonSuggestion: true,
                EnrichedClientInfo: {
                    CurrentBundleSNRVersion: WSBServiceWorker === null || WSBServiceWorker === void 0 ? void 0 : WSBServiceWorker.currentBundleSNRVersion,
                    LatestBundleSNRVersion: WSBServiceWorker === null || WSBServiceWorker === void 0 ? void 0 : WSBServiceWorker.latestBundleSNRVersion,
                    SWSNRVersion: WSBServiceWorker === null || WSBServiceWorker === void 0 ? void 0 : WSBServiceWorker.swSNRVersion,
                    FDPartnerEntry: "autosuggest",
                    ImpressionUrl: impressionUrl,
                    DC: undefined,
                    isWebView2: userAgent.includes("IsWebView2/True") ? 1 : undefined
                },
                TS: this.time,
                UTS: this.time,
                UxClassification: {
                    client: "windows",
                },
            };
        }
    }
    WSBServiceWorker.Impression = Impression;
    function isError(error) {
        return !!error.message;
    }
    function logUnhandledError(error) {
        const imp = new Impression();
        imp.logError(error);
        Log.finalizeImpression(imp);
    }
    swSelf.onerror = logUnhandledError;
    swSelf.onunhandledrejection = (ev) => {
        logUnhandledError(ev.reason);
    };
})(WSBServiceWorker || (WSBServiceWorker = {}));
;/// <reference lib="webworker" />
/// <reference path="ServiceWorkerConstants.d.ts" />
/// <reference path="ServiceWorkerLogging.ts" />
/// <reference path="../Lock/MutexLock.ts" />
//https://w3c.github.io/ServiceWorker/
var WSBServiceWorker;
(function (WSBServiceWorker) {
    // limit the server response size in case it responds with an html file
    const LogServerResponseMaxLength = 500;
    const RequestHeadersFieldsForCache = [
        "Accept-language",
        "X-Agent-DeviceId",
        "X-BM-DTZ",
        "X-BM-DateFormat",
        "X-BM-DeviceDimensions",
        "X-BM-DeviceDimensionsLogical",
        "X-BM-DeviceScale",
        "X-BM-Market",
        "X-BM-SearchFeatures",
        "X-BM-Theme",
        "X-BM-WindowsFlights",
        "X-Device-MachineId",
        "X-Device-OSSKU",
        "X-Device-Touch",
        "X-Device-isOptin",
        "X-DeviceID",
        "X-PositionerType",
        "X-Search-AppId",
        "X-Search-CortanaAvailableCapabilities",
        "X-Search-SafeSearch",
        "X-Search-TimeZone",
        "X-Telemetry-Guid",
        "X-UserAgeClass",
    ];
    // we ignore the vary header, as it isn't always present when making offline through the SW
    // https://developer.mozilla.org/en-US/docs/Web/API/Cache/match#parameters
    const WSBCacheMatchOptions = { ignoreVary: true };
    WSBServiceWorker.queryString = qs;
    WSBServiceWorker.swSNRVersion = swSNRBuild;
    WSBServiceWorker.thumbnailCacheName = "thumbCache";
    WSBServiceWorker.bundleResourceCacheName = "resourceCache";
    WSBServiceWorker.activeCacheName = "";
    //db names
    WSBServiceWorker.databaseName = "serviceWorker";
    WSBServiceWorker.stateStore = "state";
    WSBServiceWorker.latestVersionKey = "latestVersion";
    WSBServiceWorker.fallbackStateKey = "fbState";
    WSBServiceWorker.lkgCandidateKey = "lkgCandidate";
    WSBServiceWorker.nextCacheNameKey = "nc";
    WSBServiceWorker.currentCacheNameKey = "cc";
    WSBServiceWorker.lkgCacheNameKey = "lkg";
    WSBServiceWorker.muidKey = "muid";
    WSBServiceWorker.appHeadersKey = "ahk";
    WSBServiceWorker.langKey = "lang";
    WSBServiceWorker.currentBundleSNRVersionKey = "snrcbv";
    WSBServiceWorker.latestBundleSNRVersionKey = "snrlbv";
    WSBServiceWorker.genericCacheLastCleanTimeKey = "gclct";
    /** if the service worker has been initialized */
    WSBServiceWorker.initialized = false;
    /** the latest version that we've successfully downloaded. this is not necessarily the version of the current cache */
    WSBServiceWorker.latestVersion = "";
    /** the current state of fallback we're in */
    WSBServiceWorker.fallbackState = 0 /* FallbackState.None */;
    /** is the current cache a candidate for LKG? */
    WSBServiceWorker.isCurrentCacheLkgCandidate = false;
    // we can't delay other functions to update the bundle so we need to keep the cache from being updated
    // while wsb is reloading and prevent multiple updates
    // The page will fallback if it takes more than about 13 seconds, so we should wait at least that long
    WSBServiceWorker.bundleLockSafeTime = 20000;
    WSBServiceWorker.updating = false;
    WSBServiceWorker.bundleLock = new WSB.Mutex();
    WSBServiceWorker.initResonseLastCachedTime = 0;
    let bundleFetchImpression;
    let bundleResourceCache;
    let thumbnailCache;
    let versionBasedCache;
    let shouldUpdateVersionBasedCache;
    async function deleteCacheIfExists(cacheName) {
        if (cacheName) {
            await caches.delete(cacheName);
        }
    }
    WSBServiceWorker.deleteCacheIfExists = deleteCacheIfExists;
    function isBrowserOnline() {
        return navigator.onLine;
    }
    WSBServiceWorker.isBrowserOnline = isBrowserOnline;
    function isInitResponseExpired() {
        return Date.now() - WSBServiceWorker.initResonseLastCachedTime > config.initResponseCacheExpirationTime;
    }
    WSBServiceWorker.isInitResponseExpired = isInitResponseExpired;
    function isCacheExpired(cacheDateStr, expirationInterval) {
        if (!cacheDateStr) {
            return true;
        }
        let initCacheTime = new Date(cacheDateStr).getTime();
        if (isNaN(initCacheTime) ||
            Date.now() - initCacheTime > expirationInterval) {
            return true;
        }
        return false;
    }
    /** initializes the service worker if it hasn't already been done */
    async function initializeServiceWorker() {
        var _a;
        if (WSBServiceWorker.initialized) {
            return;
        }
        const loadImp = new WSBServiceWorker.Impression();
        try {
            // initialize the indexed DB
            let dbOpen = indexedDB.open(WSBServiceWorker.databaseName);
            dbOpen.onupgradeneeded = async (ev) => {
                dbOpen.result.createObjectStore(WSBServiceWorker.stateStore);
            };
            WSBServiceWorker.db = await promisifyIDB(dbOpen);
            //initialize the state of the service worker
            WSBServiceWorker.latestVersion = await WSBServiceWorker.idbGet(WSBServiceWorker.stateStore, WSBServiceWorker.latestVersionKey);
            WSBServiceWorker.fallbackState = (_a = await WSBServiceWorker.idbGet(WSBServiceWorker.stateStore, WSBServiceWorker.fallbackStateKey)) !== null && _a !== void 0 ? _a : 0 /* FallbackState.None */;
            WSBServiceWorker.isCurrentCacheLkgCandidate = await WSBServiceWorker.idbGet(WSBServiceWorker.stateStore, WSBServiceWorker.lkgCandidateKey);
            WSBServiceWorker.currentCacheName = await WSBServiceWorker.idbGet(WSBServiceWorker.stateStore, WSBServiceWorker.currentCacheNameKey);
            WSBServiceWorker.nextCacheName = await WSBServiceWorker.idbGet(WSBServiceWorker.stateStore, WSBServiceWorker.nextCacheNameKey);
            WSBServiceWorker.lkgCacheName = await WSBServiceWorker.idbGet(WSBServiceWorker.stateStore, WSBServiceWorker.lkgCacheNameKey);
            WSBServiceWorker.genericCacheLastCleanTime = await WSBServiceWorker.idbGet(WSBServiceWorker.stateStore, WSBServiceWorker.genericCacheLastCleanTimeKey);
            WSBServiceWorker.Log.muid = await WSBServiceWorker.idbGet(WSBServiceWorker.stateStore, WSBServiceWorker.muidKey);
            WSBServiceWorker.appHeaders = await WSBServiceWorker.idbGet(WSBServiceWorker.stateStore, WSBServiceWorker.appHeadersKey);
            if (config.enableSmallerBundle) {
                WSBServiceWorker.currLang = await WSBServiceWorker.idbGet(WSBServiceWorker.stateStore, WSBServiceWorker.langKey);
            }
            WSBServiceWorker.currentBundleSNRVersion = await WSBServiceWorker.idbGet(WSBServiceWorker.stateStore, WSBServiceWorker.currentBundleSNRVersionKey);
            WSBServiceWorker.latestBundleSNRVersion = await WSBServiceWorker.idbGet(WSBServiceWorker.stateStore, WSBServiceWorker.latestBundleSNRVersionKey);
            WSBServiceWorker.initialized = true;
        }
        catch (err) {
            if (config.betterErrors) {
                loadImp.logError2("initializeServiceWorker", undefined, err);
            }
            else {
                loadImp.logError(err);
            }
            throw err;
        }
        WSBServiceWorker.Log.finalizeImpression(loadImp);
    }
    WSBServiceWorker.initializeServiceWorker = initializeServiceWorker;
    /**
     * converts an IDBRequest into a promise
     * @param request the request to convert
     */
    function promisifyIDB(request) {
        return new Promise((resolve, reject) => {
            request.onsuccess = () => {
                resolve(request.result);
            };
            request.onerror = () => {
                reject(request.error);
            };
        });
    }
    WSBServiceWorker.promisifyIDB = promisifyIDB;
    /**
     * gets an item from the store
     * @param storeName the name of the store to look in
     * @param key the key of the item to get
     */
    WSBServiceWorker.idbGet = (storeName, key) => {
        let transaction = WSBServiceWorker.db.transaction(storeName, "readonly");
        let store = transaction.objectStore(storeName);
        return promisifyIDB(store.get(key));
    };
    /**
     * sets an item in the store to the given value
     * @param storeName the name of the store to look in
     * @param key the key of the item to set
     * @param value the value to set the item to
     */
    WSBServiceWorker.idbSet = (storeName, key, value) => {
        let transaction = WSBServiceWorker.db.transaction(storeName, "readwrite");
        let store = transaction.objectStore(storeName);
        return promisifyIDB(store.put(value, key));
    };
    async function setLKGCacheName(name) {
        WSBServiceWorker.lkgCacheName = name;
        await WSBServiceWorker.idbSet(WSBServiceWorker.stateStore, WSBServiceWorker.lkgCacheNameKey, WSBServiceWorker.lkgCacheName);
    }
    WSBServiceWorker.setLKGCacheName = setLKGCacheName;
    async function setGenericCacheLastCleanTime(lastCleanTime) {
        WSBServiceWorker.genericCacheLastCleanTime = lastCleanTime;
        await WSBServiceWorker.idbSet(WSBServiceWorker.stateStore, WSBServiceWorker.genericCacheLastCleanTimeKey, lastCleanTime);
    }
    WSBServiceWorker.setGenericCacheLastCleanTime = setGenericCacheLastCleanTime;
    async function setCurrentCacheName(name) {
        WSBServiceWorker.currentCacheName = name;
        shouldUpdateVersionBasedCache = true;
        await WSBServiceWorker.idbSet(WSBServiceWorker.stateStore, WSBServiceWorker.currentCacheNameKey, WSBServiceWorker.currentCacheName);
    }
    WSBServiceWorker.setCurrentCacheName = setCurrentCacheName;
    async function setNextCacheName(name) {
        WSBServiceWorker.nextCacheName = name;
        await WSBServiceWorker.idbSet(WSBServiceWorker.stateStore, WSBServiceWorker.nextCacheNameKey, WSBServiceWorker.nextCacheName);
    }
    WSBServiceWorker.setNextCacheName = setNextCacheName;
    async function setCurrLang(lang) {
        WSBServiceWorker.currLang = lang;
        await WSBServiceWorker.idbSet(WSBServiceWorker.stateStore, WSBServiceWorker.langKey, WSBServiceWorker.currLang);
    }
    WSBServiceWorker.setCurrLang = setCurrLang;
    async function setCurrentBundleSNRVersion(snrVersion) {
        WSBServiceWorker.currentBundleSNRVersion = snrVersion;
        await WSBServiceWorker.idbSet(WSBServiceWorker.stateStore, WSBServiceWorker.currentBundleSNRVersionKey, WSBServiceWorker.currentBundleSNRVersion);
    }
    WSBServiceWorker.setCurrentBundleSNRVersion = setCurrentBundleSNRVersion;
    async function setLatestBundleSNRVersion(snrVersion) {
        WSBServiceWorker.latestBundleSNRVersion = snrVersion;
        await WSBServiceWorker.idbSet(WSBServiceWorker.stateStore, WSBServiceWorker.latestBundleSNRVersionKey, WSBServiceWorker.latestBundleSNRVersion);
    }
    WSBServiceWorker.setLatestBundleSNRVersion = setLatestBundleSNRVersion;
    /**
     * Send a message to all clients
     * @param message the message to send
     * @param additionalData any additional data to pass with the message
     */
    // The syntax of this declaration makes it so we can type check addtional data.
    // Including having additional data when it's not needed or not having it when it is.
    async function postClientMessage(message, ...additionalData) {
        let clients = await swSelf.clients.matchAll();
        for (let client of clients) {
            client.postMessage(Object.assign({ message }, ...additionalData));
        }
    }
    WSBServiceWorker.postClientMessage = postClientMessage;
    async function setLkgCandidate(isCandidate) {
        WSBServiceWorker.isCurrentCacheLkgCandidate = isCandidate;
        await WSBServiceWorker.idbSet(WSBServiceWorker.stateStore, WSBServiceWorker.lkgCandidateKey, isCandidate);
    }
    WSBServiceWorker.setLkgCandidate = setLkgCandidate;
    function appendHttpRequestHeaders(headers, headersToAppend) {
        for (const key in headersToAppend) {
            if (typeof headersToAppend[key] !== "string") {
                continue;
            }
            headers.set(key, headersToAppend[key]);
        }
    }
    async function updateActiveCacheInstance(cacheName) {
        if (!!cacheName && cacheName != WSBServiceWorker.activeCacheName) {
            WSBServiceWorker.activeCacheName = cacheName;
            WSBServiceWorker.activeCache = await caches.open(WSBServiceWorker.activeCacheName);
        }
    }
    function getRequestHeaders(requestType) {
        var _a;
        let headers = new Headers();
        if (config.cacheClientInitHeaders) {
            // only use lkgAppHeaders when appHeaders doesn't exist. because appHeaders is more up-to-date
            appendHttpRequestHeaders(headers, (_a = WSBServiceWorker.appHeaders !== null && WSBServiceWorker.appHeaders !== void 0 ? WSBServiceWorker.appHeaders : WSBServiceWorker.lkgAppHeaders) !== null && _a !== void 0 ? _a : {});
        }
        else {
            appendHttpRequestHeaders(headers, WSBServiceWorker.appHeaders !== null && WSBServiceWorker.appHeaders !== void 0 ? WSBServiceWorker.appHeaders : {});
        }
        switch (requestType) {
            case 1 /* RequestType.ManifestRequest */:
                headers.set("Accept", "application/json");
                break;
            case 2 /* RequestType.InitRequest */:
                headers.set("Accept", "*/*");
                break;
            default:
                break;
        }
        return headers;
    }
    /** Tries to download the next version of the bundle from Bing */
    async function updateBundle(impression) {
        // don't try updating if we're already updating
        if (WSBServiceWorker.updating) {
            return;
        }
        try {
            WSBServiceWorker.updating = true;
            impression.logPerfEvent("us" /* PerfEventName.UpdateStart */);
            let headers = getRequestHeaders(1 /* RequestType.ManifestRequest */);
            let response = await fetch("/manifest/threshold.appcache" + WSBServiceWorker.queryString, { headers });
            impression.logPerfEvent("um" /* PerfEventName.UpdateManifestFetched */);
            // if the server gave us a manifest to parse, parse it and then try to download the files if it's newer
            if (response.ok) {
                let manifest = await response.json();
                // check that we haven't downloaded this version before.
                // the normal logic can break if the manifest is the same as lkg
                if (manifest.versionHash != WSBServiceWorker.latestVersion && manifest.versionHash != WSBServiceWorker.lkgCacheName) {
                    await downloadAndApplyNewVersion(manifest, impression);
                    impression.log("UpdateSuccess", { mv: manifest.versionHash });
                    impression.logPerfEvent("ud" /* PerfEventName.UpdateBundleDownloaded */);
                }
                else if (WSBServiceWorker.lkgCacheName && manifest.versionHash == WSBServiceWorker.lkgCacheName) {
                    impression.log("Rollback", { lc: WSBServiceWorker.lkgCacheName, cc: WSBServiceWorker.currentCacheName });
                    await rollbackVersion();
                }
                impression.logPerfEvent("ue" /* PerfEventName.UpdateEnd */);
            }
            // if the response was not ok and not 304 (Not modified) log an error
            else if (response.status != 304) {
                if (config.betterErrors) {
                    impression.logError2("ManifestFetch", (await response.text()).substring(0, LogServerResponseMaxLength), `server returned with ${response.status}`);
                }
                else {
                    impression.logError(`failed to update manifest. server returned with ${response.status}: ${(await response.text()).substring(0, LogServerResponseMaxLength)}`);
                }
            }
        }
        catch (ex) {
            if (config.betterErrors) {
                impression.logError2("BundleUpdate", undefined, ex);
            }
            else {
                if (config.clearCacheResourceMissing) {
                    await postClientMessage("rm" /* ClientMessageType.ResourceMissing */);
                }
                impression === null || impression === void 0 ? void 0 : impression.logError(`Bundle Update failed: ${ex}`);
            }
        }
        finally {
            WSBServiceWorker.updating = false;
        }
    }
    WSBServiceWorker.updateBundle = updateBundle;
    async function rollbackVersion() {
        // we can end up with latest being the same as lkg from a variety of things
        // including but not limited to a deployment rollback
        // we can discard any existing next cache as it's now old
        await deleteCacheIfExists(WSBServiceWorker.nextCacheName);
        await setNextCacheName();
        // the best we can do is move LKG back to current.
        await WSBServiceWorker.bundleLock.lock();
        try {
            const deleteCache = WSBServiceWorker.currentCacheName;
            await setCurrentCacheName(WSBServiceWorker.lkgCacheName);
            await setLKGCacheName();
            postClientMessage("ua" /* ClientMessageType.UpdateApplied */);
            // it was already LKG. put it back when we're done
            await setLkgCandidate(true);
            await deleteCacheIfExists(deleteCache);
        }
        finally {
            WSBServiceWorker.bundleLock.release();
        }
    }
    WSBServiceWorker.rollbackVersion = rollbackVersion;
    async function bundleResourceRequestAsyncHandler(newVersionBasedCache, request) {
        let response;
        if (config.checkCacheBeforeFetchWhenHandleManifest) {
            // try retrieve resource request from generic bundleResourceCache
            response = await bundleResourceCache.match(request, WSBCacheMatchOptions);
            if (config.checkCachedResByteSize) {
                if (response && (await response.clone().blob()).size > config.minValidCacheValueByteSize) {
                    // exist in generic cache already, add the response from cache to the new versionBasedCache only
                    newVersionBasedCache.put(request, response.clone());
                    return;
                }
            }
            else {
                if (response) {
                    // exist in generic cache already, add the response from cache to the new versionBasedCache only
                    newVersionBasedCache.put(request, response.clone());
                    return;
                }
            }
            // try retrieve resource request from previous versionBasedCache
            if (versionBasedCache) {
                response = await versionBasedCache.match(request, WSBCacheMatchOptions);
                if (config.checkCachedResByteSize) {
                    if (response && (await response.clone().blob()).size > config.minValidCacheValueByteSize) {
                        // exist in previous version based cache
                        // add the response from cache to the both new versionBasedCache and generic resource cache
                        newVersionBasedCache.put(request, response.clone());
                        bundleResourceCache.put(request, response.clone());
                        return;
                    }
                }
                else {
                    if (response) {
                        // exist in previous version based cache
                        // add the response from cache to the both new versionBasedCache and generic resource cache
                        newVersionBasedCache.put(request, response.clone());
                        bundleResourceCache.put(request, response.clone());
                        return;
                    }
                }
            }
        }
        // not exist in any cache, so fetch from server then update cache objects accordingly
        response = await fetch(request);
        if (response === null || response === void 0 ? void 0 : response.ok) {
            try {
                // put() consumes the response body, so we need to clone it in case both versionBasedCache and generic Cache need to add it.
                let responseClone = response.clone();
                newVersionBasedCache.put(request, response);
                bundleResourceCache.put(request, responseClone);
            }
            catch (err) {
                throw new Error(`Failed to cache bundle response for: ${request.url}`);
            }
        }
        else {
            throw new Error(`Failed to fetch bundle resource: ${request.url} with status code ${response.status}`);
        }
    }
    const deleteExpiredGenericCaches = async () => {
        await bundleResourceCache.keys().then((keys) => {
            keys.forEach((request) => {
                // Get the cached response for the request
                bundleResourceCache.match(request).then((cachedResponse) => {
                    const genericCacheDate = cachedResponse === null || cachedResponse === void 0 ? void 0 : cachedResponse.headers.get("Date");
                    if (isCacheExpired(genericCacheDate, config.genericCacheExpirationTime)) {
                        // Response is expired; delete it from the cache
                        bundleResourceCache.delete(request);
                    }
                });
            });
        });
    };
    function shouldCleanGenericTable() {
        if (!WSBServiceWorker.genericCacheLastCleanTime) {
            setGenericCacheLastCleanTime(Date.now().toString());
            return false;
        }
        let lastCleanTime = parseInt(WSBServiceWorker.genericCacheLastCleanTime);
        if (isNaN(lastCleanTime) ||
            Date.now() - lastCleanTime > config.genericCacheExpirationTime) {
            return true;
        }
        return false;
    }
    async function cleanUpExpiredGenericCache() {
        if (config.cleanUpExpiredGenericCache && shouldCleanGenericTable()) {
            // Clean up expired generic cache
            await deleteExpiredGenericCaches();
            setGenericCacheLastCleanTime(Date.now().toString());
        }
    }
    async function downloadAndApplyNewVersion(manifest, impression) {
        // we can discard any existing next cache as it's now old
        await deleteCacheIfExists(WSBServiceWorker.nextCacheName);
        const nextBundleHash = manifest.versionHash;
        // this is prod before enableCheckBeforeUpdateCacheValueInIDB ship
        if (!config.enableCheckBeforeUpdateCacheValueInIDB) {
            // create a new nextCache
            await setNextCacheName(nextBundleHash);
        }
        let shouldCacheNewBundle = true;
        // update the latest snr version value in indexed db
        if (WSBServiceWorker.latestBundleSNRVersion != manifest.build) {
            await setLatestBundleSNRVersion(manifest.build);
        }
        // new version based cache
        const newVersionBasedCache = await caches.open(nextBundleHash);
        if (config.enableGenericCacheInAllWebView) {
            let bundleResourceRequestAsyncHandlers = [];
            for (const file of manifest.files) {
                if (isInitRequest(file.toLowerCase())) {
                    const headers = getRequestHeaders(2 /* RequestType.InitRequest */);
                    // init request is handled differently, it only cached in versionBasedCache
                    await newVersionBasedCache.add(new Request(file, { headers })).catch((err) => {
                        impression.logError2("downloadAndApplyNewVersion", `Bundle init resource cache failure ${err}`, err);
                        if (config.enableCheckBeforeUpdateCacheValueInIDB) {
                            // init response failed to be cached, so this will make current new bundle cache not a valid bundle
                            shouldCacheNewBundle = false;
                        }
                    });
                }
                else {
                    bundleResourceRequestAsyncHandlers.push(bundleResourceRequestAsyncHandler(newVersionBasedCache, new Request(file)));
                }
            }
            // instead of using cache.addAll(), we use the handler for each request need to be fetched and run them asynchronously.
            // the reason is, we need to add the check-exisits-cache-first logic before really fetch requets from server
            await Promise.all(bundleResourceRequestAsyncHandlers).catch((err) => {
                impression.logError2("downloadAndApplyNewVersion", `Failed to fetch and cache all bundle resources ${err}`, err);
                if (config.enableCheckBeforeUpdateCacheValueInIDB) {
                    // one of the resource files failed to be cached, this will make current new bundle cache not a valid bundle
                    shouldCacheNewBundle = false;
                }
            });
        }
        else {
            let requests = [];
            for (const file of manifest.files) {
                if (isInitRequest(file.toLowerCase())) {
                    const headers = getRequestHeaders(2 /* RequestType.InitRequest */);
                    requests.push(new Request(file, { headers }));
                }
                else {
                    requests.push(new Request(file));
                }
            }
            if (config.checkResourceExistBeforeFetch) {
                const cacheName = await getActiveCacheName();
                if (config.reduceCacheInstance) {
                    updateActiveCacheInstance(cacheName);
                }
                const asyncTasks = [];
                for (const request of requests) {
                    const storeResourceTask = storeResourceToCache(newVersionBasedCache, cacheName, request, impression);
                    asyncTasks.push(storeResourceTask);
                }
                try {
                    await Promise.all(asyncTasks);
                }
                catch (ex) {
                    if (config.betterErrors) {
                        bundleFetchImpression === null || bundleFetchImpression === void 0 ? void 0 : bundleFetchImpression.logError2("[storeResourceToCache error]", null, ex);
                    }
                    else {
                        bundleFetchImpression === null || bundleFetchImpression === void 0 ? void 0 : bundleFetchImpression.logError(`[storeResourceToCache error]${ex}`);
                    }
                }
            }
            else {
                // in the event that any file fails to download, cache.addAll will reject the promise, throwing an error
                await newVersionBasedCache.addAll(requests);
            }
        }
        if (config.enableCheckBeforeUpdateCacheValueInIDB && !shouldCacheNewBundle) {
            // when feature enabled and there's error throw when fetching and caching new bundle,
            // we return directly to skip the update for cache name values in indexedDB cuz we just need to keep them the same.
            return;
        }
        WSBServiceWorker.latestVersion = manifest.versionHash;
        await WSBServiceWorker.bundleLock.lock();
        try {
            // when feature enabled, we update the next cache name value in indexedDB here instead of at L504
            if (config.enableCheckBeforeUpdateCacheValueInIDB) {
                await setNextCacheName(nextBundleHash);
            }
            let deleteCacheName;
            // set LKG if we can/should
            // delete old lkg if its being replace or current if lkg isn't being replaced
            if (WSBServiceWorker.fallbackState == 0 /* FallbackState.None */ &&
                WSBServiceWorker.isCurrentCacheLkgCandidate &&
                (await caches.has(WSBServiceWorker.currentCacheName))) {
                deleteCacheName = WSBServiceWorker.lkgCacheName;
                await setLKGCacheName(WSBServiceWorker.currentCacheName);
            }
            else {
                deleteCacheName = WSBServiceWorker.currentCacheName;
            }
            // make the next cache the current one and set the nextCache to none
            await setCurrentCacheName(WSBServiceWorker.nextCacheName);
            await setNextCacheName();
            // if code reaches here, it means the resources of the latest snr version are stored into CacheStorage
            // so we update the currentBundleSNRVersion in IndexedDB for record
            if (WSBServiceWorker.currentBundleSNRVersion != WSBServiceWorker.latestBundleSNRVersion) {
                await setCurrentBundleSNRVersion(WSBServiceWorker.latestBundleSNRVersion);
            }
            await setLkgCandidate(false);
            if (WSBServiceWorker.fallbackState != 0 /* FallbackState.None */) {
                await setFallbackState(0 /* FallbackState.None */);
            }
            postClientMessage("ua" /* ClientMessageType.UpdateApplied */);
            await deleteCacheIfExists(deleteCacheName);
        }
        finally {
            WSBServiceWorker.bundleLock.release();
        }
        // set the latest version in the store, but we don't need to wait for it complete
        WSBServiceWorker.idbSet(WSBServiceWorker.stateStore, WSBServiceWorker.latestVersionKey, WSBServiceWorker.latestVersion);
    }
    WSBServiceWorker.downloadAndApplyNewVersion = downloadAndApplyNewVersion;
    async function storeResourceToCache(nextCache, cacheName, request, impression) {
        let response = null;
        if (config.reduceCacheInstance && WSBServiceWorker.activeCache) {
            response = await WSBServiceWorker.activeCache.match(request, { ignoreSearch: true, ignoreVary: true });
        }
        else {
            response = await caches.match(request, { cacheName, ignoreSearch: true, ignoreVary: true });
        }
        if (!response || (config.checkCachedResByteSize && (await response.clone().blob()).size < config.minValidCacheValueByteSize)) {
            try {
                let fetchResponse = await fetch(request);
                if (!(fetchResponse === null || fetchResponse === void 0 ? void 0 : fetchResponse.ok)) {
                    if (config.betterErrors) {
                        impression.logError2("[downloadAndApplyNewVersion] bad fetched response status:", request.url, `server returned with ${fetchResponse.status}`);
                    }
                    else {
                        impression.logError(`[downloadAndApplyNewVersion] server returned fetched response with ${fetchResponse.status}: ${request.url}`);
                    }
                }
                else {
                    nextCache.put(request, fetchResponse);
                }
            }
            catch (ex) {
                if (config.betterErrors) {
                    bundleFetchImpression === null || bundleFetchImpression === void 0 ? void 0 : bundleFetchImpression.logError2("[downloadAndApplyNewVersion] fetch from web", request.url, ex);
                }
                else {
                    bundleFetchImpression === null || bundleFetchImpression === void 0 ? void 0 : bundleFetchImpression.logError(`[downloadAndApplyNewVersion] fetch from web ${ex}: ${request.url}`);
                }
            }
        }
        else {
            nextCache.put(request, response);
        }
    }
    async function getActiveCacheName() {
        return (WSBServiceWorker.fallbackState != 0 /* FallbackState.None */ && WSBServiceWorker.lkgCacheName && await caches.has(WSBServiceWorker.lkgCacheName)) ?
            WSBServiceWorker.lkgCacheName :
            WSBServiceWorker.currentCacheName;
    }
    async function setFallbackState(state) {
        WSBServiceWorker.fallbackState = state;
        await WSBServiceWorker.idbSet(WSBServiceWorker.stateStore, WSBServiceWorker.fallbackStateKey, state);
    }
    WSBServiceWorker.setFallbackState = setFallbackState;
    /** make the service worker server a fallback bundle */
    async function fallback(impression) {
        // even though we know the current version is broken, we shouldn't clear it
        // so that if the client reloads before a newer version is available we can
        // fallback faster since we don't have to download anything.
        // if we're falling back this is no longer a fallback candidate.
        await setLkgCandidate(false);
        // if we haven't yet fallen back and we have an LKG, use that
        if (WSBServiceWorker.fallbackState == 0 /* FallbackState.None */ && await caches.has(WSBServiceWorker.lkgCacheName)) {
            await setFallbackState(1 /* FallbackState.LKG */);
            postClientMessage("ua" /* ClientMessageType.UpdateApplied */);
            impression.log("Fallback", { s: "LKG" });
        }
        else {
            await setFallbackState(2 /* FallbackState.Bundle */);
            postClientMessage("fb" /* ClientMessageType.FallbackToPrePopulatedBundle */);
            impression.log("Fallback", { s: "BDL" });
        }
    }
    WSBServiceWorker.fallback = fallback;
    async function setAppHeaders(headers, impression) {
        if (!headers) {
            return;
        }
        WSBServiceWorker.appHeaders = headers;
        if (config.cacheClientInitHeaders) {
            WSBServiceWorker.lkgAppHeaders = headers;
        }
        if (config.enableSmallerBundle) {
            // Fetch language tag from the new headers
            let newLang = headers["Accept-language"];
            if (newLang && !WSBServiceWorker.currLang) {
                await setCurrLang(newLang);
            }
            else if (newLang && WSBServiceWorker.currLang && newLang != WSBServiceWorker.currLang) {
                // If it's different from lang key, that means the language is switched
                // we need to remove all the old caches
                clearAllCache();
                if (config.betterErrors) {
                    impression.logError2("new Language", newLang);
                }
                else {
                    impression.logError(`Language switched to ${newLang}`);
                }
            }
        }
        await WSBServiceWorker.idbSet(WSBServiceWorker.stateStore, WSBServiceWorker.appHeadersKey, headers);
    }
    WSBServiceWorker.setAppHeaders = setAppHeaders;
    ///////////////////////////////////////////////////////////////////////////
    // Service worker events
    ///////////////////////////////////////////////////////////////////////////
    /** Called when a service worker is downloaded and loaded */
    async function onInstall() {
        // with the change to new cache names we need to make sure the old ones are gone
        // this is only run once just before first time this service worker is activated
        await caches.delete("cc");
        await caches.delete("nc");
        await caches.delete("lkg");
    }
    WSBServiceWorker.onInstall = onInstall;
    /**
     * Called when a service worker becomes active
     * note: this is only called after it takes over for another service worker,
     * not on startup
     */
    async function onActivate() {
        // the old page will not have a service worker attached if we don't claim it
        swSelf.clients.claim();
        await initializeServiceWorker();
    }
    WSBServiceWorker.onActivate = onActivate;
    async function bundleUpdateHandler(request) {
        // reset last known good headers
        if (config.cacheClientInitHeaders) {
            let clientInitHeaders = {};
            RequestHeadersFieldsForCache.forEach((k) => {
                let v = request.headers.get(k);
                if (v) {
                    clientInitHeaders[k] = v;
                }
            });
            WSBServiceWorker.lkgAppHeaders = clientInitHeaders;
            postClientMessage("sahc" /* ClientMessageType.SetAppHeadersCache */, { headers: clientInitHeaders });
        }
        if (bundleFetchImpression) {
            WSBServiceWorker.Log.finalizeImpression(bundleFetchImpression);
        }
        bundleFetchImpression = new WSBServiceWorker.Impression();
        // only check on init so we don't check for an update for every file in the bundle
        if (WSBServiceWorker.fallbackState == 2 /* FallbackState.Bundle */) {
            // if we've fallen back to the bundle, that means that both lkg (if it exists) and current don't work
            // check if there's a new version and decide what to do once we know if there is or not
            await updateBundle(bundleFetchImpression);
            // If no new version is available there isn't a whole lot we can do since it's likely that the page hasn't been loaded yet
            // so we can't ask the client to navigate to the bundle. The only course of action is to let the bad bundle continue to load
            // until it fallsback itself
        }
        else {
            if (WSBServiceWorker.bundleFetchLockTimer) {
                //reset the timer
                clearTimeout(WSBServiceWorker.bundleFetchLockTimer);
            }
            else {
                // lock the bundleLock so that bundle updates won't happen
                // this also will wait for an ongoing bundle update to finish before letting the fetch go through
                await WSBServiceWorker.bundleLock.lock();
            }
            WSBServiceWorker.bundleFetchLockTimer = setTimeout(() => {
                WSBServiceWorker.bundleLock.release();
                WSBServiceWorker.bundleFetchLockTimer = undefined;
                if (bundleFetchImpression) {
                    WSBServiceWorker.Log.finalizeImpression(bundleFetchImpression);
                    bundleFetchImpression = undefined;
                }
            }, WSBServiceWorker.bundleLockSafeTime);
        }
        bundleFetchImpression.logPerfEvent("fs" /* PerfEventName.FetchStart */);
    }
    async function getResponseFromCache(request, isResourceRequest, isThumbRequest) {
        let response;
        if (isResourceRequest) {
            if (config.checkVersionBasedCacheFirst) {
                // retrieve from version-based cache table first
                if (versionBasedCache) {
                    response = await versionBasedCache.match(request, WSBCacheMatchOptions);
                    if (response) {
                        return response;
                    }
                }
                // retrieve from generic cache table
                response = await bundleResourceCache.match(request, WSBCacheMatchOptions);
                if (response) {
                    if (config.cleanUpExpiredGenericCache) {
                        const genericCacheDate = response === null || response === void 0 ? void 0 : response.headers.get("Date");
                        if (isCacheExpired(genericCacheDate, config.genericCacheUpdateInterval)) {
                            // update the cached time for the resource
                            await bundleResourceCache.put(request, response.clone());
                        }
                    }
                    return response;
                }
            }
            else {
                // retrieve from generic cache table
                response = await bundleResourceCache.match(request, WSBCacheMatchOptions);
                if (response) {
                    if (config.cleanUpExpiredGenericCache) {
                        const genericCacheDate = response === null || response === void 0 ? void 0 : response.headers.get("Date");
                        if (isCacheExpired(genericCacheDate, config.genericCacheUpdateInterval)) {
                            // update the cached time for the resource
                            await bundleResourceCache.put(request, response.clone());
                        }
                    }
                    return response;
                }
                // retrieve from version-based cache table
                if (versionBasedCache) {
                    response = await versionBasedCache.match(request, WSBCacheMatchOptions);
                    if (response) {
                        return response;
                    }
                }
            }
        }
        else if (isThumbRequest && config.enableGenericThumbCacheInSW) {
            // we cannot ignoreSearch for thumbnail requests cuz we rely on the id=xxx parameter to differentiate the requests
            response = await thumbnailCache.match(request, WSBCacheMatchOptions);
        }
        return response;
    }
    async function getResponseFromServer(request, isInit, isResourceRequest, isThumbRequest) {
        let response;
        try {
            if (isInit) {
                if (config.avoidFetchOptionsInNavigateMode) {
                    response = await fetch(request);
                }
                else {
                    const headers = getRequestHeaders(2 /* RequestType.InitRequest */);
                    response = await fetch(request, { headers });
                }
            }
            else {
                response = await fetch(request);
            }
            if (isThumbRequest && config.enableGenericThumbCacheInSW) {
                // for thumbnail requests, we only cache it in thumbnail generic table
                // for some reason, the response status is always 0 for these requests, so we do not check response.ok
                let responseClone = response.clone();
                thumbnailCache.put(request, responseClone);
                return response;
            }
            if (response === null || response === void 0 ? void 0 : response.ok) {
                // fetch only lets a response be read once. Given that put() consumes the response body,
                // we need to have responseClone for put(). otherwise the response value will be empty when returning from this function
                // reference https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage/match#examples
                let responseClone = response.clone();
                if (isResourceRequest) {
                    // for bundle resource request, we will cache it in both version based table and generic cache table
                    // add cache to version based table
                    // this is to mitigate an issue with the manifest not being correct
                    // this is a bandaid and should be removed once the manifest issue is fixed properly
                    if (versionBasedCache) {
                        versionBasedCache.put(request, responseClone);
                    }
                    // also add cache to generic cache table, clone again to avoid response clone is empty after above cache.
                    responseClone = response.clone();
                    bundleResourceCache.put(request, responseClone);
                }
                else if (isInit) {
                    // for init requet, we only cache it in version based cache
                    if (versionBasedCache) {
                        versionBasedCache.put(request, responseClone);
                    }
                }
            }
            else {
                if (isResourceRequest || isInit) {
                    // throw errors for resource request only
                    throw new Error(`bad response status: ${response.status}`);
                }
            }
        }
        catch (ex) {
            bundleFetchImpression === null || bundleFetchImpression === void 0 ? void 0 : bundleFetchImpression.logError2("Fetch from web", request.url, ex);
        }
        return response;
    }
    async function prepareCaches() {
        if (!bundleResourceCache) {
            bundleResourceCache = await caches.open(WSBServiceWorker.bundleResourceCacheName);
        }
        if (config.enableGenericThumbCacheInSW && !thumbnailCache) {
            thumbnailCache = await caches.open(WSBServiceWorker.thumbnailCacheName);
        }
        // update the versionBasedCache object when it's not created yet or there's a new version coming in
        if (!versionBasedCache || shouldUpdateVersionBasedCache) {
            // if we're in a fallback state and there's an lkg try loading that. otherwise try loading the current.
            const versionBasedCacheName = await getActiveCacheName();
            if (versionBasedCacheName) {
                versionBasedCache = await caches.open(versionBasedCacheName);
                shouldUpdateVersionBasedCache = false;
            }
        }
    }
    WSBServiceWorker.prepareCaches = prepareCaches;
    /**
     *  called when the webpage makes a web request and  generic cache enabled
     * @param request the web request
     */
    async function onFetchWithGenericCache(request) {
        var _a;
        const requestUrlStr = request.url.toLowerCase();
        // retrieve response from cache storage first
        let response;
        // current wsb service worker only covers thumbnail requests and bundle resource requests in cache storage
        const isResourceRequest = isBundleResourceRequest(requestUrlStr);
        const isThumbRequest = isThumbnailRequest(requestUrlStr);
        const isInit = isInitRequest(requestUrlStr);
        // to avoid cache.open() which creates new Cache Object too many times
        // call the prepareCaches function to only create if needed
        await prepareCaches();
        if (isResourceRequest) {
            response = await getResponseFromCache(request, isResourceRequest, isThumbRequest);
            if (response) {
                // response retrieved from cache, so no need to fetch from server again
                return response;
            }
            // resource request should always be cached, if not, log an error
            bundleFetchImpression === null || bundleFetchImpression === void 0 ? void 0 : bundleFetchImpression.logError2("Fetch from cache", request.url, "A bundle resource file that should be cached was not");
        }
        else if (isThumbRequest && config.enableGenericThumbCacheInSW) {
            response = await getResponseFromCache(request, isResourceRequest, isThumbRequest);
            if (response) {
                // response retrieved from cache, so no need to fetch from server again
                return response;
            }
        }
        else if (isInit) {
            // every time a new init request coming in, we need to check if we need actions for bundle update
            await bundleUpdateHandler(request);
            // after init request handler, we need to prepare caches again cuz the versionBasedCache might change after it.
            await prepareCaches();
            if (versionBasedCache) {
                response = await versionBasedCache.match(request, WSBCacheMatchOptions);
                // only check init cache expiration when user connect to internet cuz offline bundle still depends on cache
                const shouldCheckInitResExpiration = response &&
                    isBrowserOnline() &&
                    (((_a = navigator === null || navigator === void 0 ? void 0 : navigator.userAgent) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes("iswebview2/true")) ||
                        config.checkInitResponseExpiration);
                if (shouldCheckInitResExpiration) {
                    const initResponseCacheDate = response === null || response === void 0 ? void 0 : response.headers.get("Date");
                    if (isCacheExpired(initResponseCacheDate, config.initResponseCacheExpirationTime)) {
                        // if init response cache is too old and user connects to internet, set the response as undefined
                        // so that following up code will re-fetch init response from server
                        response = undefined;
                    }
                }
                if (response) {
                    return response;
                }
            }
        }
        // fetch from server if needed (not in cache, or not in wsb service worker cache scope)
        response = await getResponseFromServer(request, isInit, isResourceRequest, isThumbRequest);
        if (config.fixEmptyResponseError && !response) {
            response = Response.error();
        }
        return response;
    }
    WSBServiceWorker.onFetchWithGenericCache = onFetchWithGenericCache;
    /**
     *  called when the webpage makes a web request
     * @param request the web request
     */
    async function onFetch(request) {
        const requestUrlStr = request.url.toLowerCase();
        if (isInitRequest(requestUrlStr)) {
            await bundleUpdateHandler(request);
        }
        // if we're in a fallback state and there's an lkg try loading that. otherwise try loading the current.
        const cacheName = await getActiveCacheName();
        // for wsb we can ignore the search (query) string because it'll only change in testing
        // and we need the cached page to properly retrieve the service worker uninstaller
        // we also need to ignore the vary header, as it isn't always present when making offline through the SW
        let response = null;
        if (config.reduceCacheInstance) {
            if (config.skipSearchCache) {
                if (isCacheableRequest(requestUrlStr)) {
                    updateActiveCacheInstance(cacheName);
                    if (WSBServiceWorker.activeCache) {
                        response = await WSBServiceWorker.activeCache.match(request, { ignoreSearch: true, ignoreVary: true });
                    }
                    else {
                        response = await caches.match(request, { cacheName, ignoreSearch: true, ignoreVary: true });
                    }
                }
            }
            else {
                updateActiveCacheInstance(cacheName);
                if (WSBServiceWorker.activeCache) {
                    response = await WSBServiceWorker.activeCache.match(request, { ignoreSearch: true, ignoreVary: true });
                }
                else {
                    response = await caches.match(request, { cacheName, ignoreSearch: true, ignoreVary: true });
                }
            }
        }
        else {
            if (config.skipSearchCache) {
                if (isCacheableRequest(requestUrlStr)) {
                    response = await caches.match(request, { cacheName, ignoreSearch: true, ignoreVary: true });
                }
            }
            else {
                response = await caches.match(request, { cacheName, ignoreSearch: true, ignoreVary: true });
            }
        }
        if (config.setInitResponseExpiration && response && isBrowserOnline() && isInitRequest(requestUrlStr)) {
            let responseDate = new Date(response.headers.get("Date"));
            if (responseDate) {
                WSBServiceWorker.initResonseLastCachedTime = responseDate.getTime();
                if (isNaN(WSBServiceWorker.initResonseLastCachedTime) || isInitResponseExpired()) {
                    response = null;
                }
            }
            else {
                response = null;
            }
        }
        let shouldAddToCache = isCacheableRequest(requestUrlStr);
        if (!response) {
            try {
                response = await fetch(request);
                if (config.setInitResponseExpiration && isInitRequest(requestUrlStr)) {
                    if (!(response === null || response === void 0 ? void 0 : response.ok)) {
                        throw new Error(`bad init call response status: ${response.status}`);
                    }
                    if (!!cacheName) {
                        if (config.reduceCacheInstance && WSBServiceWorker.activeCache) {
                            let responseClone = response.clone();
                            WSBServiceWorker.activeCache.put(request, responseClone);
                        }
                        else {
                            const cache = await caches.open(cacheName);
                            let responseClone = response.clone();
                            cache.put(request, responseClone);
                        }
                    }
                }
                // this is to mitigate an issue with the manifest not being correct
                // this is a bandaid and should be removed once the manifest issue is
                // fixed properly
                if (shouldAddToCache && !!cacheName) {
                    if (config.betterErrors) {
                        bundleFetchImpression === null || bundleFetchImpression === void 0 ? void 0 : bundleFetchImpression.logError2("Fetch from cache", request.url, "A file that should be cached was not");
                    }
                    if (config.enableResourceFetchError) {
                        bundleFetchImpression === null || bundleFetchImpression === void 0 ? void 0 : bundleFetchImpression.logError(`A file that should be cached was not: ${request.url}`);
                    }
                    if (config.reduceCacheInstance) {
                        if (!(response === null || response === void 0 ? void 0 : response.ok)) {
                            throw new Error(`bad response status: ${response.status}`);
                        }
                        if (WSBServiceWorker.activeCache) {
                            let responseClone = response.clone();
                            WSBServiceWorker.activeCache.put(request, responseClone);
                        }
                        else {
                            const cache = await caches.open(cacheName);
                            let responseClone = response.clone();
                            cache.put(request, responseClone);
                        }
                    }
                    else {
                        const cache = await caches.open(cacheName);
                        if (!(response === null || response === void 0 ? void 0 : response.ok)) {
                            throw new Error(`bad response status: ${response.status}`);
                        }
                        // fetch only lets a response be read once. Given that cache.put(request, response) will read response content,
                        // we need to have a responseClone to put into cache, otherwise the response value will be empty
                        // reference https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage/match#examples
                        let responseClone = response.clone();
                        cache.put(request, responseClone);
                    }
                    bundleFetchImpression === null || bundleFetchImpression === void 0 ? void 0 : bundleFetchImpression.logPerfEvent("lf" /* PerfEventName.LastFetch */);
                }
            }
            catch (ex) {
                if (shouldAddToCache) {
                    if (config.betterErrors) {
                        bundleFetchImpression === null || bundleFetchImpression === void 0 ? void 0 : bundleFetchImpression.logError2("Fetch from web", request.url, ex);
                    }
                    if (config.enableResourceFetchError) {
                        bundleFetchImpression === null || bundleFetchImpression === void 0 ? void 0 : bundleFetchImpression.logError(`[Fetch from web] ${ex}: ${request.url}`);
                    }
                }
            }
        }
        else {
            bundleFetchImpression === null || bundleFetchImpression === void 0 ? void 0 : bundleFetchImpression.logPerfEvent("lf" /* PerfEventName.LastFetch */);
        }
        return response;
    }
    WSBServiceWorker.onFetch = onFetch;
    /**
     * Called when a client requests the service worker to sync something
     * @param tag the tag for the thing to sync
     */
    async function onSync(tag, impression) {
        switch (tag) {
            case "cu" /* SyncTag.ClientUpdate */:
                if (WSBServiceWorker.fallbackState == 0 /* FallbackState.None */) {
                    // if we got this message, wsb has successfully loaded
                    await setLkgCandidate(true);
                }
                // do not block for a bundle update. let it happen async
                updateBundle(impression);
                break;
        }
    }
    WSBServiceWorker.onSync = onSync;
    /**
     * Called when a language switched is detected when bundle reduction on loc resource is enable
     */
    async function clearAllCache() {
        // clear out all the cached bundles
        let currentCaches = await caches.keys();
        for (let name of currentCaches) {
            await caches.delete(name);
        }
        // reset indexedDb versions
        await setLKGCacheName();
        await setCurrentCacheName();
        await setNextCacheName();
    }
    WSBServiceWorker.clearAllCache = clearAllCache;
    /**
     * Called when a client sends a message to the service worker
     * @param ev The message event
     * @param impression The impression for logging during this message event
     */
    async function onMessage(ev, impression) {
        let data = ev.data;
        switch (data.message) {
            case "sy" /* WorkerMessageType.Sync */:
                await onSync(data.tag, impression);
                break;
            case "fb" /* WorkerMessageType.Fallback */:
                await fallback(impression);
                break;
            case "scid" /* WorkerMessageType.SetMuid */:
                if (WSBServiceWorker.Log) {
                    WSBServiceWorker.Log.muid = data.muid;
                }
                await WSBServiceWorker.idbSet(WSBServiceWorker.stateStore, WSBServiceWorker.muidKey, data.muid);
                break;
            case "sah" /* WorkerMessageType.SetAppHeaders */:
                await setAppHeaders(data.headers, impression);
                break;
            case "ls" /* WorkerMessageType.LanguageSwitched */:
                await clearAllCache();
                await updateBundle(impression);
                break;
            case "cuegc" /* WorkerMessageType.CleanUpExpiredGenericCache */:
                await cleanUpExpiredGenericCache();
                break;
        }
    }
    WSBServiceWorker.onMessage = onMessage;
    function pickLogger(imp, where, rejection) {
        if (!imp) {
            return;
        }
        // clean up this whole function when betterErrors ships
        if (config.betterErrors) {
            imp.logError2(where, undefined, rejection);
        }
        else {
            imp.logError(rejection);
        }
    }
    function isThumbnailRequest(url) {
        // url should be lowercased
        if (url) {
            // Chinese image host name is s.cn.bing.net
            // other regions is th.bing.com
            return url.includes("th.bing.com") || url.includes("s.cn.bing.net");
        }
        return false;
    }
    function isBundleResourceRequest(url) {
        // url should be lowercased
        if (url) {
            return url.includes("/rb/") || url.includes("/rs/") || url.includes("/rp/");
        }
        return false;
    }
    function isInitRequest(url) {
        // url should be lowercased
        if (url) {
            return url.includes("/ws/init");
        }
        return false;
    }
    function isCacheableRequest(url) {
        return isInitRequest(url) || isBundleResourceRequest(url);
    }
    // attach to all the service worker events
    swSelf.addEventListener("install", ev => {
        const imp = new WSBServiceWorker.Impression();
        if (config.skipWaitingSW) {
            // we could skip waiting if there is a previous service worker running
            swSelf.skipWaiting();
        }
        return ev.waitUntil(onInstall()
            .catch(reason => pickLogger(imp, "onInstall", reason))
            .then(() => WSBServiceWorker.Log.finalizeImpression(imp)));
    });
    swSelf.addEventListener("activate", ev => {
        const imp = new WSBServiceWorker.Impression();
        return ev.waitUntil(onActivate()
            .catch(reason => pickLogger(imp, "onActivate", reason))
            .then(() => WSBServiceWorker.Log.finalizeImpression(imp)));
    });
    swSelf.addEventListener("fetch", (ev) => {
        if (config.enableGenericCacheInAllWebView) {
            ev.respondWith(initializeServiceWorker().then(() => onFetchWithGenericCache(ev.request).catch((reason) => {
                pickLogger(bundleFetchImpression, "onFetch", reason);
                return null;
            })));
        }
        else {
            ev.respondWith(initializeServiceWorker().then(() => onFetch(ev.request).catch((reason) => {
                pickLogger(bundleFetchImpression, "onFetch", reason);
                return null;
            })));
        }
    });
    // Sync is non standard and not supported by TypeScript. 
    swSelf.addEventListener("sync", ev => ev.waitUntil(initializeServiceWorker().then(async () => {
        const imp = new WSBServiceWorker.Impression();
        onSync(ev.tag, imp)
            .catch(reason => pickLogger(imp, "onSync", reason))
            .then(() => WSBServiceWorker.Log.finalizeImpression(imp));
    })));
    swSelf.addEventListener("message", ev => ev.waitUntil(initializeServiceWorker().then(async () => {
        const imp = new WSBServiceWorker.Impression();
        onMessage(ev, imp)
            .catch(reason => pickLogger(imp, "onMessage", reason))
            .then(() => WSBServiceWorker.Log.finalizeImpression(imp));
    })));
})(WSBServiceWorker || (WSBServiceWorker = {}));
;