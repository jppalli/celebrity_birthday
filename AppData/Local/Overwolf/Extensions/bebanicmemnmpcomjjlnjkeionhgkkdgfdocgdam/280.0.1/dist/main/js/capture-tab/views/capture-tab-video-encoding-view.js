"use strict";

// NOTE(twolf): Taken from WindowSettingsViewMode.cs (client) - we should expose
// this conversion map from the client!
const presetsFriendlyNameConversionMap = {
  "INTEL": {
    "LOW": "Best Speed",
    "MEDIUM": "Balanced",
    "HIGH": "Best Quality"
  },
  "X264": {
    "ULTRAFAST": "Ultra fast (lowest quality)",
    "SUPERFAST": "Super fast",
    "VERYFAST": "Very fast",
    "FASTER": "Faster",
    "FAST": "Fast (highest quality)"
  },
  "NVIDIA_NVENC": {
    "AUTOMATIC": "Automatic",
    "DEFAULT": "Default",
    "HIGH_QUALITY": "High Quality",
    "HIGH_PERFORMANCE": "High Performance",
    "BLURAY_DISK": "Blueray Disk",
    "LOW_LATENCY": "Low Latency",
    "HIGH_PERFORMANCE_LOW_LATENCY": "High Performance - Low latency",
    "HIGH_QUALITY_LOW_LATENCY": "High Quality - Low Latency",
    "LOSSLESS": "Lossless",
    "HIGH_PERFORMANCE_LOSSLESS": "High Performance - Lossless"   
  },
  "AMD_AMF": {
    "AUTOMATIC": "Automatic",
    "BALANCED": "Balanced",
    "SPEED": "Speed",
    "QUALITY": "Quality"
  }
}

const rateControlFriendlyNameConversionMap = {
  "RC_CBR": "CBR (Constant Bitrate)",
  "RC_CQP": "CQP (Constant Quantization Parameter)",
  "RC_VBR": "VBR (Variable Bitrate)",
  "RC_VBR_MINQP": "VBR MinQP (Variable Bitrate)",
  "RC_2_PASS_QUALITY": "2 Pass Quality"
}


const presetsFriendlyNameConversionMap224 = {
  "INTEL": {
    "QUALITY": "Quality",
    "BALANCED": "Balanced",
    "SPEED": "Speed",
    "VERYSLOW": "Veryslow",
    "SLOWER": "Slower",
    "SLOW": "Slow",
    "MEDIUM": "Medium",
    "FAST": "Fast",
    "FASTER": "Faster",
    "VERYFAST": "Very fast",
  },
  "X264": {
    "ULTRAFAST": "Ultra fast (lowest quality)",
    "SUPERFAST": "Super fast",
    "VERYFAST": "Very fast",
    "FASTER": "Faster",
    "FAST": "Fast ",
    "MEDIUM": "Medium",
    "SLOW": "Slow ",
    "SLOWER": "Slower",
    "VERYSLOW": "Veryslow",
    "PLACEBO": "Placebo (highest quality)"

  },
  "NVIDIA_NVENC": {
    "AUTOMATIC": "Automatic",
    "DEFAULT": "Default",
    "HIGH_QUALITY": "High Quality",
    "HIGH_PERFORMANCE": "High Performance",
    "LOW_LATENCY": "Low Latency",
    "HIGH_PERFORMANCE_LOW_LATENCY": "High Performance - Low latency",
    "HIGH_QUALITY_LOW_LATENCY": "High Quality - Low Latency",
    "LOSSLESS": "Lossless",
    "HIGH_PERFORMANCE_LOSSLESS": "High Performance - Lossless"   
  },
  "AMD_AMF": {
    "BALANCED": "Balanced",
    "SPEED": "Speed",
    "QUALITY": "Quality"
  }
}

const rateControlFriendlyNameConversionMap224 = {
  "RC_CBR": "CBR (Constant Bitrate)",
  "RC_CQP": "CQP (Constant Quantization Parameter)",
  "RC_VBR": "VBR (Variable Bitrate)",
  "RC_LOSSLESS" :"Lossless",
}

// NOTE(twolf): NVIDIA_NVENC_NEW has the same exact presets as NVIDIA_NVENC
presetsFriendlyNameConversionMap["NVIDIA_NVENC_NEW"] = 
  presetsFriendlyNameConversionMap["NVIDIA_NVENC"];

// OBS 29
presetsFriendlyNameConversionMap224["NVIDIA_NVENC_NEW"] =
 presetsFriendlyNameConversionMap224["NVIDIA_NVENC"];
presetsFriendlyNameConversionMap224["NVIDIA_NVENC_HEVC"] =
 presetsFriendlyNameConversionMap224["NVIDIA_NVENC_NEW"];
presetsFriendlyNameConversionMap224["AMD_AMF_HEVC"] =
 presetsFriendlyNameConversionMap224["AMD_AMF"];
presetsFriendlyNameConversionMap224["INTEL_HEVC"] =
 presetsFriendlyNameConversionMap224["INTEL"];


//------------------------------------------------------------------------------
class CaptureTabVideoEncodingView extends View {
  //----------------------------------------------------------------------------
  get Constants() {
    return {
      encoder: "encoder",
      preset: "preset",
      rateControl: "rateControl",
      maxKbps: "maxKbps"
    }
  }

  //----------------------------------------------------------------------------
  constructor(viewDelegate) {
    super(viewDelegate);

    const kSelectorCaptureVideoSection = "#capture-subsection--video";
    this._listEncoders = new ViewComponent(null, `${kSelectorCaptureVideoSection} #recordingEncoderList`);
    this._selectedEncoder = new ViewComponent(this.Constants.encoder, `${kSelectorCaptureVideoSection} #selectedRecordingEncoder`);

    this._listPresets = new ViewComponent(null, `${kSelectorCaptureVideoSection} #recordingPresetList`);
    this._selectedPreset = new ViewComponent(this.Constants.preset, `${kSelectorCaptureVideoSection} #selectedRecordingPreset`);
  
    this._listRateControl = new ViewComponent(null, `${kSelectorCaptureVideoSection} #recordingRateControlList`);
    this._selectedRateControl = new ViewComponent(this.Constants.rateControl, `${kSelectorCaptureVideoSection} #selectedRecordingRateControl`);

    this._selectedMaxKbps = document.getElementById('selectedMaxKbps');
  }

  //----------------------------------------------------------------------------
  init() {
    super.initComponents();
    
    try {
      this._selectedEncoder.element.addEventListener("change", () => {
        super.onChanged(this._selectedEncoder.name);
      });

      this._selectedPreset.element.addEventListener("change", () => {
        super.onChanged(this._selectedPreset.name);
      });

      this._selectedRateControl.element.addEventListener("change", () => {
        super.onChanged(this._selectedRateControl.name);
      });

      this._selectedMaxKbps.addEventListener("change", () => {
        super.onChanged(this.Constants.maxKbps);
      });

      this.initSlider();
    } catch (e) {
    }
  }

  //----------------------------------------------------------------------------
  setEncoders(encoders) {
    this._listEncoders.element.innerHTML = "";

    if (!encoders) {
      return;
    }
  
    encoders.forEach(encoder => {     
      let encoderElement = document.createElement("li");
      encoderElement.innerText = encoder.display_name;
      encoderElement.dataset.settingId = encoder.name;
      if (!encoder.enabled) {
        encoderElement.classList.add("disabled");
      }

      this._listEncoders.element.appendChild(encoderElement);
    });
  }

  //----------------------------------------------------------------------------
  setPresets(presets) {
    this._listPresets.element.innerHTML = "";

    if (!presets) {
      return;
    }

    let encoder = this.encoder;
  
    presets.forEach(preset => {
      let friendlyName = this._getFriendlyPresetName(preset);

      // If we don't have a friendly name, don't show it
      if (friendlyName) {
        let presetElement = document.createElement("li");
        presetElement.innerText = friendlyName;
        presetElement.dataset.settingId = preset;
        this._listPresets.element.appendChild(presetElement);
      }
    });

    this.preset = presets[0];
  }

  //----------------------------------------------------------------------------
  setRateControls(rateControls) {
    // NOTE(sabraham): Temporarily hiding rate control until we add support
    this._listRateControl.element.parentElement.parentElement.parentElement.style.display = "none";
    return;

    // NOTE(sabraham): Quick fix for missing QuickSync rate controls.
    if (!rateControls || rateControls.length === 0) {
      this._listRateControl.element.parentElement.parentElement.parentElement.style.display = "none";
    } else {
      this._listRateControl.element.parentElement.parentElement.parentElement.style.display = "block";
    }

    this._listRateControl.element.innerHTML = "";

    if (!rateControls) {
      return;
    }

    rateControls.forEach(rateControl => {
      let friendlyName = this._getFriendlyRateControlName(rateControl);

      if (friendlyName) {
        let rateControlElement = document.createElement("li");
        rateControlElement.innerText = friendlyName;
        rateControlElement.dataset.settingId = rateControl;
        this._listRateControl.element.appendChild(rateControlElement);
      }
    })
  }

  //----------------------------------------------------------------------------
  _getFriendlyPresetName(preset) {
    let encoder = this.encoder;

    let presetsMap = this._isOverwolfWithOBS29() ?
      presetsFriendlyNameConversionMap224[encoder] :
      presetsFriendlyNameConversionMap[encoder];

    if (!presetsMap) {
      return null;
    }

    let friendlyName = presetsMap[preset];
    if (!friendlyName) {
      return null;
    }

    return friendlyName;
  }

  //----------------------------------------------------------------------------
  _getFriendlyRateControlName(rateControl) {
    if (this._isOverwolfWithOBS29()) {
      return rateControlFriendlyNameConversionMap224[rateControl] ||
      rateControl; //default 
    }
    return rateControlFriendlyNameConversionMap[rateControl] ||
           rateControl; //default 
  }

  //----------------------------------------------------------------------------
  _onMaxKbpsChanged() {
    const dm_range = document.getElementById('selectedMaxKbps');
    const valueFloater = document.querySelector('#maxKbpsSlider .range-value-floater');
    const valueOutput = valueFloater.querySelector('.val');
    const progressLine = document.querySelector('#maxKbpsSlider .progress-line');
  
    const newValue = Number( (dm_range.value - dm_range.min) * 100 / (dm_range.max - dm_range.min) );
    const newPosition = 6 - (newValue * 0.12); //the fuck is this

    valueOutput.innerHTML = `${dm_range.value}`;
    valueFloater.style.left = `calc(${newValue}% + (${newPosition}px))`;
    progressLine.style.width = `${newValue}%`;
  }

  //----------------------------------------------------------------------------
  _isOverwolfWithOBS29() {
    return overwolf.version >= "0.224.0.0";
  }

  //----------------------------------------------------------------------------
  initSlider() {
    this._onMaxKbpsChanged();
    this._selectedMaxKbps.addEventListener('input', this._onMaxKbpsChanged);
  }

  //----------------------------------------------------------------------------
  // Getters/Setters
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  set encoder(name) {
    try {
      let encoderElement = this._listEncoders.element.querySelector(
        `li[data-setting-id='${name}']`);

      if (!encoderElement) {
        // try to fallback to the default if we failed
        encoderElement = this._listEncoders.element.firstElementChild;
      }

      if (encoderElement.classList.contains("disabled")) {
        console.error("Trying to set a disabled encoder: " + name);
        return;
      }

      this._selectedEncoder.element.textContent = encoderElement.textContent;        
      this._selectedEncoder.element.dataset.settingId = name;
    } catch (e) {
      console.log(e);
    }   
  }

  //----------------------------------------------------------------------------
  get encoder() {
    try {
      return this._selectedEncoder.element.dataset.settingId;
    } catch (e) {
      return null;
    }
  }

  //----------------------------------------------------------------------------
  set preset(name) {
    try {
      let presetElement = this._listPresets.element.querySelector(
        `li[data-setting-id='${name}']`);

      if (!presetElement) {
        // try to fallback to the default if we failed
        presetElement = this._listPresets.element.firstElementChild;
      }

      this._selectedPreset.element.textContent = presetElement.textContent;
      this._selectedPreset.element.dataset.settingId = name;
    } catch (e) {
      console.log(e);
    }
  }

  //----------------------------------------------------------------------------
  get preset() {
    try {
      return this._selectedPreset.element.dataset.settingId;
    } catch (e) {
      return null;
    }
  }

  //----------------------------------------------------------------------------
  set rateControl(name) {
    try {
      let rateControlElement = this._listRateControl.element.querySelector(
        `li[data-setting-id='${name}']`);

      if (!rateControlElement) {
        // try to fallback to the default if we failed
        rateControlElement = this._listRateControl.element.firstElementChild;
      }

      this._selectedRateControl.element.textContent =
        rateControlElement.textContent;
      this._selectedRateControl.element.dataset.settingId = name;
    } catch (e) {
      console.log(e);
    }
  }

  //----------------------------------------------------------------------------
  get rateControl() {
    try {
      return this._selectedRateControl.element.dataset.settingId;
    } catch (e) {
      return null;
    }
  }

  //----------------------------------------------------------------------------
  set maxKbps(value) {
    try {
      this._selectedMaxKbps.value = value;
      this._onMaxKbpsChanged();
    } catch (e) {
      console.error(e);
    }
  }

  //----------------------------------------------------------------------------
  get maxKbps() {
    try {
      return this._selectedMaxKbps.value;
    } catch (e) {
      return null;
    }
  }
}
