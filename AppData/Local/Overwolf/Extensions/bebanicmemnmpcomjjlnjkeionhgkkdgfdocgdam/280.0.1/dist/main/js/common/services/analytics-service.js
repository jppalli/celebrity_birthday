"use strict";

//------------------------------------------------------------------------------
class AnalyticsService {
  //----------------------------------------------------------------------------
  static trackRSEvent(name, extra, overrides = null){
    if (typeof overwolfInternal.trackRSEventV2 === 'undefined') {
      overwolfInternal.trackRSEvent(name, extra, overrides);
      return;
    }

    overwolfInternal.trackRSEventV2(name, extra, overrides);
  }
}
