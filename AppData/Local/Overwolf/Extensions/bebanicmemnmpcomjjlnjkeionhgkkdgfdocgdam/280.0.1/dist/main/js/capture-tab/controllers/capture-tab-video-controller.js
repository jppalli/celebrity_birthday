"use strict";

//------------------------------------------------------------------------------
class CaptureTabVideoController extends BaseController {
  //----------------------------------------------------------------------------
  constructor() {
    super(overwolfInternal.settings.enums.SettingsCategory.Capture);

    this._view = new CaptureTabVideoView(this);
  }

  //----------------------------------------------------------------------------
  init(settings) {
    this._view.init();
    this._initStartupSettings(settings);
  }

  //----------------------------------------------------------------------------
  async _initStartupSettings(settings) {
    try {
      if (settings == null) {
        return;
      }

      this._view.resolution = settings.video.resolution;

      if (settings.video.framerate < 0) {
        settings.video.framerate = 10;
      }
      this._view.framerate = settings.video.framerate;

      this._view.videosFolder = settings.video.videosFolder;
      this._view.screenshotsFolder = settings.video.screenshotsFolder;

      this._view.compatibilityMode = settings.video.compatibilityEnabled;
    } catch (e) {
      console.error(e);
    }
  }


  //----------------------------------------------------------------------------
  // IViewDelegate

  //----------------------------------------------------------------------------
  async onClicked(name) {
    switch (name) {
      //------------------------------------------------------------------------
      case this._view.Constants.advancedMode:
        try {
          if (this._view.advancedMode) {
            AnalyticsService.trackRSEvent('settings_advanced_open');
          }
        } catch (e) {
        }
        break;      
      //------------------------------------------------------------------------
      case this._view.Constants.videosFolderOpen:
        try {
          const path = this._view.videosFolder;
          overwolf.utils.openWindowsExplorer(path, () => { });
        } catch (e) {
          console.error(e);
        }
        break;
      //------------------------------------------------------------------------
      case this._view.Constants.videosFolderChange:
        try {
          const path = this._view.videosFolder;
          overwolf.utils.openFolderPicker(path, result => {
            if (result.status != "success") {
              return console.error("Failed to change video folder path: " +
                JSON.stringify(result));
            }

            // NOTE(twolf): Can't call an API from within an API's callback
            setTimeout(async () => {
              await SettingsService.setSettingAsync(
                super.settingCategory, { 
                  video: { 
                    videosFolder: result.path 
                  } 
                });
              this._view.videosFolder = result.path;
            }, 0);
          });

        } catch (e) {
          console.log(e);
        }
        break;
      //------------------------------------------------------------------------
      case this._view.Constants.screenshotsFolderOpen:
        try {
          let path = this._view.screenshotsFolder;
          overwolf.utils.openWindowsExplorer(path, () => { });
        } catch (e) {
          console.error(e);
        }
        break;
      //------------------------------------------------------------------------
      case this._view.Constants.screenshotsFolderChange:
        try {
          let path = this._view.screenshotsFolder;
          overwolf.utils.openFolderPicker(path, result => {
            if (result.status != "success") {
              return console.error(
                "Failed to change screenshots folder path: " +
                JSON.stringify(result));
            }

            // NOTE(twolf): Can't call an API from within an API's callback
            setTimeout(async () => {
              await SettingsService.setSettingAsync(
                super.settingCategory, {
                  video: {
                    screenshotsFolder: result.path
                  }
                });
              this._view.screenshotsFolder = result.path;
            }, 0);
          });
        } catch (e) {
          console.log(e);
        }
        break;
    }
  }

  //----------------------------------------------------------------------------
  async onChanged(name) {
    let handled = false;
    let analytics = null;
    let setting = null;

    switch (name) {
      case this._view.Constants.resolution:
        try {
          setting = { 
            video: { 
              resolution: this._view.resolution
            } 
          };

          analytics = { name: 'settings_resolution_change' };
          
          handled = true;
        } catch (e) {
        }
        break;
      case this._view.Constants.framerate:
        try {
          setting = { 
            video: { 
              framerate: this._view.framerate
            } 
          };

          analytics = { name: 'settings_fps_change' };
          
          handled = true;
        } catch (e) {
        }
        break;   
      case this._view.Constants.compatibilityMode:
        try {
          setting = { 
            video: { 
              compatibilityEnabled: this._view.compatibilityMode
            } 
          };

          if (this._view.compatibilityMode) {
            analytics = { name: 'settings_vid_comp_on' };
          }
          
          handled = true;
        } catch (e) {
          this._view.compatibilityMode = !value;
        }
        break;
    }

    if (!handled) {
      return;
    }

    if (analytics) {
      AnalyticsService.trackRSEvent(analytics.name, analytics.data);
    }

    if (setting) {
      await SettingsService.setSettingAsync(super.settingCategory, setting);
    }
  }

}
