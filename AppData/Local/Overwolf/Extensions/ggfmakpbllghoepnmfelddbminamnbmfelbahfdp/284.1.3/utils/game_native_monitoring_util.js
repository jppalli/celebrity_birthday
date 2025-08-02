'use strict';

define(['/utils/monitoring_statics.js',
       '/games/SupportedGames.js'], 
       function(MonitoringStatics, SupportedGames){

           const MIN_SESSION_TIME = 300000; 

  function GameNativeMonitoringUtility(config) {
    if (!(this instanceof GameNativeMonitoringUtility)) {
      throw new TypeError(
        "GameNativeMonitoringUtility constructor cannot be called as a function.");
    }
    let self = this;

    if(config) {
      self.sessionStartTime = new Date();
      console.log("[TRACKING] session start time: " + self.sessionStartTime);

      self.game = config.game;
    }

    console.log("[TRACKING] Native Monitoring features");
  }


  GameNativeMonitoringUtility.prototype = {
    constructor: GameNativeMonitoringUtility,

    TRACKING_KINDS: MonitoringStatics.TRACKING_KINDS,

    _featuresUsed: {},
    _eventsUsed: {},

    stop: function stop() {
      console.log("[TRACKING] monitoring native util stop called.");
      this._removePluginListeners();
      this._sendBatchPluginMonitoringEvents.call(this);
    },

    start: function start() {
      console.log("[TRACKING] monitoring native util start called.");
      this._removePluginListeners();
      this._addPluginListeners();
    },

    _removePluginListeners: function _removePluginListeners(){
      overwolf.games.events.onInfoUpdates.removeListener(this._handleGameTrackingInfoUpdate.bind(this));
      overwolf.games.events.onNewEvents.removeListener(this._handleGameTrackingEvent.bind(this));
    },

    _addPluginListeners: function _addPluginListeners(){
    overwolf.games.events.onInfoUpdates.addListener(this._handleGameTrackingInfoUpdate.bind(this));
    overwolf.games.events.onNewEvents.addListener(this._handleGameTrackingEvent.bind(this));
  },

  _handleGameTrackingInfoUpdate: function _handleGameTrackingInfoUpdate(infos) {
    if (!infos || !infos.info) {
        return; 
    }

    for (var infoItem of infos.info) {
      if (infoItem.key && !this._featuresUsed.hasOwnProperty(infoItem.key)) {
        this._featuresUsed[infoItem.key] = Date.now();
        console.log("[TRACKING] infoUpdate used:  " + infoItem.key);
       }
    }
  },

  _handleGameTrackingEvent: function _handleGameTrackingEvent(events) {
    if (!events || !events.events)
      return; 

    for (var eventInfo of events.events) {
      if (eventInfo.name && !this._eventsUsed.hasOwnProperty(eventInfo.name)) {
        this._eventsUsed[eventInfo.name] = Date.now();
        console.log("[TRACKING] event used: " + eventInfo.name);
        }
    }
  },

  _sendBatchPluginMonitoringEvents: function _sendBatchPluginMonitoringEvents(){
    this._handleReportTrakckedFeatures.call(this);

    this._featuresUsed = {};
    this._eventsUsed = {};
  },

  _handleReportTrakckedFeatures : function _handleReportTrakckedFeatures(){
    let now = new Date().getTime();
    if(now - this.sessionStartTime.getTime() < MIN_SESSION_TIME) {
      console.log("[TRACKING] not tracking missing features - session too" +
        " short");
      return;
    }


        if (this._featuresUsed) {
      for (var infoKey in this._featuresUsed) { 
        this._sendTrack(this.TRACKING_KINDS.FEATURE_TRACKED, this.game.name + "." + infoKey);
       }
    }

    if (this._eventsUsed) {
      for (var infoEvent in this._eventsUsed) { 
        this._sendTrack(this.TRACKING_KINDS.FEATURE_TRACKED, this.game.name + "." + infoEvent);
      }
    }
  },

  _sendTrack: function _sendTrack(id, extra) {
    try {
      MonitoringStatics.sendTrack(id, extra);
    } catch (e) {
    }
  }

  };
  return GameNativeMonitoringUtility;
});