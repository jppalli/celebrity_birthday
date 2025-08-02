define(["/utils/monitoring_statics.js"], function (MonitoringStatic) {
  const kPathToValoEligible =
    'https://features.overwolf.com/experiments/valo-eligable';
  const kTencentName = 'Tencent';

  async function isEligible(gamePath) {
    try {
      if (gamePath.includes(kTencentName)) {
        trackNotEligible(kTencentName.toLowerCase());
        return false;
      }

      return await isExperimentEligible();
    } catch (error) {
      console.error("Failed Checking Valorant eligibility ", error);
      return true;
    }
  }

  async function isExperimentEligible() {
    try {
      const response = await fetch(kPathToValoEligible);
      const data = await response.json();
      if (!data || !data.params) {
        return true;
      }

      if (data.params.length === 0) {
        trackNotEligible("geo");
        return false;
      }

      return true;
    } catch (error) {
      console.error("Failed Checking Valorant eligibility ", error);
      return true;
    }
  }

  async function trackNotEligible(reason) {
    try {
      const kind = MonitoringStatic.TRACKING_KINDS.VALORANT_ELIGIBLE;
      MonitoringStatic.sendTrack(kind, reason);
      MonitoringStatic.flush(kind, reason);
    } catch {}
  }

  return {
    isEligible: isEligible,
  };
});
