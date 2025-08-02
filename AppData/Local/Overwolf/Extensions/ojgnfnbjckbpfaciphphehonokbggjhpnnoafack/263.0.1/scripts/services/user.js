(function (angular) {
  'use strict';

  angular.module('overwolf')
    .service('UserService', ['$rootScope', '$http', '$q', 'ngProgress',
      function ($rootScope, $http, $q, ngProgress) {
      const ENDPOINT = "https://accounts.overwolf.com";
      // const ENDPOINT = "http://localhost:3001";
      const SOCIAL_NETWORKS = OverwolfStore.login.enums.SocialNetwork;

      const SOCIAL_LOGIN_IDS = {
        Facebook: 1,
        Google: 2,
        Discord: 3,
      };

      const kNameOfUUIDCookie = 'ow_uuid'
      const kNameOfOverwolfPrimaryDomain = 'overwolf.com'

      let _this = this;
      _this.loginDeffered = null;
      _this.wasDockIntroducedCallback = null;
      _this.wasDockEverIntroduced = localStorage.ftueTooltipShown;
      _this.isLoggedIn = false;
      _this.token = null;
      _this.newUser = null;
      _this.userAction = null;

      let _listeners = [];
      let _initTimeout = null;
      let _gotCurrentUser = false;
      let _suspendedInternal = null;

      OverwolfStore.getIsFirstStoreExecution(function (isFirstRun) {
        _this.wasDockEverIntroduced = !isFirstRun;
        if (_this.wasDockIntroducedCallback) {
          _this.wasDockIntroducedCallback(wasDockIntroducedAlready);
        }
      });

      this.getWasDockEverIntroduced = function (callback) {
        if (_this.wasDockEverIntroduced != null) {
          callback(_this.wasDockEverIntroduced);
        } else {
          _this.wasDockIntroducedCallback = callback;
        }
      };

      this.fillUserData = function (state) {
        _gotCurrentUser = true;
        if (typeof _initTimeout !== 'undefined' && _initTimeout !== null) {
          clearTimeout(_initTimeout);
        }
        if (state.status !== "error" && !state.profile.suspended) {
          _this.isLoggedIn = true;
          _this.token = state.token;
          fillUserData(state.profile);
        }
        if(state.profile && state.profile.suspended) {
          // internally save this, so if the user tries to use social
          // login, we will internally log him out, and try social login again
          _suspendedInternal = state.profile.suspended;
        }

        _this.mixpanelRegisterLoggedIn(_this.isLoggedIn);
      };

      this.showLogginIfUserIsLoggedOut = function (showLogin) {
        _this.loginDeffered = $q.defer();
        if (typeof showLogin === 'undefined' || showLogin === null) {
          showLogin = true;
        }

        _this.getCurrentUser(function (state) {
          // TODO (IDAN): move FTUE to separate code
          displayLoginWindow(true, showLogin); // for FTUE.
        });

        // if getCurrentUser takes a long time,
        _initTimeout = setTimeout(function () {
          if (!_gotCurrentUser) {
            displayLoginWindow(true, showLogin);
          }
        }, 5000);
        return _this.loginDeffered.promise;
      };

      this.addListener = function (listener) {
        _listeners.push(listener)
      };

      this.removeListener = function (listener) {
        let index = _listeners.indexOf(listener);
        if (index >= 0) {
          _listeners.splice(index, 1);
        }
      };

      OverwolfStore.login.onLoginStateChanged.addListener(function (data) {
        console.log(`[USER SERVICE] login state changed: username ${JSON.stringify(data).username}`);

        // for analytics
        _this.username = data.username;


        for (let i = 0; i < _listeners.length; i++) {
          let listener = _listeners[i];
          listener(data);
        }

        if (data.status === "success" &&
          data.connectionStatus === "Online" &&
          !data.suspended) {

          _this.newUser = false;
          try {
            const relayData = JSON.parse(data.relayData);
            _this.newUser = !!relayData.newUser;
          } catch (e) {
            console.error(`[USER SERVICE] failed to parse relayData: ${e.message}`);
          }
          _this.isLoggedIn = true;

          _this.getCurrentUser(function (state) {
            // if (state.status !== "error" && !state.profile.suspended) {
            //   fillUserData(state.profile);
            // }
            // if(state.profile && state.profile.suspended) {
            //   _this.suspended = state.profile.suspended;
            //   _suspendedInternal = state.profile.suspended;
            // }
          });
        }
        else {
          _this.isLoggedIn = false;
          _this.newUser = false;
          _this.suspended = data.suspended;
          _suspendedInternal = data.suspended;
          $rootScope.$digest();
        }
        _this.mixpanelRegisterLoggedIn(_this.isLoggedIn);

        if (_this.loginDeffered) {
          _this.loginDeffered.resolve(null);
          _this.loginDeffered = null;
        }
      });

      OverwolfStore.login.onUserProfileChanged.addListener(function (d) {
        console.log("user profile changed - getting user data");
        _this.getCurrentUser(function (state) {
          // if (state.status !== "error" && !state.profile.suspended) {
          //   fillUserData(state.profile);
          // }
          // if(state.profile && state.profile.suspended) {
          //   _this.suspended = state.profile.suspended;
          //   _suspendedInternal = state.profile.suspended;
          // }
        });

        //TODO: when user verifies email, this is where store will be updated
        });

      function displayLoginWindow(strictClose, showLogin) {
        console.log("complete progress from user service displaylogin window");
        ngProgress.complete().then(function () {
          if ($rootScope.preventSplash) {
            return;
          }

          if ($rootScope.loginopenState && (!_this.isLoggedIn || $rootScope.loginopenState === "change-password")) {
            $rootScope.$broadcast('owModal.open', {
              templateUrl: "templates/login-modal.html",
              container: "login",
              strictClose: strictClose,
              controllerScopeParams:
                {openState: $rootScope.loginopenState, source: "welcome"}
            });
          }
          _this.loginDeffered.resolve(false);
        });
      }

      this.login = function (network, username, password, callback) {
        _this.userAction = 'login';
        if (network && SOCIAL_NETWORKS[network]) {
          OverwolfStore.login.performSocialLogin(network, function (result) {
            callback(result, network);
          });
        }

        else {
          OverwolfStore.login.performOverwolfLogin(
            username,
            password,
            function (result) {
              callback(result, "Email");
            });
        }
      };

      this.logout = function (callback) {
        _this.userAction = 'logout';
        $rootScope.showVerificationBanner = false;
        _this.username = null;
        _this.email = null;
        _this.avatar = null;
        _this.verified = null;
        _this.token = null;
        _this.suspended = null;
        _this.developer = null;
        _suspendedInternal = null;
        OverwolfStore.login.logout(function (data) {
          if (data.status !== "loggedin") {
            _this.isLoggedIn = false;
          }

          if(callback) {
            callback(data);
          }
        })
      };

      this.signup = function (signupParams, callback) {
        _this.userAction = null; // prevent welcome tooltip after signup
        let signupOptions = JSON.stringify(signupParams);

        $http.post(`${ENDPOINT}/users/register`, signupOptions)
          .success(function (response) {
            console.log(`signup server response: ${JSON.stringify(response)}`);
            callback({status: "success", token: response.token});
          })
          .error(function (error) {
            console.log(`signup server error: ${JSON.stringify(error)}`);
            callback({status: "error", error: error});
          });
      };

      this.clearUserAction = function() {
        _this.userAction = null; // prevent welcome tooltip after signup
      };

      this.getCurrentUser = function (callback) {
        OverwolfStore.login.getCurrentUser(function (result) {
          const res = JSON.stringify(result);
          console.log(`getCurrentUser result status: ${res.status}`);
          _this.fillUserData(result);
          callback(result);
        });
      };

      this.setToken = function (token, callback) {
        console.log(`settings token ${token}`);
        OverwolfStore.login.setToken(token, function (result) {
          console.log(`setToken result: ${JSON.stringify(result)}`);
          callback(result);
        })
      };

      this.resendVerification = function (email, callback) {
        $http({
          method: "GET",
          url: `${ENDPOINT}/auth/action?mode=verifyEmailRequest&email=${email}`
        })
          .then(function (res) {
            console.log(`resend email success: ${JSON.stringify(res)}`);
            callback(true);

          })
          .catch((err) => {
            console.error(`resend email error: ${JSON.stringify(err)}`);
            callback(false);
          });
      };

      this.resetPassword = function (email, callback) {
        email = encodeURIComponent(email);
        $http.get(`${ENDPOINT}/auth/action?mode=resetPasswordRequest&email=${email}`)
          .then(function (res) {
            console.log(`forgot password success: ${JSON.stringify(res)}`);
            if(res.status === 200){
              callback({status: "success"});
            }
            else{
              callback({status: "error", statusCode: res.status});
            }
          })
          .catch((err) => {
            console.log(`forgot password error: ${JSON.stringify(err)}`);
            callback({status: "error", statusCode: err.status});
          });
      };

      this.manageUserAccount = function () {
        overwolfStore.manageUserAccount();
      };

      this.isUsernameTaken = function (username, callback) {
        $http.get("https://api.overwolf.com/users/CheckUserExist?UserName=" + username).success(function (data) {
          if (data == true) {
            callback(true)
          } else {
            callback(false);
          }
        })
      };

      this.cancelAccountDeletion = function cancelAccountDeletion(callback) {
        OverwolfStore.login.cancelAccountDeletion(function (result) {
          if(result.status === "success") {
            _this.isLoggedIn = true;
          }
          callback(result)
        });
      };

      let fillUserData = function (data) {
        if(!data){
          console.error(`invalid user profile ${data}`);
          return;
        }
        _this.username = data.username;
        _this.email = data.email;
        _this.avatar = data.avatar;
        _this.verified = data.verified;
        _this.developer = data.developer;

        if (data.nickname) {
          _this.displayName = data.nickname;
        }
        else {

          let strs = data.email.split("@");
          if (strs.length === 2) {
            _this.displayName = strs[0];
          }
          else {
            _this.displayName = data.username;
          }
        }

        $rootScope.showVerificationBanner = !data.verified;
        $rootScope.$broadcast("userDataChanged");
      };

      this.isSuspendedInternal = function () {
        return _suspendedInternal;
      };

      this.getOverwolfUUID = function () {
        const uuidCookieVal = this.getCookies(kNameOfUUIDCookie)
        if (uuidCookieVal) {
          this.setUUIDCookie(uuidCookieVal)
          return uuidCookieVal;
        } else {
          return this.generateOverwolfUUID();
        }
      };

      this.generateOverwolfUUID = function () {
        if (typeof window.uuid === 'undefined') {
          return;
        }

        const uuid = window.uuid.v4();
        this.setUUIDCookie(uuid);
        return this.getCookies(kNameOfUUIDCookie);
      };

      this.setUUIDCookie = function (uuid) {
        if (typeof Cookies === 'undefined') {
          return;
        }

        Cookies.set(
          kNameOfUUIDCookie,
          uuid,
          {domain: kNameOfOverwolfPrimaryDomain, expires: 365}
        );
      };

      this.getCookies = function (cookieName) {
        if (typeof Cookies === 'undefined')  {
          return null
        }

        return Cookies.get(cookieName);
      };


      this.mixpanelRegisterLoggedIn = function (loggedIn) {
        if (typeof(mixpanel) !== 'undefined') {
          mixpanel.register({
            'logged_in': loggedIn,
          });
        }
      };

      this.trackMixpanelLoggedIn = function (network) {
        this.mixpanelRegisterLoggedIn(true);

        if (typeof(mixpanel) !== 'undefined') {
          mixpanel.track('overwolf_client_login_completed', {
            login_method: network
          })
        }
      };

      window.getOverwolfUUID = this.getOverwolfUUID();

    }]);

})(angular);