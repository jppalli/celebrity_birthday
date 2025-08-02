"use strict";

//------------------------------------------------------------------------------
class PathUtilsService {
  //----------------------------------------------------------------------------
  static normalizeSlashes(path) {
    return path.split("/").join("\\");
  }  

  //----------------------------------------------------------------------------
  static concatenatePaths(partsArray) {
    if (!partsArray) {
      return "";
    }

    let fullPath = "";
    partsArray.forEach((part, index) => {
      if (index == 0) {
        fullPath = part;
      } else {
        if (!this._endsWithSlash(fullPath) && !this._startsWithSlash(part)) {
          fullPath += `\\${part}`;
        } else {
          fullPath += part;
        }
      }
    });

    return fullPath;
  }

  //----------------------------------------------------------------------------
  static splitLastFolder(path) {
    let lastPath = Math.max(path.lastIndexOf("/"), path.lastIndexOf("\\"));
    if (lastPath == -1) {
      return path;
    }

    return {
      prefix: path.substring(0, lastPath),
      suffix: path.substring(lastPath)
    }
  }


  //----------------------------------------------------------------------------
  static _endsWithSlash(path) {
    if (path.endsWith("\\") || path.endsWith("/")) {
      return true;
    }

    return false;
  }

  //----------------------------------------------------------------------------
  static _startsWithSlash(path) {
    if (path.startsWith("\\") || path.startsWith("/")) {
      return true;
    }

    return false;
  }
}
