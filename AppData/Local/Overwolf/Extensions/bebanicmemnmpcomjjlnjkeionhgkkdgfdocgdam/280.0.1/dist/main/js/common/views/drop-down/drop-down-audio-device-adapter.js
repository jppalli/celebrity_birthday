"use strict";

const kAudioDevicesEmptyDeviceId = "";

//------------------------------------------------------------------------------
class DropDownAudioDeviceAdapter extends IDropDownItemAdapter {
  //----------------------------------------------------------------------------
  // When |useEmptyIdsForDefaultDevices| - we return an empty string for 
  // system default devices - this is required by the capture audio settings
  constructor(allowPlaybacks, 
              allowRecording, 
              useSettingId,
              useEmptyIdsForDefaultDevices = false) {
    super();
    this._allowPlaybacks = allowPlaybacks;
    this._allowRecording = allowRecording;
    this._useSettingId = useSettingId;
    this._useEmptyIdsForDefaultDevices = useEmptyIdsForDefaultDevices;
  }

  //----------------------------------------------------------------------------
  shouldSkip(rawItem) {
    if (this._allowPlaybacks && rawItem.canPlayback) {
      return false;
    }

    if (this._allowRecording && rawItem.canRecord) {
      return false;
    }

    return true;
  }

  //----------------------------------------------------------------------------
  isDisabled(rawItem) {
    return false;
  }

  //----------------------------------------------------------------------------
  getDisplayName(rawItem) {
    return rawItem.displayName
  }

  //----------------------------------------------------------------------------
  // NOTE(twolf): |_useSettingId| is used because the client, for capture
  // audio settings, uses the device id, while for the sounds devices it uses
  // settings id
  getSettingId(rawItem) {
    if (rawItem.isDefaultDevice && this._useEmptyIdsForDefaultDevices) {
      return kAudioDevicesEmptyDeviceId;
    }

    if (this._useSettingId) {
      return rawItem.settingId;
    } else {
      return rawItem.id;
    }
  }
}