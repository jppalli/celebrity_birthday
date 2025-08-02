console.log(`[Lol Pbe] - ${window.location.href}`);

const kLolPbeClassId = 22848;
const kLolClassId = 5426;

const assureOverlayLolPbeEnabled = () => {
  overwolfInternal.gamesSettings.getGame(kLolClassId, result => {
    if (!result.status) {
      return;
    }

    // It might be an undetected game - in which case this is null
    if (!result.settings) {
      return;
    }

    if (result.settings.overlayDisabled) {
      return;
    }

    if (result.settings.overlayDisabledModifiedByUser) {
      return;
    }


    console.log(`[Lol Pbe] enabling overlay for: ${kLolPbeClassId}`);
    setTimeout(() => {
      overwolfInternal.gamesSettings.setOverlayEnabled(kLolPbeClassId,
                                                       false, 
                                                       false, 
                                                       console.log);
    }, 0);
  });
};

setTimeout(assureOverlayLolPbeEnabled, 0);


