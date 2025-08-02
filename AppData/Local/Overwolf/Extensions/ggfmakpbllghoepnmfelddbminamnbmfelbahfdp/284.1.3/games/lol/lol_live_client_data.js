define([
  '/games/lol/supported_features.js',
  '/utils/overwolfPlugin.js'
], function (SupportedFeatures, OverwolfPlugin) {

  const Constants = {
    ONLINE_POLLING_INTERVAL: 1000,
    OFFLINE_POLLING_INTERVAL: 5000,
    LIVE_CLIENT_DATA_URL: "https://localhost:2999/liveclientdata/allgamedata"
  };

  class LoLLiveClientData {
    constructor({ infoDB, featuresHandler, monitoring }) {
      this._infoDB = infoDB;
      this._featuresHandler = featuresHandler;
      this._monitoring = monitoring;

      this._pollingTimeoutId = -1;
      this._pollingIntervalInMS = Constants.ONLINE_POLLING_INTERVAL;
      this._started = false;

      this.start = this.start.bind(this);
      this.stop = this.stop.bind(this);
      this._performPolling = this._performPolling.bind(this);
      this._changePollingInterval = this._changePollingInterval.bind(this);
      this._handleLiveData = this._handleLiveData.bind(this);

      this._liveClientDataUrl = null;
      this._setGameModeCallback = null;
      this._didSetGameMode = false;
    }

    async start(setGameModeCallback) {
      try {
        this._started = true;
        this._setGameModeCallback = setGameModeCallback;
        await this._initializeLiveClientDataPort();

        console.log("[LoL] Starting Live Client Data Polling");
        this._setPollingTimeout();
      } catch (e) {
        console.log('[LoL] ERROR: Failed to initialize Live Client Data port');
        console.log(JSON.stringify(e, null, 2));
      }
    }

    stop() {
      this._started = false;
      if (this._pollingTimeoutId === -1) {
        return;
      }

      console.log("[LoL] Stopping Live Client Data Polling");
      clearTimeout(this._pollingTimeoutId);
      this._pollingTimeoutId = -1;
    }

    async _initializeLiveClientDataPort() {
      const plugin = await this._initializeNetstatPlugin();

      if (!plugin.initialized) {
        return;
      }

      plugin.instance.getTCPConnectionsForProcess("League of Legends", res => {
        if (!res.success) {
          return;
        }

        const connection = res.connections.find(conn => conn.State === 'LISTEN');
        const lcdPort = (connection && connection.LocalPort) || 2999;
        this._liveClientDataUrl = `https://localhost:${lcdPort}/liveclientdata/allgamedata`

        this._infoDB.set(
          SupportedFeatures.live_client_data.name,
          SupportedFeatures.live_client_data.info.port.category,
          SupportedFeatures.live_client_data.info.port.key,
          lcdPort
        );
      });
    }

    async _initializeNetstatPlugin() {
      return new Promise(async resolve => {
        const plugin = new OverwolfPlugin('experimental-plugin');
        await plugin.initialize();
        resolve(plugin);
      });
    }

    _performPolling() {
      if (!this._started) {
        return;
      }

      const url = this._liveClientDataUrl;
      const GET = overwolf.web.enums.HttpRequestMethods.GET;

      if (!url) {
        console.log('[LoL] ERROR: Missing Live Client Data URL');
        this._changePollingInterval(Constants.OFFLINE_POLLING_INTERVAL);
        this._setPollingTimeout();
		    return;
      }

      overwolf.web.sendHttpRequest(url, GET, null, "", result => {
        if (!result.success || result.statusCode !== 200) {
          this._changePollingInterval(Constants.OFFLINE_POLLING_INTERVAL);
        } else {
          this._changePollingInterval(Constants.ONLINE_POLLING_INTERVAL);
          try {
            this._handleLiveData(result.data);
          } catch {
          }
        }

        this._setPollingTimeout();
      });
    }

    _setPollingTimeout() {
      this._pollingTimeoutId = setTimeout(this._performPolling, this._pollingIntervalInMS);
    }

    async _changePollingInterval(newInterval) {
      if (this._pollingIntervalInMS === newInterval) {
        return;
      }

      this._pollingIntervalInMS = newInterval;
      console.log(`[LoL] Changing live client data interval to ${newInterval}`);
    }

    async _handleLiveData(liveData) {
      if (!this._started) {
        return;
      }

      const {
        activePlayer,
        allPlayers,
        events,
        gameData
      } = JSON.parse(liveData);



      const updates = [{
        info: SupportedFeatures.live_client_data.info.active_player,
        value: JSON.stringify(activePlayer)
      }, {
        info: SupportedFeatures.live_client_data.info.all_players,
        value: JSON.stringify(allPlayers)
      }, {
        info: SupportedFeatures.live_client_data.info.events,
        value: JSON.stringify(events)
      }, {
        info: SupportedFeatures.live_client_data.info.game_data,
        value: JSON.stringify(gameData)
      }
      ]

      updates.map(update => {
        if (!this._started) {
          return;
        }

        this._infoDB.set(
        SupportedFeatures.live_client_data.name,
        update.info.category,
        update.info.key,
        update.value
      )});
    }

  }

  return LoLLiveClientData;
});
