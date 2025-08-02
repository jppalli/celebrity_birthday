"use strict";

define(function () {
  return class BaseUtils {
    static checkNested(obj ) {
      var args = Array.prototype.slice.call(arguments, 1);

      for (var i = 0; i < args.length; ++i) {
        if (!obj || !obj.hasOwnProperty(args[i])) {
          return false;
        }
        obj = obj[args[i]];
      }

      return true;
    }

    static isBeforeToday(date) {
      const now = new Date();
      return now.getFullYear() !== date.getFullYear() ||
        now.getMonth() !== date.getMonth() ||
        now.getDate() !== date.getDate();
    }

    static tryParseDate(allegedDate) {
      const date = Date.parse(allegedDate);

      if (isNaN(date)) {
        return null;
      } else {
        return new Date(date);
      }
    }

    static b64DecodeUnicode(str) {
      if ( typeof(str) === 'undefined' || str === '' ) {
        return str;
      }

      try {
        return decodeURIComponent(atob(str).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
      } catch {
        return str;
      }
    }

    static createMatrix(height, width, value = null) {
      const matrix = new Array(height).fill(value);
      for (let i = 0; i < matrix.length; i++) {
        matrix[i] = new Array(width).fill(value);
      }

      return matrix;
    }

    static convertStringsToNumber(jsonValue) {
      function isNumber(intValue) {
        return !isNaN(intValue) && isFinite(intValue);
      }



      for (const [key, value] of Object.entries(jsonValue)) {
        let intValue = parseInt(value);
        if (intValue != value) {
          continue;
        }

        if (isNumber(intValue)) {
          jsonValue[key] = intValue;
        }
      }
      return jsonValue;
    }
  };
});