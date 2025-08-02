"use strict";

const kCaptureResolutionDefault = 2;
const kCaptureFrameRateDefaultIndex = 1; // should be 30 fps
const kCaptureFrameRateIdPrefix = "frame-rate--";

//------------------------------------------------------------------------------
class CaptureTabVideoView extends View {
  //----------------------------------------------------------------------------
  get Constants() {
    return {
      resolution: "resolution",
      framerate: "framerate",
      videosFolderOpen: "videosFolderOpen",
      videosFolderChange: "videosFolderChange",
      screenshotsFolderOpen: "screenshotsFolderOpen",
      screenshotsFolderChange: "screenshotsFolderChange",
      captureMonitor: "captureMonitor",
      recordActiveGame: "recordActiveGame",
      compatibilityMode: "compatibilityMode",
      advancedMode: "advancedMode"
    }
  }

  //----------------------------------------------------------------------------
  constructor(viewDelegate) {
    super(viewDelegate);

    const kSelectorCaptureVideoSection = "#capture-subsection--video";
        
    // NOTE(twolf): We hold a list of elements that are indexed exactly like
    // they are stored in our settings (0 to 3).
    this._optionsResolutions = new ViewComponent(this.Constants.resolution, `${kSelectorCaptureVideoSection} input[id^='resolution--']`, true);
    // He we receive an actual framerate value and need to find the associated
    // option element
    this._optionsFrameRates = new ViewComponent(this.Constants.framerate, `${kSelectorCaptureVideoSection} input[id^='${kCaptureFrameRateIdPrefix}']`, true);

    // NOTE(twolf): We split the folder path into prefix and suffix so that we
    // support long paths (by filling the middle part with ...)
    this._spanVideosFolderPathPrefix = new ViewComponent(null, `${kSelectorCaptureVideoSection} #videosFolderPathPrefix`);
    this._spanVideosFolderPathSuffix = new ViewComponent(null, `${kSelectorCaptureVideoSection} #videosFolderPathSuffix`);
    this._buttonVideosFolderOpen = new ViewComponent(this.Constants.videosFolderOpen, `${kSelectorCaptureVideoSection} #videosFolderOpenButton`);
    this._buttonVideosFolderChange = new ViewComponent(this.Constants.videosFolderChange, `${kSelectorCaptureVideoSection} #videosFolderChangeButton`);

    this._spanScreenshotsFolderPathPrefix = new ViewComponent(null, `${kSelectorCaptureVideoSection} #screenshotsFolderPathPrefix`);
    this._spanScreenshotsFolderPathSuffix = new ViewComponent(null, `${kSelectorCaptureVideoSection} #screenshotsFolderPathSuffix`);
    this._buttonScreenshotsFolderOpen = new ViewComponent(this.Constants.screenshotsFolderOpen, `${kSelectorCaptureVideoSection} #screenshotsFolderOpenButton`);
    this._buttonScreenshotsFolderChange = new ViewComponent(this.Constants.screenshotsFolderChange, `${kSelectorCaptureVideoSection} #screenshotsFolderChangeButton`);

    this._compatibilitySection = new ViewComponent(null, `${kSelectorCaptureVideoSection} #compatibility-section`);
    this._compatibilityCheckbox = new ViewComponent(this.Constants.compatibilityMode, `${kSelectorCaptureVideoSection} input#compatibility-mode`)

    this._buttonAdvanced = new ViewComponent(this.Constants.advancedMode, `${kSelectorCaptureVideoSection} #videoCaptureAdvancedButton`);
  }

  //----------------------------------------------------------------------------
  init() {
    super.initComponents();
  
    try {
      this._optionsResolutions.element.forEach(resolutionElement => {
        resolutionElement.addEventListener("change", () => {
          super.onChanged(this._optionsResolutions.name);
        })
      });

      this._optionsFrameRates.element.forEach(frameRateElement => {
        frameRateElement.addEventListener("change", () => {
          super.onChanged(this._optionsFrameRates.name);
        })
      });     

      this._buttonVideosFolderOpen.element.addEventListener("click", () => {
        super.onClicked(this._buttonVideosFolderOpen.name);
      });

      this._buttonVideosFolderChange.element.addEventListener("click", () => {
        super.onClicked(this._buttonVideosFolderChange.name);
      });

      this._buttonScreenshotsFolderOpen.element.addEventListener("click", 
                                                                 () => {
        super.onClicked(this._buttonScreenshotsFolderOpen.name);
      });

      this._buttonScreenshotsFolderChange.element.addEventListener("click", 
                                                                   () => {
        super.onClicked(this._buttonScreenshotsFolderChange.name);
      });

      this._buttonAdvanced.element.addEventListener("click", () => {
        super.onClicked(this._buttonAdvanced.name);
      });

      overwolfInternal.settings.hardware.getFlags(res => {
        if (res.success && res.flags.should_display_capture_compatibility) {
          this._compatibilitySection.element.classList.add("active");
          this._compatibilityCheckbox.element.addEventListener('change', e => {
            this.handleCompatibilityModeToggle(e.target.checked);
          });
        }
      });
    } catch (e) {
    }
  }

  //----------------------------------------------------------------------------
  handleCompatibilityModeToggle(turnedOn) {
    if (turnedOn) {
      // only turn on if user approves modal info
      settings_modal.show({
        text: {
          title: localesService.getStringSync("capture.compatibilityMode.modal.title"),
          description: localesService.getStringSync("capture.compatibilityMode.modal.description"),
          leftButton: localesService.getStringSync("capture.compatibilityMode.modal.learnButton"),
          rightButton: localesService.getStringSync("capture.compatibilityMode.modal.continueButton")
        },
        buttons: {
          exit: {
            action: () => {
              // revert toggle to off
              this._compatibilityCheckbox.element.checked = false;
            }
          },
          left: {
            action: () => {
              overwolf.utils.openUrlInDefaultBrowser('https://support.overwolf.com/support/solutions/articles/9000181387-common-capture-issues#sht');
            }
          },
          right: {
            close: true,
            action: () => {
              // compatibility mode turned on
              super.onChanged(this._compatibilityCheckbox.name);
            }
          }
        }
      });
    } else {
      // compatibility mode turned off
      super.onChanged(this._compatibilityCheckbox.name);
    }
  }

  //----------------------------------------------------------------------------
  // Getters/Setters
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  set resolution(value) {
    try {
      this._optionsResolutions.element.forEach((option, index) => {
        if (value == index) {
          option.checked = true;
        } else {
          option.checked = false;
        }
      });
    } catch (e) {      
    }   
  }

  //----------------------------------------------------------------------------
  get resolution() {
    try {
      let checkedIndex = kCaptureResolutionDefault;
      this._optionsResolutions.element.forEach((option, index) => {
        if (option.checked) {
          checkedIndex = index;
        }
      });

      return checkedIndex;
    } catch (e) {
      return null;
    }   
  }

  //----------------------------------------------------------------------------
  set framerate(framerate) {
    try {
      this._optionsFrameRates.element.forEach((option, index) => {
        if (option.id.endsWith(framerate)) {
          option.checked = true;
        } else {
          option.checked = false;
        }
      });
    } catch (e) {      
    }   
  }

  //----------------------------------------------------------------------------
  get framerate() {
    try {
      let checkedIndex = kCaptureFrameRateDefaultIndex;
      this._optionsFrameRates.element.forEach((option, index) => {
        if (option.checked) {
          checkedIndex = index;
        }
      });

      let option = this._optionsFrameRates.element[checkedIndex];
      return option.id.substring(kCaptureFrameRateIdPrefix.length);
    } catch (e) {
      return null;
    }   
  }

  //----------------------------------------------------------------------------
  set videosFolder(path) {
    try {
      path = PathUtilsService.normalizeSlashes(path);
      const {prefix, suffix} = PathUtilsService.splitLastFolder(path);
      this._spanVideosFolderPathPrefix.element.innerText = prefix;
      this._spanVideosFolderPathSuffix.element.innerText = suffix;
    } catch (e) {      
    }   
  }

  //----------------------------------------------------------------------------
  get videosFolder() {
    try {
      const prefix = this._spanVideosFolderPathPrefix.element.innerText;
      const suffix = this._spanVideosFolderPathSuffix.element.innerText;
      return PathUtilsService.concatenatePaths([prefix, suffix]);
    } catch (e) {
    }
  }

  //----------------------------------------------------------------------------
  set screenshotsFolder(path) {
    try {
      path = PathUtilsService.normalizeSlashes(path);
      const {prefix, suffix} = PathUtilsService.splitLastFolder(path);
      this._spanScreenshotsFolderPathPrefix.element.innerText = prefix;
      this._spanScreenshotsFolderPathSuffix.element.innerText = suffix;
    } catch (e) {      
    }   
  }

  //----------------------------------------------------------------------------
  get screenshotsFolder() {
    try {
      const prefix = this._spanScreenshotsFolderPathPrefix.element.innerText;
      const suffix = this._spanScreenshotsFolderPathSuffix.element.innerText;
      return PathUtilsService.concatenatePaths([prefix, suffix]);
    } catch (e) {
    }
  }

  //----------------------------------------------------------------------------
  set compatibilityMode(value) {
    try {
      this._compatibilityCheckbox.element.checked = value;
    } catch (e) {      
    }   
  }

  //----------------------------------------------------------------------------
  get compatibilityMode() {
    try {
      return this._compatibilityCheckbox.element.checked;
    } catch (e) {
    }
  }


  //----------------------------------------------------------------------------
  // Returns true if in advanced mode
  get advancedMode() {
    return this._buttonAdvanced.element.classList.contains("active");
  }
}