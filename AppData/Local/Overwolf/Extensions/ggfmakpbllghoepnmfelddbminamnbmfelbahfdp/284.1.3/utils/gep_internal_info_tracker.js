  const kFeatureGepInternal = 'gep_internal';

define(['/utils/ow-api.js',], function (owAPI) {
  const kCategoryGepInternal = kFeatureGepInternal;
  const kKeyVersionInfo = 'version_info';

  const kLogSignature = '[GEP INTERNAL] - ';

  const kSupportedFeatures = {
    [kFeatureGepInternal]: {
      name: kFeatureGepInternal
    }
  };


  class GepInternalInfo {
    constructor({ infoDB }) {
      this._infoDB = infoDB;

      this._currentVersion = localStorage.getItem("appVersion");

            if (!this._currentVersion || this._currentVersion.length === 0) { 
        console.log(`${kLogSignature}Missing current version - stopping.`);
        return;
      }

            this._onExtensionUpdated = this._onExtensionUpdated.bind(this);

            if (overwolf.extensions.onExtensionUpdated) {
        overwolf.extensions
                .onExtensionUpdated
                .removeListener(this._onExtensionUpdated);
        overwolf.extensions
                .onExtensionUpdated
                .addListener(this._onExtensionUpdated);
      }

            this._handleExtensionUpdate = this._handleExtensionUpdate.bind(this);

      if (!overwolf.extensions.checkForExtensionUpdate) {
        return;
      }

      overwolf.extensions.checkForExtensionUpdate(this._handleExtensionUpdate);
    }

    get supportedFeatures() {
      return kSupportedFeatures;
    }

    _onExtensionUpdated(info) {
      const data = { 
        local_version: this._currentVersion,
        public_version: this._currentVersion,
        is_updated: true
      };

      if (['UpdateAvailable', 'PendingRestart'].includes(info.state)) {
        data.public_version = info.version;
        data.is_updated = false;
      }

      if (info.state === 'UpdateAvailable') {
        setTimeout(() => { 
          console.log(`${kLogSignature}Trying to perform a manual update...`);
          overwolf.extensions.updateExtension(async (res) => {
            const _phasedPercent = await owAPI.getPhasedPercent();
            console.log(`Update extension, current phasing: ${_phasedPercent}, result: ${JSON.stringify(res)}`);
          });
        }, 0);
      }

      this._infoDB.set(kFeatureGepInternal,
                       kCategoryGepInternal,
                       kKeyVersionInfo,
                       JSON.stringify(data));
    }


    _handleExtensionUpdate(info) {
      if (!info.success) {
        console.error(`${kLogSignature}${JSON.stringify(info)}`);
        return;
      }

      this._onExtensionUpdated({ 
        version: info.updateVersion,
        state: info.state
      });
    }

  }

  return GepInternalInfo;
});
