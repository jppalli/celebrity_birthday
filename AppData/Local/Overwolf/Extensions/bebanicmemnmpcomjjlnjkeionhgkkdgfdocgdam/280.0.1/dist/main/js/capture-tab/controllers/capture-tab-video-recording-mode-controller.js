"use strict";

//------------------------------------------------------------------------------
class CaptureTabVideoRecordingModeController extends BaseController {
  //----------------------------------------------------------------------------
  constructor() {
    super(overwolfInternal.settings.enums.SettingsCategory.Capture);

    this._view = new CaptureTabVideoRecordingModeView(this);
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

      await this._initMonitors();
      this._view.captureMonitor = settings.video.recordMonitor;
      this._view.recordActiveGame = settings.video.recordActiveGame;
    } catch (e) {
      console.error(e);
    }
  }

  //----------------------------------------------------------------------------
  async _initMonitors() {
    return new Promise(resolve => {
      overwolf.utils.getMonitorsList(result => {
        if (!result) {
          return resolve();
        }

        this._view.setCaptureMonitors(result.displays);
        return resolve();
      });
    })
  }

  //----------------------------------------------------------------------------
  // IViewDelegate

  //----------------------------------------------------------------------------
  async onChanged(name) {
    switch (name) {
      case this._view.Constants.captureMonitor:
        try {
          let value = this._view.captureMonitor;
          await SettingsService.setSettingAsync(
            super.settingCategory, {
              video: {
                recordMonitor: value
              }
            });
        } catch (e) {
          console.log(e);
          this._view.captureMonitor = null;
        }
        break;

      case this._view.Constants.recordActiveGame:
        try {
          let value = this._view.recordActiveGame;
          await SettingsService.setSettingAsync(
            super.settingCategory, { 
              video: { 
                recordActiveGame: value 
              } 
            });
        } catch (e) {
          this._view.recordActiveGame = !value;
        }
        break;
    }
  }

}
