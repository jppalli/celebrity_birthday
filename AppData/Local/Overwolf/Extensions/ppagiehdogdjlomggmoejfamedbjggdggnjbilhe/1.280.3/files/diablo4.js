console.log(`[Diablo] - ${window.location.href}`);

const kDiablo4ClassId = 22700;
const kDiablo4Apps = [
  'kccgdmdllebbgifgafjfmcjdgmhoknfhjdnobcho'
];

const assureOverlayDiablo4Enabled = () => {
  overwolfInternal.gamesSettings.getGame(kDiablo4ClassId, result => {
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

    console.log(`[Diablo IV] enabling overlay for: ${kDiablo4ClassId}`);
    setTimeout(() => {
      overwolfInternal.gamesSettings.setOverlayEnabled(kDiablo4ClassId, 
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

  const diabloExtensions = result.extensions.filter(ext => {
    if (!kDiablo4Apps.includes(ext.UID)) {
      return false;
    }

    if (!ext.data ||
        !ext.data.game_targeting ||
        !ext.data.game_targeting.game_ids) {
      return false;
    }
    return true;
  });

  if (diabloExtensions.length === 0) {
    return;
  }

  setTimeout(assureOverlayDiablo4Enabled, 0);
});
