"use strict";

//------------------------------------------------------------------------------
class SoundsTabView extends View {
  //----------------------------------------------------------------------------
  get Constants() {
    return {
      playbackDevice: "playbackDevice",
      volume: "volume",
      playSkinEffects: "playSkinEffects",
      playSkinSpeech: "playSkinSpeech",
      playSound: "playSound"
    }
  }

  //----------------------------------------------------------------------------
  constructor(viewDelegate) {
    super(viewDelegate);

    const kSelectorSoundsTabSection = "#tab-content--sounds";
    this._volumeRange = new ViewComponent(this.Constants.volume, `${kSelectorSoundsTabSection} .tab-content--sounds__volume > input`);
    this._buttonPlaySound = new ViewComponent(this.Constants.playSound, `${kSelectorSoundsTabSection} .tab-content--sounds__volume > button`);
    this._checkboxPlaySkinEffects = new ViewComponent(this.Constants.playSkinEffects, `${kSelectorSoundsTabSection} #play-skin-sfx`);
    this._checkboxPlaySkinSpeech = new ViewComponent(this.Constants.playSkinSpeech, `${kSelectorSoundsTabSection} #play-skin-speech`);

    this._listDevices = new ViewComponent(null, `${kSelectorSoundsTabSection} #audioDeviceList`);
    this._selectedDevice = new ViewComponent(this.Constants.playbackDevice, `${kSelectorSoundsTabSection} #selectedDevice`);
    this._devicesDropDown = null;
  }

  //----------------------------------------------------------------------------
  init() {
    super.initComponents();

    this._devicesDropDown = new DropDownComponent(
      this._listDevices, 
      this._selectedDevice,
      new DropDownAudioDeviceAdapter(true, false, true),
      super.onChanged.bind(this));

  
    try {
      this._volumeRange.element.addEventListener("change", () => {
        super.onChanged(this._volumeRange.name);
      });

      this._buttonPlaySound.element.addEventListener("click", () => {
        super.onClicked(this._buttonPlaySound.name);
      });

      this._checkboxPlaySkinEffects.element.addEventListener("change", () => {
        super.onChanged(this._checkboxPlaySkinEffects.name);
      });

      this._checkboxPlaySkinSpeech.element.addEventListener("change", () => {
        super.onChanged(this._checkboxPlaySkinSpeech.name);
      });
    } catch (e) {
    }
  }

  //----------------------------------------------------------------------------
  setAudioDevices(audioDevices) {
    this._devicesDropDown.setItems(audioDevices);
  }

  //----------------------------------------------------------------------------
  // Getters/Setters
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  set playbackDevice(deviceSettingsId) {
    this._devicesDropDown.selectedItem = deviceSettingsId;
  }

  //----------------------------------------------------------------------------
  get playbackDevice() {
    return this._devicesDropDown.selectedItem;
  }

  //----------------------------------------------------------------------------
  set volume(value) {
    try {
      this._volumeRange.element.value = value;
      this._volumeRange.element.style = `--value:${value}`;
    } catch (e) {      
    }   
  }

  //----------------------------------------------------------------------------
  get volume() {
    try {
      return this._volumeRange.element.value;
    } catch (e) {
      return null;
    }   
  }

  //----------------------------------------------------------------------------
  set playSkinEffects(value) {
    try {
      this._checkboxPlaySkinEffects.element.checked = value;
    } catch (e) {      
    }   
  }

  //----------------------------------------------------------------------------
  get playSkinEffects() {
    try {
      return this._checkboxPlaySkinEffects.element.checked;
    } catch (e) {
      return null;
    }   
  }

  //----------------------------------------------------------------------------
  set playSkinSpeech(value) {
    try {
      this._checkboxPlaySkinSpeech.element.checked = value;
    } catch (e) {      
    }   
  }

  //----------------------------------------------------------------------------
  get playSkinSpeech() {
    try {
      return this._checkboxPlaySkinSpeech.element.checked;
    } catch (e) {
      return null;
    }   
  }

  
}