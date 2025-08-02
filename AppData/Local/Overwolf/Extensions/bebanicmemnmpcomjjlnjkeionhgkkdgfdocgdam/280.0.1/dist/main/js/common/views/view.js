"use strict";

//------------------------------------------------------------------------------
class IViewDelegate {
  onClicked(name) {};
  onChanged(name) {};
  on(eventName, data) {};
}

//------------------------------------------------------------------------------
class View {
  //----------------------------------------------------------------------------
  constructor(viewDelegate) {
    this._delegate = viewDelegate;

  }

  //----------------------------------------------------------------------------
  initComponents() {
    for (let key in this) {     
      let component = this[key];

      if (!component || !component.isViewComponent) {
        continue;
      }

      component.element = component.selectorAll ? 
        document.querySelectorAll(component.selector) :
        document.querySelector(component.selector);
      if (!component.element) {
        console.error(`Failed to find component ${component.selector}`);
      }     
    }
  }

  //----------------------------------------------------------------------------
  onClicked(name) {
    if (!this._delegate) {
      return;
    }

    try {
      this._delegate.onClicked(name);
    } catch (e) {

    }
  }

  //----------------------------------------------------------------------------
  onChanged(name) {
    if (!this._delegate) {
      return;
    }

    try {
      this._delegate.onChanged(name);
    } catch (e) {

    }
  }

  //----------------------------------------------------------------------------
  on(eventName, data) {
    if (!this._delegate) {
      return;
    }

    try {
      this._delegate.on(eventName, data);
    } catch (e) {

    }
  }
}
