define([
  '/games/legends_of_runeterra/supported_features.js'
], function (SupportedFeatures) {

  return class LoRLiveClientData {

    constructor({ infoDB, featuresHandler }) {
      this._infoDB = infoDB;
      this._featuresHandler = featuresHandler;
      this._match_started = false;

      this._onlinePollingInterval = 1000;
      this._offlinePollingInterval = 5000;
      this._clientApiBaseUrl = "http://localhost:21337";
      this._clientEndpoints = {
        activeDeck: {
          relativeRoute: '/static-decklist',
          feature: SupportedFeatures.game_client_data.info.active_deck,
          pollingInterval: this._onlinePollingInterval
        },
        cardPositions: {
          relativeRoute: '/positional-rectangles',
          feature: SupportedFeatures.game_client_data.info.card_positions,
          pollingInterval: this._onlinePollingInterval
        },
        expeditions: {
          relativeRoute: '/expeditions-state',
          feature: SupportedFeatures.game_client_data.info.expeditions,
          pollingInterval: this._onlinePollingInterval
        },
        gameResult: {
          relativeRoute: '/game-result',
          feature: SupportedFeatures.game_client_data.info.game_result,
          pollingInterval: this._onlinePollingInterval
        }
      };

      this._shouldPoll = true;
    }

    stop() {
      console.log('[LoR] Stopping Live Client Data Polling');
      this._shouldPoll = false;
    }

    start() {
      console.log('[LoR] Starting Live Client Data Polling');
      this._shouldPoll = true;

      _.values(this._clientEndpoints)
        .forEach(endpoint => this._pollEndpoint(endpoint));
    }

    _pollEndpoint(endpoint) {
      const url = `${this._clientApiBaseUrl}${endpoint.relativeRoute}`;
      const GET = overwolf.web.enums.HttpRequestMethods.GET;

      overwolf.web.sendHttpRequest(url, GET, null, "", result => {
        if (!result.success || result.statusCode !== 200) {
          this._setEndpointPollingInterval(endpoint, this._offlinePollingInterval);
        } else {
          this._setEndpointPollingInterval(endpoint, this._onlinePollingInterval);
          this._handleLiveDataForFeature(result.data, endpoint.feature);
        }

        if (this._shouldPoll) {
          setTimeout(
            this._pollEndpoint.bind(this),
            endpoint.pollingInterval,
            endpoint
          );
        }
      });
    }

    async _handleLiveDataForFeature(data, feature) {

            this._infoDB.set(
        SupportedFeatures.game_client_data.name,
        feature.category,
        feature.key,
        data
      );

      if (this._handleMatchStartEnd(data, feature)) {
        return;
      }
    }

    async _setEndpointPollingInterval(endpoint, newInterval) {
      if (endpoint.pollingInterval === newInterval) {
        return;
      }

      endpoint.pollingInterval = newInterval;
      const { key } = endpoint.feature;

      console.log(`[LoR] Changing ${key} interval to ${newInterval}`);
    }

    _handleMatchStartEnd(data,feature){
      if (feature.key !== "card_positions") {
        return false;
      }
      const value = JSON.parse(data);
      if (value.GameState == "InProgress" && this._match_started == false) {
        let feature = SupportedFeatures.match_info;
        this._featuresHandler.triggerEvent(
          feature.name,
          feature.events.match_start.name,
          null
        );
        this._match_started = true;
      }
      else if (value.GameState == "Menus" && this._match_started == true) {
        let feature = SupportedFeatures.match_info;
        this._featuresHandler.triggerEvent(
          feature.name,
          feature.events.match_end.name,
          null
        );
        this._match_started = false;
      }
    }
  }
})