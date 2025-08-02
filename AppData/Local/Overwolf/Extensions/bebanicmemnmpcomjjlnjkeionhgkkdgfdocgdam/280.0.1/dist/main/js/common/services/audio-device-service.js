"use strict";

const kDefaultAudioDeviceDisplayName = "System Default";

//------------------------------------------------------------------------------
// Typescript would be better than this model class...
class AudioDeviceService {
  //----------------------------------------------------------------------------
  // |playback| = true will return only the playback devices, while false will
  // return only the recording devices. If the device supports both, it will
  // return it in both cases.
  static async retrieveListAsync(playback = true) {    
    return new Promise((resolve, reject) => {
      overwolf.streaming.getAudioDevices((result) => {
        if (result.status != "success") {
          console.error("Failed to get audio devices: " + 
                        JSON.stringify(result));
          return reject();
        }

        let defaultDeviceId = result.default_playback_device_id;
        if (!playback) {
          defaultDeviceId = result.default_recording_device_id;
        }

        try {
          return resolve(this._toAudioDeviceArray(result, defaultDeviceId));
        } catch(e) {
          console.error(e);
          return reject();
        }
      });
    });
  }

  //----------------------------------------------------------------------------
  static _toAudioDeviceArray(result, defaultDeviceId) {
    let retArray = [];

    let defaultDevice = null;

    result.devices.forEach(device => {
      let isDefault = device.device_id == defaultDeviceId;
     
      if (isDefault) {
        defaultDevice = device;
      }

      retArray.push(new AudioDevice(device, false));
    });

    // Place the default device as the first item
    if (defaultDevice) {
      // NOTE(twolf): This is a hack because we know how the client sets the
      // default device's id - however, it makes more sense that we get it as
      // part of the devices retruned by the client so that we don't have to
      // maintain it both in the app and in the client...
      defaultDevice.device_setting_id = "0 - " + kDefaultAudioDeviceDisplayName;
      defaultDevice.display_name = kDefaultAudioDeviceDisplayName;
      retArray.unshift(new AudioDevice(defaultDevice, true));
    }

    return retArray;
  }
}
