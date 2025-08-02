"use strict";

//------------------------------------------------------------------------------
class ViewComponent {
  //----------------------------------------------------------------------------
  constructor(name, querySelector, selectorAll = false) {
    this._name = name;
    this._element = null;
    this._selector = querySelector;
    this._selectorAll = selectorAll;
  }

  //----------------------------------------------------------------------------
  get isViewComponent() {
    return true;
  }

  //----------------------------------------------------------------------------
  get name() {
    return this._name;
  }

  //----------------------------------------------------------------------------
  set element(element) {
    this._element = element;
  }

  //----------------------------------------------------------------------------
  get element() {
    return this._element;
  }

  //----------------------------------------------------------------------------
  get selector() {
    return this._selector;
  }

  //----------------------------------------------------------------------------
  get selectorAll() {
    return this._selectorAll;
  }

}
