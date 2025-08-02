var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "./extract_credentials", "../../../utils/websocket", "./message_handlers/handler_lobby", "./message_handlers/handler_lobby_members", "./message_handlers/handler_platform_id", "./message_handlers/handler_game_flow_phase", "./message_handlers/handler_current_summoner", "./message_handlers/handler_champ_select", "./message_handlers/handler_tft_end_of_game", "./message_handlers/handler_lol_end_of_game", "./message_handlers/handler_lol_rank_stats", "./message_handlers/handler_game_version", "./message_handlers/handler_user_experience", "./message_handlers/handler_user_current_rp", "./message_handlers/handler_user_buy_rp", "../../../utils/sleep", "./services/lcu_fetch_service", "./message_handlers/handler_clash_tournament_summary", "./message_handlers/handler_game_flow_session", "./message_handlers/handler_settings_position_preferences", "./message_handlers/handler_settings_quick_position_preferences"], function (require, exports, extract_credentials_1, websocket_1, handler_lobby_1, handler_lobby_members_1, handler_platform_id_1, handler_game_flow_phase_1, handler_current_summoner_1, handler_champ_select_1, handler_tft_end_of_game_1, handler_lol_end_of_game_1, handler_lol_rank_stats_1, handler_game_version_1, handler_user_experience_1, handler_user_current_rp_1, handler_user_buy_rp_1, sleep_1, lcu_fetch_service_1, handler_clash_tournament_summary_1, handler_game_flow_session_1, handler_settings_position_preferences_1, handler_settings_quick_position_preferences_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SocketManager = void 0;
    const withTryCatch = (handler) => {
        const handle = (data) => {
            try {
                handler(data);
            }
            catch (err) {
                console.error(`message error: ${data}`, err);
            }
        };
        return handle;
    };
    class SocketManager {
        constructor() {
            this._client = null;
            this._handlers = {};
            this._handlerInstances = [];
            this._credentials = null;
            this._initialized = false;
            this._stopped = false;
            this._connected = false;
            this._lcuFetchService = null;
            this._logAllMessages = localStorage.getItem("logAllLCUMessage");
            this.createWebSocket = (credentials) => __awaiter(this, void 0, void 0, function* () {
                const MAX_RETRIES = 10;
                let client = null;
                let retries = 0;
                while (!client && retries < MAX_RETRIES) {
                    try {
                        const connectionParams = {
                            secured: true,
                            port: credentials.port,
                            credentials: {
                                username: "riot",
                                password: atob(credentials.token).replace("riot:", "")
                            },
                            protocols: ["wamp"]
                        };
                        client = yield websocket_1.OverwolfWebSocket.createWebSocket(connectionParams);
                        console.log(`[LCU WEBSOCKET] Created WebSocket.`);
                        break;
                    }
                    catch (error) {
                        console.log(`[LCU WEBSOCKET] Error: ${error}`);
                        console.log(`[LCU WEBSOCKET] Retrying to create WebSocket...`);
                        retries++;
                        yield sleep_1.sleep(100);
                    }
                }
                return client;
            });
            this.addWebSocketListeners = () => {
                if (!this._client)
                    throw new Error("Must create WebSocket client before adding listeners!");
                const { _client: client } = this;
                client.onError.removeListener(this.onError);
                client.onOpen.removeListener(this.onOpen);
                client.onClosed.removeListener(this.onClosed);
                client.onMessage.removeListener(this.onMessage);
                client.onError.addListener(this.onError);
                client.onOpen.addListener(this.onOpen);
                client.onClosed.addListener(this.onClosed);
                client.onMessage.addListener(this.onMessage);
                console.log("[LCU WEBSOCKET] Listening...");
            };
            this.subscribeJsonApi = () => __awaiter(this, void 0, void 0, function* () {
                if (!this._client)
                    throw new Error("Must create WebSocket client before subscribing to JSON API!");
                const { _client: client } = this;
                const MAX_RETRIES = 10;
                let retries = 0;
                while (retries < MAX_RETRIES) {
                    try {
                        console.log("[LCU WEBSOCKET] Subscribing to JSON API...");
                        yield client.send('[5,"OnJsonApiEvent"]');
                        return;
                    }
                    catch (error) {
                        console.log("[LCU WEBSOCKET] Failed to subscribe to JSON API. Retrying...");
                        retries++;
                        yield sleep_1.sleep(2000);
                    }
                }
                throw new Error("Failed to subscribe to JSON API.");
            });
            this.init = this.init.bind(this);
            this.start = this.start.bind(this);
            this.stop = this.stop.bind(this);
            this.onMessage = this.onMessage.bind(this);
            this.onClosed = this.onClosed.bind(this);
            this.onError = this.onError.bind(this);
            this.onOpen = this.onOpen.bind(this);
        }
        init(featuresHandler, infoDB, info) {
            return __awaiter(this, void 0, void 0, function* () {
                if (this._initialized) {
                    return;
                }
                this._credentials = yield extract_credentials_1.ExtractCredentials.extract(info);
                if (!this._credentials) {
                    throw new Error("Cannot init socket manager - missing credentials.");
                }
                this._handlerInstances = [
                    new handler_lobby_1.HandlerLobby(featuresHandler, infoDB, this._credentials),
                    new handler_lobby_members_1.HandlerLobbyMembers(featuresHandler, infoDB, this._credentials),
                    new handler_platform_id_1.HandlerPlatformId(featuresHandler, infoDB, this._credentials),
                    new handler_game_flow_phase_1.HandlerGameFlowPhase(featuresHandler, infoDB, this._credentials),
                    new handler_game_flow_session_1.HandlerGameFlowSession(featuresHandler, infoDB, this._credentials),
                    new handler_settings_position_preferences_1.HandlerPositionPreferences(featuresHandler, infoDB, this._credentials),
                    new handler_settings_quick_position_preferences_1.HandlerQuickPositionPreferences(featuresHandler, infoDB, this._credentials),
                    new handler_current_summoner_1.HandlerCurrentSummoner(featuresHandler, infoDB, this._credentials),
                    new handler_champ_select_1.HandlerChampSelect(featuresHandler, infoDB, this._credentials),
                    new handler_tft_end_of_game_1.HandlerTftEndOfGame(featuresHandler, infoDB, this._credentials),
                    new handler_lol_end_of_game_1.HandlerLolEndOfGame(featuresHandler, infoDB, this._credentials),
                    new handler_game_version_1.HandlerGameVersion(featuresHandler, infoDB, this._credentials),
                    new handler_user_experience_1.HandlerUserExperience(featuresHandler, infoDB, this._credentials),
                    new handler_user_current_rp_1.HandlerUserCurrentRp(featuresHandler, infoDB, this._credentials),
                    new handler_user_buy_rp_1.HandlerUserBuyRp(featuresHandler, infoDB, this._credentials),
                    new handler_clash_tournament_summary_1.HandlerClashTournamentSummary(featuresHandler, infoDB, this._credentials),
                    new handler_lol_rank_stats_1.HandlerLolRankStats(featuresHandler, infoDB, this._credentials)
                ];
                for (const handler of this._handlerInstances) {
                    this._handlers[handler.URI] = withTryCatch(handler.handle);
                }
                this._lcuFetchService = new lcu_fetch_service_1.LCUFetchService(this._credentials);
                this._client = yield this.createWebSocket(this._credentials);
                yield this.addWebSocketListeners();
                this._stopped = false;
                this._initialized = true;
            });
        }
        start() {
            return __awaiter(this, void 0, void 0, function* () {
                if (!this._initialized)
                    throw new Error("Must call init() before calling start() on SocketManager.");
                yield this.connect();
                yield this.FetchData();
            });
        }
        FetchData() {
            return __awaiter(this, void 0, void 0, function* () {
                if (this._lcuFetchService) {
                    console.log("[LCU WEBSOCKET] Performing one-time polling...");
                    let pendingServices = [];
                    for (const handler of this._handlerInstances) {
                        const result = yield this._lcuFetchService.perfomQuery(handler.URI);
                        if (result.statusCode === 200) {
                            this._handlers[handler.URI](JSON.parse(result.data));
                        }
                        else {
                            console.log("[LCU] service not ready yet", handler.URI, handler.pollOnce);
                            if (handler.pollOnce) {
                                pendingServices.push(handler);
                            }
                        }
                    }
                    if (pendingServices.length > 0) {
                        console.log("[LCU] starting a must polling service timer");
                        this.startFetcherTimer(pendingServices);
                    }
                }
            });
        }
        stop() {
            return __awaiter(this, void 0, void 0, function* () {
                this._stopped = true;
                if (this._client) {
                    console.log("[LCU WEBSOCKET] Closing socket...");
                    yield this._client.close();
                    this._connected = false;
                    this._client = null;
                }
                this._handlerInstances = [];
                this._handlers = {};
                this._lcuFetchService = null;
                this._initialized = false;
                if (this._fetchTimer) {
                    clearTimeout(this._fetchTimer);
                }
            });
        }
        connect() {
            return __awaiter(this, void 0, void 0, function* () {
                if (this._connected)
                    return;
                if (!this._client)
                    throw new Error("Cannot connect without creating a client.");
                yield this._client.connect();
                this._connected = true;
            });
        }
        startFetcherTimer(pendingServices) {
            this._fetchTimer = setTimeout(this.onPendingPollingServiceTime.bind(this), 5000, pendingServices);
        }
        onPendingPollingServiceTime(pendingServices) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let pendingArray = [...pendingServices];
                    yield pendingArray.forEach((handler) => __awaiter(this, void 0, void 0, function* () {
                        if (this._lcuFetchService) {
                            const result = yield this._lcuFetchService.perfomQuery(handler.URI);
                            if (result && result.statusCode === 200) {
                                console.log("[LCU] service is ready", handler.URI);
                                this._handlers[handler.URI](JSON.parse(result.data));
                                pendingServices.splice(pendingServices.indexOf(handler));
                            }
                        }
                    }));
                }
                catch (e) {
                    console.error("[LCU] polling timer error");
                }
                if (!this._lcuFetchService) {
                    console.log("[LCU] stop polling, no fetch service");
                    return;
                }
                if (pendingServices.length == 0) {
                    console.log("[LCU] all service are ready, stop polling");
                    return;
                }
                this.startFetcherTimer(pendingServices);
            });
        }
        onMessage(data) {
            const message = JSON.parse(data.message)[2];
            if (this._handlers[message.uri]) {
                this._handlers[message.uri](message.data);
            }
            else {
                if (this._logAllMessages) {
                    console.log(`[LCU WEBSOCKET] unhandled message '${message.uri}': ${JSON.stringify(data)}`);
                }
            }
        }
        onError(data) {
            console.log(`[LCU WEBSOCKET] onError:`, JSON.stringify(data));
        }
        onOpen(data) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log("[LCU WEBSOCKET] Connected.");
                yield this.subscribeJsonApi();
            });
        }
        onClosed(data) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log(`[LCU WEBSOCKET] onClosed:`, JSON.stringify(data));
                this._connected = false;
                this._client = null;
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    try {
                        if (this._connected)
                            return;
                        if (this._stopped)
                            return;
                        this._client = yield this.createWebSocket(this._credentials);
                        yield this.addWebSocketListeners();
                        console.log(`[LCU WEBSOCKET] Attempting to reconnect...`);
                        yield this.connect();
                    }
                    catch (error) {
                        console.log(`[LCU WEBSOCKET] Reconnect attempt failed: ${error}`);
                        this._connected = false;
                        this._client = null;
                    }
                }), 2000);
            });
        }
    }
    exports.SocketManager = SocketManager;
});
