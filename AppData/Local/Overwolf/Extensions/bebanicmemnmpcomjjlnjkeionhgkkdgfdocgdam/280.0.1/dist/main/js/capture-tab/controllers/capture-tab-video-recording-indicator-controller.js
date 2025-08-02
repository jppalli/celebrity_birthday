"use strict";

//------------------------------------------------------------------------------
class CaptureTabVideoRecordingIndicatorController extends BaseController {
  //----------------------------------------------------------------------------
  constructor() {
    super(overwolfInternal.settings.enums.SettingsCategory.Capture);

    this._view = new CaptureTabVideoRecordingIndicatorView(this);
  }

  //----------------------------------------------------------------------------
  init(settings) {
    this._view.init();
    this._initStartupSettings(settings);

    overwolf.settings.language.onLanguageChanged.addListener(() => {
      // NOTE(twolf): Read about this hack under the 
      // |CaptureTabVideoCaptureOptionsController| - same area.
      setTimeout(() => {
        this._initStartupSettings(settings);
      }, 2000);
    });    
  }

  //----------------------------------------------------------------------------
  async _initStartupSettings(settings) {
    try {
      if (settings == null) {
        return;
      }

      this._view.recordingIndicator = settings.video.indication;
      this._view.recordingIndicatorCorner = settings.video.indicationPosition;      
    } catch (e) {
      console.error(e);
    }
  }

  //----------------------------------------------------------------------------
  // IViewDelegate

  //----------------------------------------------------------------------------
  async onChanged(name) {
    switch (name) {
      case this._view.Constants.recordingIndicator:
        try {
          let value = this._view.recordingIndicator;
          await SettingsService.setSettingAsync(
            super.settingCategory, {
              video: {
                indication: value
              }
            });
        } catch (e) {
          console.log(e);
          this._view.recordingIndicator = null;
        }
        break;
      case this._view.Constants.recordingIndicatorCorner:
        try {
          let value = this._view.recordingIndicatorCorner;
          await SettingsService.setSettingAsync(
            super.settingCategory, {
              video: {
                indicationPosition: value
              }
            });
        } catch (e) {
          console.log(e);
          // NOTE(twolf): Do not set to null here because it will trigger an
          // endless loop of |onChange| calls
          //this._view.recordingIndicatorCorner = null;
        }
        break;

        
    }
  }
}