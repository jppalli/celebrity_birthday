"use strict";

define([], function () { 
  const kGoopUid = 'kllbdenhilglpbbdlcglegfjcjhhmihgfpdclfgl';

  class GoopInstaller {
    constructor() {

    }

    installGoop = async () => {
      return new Promise((resolve, reject) => {
        overwolfInternal.extensions.installApp(kGoopUid, res => {
          if (res?.status !== 'success') {
            console.error(
              '[GoopInstaller] Failed to install goop app!', res?.reason);
            reject('Failed to install goop app');
          } else {
            if (res.reason !== 'already installed') {
              console.info('[GoopInstaller] Successfully installed goop app');
            } else {
              console.info('[GoopInstaller] Goop already installed');
            }

            resolve(true);
          }
        });
      })
    };

    async ensureInstalled(gameClassId) {
      return new Promise(async (resolve, reject) => {
        overwolf.settings.games.getOverlayEnabled(gameClassId, async res => {

          if (!res || !res.success || !res.enabled) {
            console.info(
              `[GoopInstaller] skip goop installation, game ${gameClassId} not enabled`, JSON.stringify(res));
            return resolve(false);
          }

          console.info('[GoopInstaller] ensure goop is installed');
            await this.installGoop()
            .then((goopInstalled) => resolve(goopInstalled))
            .catch( (err) => reject('Failed to ensure goop app installed ', err));
        });
      });
    }

  }

  return GoopInstaller;
});