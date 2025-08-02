console.log(`[Fortnite] - ${window.location.href}`);

const kFortniteClassId = 21216;

const KOverlayEnabledStorageKey = "21216_overlay_enabled";

const assureOverlayFortniteEnabled = () => {
  overwolfInternal.gamesSettings.getGame(kFortniteClassId, (result) => {
    console.log(
      `[Fortnite] - Checking overlay settings for class ID: ${kFortniteClassId}`
    );
    if (!result.status) {
      return;
    }

    // It might be an undetected game - in which case this is null
    if (result.settings) {
      if (result.settings.overlayDisabled === false) {
        console.log(
          `[Fortnite] - Overlay is already enabled for class ID: ${kFortniteClassId}`
        );
        return;
      }

      if (result.settings.overlayDisabledModifiedByUser) {
        console.log("[Fortnite] - Overlay modified by user");
        return;
      }
    }

    console.log(`[Fortnite] enabling overlay for: ${kFortniteClassId}`);
    setTimeout(() => {
      localStorage.setItem(KOverlayEnabledStorageKey, true);
      overwolfInternal.gamesSettings.setOverlayEnabled(
        kFortniteClassId,
        false,
        false,
        console.log
      );
    }, 0);
  });
};

const assureOverlayFortniteDisabled = () => {
  const found = localStorage.getItem(KOverlayEnabledStorageKey);
  if (!found) {
    return;
  }

  overwolfInternal.gamesSettings.getGame(kFortniteClassId, (result) => {
    console.log(
      `[Fortnite] - Checking overlay settings for class ID: ${kFortniteClassId}`
    );
    if (!result.status) {
      return;
    }

    // It might be an undetected game - in which case this is null
    if (result.settings) {
      if (result.settings.overlayDisabledModifiedByUser) {
        console.log("[Fortnite] - Overlay modified by user");
        return;
      }

      if (result.settings.overlayDisabled === false) {
        console.log(
          `[Fortnite] - Overlay is already enabled for class ID: ${kFortniteClassId}`
        );

        console.log(`[Fortnite] disabling overlay for: ${kFortniteClassId}`);
        setTimeout(() => {
          overwolfInternal.gamesSettings.setOverlay(
            kFortniteClassId,
            false,
            console
          );
        }, 0);
      }
    }
  });
};

setTimeout(assureOverlayFortniteDisabled, 0);
