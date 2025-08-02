"use strict";

//------------------------------------------------------------------------------
// Typescript would be better than this model class...
class AudioDevice {
  //----------------------------------------------------------------------------
  constructor(overwolfAudioDevice, defaultDevice) {
    this._id = overwolfAudioDevice.device_id;
    this._canPlayback = overwolfAudioDevice.can_playback;
    this._canRecord = overwolfAudioDevice.can_record;
    this._settingId = overwolfAudioDevice.device_setting_id;
    this._state = overwolfAudioDevice.device_state;
    this._displayName = overwolfAudioDevice.display_name;

    this._defaultDevice = defaultDevice;
  }

  //----------------------------------------------------------------------------
  get id() {
    return this._id;
  }

  //----------------------------------------------------------------------------
  get canPlayback() {
    return this._canPlayback;
  }

  //----------------------------------------------------------------------------
  get canRecord() {
    return this._canRecord;
  }

  //----------------------------------------------------------------------------
  get settingId() {
    return this._settingId;
  }

  //----------------------------------------------------------------------------
  get state() {
    return this._state;
  }

  //----------------------------------------------------------------------------
  get displayName() {
    return this._displayName;
  }

  //----------------------------------------------------------------------------
  get isDefaultDevice() {
    return this._defaultDevice;
  }
}
