"use strict";

//------------------------------------------------------------------------------
class CaptureTabVideoCaptureOptionsController extends BaseController {
  //----------------------------------------------------------------------------
  constructor() {
    super(overwolfInternal.settings.enums.SettingsCategory.Capture);

    this._view = new CaptureTabVideoCaptureOptionsView(this);
  }

  //----------------------------------------------------------------------------
  init(settings) {
    this._view.init();
    this._initStartupSettings(settings);

    overwolf.settings.language.onLanguageChanged.addListener(() => {
      // NOTE(twolf): This is a hacky solution to updating the currently 
      // selected dropdowns upon a language change. We allow waiting long enough
      // for the actual translation to complete. We don't assume a user will
      // change a language and, in less than 2 seconds, go back to the capture
      // tab > Advance and look at the dropdowns. 
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

      this._view.mouseCursor = settings.video.mouseCursor;
      this._view.captureWindows = settings.video.overwolfWindows;
    } catch (e) {
      console.error(e);
    }
  }

  //----------------------------------------------------------------------------
  // IViewDelegate

  //----------------------------------------------------------------------------
  async onChanged(name) {
    switch (name) {
      case this._view.Constants.mouseCursor:
        try {
          let value = this._view.mouseCursor;
          await SettingsService.setSettingAsync(
            super.settingCategory, {
              video: {
                mouseCursor: value
              }
            });
        } catch (e) {
          console.log(e);
          this._view.mouseCursor = null;
        }
        break;
      case this._view.Constants.captureWindows:
        try {
          let value = this._view.captureWindows;
          await SettingsService.setSettingAsync(
            super.settingCategory, {
              video: {
                overwolfWindows: value
              }
            });
        } catch (e) {
          console.log(e);
          this._view.captureWindows = null;
        }
        break;
    }
  }

}
