"use strict";

//------------------------------------------------------------------------------
class AppView extends View {
  //----------------------------------------------------------------------------
  get Constants() {
    return {
    }
  }

  //----------------------------------------------------------------------------
  constructor(viewDelegate) {
    super(viewDelegate);
    //TODO - review the remove
    // this._labelOverwolfVersion = new ViewComponent(null, `#owVersion`);
    // this._labelChannelInfo = new ViewComponent(null, `#channelInfo`);
  }

  //----------------------------------------------------------------------------
  init() {
    super.initComponents();
  
    try {
    } catch (e) {
    }
  }

  //----------------------------------------------------------------------------
  // Getters/Setters
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  // set overwolfVersion(version) {
  //   try {
  //     this._labelOverwolfVersion.element.innerText = version;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  //----------------------------------------------------------------------------
  // set channelInfo(value) {
  //   try {
  //     let parentElement = this._labelChannelInfo.element.parentElement;
  //
  //     if ((!value) || (value.length <= 0)) {
  //       parentElement.style.display = 'none';
  //       return;
  //     }
  //
  //     parentElement.style.display = 'inline';
  //     this._labelChannelInfo.element.innerText = value;
  //   } catch (e) {
  //   }
  // }
}