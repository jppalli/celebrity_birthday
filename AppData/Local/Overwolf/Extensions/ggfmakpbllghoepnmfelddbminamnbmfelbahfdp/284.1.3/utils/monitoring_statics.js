'use strict';
var _allowUsage = true;
const kBatchTrackingPhasing = 100;


const _sendTrack = (id, extra) => {
  let URL_TRACKING = "https://tracking.overwolf.com/tracking/InsertStats?Stats=true";
  let payload = {
    Kind: id
  };

  if (extra) {
    payload.Extra = extra;
  }

  let xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", URL_TRACKING);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.send(JSON.stringify(payload));
}

const _sanitizeExtra = (extra) =>  {
  const sanitizedChars = [':', " "];
  sanitizedChars.forEach((char) => {
    const regex = new RegExp(char.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'g');
    extra = extra.replace(regex, '_');
  })

  return extra;
}

define(['/utils/batch_tracking.js', '/utils/ow-api.js'], 
  function (BatchTracking, owAPI) {
    const { BatchTrackingService } =  BatchTracking;
    const trackingService = new BatchTrackingService({flushQueueTimer: 60 * 15});
    var phasing = 100;

    const setPhasing = async function setPhasing() {
      phasing = await owAPI.getPhasedPercent();
    }

    setPhasing();

  return {
    TRACKING_KINDS: {
      ERROR: 40000, 
      TASK_DISABLED: 40003, 
      TASK_CRASHED: 40004, 
      GEP_PLUGIN_LOAD_FAILED: 40005,
      EXCEPTION: 40006,
      SESSION_WITH_NO_EVENTS: 40007,
      FEATURE_MISSING: 40008,
      GEP_PLUGIN_CRASHED: 40009,
      GOOP_PLUGIN_CRASHED: 40010,
      GOOP_PLUGIN_LOAD_FAILED: 40011,
      GSI_ERROR: 40014,
      GEP_VERSION: 40012,
      GEP_VERSION_GAME: 40013,
      GEP_FAILED_TO_LOAD_GAME_SERVICES: 40015,
      GEP_FAILED_TO_LOAD_GAME_SERVICE: 40020,
      REMOTE_CONFIG_DISABLED: 40017,
      REMOTE_CONFIG_ERROR: 40018,
      REMOTE_CONFIG_ERROR_LAST_VALUE: 40019,
      FEATURE_TRACKED: 40021,
      GEP_ERROR_LOADING_GOOP: 40095,
      GEP_FAILED_TO_LOAD_GAME_SERVICES_DAILY: 40096,
      GEP_MONITOR_KEYS: 40097,
      GEP_FAILED_TO_LOAD_GAME_MAIN: 40098,
      OSBUILD: 40099,
      GAME_INIT_FAILED: 40100,
      SECOND_GAME_LAUNCHED: 400093,
      VALORANT_MEMORY_INTEGRITY_ON: 400096,
      VALORANT_MEMORY_INTEGRITY_OFF: 400097,
      VALORANT_ELIGIBLE: 400119
    },
    TRACKING_EVENTS: {
      MEMORY_INTEGRITY: 'gep_memory_integrity',
    },

    sendTrack: function sendTrack(id, extra) {

      if (!_allowUsage) {
        return;
      }



      extra = _sanitizeExtra(extra);
      if (phasing <= kBatchTrackingPhasing) {
        trackingService.enqueueEvent({id, extra});
      }
    },
    initAllowUsage: function () {
      if (!overwolfInternal.settings.privacy ||
          !overwolfInternal.settings.privacy.get) {
        return;
      }

      overwolfInternal.settings.privacy.get(({ flags }) => {
        if (!flags) {
          console.warn('[Monitor] Usage flag is missing');
          return;
        }
        _allowUsage = flags.usage;
         console.log('[Monitor] Usage:', flags.usage);
      });
    },
    flush: function() {
      trackingService.flush();
    },
  }

});