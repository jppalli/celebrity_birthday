"use strict";

// NOTE(twolf): Taken from MediaManager.cs (client) - should be provided as an
// api...
const defaultPresetsForEncoder = {
  "INTEL": "LOW",
  "X264": "VERYFAST",
  "NVIDIA_NVENC": "DEFAULT",
  "NVIDIA_NVENC_NEW": "DEFAULT",
  "AMD_AMF": "AUTOMATIC"
}

//------------------------------------------------------------------------------
class CaptureTabVideoEncodingController extends BaseController {
  //----------------------------------------------------------------------------
  constructor() {
    super(overwolfInternal.settings.enums.SettingsCategory.Capture);

    this._view = new CaptureTabVideoEncodingView(this);
    
    // Holds a map of encoder name to encoder object - so it is easy to lookup
    // the presets and rate controls related to an encoder
    this._encoders = {};
  }

  //----------------------------------------------------------------------------
  async init(settings) {
    this._view.init();
    await this._initEncoders();
    this._initStartupSettings(settings);
  }

  //----------------------------------------------------------------------------
  _initEncoders() {
    return new Promise(resolve => {
      this._initEncodersWithRetries(resolve, 3);
    })
  }

  //----------------------------------------------------------------------------
  _initEncodersWithRetries(promiseResolver, retriesLeft) {
    if (retriesLeft <= 0) {
      return promiseResolver();
    }

    try {
      overwolf.streaming.getStreamEncoders(result => {
        // Upon startup, it might take a few seconds for the client to build
        // the list of supported encoders - if this happens, we'll retry
        if (!result.encoders) {
          console.log("Failed getting encoders - will try again in 5 seconds");
          return setTimeout(() => {
            this._initEncodersWithRetries(promiseResolver, retriesLeft-1);            
          }, 5000);
        }

        // Create mapping for easy lookups
        result.encoders.forEach(encoder => {
          this._encoders[encoder.name] = encoder;
        });

        this._view.setEncoders(result.encoders);
        return promiseResolver();
      });  
    } catch (e) {
      console.error(e);
      return promiseResolver();
    }
  }

  //----------------------------------------------------------------------------
  async _initStartupSettings(settings) {
    try {
      if (settings == null) {
        return;
      }

      let encoder = settings.video.encodingCodec;
      this._view.encoder = encoder;

      this._setPresetsForEncoder(encoder);
      this._view.preset = settings.video.encodingPreset;

      this._setRateControlsForEncoder(encoder);
      this._view.rateControl = settings.video.rateControl;

      this._view.maxKbps = settings.video.maxKbps;
    } catch (e) {
      console.error(e);
    }
  }

  //----------------------------------------------------------------------------
  _setPresetsForEncoder(encoder) {
    let encoderInfo = this._encoders[encoder];
    if (!encoderInfo || !encoderInfo.presets) {
      console.error(`Couldn't find presets for: ${encoder}?!`);
      return;
    }

    this._view.setPresets(encoderInfo.presets);

    // set default
    let defaultPreset = defaultPresetsForEncoder[encoder];
    this._view.preset = defaultPreset;
  }

  //----------------------------------------------------------------------------
  _setRateControlsForEncoder(encoder) {
    let encoderInfo = this._encoders[encoder];
    if (!encoderInfo || !encoderInfo.rateControls) {
      console.error(`Couldn't find rate controls for: ${encoder}?!`);
      return;
    }

    this._view.setRateControls(encoderInfo.rateControls);

    let defaultRateControl = "RC_CBR";// defaultRateControlsForEncoder[encoder];
    this._view.rateControl = defaultRateControl;
  }

  //----------------------------------------------------------------------------
  async saveSettingEncoder() {
    try {
      let value = this._view.encoder;
      await SettingsService.setSettingAsync(
        super.settingCategory, {
          video: {
            encodingCodec: value
          }
        });

      this._setPresetsForEncoder(value);
      this._setRateControlsForEncoder(value);
    } catch (e) {
      console.log(e);
      this._view.encoder = null;
    }
  }

  //----------------------------------------------------------------------------
  async saveSettingPreset() {
    try {
      let value = this._view.preset;
      await SettingsService.setSettingAsync(
        super.settingCategory, {
          video: {
            encodingPreset: value
          }
        });
    } catch (e) {
      console.log(e);
      this._view.preset = null;
    }
  }

  //----------------------------------------------------------------------------
  async saveSettingRateControl() {
    try {
      let value = this._view.rateControl;
      await SettingsService.setSettingAsync(
        super.settingCategory, {
          video: {
            rateControl: value
          }
        }
      );
    } catch (e) {
      console.log(e);
      this._view.rateControl = null;
    }
  }

  //----------------------------------------------------------------------------
  async saveSettingMaxKbps() {
    try {
      let value = this._view.maxKbps;
      await SettingsService.setSettingAsync(
        super.settingCategory, {
          video: {
            maxKbps: value
          }
        }
      );
    } catch (e) {
      console.log(e);
      this._view.maxKbps = null;
    }
  }

  //----------------------------------------------------------------------------
  // IViewDelegate

  //----------------------------------------------------------------------------
  async onChanged(name) {
    switch (name) {
      case this._view.Constants.encoder:
        await this.saveSettingEncoder();
        await this.saveSettingPreset();
        await this.saveSettingRateControl();
        break;
      case this._view.Constants.preset:
        await this.saveSettingPreset();
        break;
      case this._view.Constants.rateControl:
        await this.saveSettingRateControl();
        break;
      case this._view.Constants.maxKbps:
        await this.saveSettingMaxKbps();
        break;
    }
  }

}
