"use strict";

define(function () { 
  function extractPath(filename) {
    if (filename === null) {
      return null;
    }

    let lastSlash = filename.lastIndexOf('/');
    if (lastSlash === -1) {
      return null;
    }

    let path = filename.substr(0, lastSlash+1);
    return path;    
  }

  function extractFilename(filename) {
    if (filename === null) {
      return null;
    }

    let lastSlash = filename.lastIndexOf('/');
    if (lastSlash === -1) {
      return null;
    }

    let result = filename.substr(lastSlash+1);
    return result;
  }

	return {
    extractPath: extractPath,
    extractFilename: extractFilename
	}
});

