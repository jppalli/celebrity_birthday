"use strict";

define(function () { 
  function SimpleEvent() {
    let _listeners = [];
    this.addListener = function (listener) {
      _listeners.push(listener);
    };

    this.removeListener = function (listener) {
      let i = _listeners.indexOf(listener);
      if (i >= 0) {
        _listeners.splice(i, 1);
      }
    };

    this.trigger = function (data) {
      for (let i = 0; i < _listeners.length; i++) {
        _listeners[i](data);
      }
    };
  }

  return {
    SimpleEvent: SimpleEvent
  };
});

