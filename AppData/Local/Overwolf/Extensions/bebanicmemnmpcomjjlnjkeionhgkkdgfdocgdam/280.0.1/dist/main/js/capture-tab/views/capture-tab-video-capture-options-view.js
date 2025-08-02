"use strict";

const kCaptureOptionAllExceptVideoRecorder = 2;

//------------------------------------------------------------------------------
class CaptureTabVideoCaptureOptionsView extends View {
  //----------------------------------------------------------------------------
  get Constants() {
    return {
      mouseCursor: "mouseCursor",
      captureWindows: "captureWindows"
    }
  }

  //----------------------------------------------------------------------------
  constructor(viewDelegate) {
    super(viewDelegate);

    const kSelectorCaptureVideoSection = "#capture-subsection--video";

    this._listCaptureCursor = new ViewComponent(null, `${kSelectorCaptureVideoSection} #captureCursorList`);
    this._selectedCaptureCursor = new ViewComponent(this.Constants.mouseCursor, `${kSelectorCaptureVideoSection} #selectedCaptureCursor`);

    this._listCaptureWindows = new ViewComponent(null, `${kSelectorCaptureVideoSection} #captureWindowsList`);
    this._selectedCaptureWindows = new ViewComponent(this.Constants.captureWindows, `${kSelectorCaptureVideoSection} #selectedCaptureWindows`);

    this._paragraphOpenGLNote = new ViewComponent(null, `${kSelectorCaptureVideoSection} #opengl-note`);
  }

  //----------------------------------------------------------------------------
  init() {
    super.initComponents();

    try {
      this._selectedCaptureCursor.element.addEventListener("change", () => {
        super.onChanged(this._selectedCaptureCursor.name);
      });

      this._selectedCaptureWindows.element.addEventListener("change", () => {
        this._updateCaptureWindowsOption();
        super.onChanged(this._selectedCaptureWindows.name);
      });

      this._paragraphOpenGLNote.element.classList.remove("active");
    } catch (e) {
    }
  }

  //----------------------------------------------------------------------------
  _updateCaptureWindowsOption() {
    if (this.captureWindows == kCaptureOptionAllExceptVideoRecorder) {
      this._paragraphOpenGLNote.element.classList.add("active");
    } else {
      this._paragraphOpenGLNote.element.classList.remove("active");
    }
  }



  //----------------------------------------------------------------------------
  // Getters/Setters
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  set mouseCursor(option) {
    try {
      let captureCursorElement =
        this._listCaptureCursor.element.querySelector(
          `li[data-setting-id='${option}']`);

      if (!captureCursorElement) {
        // try to fallback to the default if we failed
        captureCursorElement =
          this._listCaptureCursor.element.firstElementChild;
      }

      this._selectedCaptureCursor.element.innerText =
        captureCursorElement.innerText;
      this._selectedCaptureCursor.element.dataset.settingId = option;
    } catch (e) {
      console.log(e);
    }
  }

  //----------------------------------------------------------------------------
  get mouseCursor() {
    try {
      return this._selectedCaptureCursor.element.dataset.settingId;
    } catch (e) {
      return null;
    }
  }

  //----------------------------------------------------------------------------
  set captureWindows(option) {
    try {
      let captureWindowsElement =
        this._listCaptureWindows.element.querySelector(
          `li[data-setting-id='${option}']`);

      if (!captureWindowsElement) {
        // try to fallback to the default if we failed
        captureWindowsElement =
          this._listCaptureWindows.element.firstElementChild;
      }

      this._selectedCaptureWindows.element.innerText =
        captureWindowsElement.innerText;
      this._selectedCaptureWindows.element.dataset.settingId = option;

      this._updateCaptureWindowsOption();
    } catch (e) {
      console.log(e);
    }
  }

  //----------------------------------------------------------------------------
  get captureWindows() {
    try {
      return this._selectedCaptureWindows.element.dataset.settingId;
    } catch (e) {
      return null;
    }
  }


}
