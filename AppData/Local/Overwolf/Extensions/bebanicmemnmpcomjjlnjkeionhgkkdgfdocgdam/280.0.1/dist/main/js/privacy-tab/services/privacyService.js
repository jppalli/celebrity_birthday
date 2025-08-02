angular.module('PrivacyControlPanel')
  .service('PrivacyService', function () {

      // -----------------------------------------------------------------------
      function getPrivacySettings(callback) {
        overwolfInternal.settings.privacy.get(result => {
          if (!result.success) {
            console.error(result.error);
            return;
          }

          callback(result);
        });
      }

      // -----------------------------------------------------------------------
      function setPrivacySettings(type, flags, callback) {
        getPrivacySettings((result)=> {
          if (!result.success) {
            console.error(result.error);
            return;
          }

          const currentFlags = {...result.flags};
          Object.keys(currentFlags).forEach((flag) => {
            if (typeof flags[flag] !== 'undefined') {
              currentFlags[flag] = flags[flag]
            }
          });

          overwolfInternal.settings.privacy.set(currentFlags, result => {
            if (!result.success) {
              console.error(result.error);
              return;
            }

            AnalyticsService.trackRSEvent('ow_settings_opt_out_data', {
              layer: type.tracking,
              value: flags[type.id] ? 1 : 0
            });

            callback(result);
          });
        })
      }

      // -----------------------------------------------------------------------
      return {
        getPrivacySettings,
        setPrivacySettings
      }
    }
  );
