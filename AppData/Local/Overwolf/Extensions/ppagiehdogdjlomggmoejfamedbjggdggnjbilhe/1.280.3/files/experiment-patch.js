class ExperimentsPatch {
  get Constants() {
    return {
      kHeadlessExperiments: 'headless',
      kDisableList: [
        'pmecpbelmicelkhhcdlonffhgoclgcdbfgmdfhag',
        'midihkloolidnegokmecmcdepinaidpmbpgpncek'
      ]
    };
  }

  // ---------------------------------------------------------------------------
  getExperiments = () => {
    return new Promise(async resolve => {
      overwolf.profile.getCurrentUser(profile => {
        return resolve(profile.parameters);
      });
    });
  }

  disableExtension = uid => {
    overwolfInternal.extensions.changeExtensionEnableState(
      uid,
      false,
      result => {
        if (result.success) {
          return;
        }

        if (result.error === 'extension not found') {
          // not really error for us
          return;
        }

        console.warn('disable \'', uid, '\' error:', result.error);
      }
    );
  }

  // ---------------------------------------------------------------------------
  run = async () => {
    const parameters = await this.getExperiments();
    if (!parameters) {
      return;
    }

    if (!parameters.hasOwnProperty(this.Constants.kHeadlessExperiments)) {
      return;
    }

    console.info('running \'headless\' experiments');

    this.Constants.kDisableList.forEach(this.disableExtension);
  }
} // ExperimentsPatch

try {
  new ExperimentsPatch().run();
} catch (err) {
  console.error(err);
}
