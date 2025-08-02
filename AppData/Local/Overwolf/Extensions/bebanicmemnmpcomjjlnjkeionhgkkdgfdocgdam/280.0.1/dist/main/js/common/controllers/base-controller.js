"use strict";

//------------------------------------------------------------------------------
class BaseController extends IViewDelegate {
  //----------------------------------------------------------------------------
  constructor(settingCategory) {
    super();
    this._settingCategory = settingCategory;
  }

  //----------------------------------------------------------------------------
  get settingCategory() {
    return this._settingCategory;
  }

  //----------------------------------------------------------------------------
  init(settings) {}
}
