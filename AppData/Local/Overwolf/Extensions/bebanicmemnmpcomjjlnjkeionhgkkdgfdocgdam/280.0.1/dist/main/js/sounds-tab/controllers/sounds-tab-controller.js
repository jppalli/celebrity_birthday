"use strict";

//------------------------------------------------------------------------------
class SoundsTabController extends BaseController {
  //----------------------------------------------------------------------------
  constructor() {
    super(overwolfInternal.settings.enums.SettingsCategory.Sounds);
    this._audioDevices = null;
    this._view = new SoundsTabView(this);
    this._audioCheckService = new SoundCheckService();
  }

  //----------------------------------------------------------------------------
  async init(settings) {
    this._view.init();
    await this._initDevices();
    this._initStartupSettings(settings);

    await this._audioCheckService.init();
  }

  //----------------------------------------------------------------------------
  async _initDevices() {
    try {
      this._audioDevices = await AudioDeviceService.retrieveListAsync();
      this._view.setAudioDevices(this._audioDevices);
    } catch (e) {
    }
  }

  //----------------------------------------------------------------------------
  async _initStartupSettings(settings) {
    try {
      if (settings == null) {
        return;
      }

      this._view.playbackDevice = settings.playbackDevice;
      this._view.volume = settings.volume;
      this._view.playSkinEffects = settings.playSkinEffects;
      this._view.playSkinSpeech = settings.playSkinSpeech;
      
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
      case this._view.Constants.playbackDevice:
        try {
          let value = this._view.playbackDevice;
          await SettingsService.setSettingAsync(super.settingCategory, 
                                                {playbackDevice: value});
        } catch (e) {
          console.log(e);
          this._view.playbackDevice = null;
        }
        break;
      case this._view.Constants.volume:
        try {
          let value = this._view.volume;
          await SettingsService.setSettingAsync(super.settingCategory, 
                                                {volume: value});
        } catch (e) {
          console.log(e);
        }
        break;
      case this._view.Constants.playSkinEffects:
        try {
          let value = this._view.playSkinEffects;
          await SettingsService.setSettingAsync(super.settingCategory, 
                                                {playSkinEffects: value});
        } catch (e) {
          this._view.playSkinEffects = !value;
        }
        break;
      case this._view.Constants.playSkinSpeech:
        try {
          let value = this._view.playSkinSpeech;
          await SettingsService.setSettingAsync(super.settingCategory, 
                                                {playSkinSpeech: value});
        } catch (e) {
          this._view.playSkinSpeech = !value;
        }
        break;
    }
  };
}
