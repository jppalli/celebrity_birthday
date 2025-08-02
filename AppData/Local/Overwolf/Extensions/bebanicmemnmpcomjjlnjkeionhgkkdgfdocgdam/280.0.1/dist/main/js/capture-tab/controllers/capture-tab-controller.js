"use strict";

// This is mainly for built-in apps which do not have permissions
const WHITELISTED_CAPTURE_APPS = [
  'lnhebboianabbebhnpoodokcdcnmikacoeijpjfe' // Game Capture
];

const kPermissionVideoCaptureSettings = "VideoCaptureSettings";

//------------------------------------------------------------------------------
class CaptureTabController extends BaseController {
  //----------------------------------------------------------------------------
  constructor() {
    super(overwolfInternal.settings.enums.SettingsCategory.Capture);

    this._view = new CaptureTabView(this);
    this._relevantApps = [];

    // For tracking purposes, we keep track of which section is currently shown
    // (video/audio)
    this._videoSectionActive = false;
    
    // Keep track of which events were sent per session - to limit some events
    // once per session
    this._perSessionTracking = {};
  }

  //----------------------------------------------------------------------------
  init(settings) {
    this._view.init();
    this._initStartupSettings(settings);
    this._initRelevantApps();

    this._videoSectionActive = this._view.isVideoSectionSelected;

    //This was added instead of the registration to the navigation capture menu item
    //Instead we listen to the url changes.
    window.addEventListener('popstate', (data)=>{
      let selectedTab = this.getLocationSegment(1);
      if(selectedTab === 'capture'){
        this.onClicked(this._view.Constants.captureNavButton);
      }
    });
  }

  getLocationSegment(segmentNumber){
    let parts = window.location.hash.split('/');

    //not including # for example segment number 2 of '#/hotkeys/game_summary is game_summary
    return parts.length > 1 ? parts[segmentNumber]: null;
  }

  //----------------------------------------------------------------------------
  async _initStartupSettings(settings) {
    try {
      if (settings == null) {
        return;
      }

      overwolfInternal.extensions.getRunningRecorders(
        this._handleRunningRecorders.bind(this));
      overwolfInternal.extensions.onRecordingStateChanged.removeListener(
        this._handleRunningRecorders.bind(this));
      overwolfInternal.extensions.onRecordingStateChanged.addListener(
        this._handleRunningRecorders.bind(this));

      overwolf.extensions.onAppLoaded.removeListener(
        this._onAppInstalled.bind(this));
      overwolf.extensions.onAppLoaded.addListener(
        this._onAppInstalled.bind(this));

      overwolf.extensions.onAppUninstalled.removeListener(
        this._onAppUninstalled.bind(this));
      overwolf.extensions.onAppUninstalled.addListener(
        this._onAppUninstalled.bind(this));
    } catch (e) {
      console.error(e);
    }
  }

  //----------------------------------------------------------------------------
  async _initRelevantApps() {
    // Get all extensions, then filter only those with the VideoCaptureSettings
    // permission that are not blacklisted. Also keep the whitelisted apps.
    const extensions = await extensionsService.getExtensions();
    this._relevantApps = Object.values(extensions)
      .filter(extension => this._isVideoCaptureExtension(extension)) // filter
      .map(ext => { return { UID: ext.UID, name: ext.displayName }}) // translate to array of UIDs and names

    this._view.relevantApps = this._relevantApps;
  }

  //----------------------------------------------------------------------------
  async _onAppInstalled(app) {
    const extension = await extensionsService.getExtension(app.UID);
    if (!extension) {
      return;
    }
    
    if (this._isVideoCaptureExtension(extension) &&
        !this._relevantApps.includes(app.UID)) {
      this._relevantApps.push(app.UID);
      this._view.relevantApps = this._relevantApps;
    }
  }

  //----------------------------------------------------------------------------
  _onAppUninstalled(app) {
    const i = this._relevantApps.indexOf(app.UID);

    if (i >= 0) {
      this._relevantApps.splice(i, 1); // remove the app from the list
    }

    this._view.relevantApps = this._relevantApps;
  }

  //----------------------------------------------------------------------------
  _isVideoCaptureExtension(extension) {
    if (!WHITELISTED_CAPTURE_APPS.includes(extension.UID) &&
        !extension.permissions.includes(kPermissionVideoCaptureSettings)) {
      return false;
    }

    return true;
  }

  //----------------------------------------------------------------------------
  _handleRunningRecorders(info) {
    this._view.runningRecorders = info;
  }

  //----------------------------------------------------------------------------
  // IViewDelegate

  //----------------------------------------------------------------------------
  async onClicked(name) {
    switch (name) {
      case this._view.Constants.discoverAppsButton: {
        location.href = 'overwolf://store/apps/capture';
        AnalyticsService.trackRSEvent('settings_discover_capture_apps_click');
        break;
      }
      case this._view.Constants.videoAudioSelector: {
        if (this._videoSectionActive == this._view.isVideoSectionSelected) {
          return;
        }

        AnalyticsService.trackRSEvent('settings_video_audio_tabs_click');
        this._videoSectionActive = this._view.isVideoSectionSelected;
        break;
      }
      case this._view.Constants.captureNavButton: {
        if (!this._view.isNoAppsStateShown) {
          return;
        }

        let eventName = 'settings_discover_capture_apps_view';
        if (!this._perSessionTracking[eventName]) {
          AnalyticsService.trackRSEvent(eventName);
          this._perSessionTracking[eventName] = true;
        }

        break;
      }
    }
  }

  //----------------------------------------------------------------------------
  async onChanged(name) {
  };

  on(eventName, info) {
    switch (eventName) {
      case 'runningRecordersChange': {

        break;
      }
    }
    if (!info || !info.extensions || !info.extensions.length) {

    }
  }
}