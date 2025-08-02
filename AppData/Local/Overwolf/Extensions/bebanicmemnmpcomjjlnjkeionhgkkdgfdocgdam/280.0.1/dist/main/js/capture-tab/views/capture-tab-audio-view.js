"use strict";

//------------------------------------------------------------------------------
class CaptureTabAudioView extends View {
  //----------------------------------------------------------------------------
  get Constants() {
    return {
      captureSystemSound: "captureSystemSound",
      systemSoundDevice: "systemSoundDevice",
      systemSoundVolume: "systemSoundvolume",
      captureMicSound: "captureMicSound",
      micSoundDevice: "micSoundDevice",
      micSoundVolume: "micSoundVolume"
    }
  }

  //----------------------------------------------------------------------------
  constructor(viewDelegate) {
    super(viewDelegate);

    const kSelectorCaptureAudioSection = "#capture-subsection--audio";

    // system sound
    this._checkboxSystemSound = new ViewComponent(this.Constants.captureSystemSound, `${kSelectorCaptureAudioSection} #capture-system-sound`);    
    this._systemSoundVolumeRange = new ViewComponent(this.Constants.systemSoundVolume, `${kSelectorCaptureAudioSection} #system-sound__volume > input`);
    this._listSystemSoundDevices = new ViewComponent(null, `${kSelectorCaptureAudioSection} #systemSoundDeviceList`);
    this._selectedSystemSoundDevice = new ViewComponent(this.Constants.systemSoundDevice, `${kSelectorCaptureAudioSection} #selectedSystemSoundDevice`);
    this._systemSoundDropDown = null;

    // microphone sound
    this._checkboxMicSound = new ViewComponent(this.Constants.captureMicSound, `${kSelectorCaptureAudioSection} #capture-microphone-sound`);
    this._micSoundVolumeRange = new ViewComponent(this.Constants.micSoundVolume, `${kSelectorCaptureAudioSection} #microphone-sound__volume > input`);
    this._listMicSoundDevices = new ViewComponent(null, `${kSelectorCaptureAudioSection} #micSoundDeviceList`);
    this._selectedMicSoundDevice = new ViewComponent(this.Constants.micSoundDevice, `${kSelectorCaptureAudioSection} #selectedMicSoundDevice`);
    this._micSoundDropDown = null;
  }

  //----------------------------------------------------------------------------
  init() {
    super.initComponents();

    this._systemSoundDropDown = new DropDownComponent(
      this._listSystemSoundDevices, 
      this._selectedSystemSoundDevice,
      new DropDownAudioDeviceAdapter(true, false, false, true),
      super.onChanged.bind(this));

    this._micSoundDropDown = new DropDownComponent(
      this._listMicSoundDevices, 
      this._selectedMicSoundDevice,
      new DropDownAudioDeviceAdapter(false, true, false, true),
      super.onChanged.bind(this));
      
    try {
      this._checkboxSystemSound.element.addEventListener("change", () => {
        this._updateCaptureSystemState();
        super.onChanged(this._checkboxSystemSound.name);
      });

      this._checkboxMicSound.element.addEventListener("change", () => {
        this._updateCaptureMicState();
        super.onChanged(this._checkboxMicSound.name);
      });

      this._systemSoundVolumeRange.element.addEventListener("change", () => {
        super.onChanged(this._systemSoundVolumeRange.name);
      });

      this._micSoundVolumeRange.element.addEventListener("change", () => {
        super.onChanged(this._micSoundVolumeRange.name);
      });
    } catch (e) {
    }
  }

  //----------------------------------------------------------------------------
  _updateCaptureSystemState() {
    const systemSoundDevice = document.getElementById("system-sound__device");
    const systemSoundVolume = document.getElementById("system-sound__volume");
    const systemSoundVolumeInput = systemSoundVolume.getElementsByTagName("input")[0];
  
    if (this.captureSystemSound) {
      systemSoundDevice.classList.remove("disabled");
      systemSoundVolume.classList.remove("disabled");
      systemSoundVolumeInput.disabled = false;
    } else {
      systemSoundDevice.classList.add("disabled");
      systemSoundVolume.classList.add("disabled");
      systemSoundVolumeInput.disabled = true;
    }
  }

  //----------------------------------------------------------------------------
  _updateCaptureMicState() {
    const microphoneSoundDevice = document.getElementById("microphone-sound__device");
    const microphoneSoundVolume = document.getElementById("microphone-sound__volume");
    const microphoneSoundVolumeInput = microphoneSoundVolume.getElementsByTagName("input")[0];
  
    if (this.captureMicSound) {
      microphoneSoundDevice.classList.remove("disabled");
      microphoneSoundVolume.classList.remove("disabled");
      microphoneSoundVolumeInput.disabled = false;
    } else {
      microphoneSoundDevice.classList.add("disabled");
      microphoneSoundVolume.classList.add("disabled");
      microphoneSoundVolumeInput.disabled = true;
    }
  }

  //----------------------------------------------------------------------------
  setSystemDevices(devices) {
    this._systemSoundDropDown.setItems(devices);
  }

  //----------------------------------------------------------------------------
  setMicDevices(devices) {
    this._micSoundDropDown.setItems(devices);
  }

  //----------------------------------------------------------------------------
  // Getters/Setters
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  set captureSystemSound(value) {
    try {
      this._checkboxSystemSound.element.checked = value;
      this._updateCaptureSystemState();
    } catch (e) {      
    }   
  }

  //----------------------------------------------------------------------------
  get captureSystemSound() {
    try {
      return this._checkboxSystemSound.element.checked;
    } catch (e) {
      return null;
    }   
  }

  //----------------------------------------------------------------------------
  set systemSoundDevice(deviceSettingsId) {
    this._systemSoundDropDown.selectedItem = deviceSettingsId;
  }

  //----------------------------------------------------------------------------
  get systemSoundDevice() {
    return this._systemSoundDropDown.selectedItem;
  }

  //----------------------------------------------------------------------------
  set systemSoundVolume(value) {
    try {
      this._systemSoundVolumeRange.element.value = value;
      this._systemSoundVolumeRange.element.style = `--value:${value}`;
    } catch (e) {      
    }   
  }

  //----------------------------------------------------------------------------
  get systemSoundVolume() {
    try {
      return this._systemSoundVolumeRange.element.value;
    } catch (e) {
      return null;
    }   
  }


  //----------------------------------------------------------------------------
  set captureMicSound(value) {
    try {      
      this._checkboxMicSound.element.checked = value;
      this._updateCaptureMicState();
    } catch (e) {      
    }   
  }

  //----------------------------------------------------------------------------
  get captureMicSound() {
    try {
      return this._checkboxMicSound.element.checked;
    } catch (e) {
      return null;
    }   
  }

  //----------------------------------------------------------------------------
  set micSoundDevice(deviceSettingsId) {
    this._micSoundDropDown.selectedItem = deviceSettingsId;
  }

  //----------------------------------------------------------------------------
  get micSoundDevice() {
    return this._micSoundDropDown.selectedItem;
  }

  //----------------------------------------------------------------------------
  set micSoundVolume(value) {
    try {
      this._micSoundVolumeRange.element.value = value;
      this._micSoundVolumeRange.element.style = `--value:${value}`;
    } catch (e) {      
    }   
  }

  //----------------------------------------------------------------------------
  get micSoundVolume() {
    try {
      return this._micSoundVolumeRange.element.value;
    } catch (e) {
      return null;
    }   
  }
 
}