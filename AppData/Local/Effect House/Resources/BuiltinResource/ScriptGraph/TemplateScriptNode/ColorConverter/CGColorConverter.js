/**
 * @file CGColorConverter.js
 * @author rcano
 * @date 2022/6/15
 * @brief CGColorConverter.js
 * @copyright Copyright (c) 2022, ByteDance Inc, All Rights Reserved
 */
const APJS = require('../../../amazingpro');
const {BaseNode} = require('../Utils/BaseNode');
const {clamp} = require('../Utils/GraphHelper');

class CGColorConverter extends BaseNode {
  constructor() {
    super();
    this._defColor = new APJS.Color(0, 0, 0, 0);
  }

  //all components of RGB, HSV, HSL, and Alpha should be in [0,1] for inputs and outputs will be in [0,1] as well
  getOutput() {
    if (this.inputs[0] == null || this.inputs[1] == null) {
      return this._defColor;
    }

    const key = this.inputs[0]();
    const c = this.inputs[1]();

    switch (key) {
      case 'RGBA to HSLA':
        return this._rgbaToHsla(c);
      case 'RGBA to HSVA':
        return this._rgbaToHsva(c);
      case 'HSVA to RGBA':
        return this._hsvaToRgba(c);
      case 'HSLA to RGBA':
        return this._hslaToRgba(c);
      default:
        return this._defColor;
    }
  }

  _clampXYZ(num, min, max) {
    return new APJS.Vector4f(clamp(num.x, min, max), clamp(num.y, min, max), clamp(num.z, min, max), num.w);
  }

  _rgbaToHsla(c) {
    c = this._clampXYZ(c, 0.0, 1.0);
    const [h, cmax, cmin, cdiff] = this._getHueVals(c);

    const l = (cmax + cmin) / 2;
    let s = 0;

    if (cdiff !== 0) {
      s = cdiff / (1 - Math.abs(2 * l - 1));
    }

    return new APJS.Vector4f(h, s, l, c.w);
  }

  _rgbaToHsva(c) {
    c = this._clampXYZ(c, 0.0, 1.0);
    const [h, cmax, cmin, cdiff] = this._getHueVals(c);
    let s = 0;

    if (cmax !== 0) {
      s = cdiff / cmax;
    }

    return new APJS.Vector4f(h, s, cmax, c.w);
  }

  _hsvaToRgba(c) {
    c = this._clampXYZ(c, 0.0, 1.0);
    const h = c.x * 360; //h [0,360]
    const s = c.y; //s [0,1]
    const v = c.z; //v [0,1]

    if (s === 0) {
      return new APJS.Vector4f(v, v, v, c.w);
    }

    const hh = h / 60.0;
    const i = Math.floor(hh);
    const ff = hh - i;
    const p = v * (1.0 - s);
    const q = v * (1.0 - s * ff);
    const t = v * (1.0 - s * (1.0 - ff));

    let r = 0,
      g = 0,
      b = 0;
    switch (i) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;

      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      case 5:
      default:
        r = v;
        g = p;
        b = q;
        break;
    }
    return new APJS.Vector4f(r, g, b, c.w);
  }

  _hslaToRgba(c) {
    c = this._clampXYZ(c, 0.0, 1.0);
    const h = c.x;
    const s = c.y;
    const l = c.z;

    let r, g, b;

    if (s === 0) {
      r = l;
      g = l;
      b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = this._hue2rgb(p, q, h + 1 / 3);
      g = this._hue2rgb(p, q, h);
      b = this._hue2rgb(p, q, h - 1 / 3);
    }

    return new APJS.Vector4f(r, g, b, c.w);
  }

  _hue2rgb(p, q, t) {
    if (t < 0) {
      t += 1;
    }
    if (t > 1) {
      t -= 1;
    }
    if (t < 1 / 6) {
      return p + (q - p) * 6 * t;
    }
    if (t < 1 / 2) {
      return q;
    }
    if (t < 2 / 3) {
      return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
  }

  _getHueVals(c) {
    const cmax = Math.max(c.x, c.y, c.z);
    const cmin = Math.min(c.x, c.y, c.z);
    const cdiff = cmax - cmin;
    let h = -1;

    if (cmax === cmin) {
      h = 0;
    } else if (cmax === c.x) {
      h = (60 * ((c.y - c.z) / cdiff) + 360) % 360;
    } else if (cmax === c.y) {
      h = (60 * ((c.z - c.x) / cdiff) + 120) % 360;
    } else if (cmax === c.z) {
      h = (60 * ((c.x - c.y) / cdiff) + 240) % 360;
    }

    return [h / 360.0, cmax, cmin, cdiff];
  }
}

exports.CGColorConverter = CGColorConverter;
