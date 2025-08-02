console.log(`[LoR] - ${window.location.href}`);

const kLorClassId = 21620;
const kLorApps = [
  'pibhbkkgefgheeglaeemkkfjlhidhcedalapdggh'
];

const assureOverlayLoREnabled = () => {
  overwolfInternal.gamesSettings.getGame(kLorClassId, result => {
    if (!result.status) {
      return;
    }

    // It might be an undetected game - in which case this is null
    if (result.settings) {
      if (result.settings.overlayDisabled === false) {
        return;
      }
  
      if (result.settings.overlayDisabledModifiedByUser) {
        return;
      }
    }

    console.log(`[LoR] enabling overlay for: ${kLorClassId}`);
    setTimeout(() => {
      overwolfInternal.gamesSettings.setOverlayEnabled(kLorClassId, 
                                                       false, 
                                                       false, 
                                                       console.log);
    }, 0);
  });
}


overwolfInternal.extensions.getDownloadedExtensions(result => {
  if (!result.status) {
    return;
  }

  lorExtensions = result.extensions.filter(ext => {
    if (!kLorApps.includes(ext.UID)) {
      return false;
    }

    if (!ext.data || 
        !ext.data.game_targeting || 
        !ext.data.game_targeting.game_ids) {
      return false;
    }

    return true;
  });

  if (lorExtensions.length === 0) {
    return;
  }

  setTimeout(assureOverlayLoREnabled, 0);
});
