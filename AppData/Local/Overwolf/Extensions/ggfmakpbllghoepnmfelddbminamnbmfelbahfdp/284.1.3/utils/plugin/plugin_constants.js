define([], function() {
  const Constants = {
    MAX_PLUGIN_LOAD_ATTEMPTS: 100,
    PLUGIN_RETRAY_INTERVAL_TIME: 1000,

      DEFAULT_PLUGIN: "GEPPlugin",

      STATES: {
      started: "started",
      stopped: "stopped",
      loaded: "loaded"
    },

      EVENT_TYPES: {
      info_update: "info_update",
      event: "event"
    },

      PLUGIN_WHITE_LIST: {
      state: {},
      last_error: {},
      plugin_crashed: {}
    },

      PLUGIN_INFO_WHITELIST: ["plugin_status", "task_status"],

      PLUGIN_STATES_TO_REPORT: [
      "failed_initializing_scanner",
      "crashed_on_init",
      "observer_crash",
      "patch_info_failure",
      "observer_crash_lobby",
      "observer_crash_ingameplayers",
      "failed_initializing_monitor",
      "failed_initializing_monitor",
      "failed_starting_monitor",
      "disabled",
      "crashed_on_present_parse",
      "crashed_on_present",
      "cpu_high_usage",
      "disabled_goop"
    ],

      PLUGIN_ERRORS_TO_IGNORE: {
      7764: ["observer_crash_ingameplayers"]
    }
  };

  return Constants;
});
