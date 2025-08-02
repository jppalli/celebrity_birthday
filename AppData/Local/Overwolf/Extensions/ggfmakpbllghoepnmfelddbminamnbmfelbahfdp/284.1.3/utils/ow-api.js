"use strict";


var cachedPhasing = undefined;
define(function () { 
  async function getPhasedPercent() {
    let phasingOverride = _getPhasingOverride();
    if (phasingOverride === "true") {
      console.log(
        `[Monitoring] phasing override found, phasing percent changed to 0 `
      );
      return 0;
    }

    if (cachedPhasing != undefined) {
      return cachedPhasing;
    }

    const phasing = cachedPhasing;
    if (phasing)  {
      cachedPhasing = phasing
      return phasing;
    }

    return new Promise((resolve) => {
      if (typeof overwolf.extensions.current.getPhasedPercent !== 'function') {
        overwolfInternal.utils.getPhasedPercent((result) => {
          cachedPhasing = result.phasedPercent;
          resolve(result.phasedPercent);
        });
      } else {
        overwolf.extensions.current.getPhasedPercent((result) => {
          cachedPhasing = result.phasedPercent;
          resolve(result.phasedPercent);
        });
      }

    });
 }

  function _getPhasingOverride() {
    return localStorage.getItem("phasingOverride");
  }

	return {
    getPhasedPercent: getPhasedPercent,
	}
});

