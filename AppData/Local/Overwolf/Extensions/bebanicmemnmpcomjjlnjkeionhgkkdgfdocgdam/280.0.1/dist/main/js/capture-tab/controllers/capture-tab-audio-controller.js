"use strict";

//------------------------------------------------------------------------------
class CaptureTabAudioController extends BaseController {
  //----------------------------------------------------------------------------
  constructor() {
    super(overwolfInternal.settings.enums.SettingsCategory.Capture);
    this._audioDevices = null;

    this._view = new CaptureTabAudioView(this);
  }

  //----------------------------------------------------------------------------
  async init(settings) {
    this._view.init();
    await this._initDevices();
    this._initStartupSettings(settings);
  }

  //----------------------------------------------------------------------------
  async _initDevices() {
    try {
      this._view.setSystemDevices(await AudioDeviceService.retrieveListAsync());
      this._view.setMicDevices(
        await AudioDeviceService.retrieveListAsync(false));
    } catch (e) {
    }
  }

  //----------------------------------------------------------------------------
  async _initStartupSettings(settings) {
    try {
      if (settings == null) {
        return;
      }

      this._view.captureSystemSound = settings.audio.captureSystem;
      this._view.systemSoundDevice = settings.audio.systemDevice;
      this._view.systemSoundVolume = settings.audio.systemVolume;

      this._view.captureMicSound = settings.audio.captureMicrophone;
      this._view.micSoundDevice = settings.audio.microphoneDevice;      
      this._view.micSoundVolume = settings.audio.microphoneVolume;
    } catch (e) {
      console.error(e);
    }
  }

  //----------------------------------------------------------------------------
  // IViewDelegate

  //----------------------------------------------------------------------------
  async onClicked(name) {
    switch (name) {
      case this._view.Constants.playSound:
        try {
          this._audioCheckService.play(this._view.volume);
        } catch (e) {
          console.error(e);
        }
        break;
    }
  }

  //----------------------------------------------------------------------------
  async onChanged(name) {
    switch (name) {
      case this._view.Constants.captureSystemSound:
        try {
          let value = this._view.captureSystemSound;
          await SettingsService.setSettingAsync(
            super.settingCategory, {
              audio: {
                captureSystem: value
              }
            });
        } catch (e) {
          console.log(e);
          this._view.captureSystemSound = null;
        }
        break;
      case this._view.Constants.systemSoundDevice:
        try {
          let value = this._view.systemSoundDevice;
          await SettingsService.setSettingAsync(
            super.settingCategory, {
              audio: {
                systemDevice: value
              }
            });
        } catch (e) {
          console.log(e);
          this._view.systemSoundDevice = null;
        }
        break;
      case this._view.Constants.captureMicSound:
        try {
          let value = this._view.captureMicSound;
          await SettingsService.setSettingAsync(
            super.settingCategory, {
              audio: {
                captureMicrophone: value
              }
            });
        } catch (e) {
          console.log(e);
          this._view.captureMicSound = null;
        }
        break;
      case this._view.Constants.micSoundDevice:
        try {
          let value = this._view.micSoundDevice;
          await SettingsService.setSettingAsync(
            super.settingCategory, {
              audio: {
                microphoneDevice: value
              }
            });
        } catch (e) {
          console.log(e);
          this._view.micSoundDevice = null;
        }
        break;  
      case this._view.Constants.systemSoundVolume:
        try {
          let value = this._view.systemSoundVolume;
          await SettingsService.setSettingAsync(
            super.settingCategory, {
              audio: {
                systemVolume: value
              }
            });           
        } catch (e) {
          console.log(e);
        }
        break;
      case this._view.Constants.micSoundVolume:
        try {
          let value = this._view.micSoundVolume;
          await SettingsService.setSettingAsync(
            super.settingCategory, {
              audio: {
                microphoneVolume: value
              }
            });          
        } catch (e) {
          console.log(e);
        }
        break;
      }
  }
}
