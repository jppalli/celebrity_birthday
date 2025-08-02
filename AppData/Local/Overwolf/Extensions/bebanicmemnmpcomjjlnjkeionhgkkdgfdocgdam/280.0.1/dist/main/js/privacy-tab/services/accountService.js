angular.module('PrivacyControlPanel')
  .service('AccountService', function ($http) {

      const ENDPOINTS = {
        requestData: "https://accounts.overwolf.com/privacy/control?action=export-account",
        deleteAccount: "https://accounts.overwolf.com/privacy/control?action=delete-account",
        sendUpdates: "https://accounts.overwolf.com/users/profile"
      };

      let _token;
      let _profileChangeListeners = {};

      function requestAccountData(callback) {
        AnalyticsService.trackRSEvent('ow_settings_alter_account', {
          action: 'Request your Data'
        });

        _http(ENDPOINTS.requestData,
          "GET",
          null,
          _requestDataSuccess,
          _requestDataError,
          callback);
      }

      function deleteAccount(callback) {
        AnalyticsService.trackRSEvent('ow_settings_alter_account', {
          action: 'Delete Account'
        });

        _http(ENDPOINTS.deleteAccount,
          "GET",
          null,
          _deleteAccountSuccess,
          _deleteAccountError,
          callback);
      }

      function getCurrentUser(callback) {
        overwolf.profile.getCurrentUser(function (publicProfile) {
          overwolfInternal.profile.getCurrentUser(function (privateProfile) {
            if(privateProfile && privateProfile.encodedToken) {
              _token = privateProfile.encodedToken;
            }
            else {
              console.log(`[ACCOUNTS SERVICE] did not get token`);
            }
            let profile = {};
            angular.merge(profile, publicProfile);
            angular.merge(profile, privateProfile.profile);
            callback(profile);
          });
        });
      }

      // NOTE(twolf): Added this for a light-weight call (1 call instead of 2)
      function getCurrentUserPublic(callback) {
        overwolf.profile.getCurrentUser(callback);
      }

      function openLoginDialog() {
        overwolf.profile.openLoginDialog();
      }

      function resendVerification() {
        window.location = "overwolf://store/verification/";
      }

      function doLogout(callback) {
        overwolfInternal.profile.logout(function (result) {
          if(result.status !== "success") {
            console.log(`[ACCOUNTS SERVICE] failed to log out ` +
              `${JSON.stringify(result)}`)
          }
          callback(result);
        });
      }

      function updateSendUpdates(sendUpdates, callback) {
        _http(ENDPOINTS.sendUpdates,
          "POST",
          {dontSendMarketingMails: !sendUpdates},
          _sendUpdatesCallback,
          _sendUpdatesCallback,
          callback);
      }

      function onLoginStateChanged(listener) {
        overwolf.profile.onLoginStateChanged.removeListener(listener);
        overwolf.profile.onLoginStateChanged.addListener(listener);
      }

      function onUserProfileChanged(id, listener) {
        _profileChangeListeners[id] = listener;
        overwolfInternal.profile.onUserProfileChanged.removeListener(_onUserProfileChange);
        overwolfInternal.profile.onUserProfileChanged.addListener(_onUserProfileChange);
      }

      /*------------------------------------------------------------------------*/

      function _onUserProfileChange(event) {
        _token = event.encodedToken;
        for(let id in _profileChangeListeners) {
          if(_profileChangeListeners.hasOwnProperty(id)) {
            let listener = _profileChangeListeners[id];
            listener(event);
          }
        }
      }

      function _requestDataSuccess(result, callback) {
        if(result && result.status === 200) {
          console.log(`[ACCOUNT SERVICE] get account data request ` +
            `success ${JSON.stringify(result)}`);
          let date = null;
          if(result.data && result.data.expectedUntil) {
            date = new Date(result.data.expectedUntil);
          }
          callback({success: true, date: date});
        }
        else {
          console.log(`[ACCOUNT SERVICE] account data request` +
            ` failed ${JSON.stringify(result)}`);
          callback(false);
        }
      }

      function _requestDataError(error, callback) {
        if(error.status === 429 && error.data.expectedUntil) {
          console.log(`[ACCOUNT SERVICE] already requested data`);
          let date = new Date(error.data.expectedUntil);
          return callback({success:true, date: date});
        }
        else if(error.status === 401 &&
          (error.data.message === "account-suspended" ||
            error.data.message === "user-doesnt-exist")) {
          console.log(`[ACCOUNT SERVICE] user error ${error.data.message}`);
          return callback({success:false});
        }
        else if (error.status === 500) {
          console.log(`[ACCOUNT SERVICE] server error ${JSON.stringify(error)}`);
          return callback({success:false});
        }

        console.log(`[ACCOUNT SERVICE] get account data request ` +
          `failed ${JSON.stringify(error)}`);
        callback(false);
      }

      function _deleteAccountSuccess(result, callback) {
        console.log(`[ACCOUNT SERVICE] delete account request ` +
          `success ${JSON.stringify(result)}`);
        callback(true);
      }

      function _deleteAccountError(error, callback) {
        if(error.status === "401") {
          if(error.data.message === "user-doesnt-exist" ||
            error.data.message === "account-suspended") {
            console.log(`[ACCOUNT SERVICE] user error ${error.data.message}`);
            return callback({success:true});
          }
        }
        else if (error.status === 500) {
          console.log(`[ACCOUNT SERVICE] server error ${JSON.stringify(error)}`);
          return callback({success:false});
        }

        console.log(`[ACCOUNT SERVICE] delete account request ` +
          `failed ${JSON.stringify(error)}`);
        callback(false);
      }

      function _sendUpdatesCallback(result, callback) {
        callback(result);
      }

      function _http(url, method, postData, successCallback, errorCallback, callback) {
        if(!_token) {
          console.log("[ACCOUNT SERVICE] did not get token");
          return;
        }

        let options = {
          method: method,
          url: url,
          timeout: 10000,
          headers: {
            'Authorization': "Bearer " + _token
          }
        };

        if(method === "POST" && postData) {
          options.data = postData;
        }

        $http(options)
          .then(function (result) {
            successCallback(result, callback)
          })
          .catch(function (error) {
            errorCallback(error, callback);
          });
      }

      return {
        requestAccountData,
        deleteAccount,
        getCurrentUser,
        getCurrentUserPublic,
        openLoginDialog,
        resendVerification,
        doLogout,
        updateSendUpdates,
        onLoginStateChanged,
        onUserProfileChanged
      }
    }
  );
