"use strict";

//------------------------------------------------------------------------------
class AppController extends IViewDelegate {
  //----------------------------------------------------------------------------
  constructor() {
    super();
    this._view = new AppView(this);
  }

  //----------------------------------------------------------------------------
  async init() {
    this._view.init();
    this._initStartupSettings();
  }

  //----------------------------------------------------------------------------
  async _initStartupSettings() {
    try {
      //TODO - review the remove
      // this._view.overwolfVersion = overwolf.version;
      // this._setChannelInfo();
    } catch (e) {
      console.error(e);
    }
  }

  //TODO - review the remove
  //------------------------------------------------------------------------------
  // _setChannelInfo() {
  //   try {
  //     overwolf.profile.getCurrentUser((result) => {
  //       if ((!result.channel) || (result.channel.length <= 0)) {
  //         this._view.channelInfo = null;
  //         return;
  //       }
  //
  //       const hiddenChannels = ["Regular", "website", "website2"];
  //       if (hiddenChannels.indexOf(result.channel) != -1) {
  //         this._view.channelInfo = null;
  //         return;
  //       }
  //
  //       this._view.channelInfo = result.channel;
  //     })
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  //----------------------------------------------------------------------------
  // IViewDelegate

  //----------------------------------------------------------------------------
  async onClicked(name) {
    switch (name) {
    }
  }

  //----------------------------------------------------------------------------
  async onChanged(name) {
    switch (name) {
    }
  };
}
