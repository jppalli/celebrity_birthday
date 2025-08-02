(function (angular) {
  'use strict';

  angular.module('overwolf')
    .controller('LoginController',[
      '$http', '$scope', 'UserService', '$rootScope', '$timeout', '$filter',
      'TrackingService', 'vcRecaptchaService',
      function (
      $http, $scope, UserService, $rootScope, $timeout, $filter,
      TrackingService, vcRecaptchaService) {

      const SOCIAL_LOGIN_IDS = {
        Facebook: 1,
        Google: 7,
        Discord: 5,
        Twitter: 9
      };

      const ERROR_TEXTS = {
        userError: "user error",
        connectionError: "connection error",
        captchaError: "invalid captcha please try again",
        login: {
          emptyEmail: "enter email",
          invalidEmail: "enter valid email",
          passwordInvalid: "password error",
          emailNotFound: "email doesnt exists",
          socialError: {
            Facebook: "facebook login error",
            Google: "google login error",
            Discord: "discord login error"
          }
        },
        signup: {
          emailExists: "sorry this email is already signed up to overwolf",
          passwordEmpty: "please choose a password",
          passwordInvalid: "password length"
        },
        forgotPassword: {
          required: "email required",
          notFound: "email doesnt exists",
          error: "user error"
        }
      };

      // $rootScope.$broadcast("hideAppModal");

      let _this = this;
      let _lastLoginNetworkId = null;
      let _introTimeout = null;
      let _observer = null;
      let _isCaptchaVisible = false;

      let suspendedButAskedToSeeLogin = localStorage.getItem("suspendedButAskedToSeeLogin");
      if(!suspendedButAskedToSeeLogin) {
        localStorage.setItem("suspendedButAskedToSeeLogin", false)
      }

      $scope.active = false;
      $scope.state = 'login';
      $scope.showVerificationLines = false;
      $scope.showMailSent = false;

      $scope.restoreAccountLoader = false;

      /* we're using a service for user because the login button and the avatar
       button are seperate LI elements that use the controller. Meaning
       angular creates two separate scopes. The service is used to communicate
       and propagate changes between both controller scopes. */
      $scope.service = UserService;

      _this.init = function () {

        OverwolfStore.requestFocus();

        _this.setStateAccordingToUserPreviousLoginState();

        localStorage["FirstRun"] = false;

        UserService.removeListener(_this._onLoginStateChanged);
        UserService.addListener(_this._onLoginStateChanged);

        _this.registerToSocialLoginErrors();

        _this.trackView();

        _introTimeout = setTimeout(function () {
          $scope.active = true;
          // $rootScope.$broadcast("startBlinking");
        },150);
      };

      _this.registerToSocialLoginErrors = function () {
        console.log("registering to social login error event");
        OverwolfStore.login.onLoginConnectionError.removeListener(_this._onLoginError);
        OverwolfStore.login.onLoginConnectionError.addListener(_this._onLoginError);
      };

      _this.setStateAccordingToUserPreviousLoginState = function () {
        setTimeout(function () { //doing in timeout due to some wierd timing
          // issue in overwolf API

          let openState = null;
          $scope.openState = null;

          if($scope.controllerScopeParams &&
            $scope.controllerScopeParams.openState) {
            openState = $scope.controllerScopeParams.openState;
            if ((openState === "change-password") ||
              (openState === 'verification')) {
              if(UserService.isLoggedIn) {
                $scope.openState = openState;
              } else {
                openState = "login";
              }
            }
          }

          if((openState === "suspended" || UserService.suspended) && _this.isSuspendedButAskedToSeeLogin()) {
            openState = "login";
          }

          if(openState){
            $scope.changeState(openState);
          }
          else{
            $scope.changeState("login");
          }

          if($scope.state === "verification") {
            $scope.form.email = $scope.form.email || UserService.email;
          }

          $scope.$apply();

        }, 250);
      };

      _this.isSuspendedButAskedToSeeLogin = function () {
        let result = localStorage.getItem("suspendedButAskedToSeeLogin");
        return result === "true";
      };

      _this.trackView = function() {
        switch ($scope.state) {
          case 'login':
            TrackingService.trackEvent("login_open");
            break;
          case 'signup':
            TrackingService.trackEvent("signup_open");
            TrackingService.trackOnce("nu_signup_screen_vis");
            break;
        }
      };

      _this.login = function (username, password) { //for backwards compatibility.
        $scope.form.username = username;
        $scope.form.password = password;
        $scope.Login.doLogin();
      };

      _this.resetFormErrors = function () {
        $scope.form.passwordError = false;
        $scope.form.userError = false;
        $scope.form.connectionError = false;
        $scope.form.wasEmailValidated = false;
        $scope.form.wasUsernameValidated = false;
        $scope.form.wasPasswordValidated = false;
        $scope.form.wasConfirmPasswordValidated = false;
        $scope.form.emailIsRequired = false;
        $scope.form.forgotPasswordExists = false;
        $scope.form.forgotPasswordError = false;
      };

      _this._doClose = function () {
        localStorage.setItem("suspendedButAskedToSeeLogin", true);
        $scope.active = false;
        // $rootScope.$broadcast("stopBlinking");
        if(_introTimeout !== null){
          clearTimeout(_introTimeout);
        }
        _this.stopVerificationAnimation();
        $scope.owModal.close(null, null, true);
        if($scope.state === "verification") {
          $rootScope.showVerificationBanner = true;
        }
      };

      _this.videoElement_ended = function() {
        _this.videoElement.currentTime = 2.0;
        _this.videoElement.play();
      };

      _this.startVerificationAnimation = function () {
        /*_this.videoElement = document.getElementById("verification-video");
        if(_this.videoElement) {
          _this.videoElement.addEventListener("ended", _this.videoElement_ended);
          _this.videoElement.load();
          _this.videoElement.play();

          setTimeout(() => {
            $scope.showVerificationLines = true;
          }, 500);
        }
        else{
          console.log("Verification video not found??");
        }*/
      };

      _this.stopVerificationAnimation = function() {
        if(_this.videoElement) {
          _this.videoElement.pause();
          _this.videoElement.removeEventListener("ended", _this.videoElement_ended);
        }
      };

      _this._onLoginError = function(data) {
        console.log(`social login error. network: ${data.network} error: ${data.error}`);

        if(data.network === OverwolfStore.login.enums.SocialNetwork.None){
          $scope.form.userError = true;
          $scope.form.errorText = ERROR_TEXTS.userError;
        }
        else{
          if(data.error === "user-declined-access" || data.error === "user-declined-email"){
            TrackingService.trackEvent("login", "social", "decline", SOCIAL_LOGIN_IDS[data.network]);
          }

          $scope.form.userError = true;
          $scope.form.errorText = ERROR_TEXTS.login.socialError[data.network];
        }
      };

      _this._onLoginStateChanged = function (data) {
        if(data.status === "success") {
          if (data.connectionStatus === "Online" && !data.suspended) {
            $scope.Login.IsInProgress = false;
            $scope.tryAgainInProgress = false;

            $scope.form.connectionError = false;

            if (_lastLoginNetworkId !== null) {
              TrackingService.trackEvent("login", "completed", null, _lastLoginNetworkId);
              if (typeof(overwolf) !== 'undefined') {
                overwolf.windows.bringToFront(true, console.log);
              }
              _lastLoginNetworkId = null;
            }

            // old event
            TrackingService.trackEvent("User", "Login", "result", 0, "success");
            if ($scope.state === "login") {
              TrackingService.trackOnce("nu_manual_login_success");
            }
          }
          else if (data.suspended) {
            $scope.Login.IsInProgress = false;
            $scope.tryAgainInProgress = false;
            $scope.changeState("suspended");
          }

          if(data.connectionStatus === "Offline") {
            localStorage.setItem("suspendedButAskedToSeeLogin", false);
          }
        }
        else if (data.status === "ConnectionError") {
          $scope.Login.IsInProgress = false;
          $scope.tryAgainInProgress = false;
          $scope.form.userError = false;
          $scope.form.connectionError = true;
        }
        else {
          if (data.Error === "Wrong username/password") {
            $scope.Login.IsInProgress = false;
            $scope.tryAgainInProgress = false;
            $scope.form.passwordError = true;
          }
          else {
            $scope.Login.IsInProgress = false;
            $scope.tryAgainInProgress = false;
            $scope.form.connectionError = false;
            $scope.form.userError = true;
          }
          TrackingService.trackEvent("User", "Login", "result", "failue");
        }
      };

      _this._waitForCaptchaStart = function () {
        // Select the node that will be observed for mutations
        let body = document.getElementsByTagName("body")[0];
        let target = body.lastElementChild;

        // Options for the observer (which mutations to observe)
        let config = {
          attributes: true,
          childList: true,
          subtree: true,
          attributeFilter: ['style']
        };

        // Callback function to execute when mutations are observed
        let callback = function(mutationsList) {
          for (let mutation of mutationsList) {
            if (mutation.type === 'attributes') {
              if (mutation.target.style.visibility === "visible") {
                console.log(`captcha visibility: ` +
                  `${mutation.target.style.visibility}`);
                if (!_isCaptchaVisible) {
                  _isCaptchaVisible = true;
                  TrackingService.trackEvent("login_ow_captcha_started");
                }
              }
              else if(mutation.target.style.visibility === "hidden") {
                console.log(`captcha visibility: ` +
                  `${mutation.target.style.visibility}`);
                _isCaptchaVisible = false;
              }
            }
          }
        };

        // Create an observer instance linked to the callback function
        _observer = new MutationObserver(callback);

        // Start observing the target node for configured mutations
        _observer.observe(body, config);
      };

      _this.showProfileModal = function () {
        $rootScope.$broadcast('owModal.open', {
          templateUrl: "templates/profile-modal.html",
          container: "profile",
          controllerScopeParams: {
            openState: 'verification',
            source: 'welcome'
          }
        })
      };


      $scope.form = {
        errorText: "user error",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        forgotPasswordInProgress: false,
        userError: false,
        connectionError: false,
        emailIsRequired: false,
        isEmailValid: true,
        emailValidText: "",
        wasEmailValidated: false,
        validateEmail: function () {
          $scope.form.wasEmailValidated = true;
          if($scope.form.email.length === 0){
            $scope.form.isEmailValid = false;
            $scope.form.emailValidText = ERROR_TEXTS.login.emptyEmail;
            return false;
          }

          let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          $scope.form.isEmailValid = re.test($scope.form.email);
          if(!$scope.form.isEmailValid){
            $scope.form.emailValidText = ERROR_TEXTS.login.invalidEmail;
          }
          return $scope.form.isEmailValid;
        },
        isUsernameValid: true,
        wasUsernameValidated: false,
        usernameReason: "",
        validateUsername: function (callback) {
          this.wasUsernameValidated = true;
          $scope.form.isUsernameValid = true;
          if($scope.form.username.length === 0){
            $scope.form.isUsernameValid = false;
            $scope.form.usernameReason = "username required";
            callback(false);
            return;
          }
          let result = true;
          let len = $scope.form.username.length;
          if (len < 3 || len > 64) {
            $scope.form.isUsernameValid = false;
            $scope.form.usernameReason = "username length";
            callback(false);
            return;
          }
          let re = /^[a-zA-Z0-9]*$/;
          this.isUsernameValid = re.test($scope.form.username);
          if (!this.isUsernameValid) {
            $scope.form.usernameReason = "username characters";
            callback(false);
            return;
          }

          UserService.isUsernameTaken($scope.form.username, function (result) {
            $scope.form.isUsernameValid = !result;
            if(!$scope.form.isUsernameValid) {
              $scope.form.usernameReason = "username taken";
            }
            callback($scope.form.isUsernameValid);
          });
        },
        passwordError: false,
        isPasswordValid: true,
        wasPasswordValidated: false,
        validatePassword: function (isLogin) {
          this.wasPasswordValidated = true;
          $scope.form.isPasswordValid = true;

          if(typeof $scope.form.password === "undefined"){
            $scope.form.password = "";
          }
          if(isLogin){
            if($scope.form.password.length === 0){
              $scope.form.isPasswordValid = false;
              $scope.form.passwordValidText = ERROR_TEXTS.login.passwordInvalid;
            }

            return $scope.form.isPasswordValid;
          }

          if($scope.form.password.length === 0){
            $scope.form.isPasswordValid = false;
            $scope.form.passwordValidText = ERROR_TEXTS.signup.passwordEmpty;
            return $scope.form.isPasswordValid
          }

          if(this.password.length < 8 || this.password.length > 64){
            this.isPasswordValid = false;
          }

          if (!this.isPasswordValid){
            $scope.form.isPasswordValid = false;
            $scope.form.passwordValidText = ERROR_TEXTS.signup.passwordInvalid;
          }
          return this.isPasswordValid;
        },
        isConfirmPasswordValid: true,
        wasConfirmPasswordValidated: true,
        validateConfirmPassword: function () {
          $scope.form.wasConfirmPasswordValidated = true;
          $scope.form.isConfirmPasswordValid = $scope.form.password === $scope.form.confirmPassword;
          return $scope.form.isConfirmPasswordValid;
        },
        captchaWidgetId: null,
        captchaResponseData: null,
        isCaptchaValid: true,
        setCaptchaWidgetId: function (widgetId) {
          console.log(`Recaptcha widget created ${widgetId}`);
          $scope.form.captchaWidgetId = widgetId;

          _this._waitForCaptchaStart();

        },
        cbExpiration: function () {
          console.log("Recaptcha expired");
          $scope.form.captchaResponseData = null;
          vcRecaptchaService.reload($scope.form.widgetId);
        },
        replaceCaptcha: function () {
          console.log("Replacing recaptcha");
          $scope.form.captchaResponseData = null;
          vcRecaptchaService.reload($scope.form.widgetId);
        },
        promotionalEmailsConsented: true,
      };

      $scope.Login = {
        IsInProgress: false,
        doLogin: function (network) {
          $rootScope.$emit("UserActionStarted");

          if(!network || network === OverwolfStore.login.enums.SocialNetwork.None) {

            _lastLoginNetworkId = 0;
            TrackingService.trackEvent("User", "Login", "submit");

            _this.resetFormErrors();

            let isValid = $scope.form.validateEmail() && $scope.form.validatePassword(true);
            if (!isValid) {
              console.log("Form not valid, not logging in");
              return;
            }
            $scope.Login.IsInProgress = true;
          }
          else{
            _lastLoginNetworkId = SOCIAL_LOGIN_IDS[network];
          }

          function _loginCallback(res, network) {
            if (typeof network === 'undefined') {
              network = null;
            }

            if (res.status === "success"){
              console.log("[LOGIN CONTROLLER] perform login request sent");
              UserService.trackMixpanelLoggedIn(network);
              if (network !== "Email") {
                _this.showProfileModal();
              }
            }
            else{
              console.log("[LOGIN CONTROLLER] perform login request failed "
                + JSON.stringify(res));

              if(res.error === "AlreadyTryingToConnect" ||
                res.error === "AlreadyConnected") {

                if(UserService.isSuspendedInternal()) {
                  console.log("[LOGIN CONTROLLER] already connected but" +
                    " suspended - logging out and retrying");
                  UserService.logout(function (data) {
                    if (data.status !== "loggedin") {
                      UserService.login(network,
                        $scope.form.email,
                        $scope.form.password,
                        _loginCallback);
                    }
                  });
                }

                return;
              }

              $scope.Login.IsInProgress = false;

              if(res.error === "AccountsServiceUnresponsive") {
                $scope.form.userError = false;
                $scope.form.connectionError = true;
                $scope.form.errorText = ERROR_TEXTS.userError;
              }
              else if(res.error === "UserDoesNotExist"){
                $scope.form.userError = false;
                $scope.form.connectionError = false;
                $scope.form.wasEmailValidated = true;
                $scope.form.isEmailValid = false;
                $scope.form.emailValidText = ERROR_TEXTS.login.emailNotFound;
              }
              else if(res.error === "WrongPassword") {
                $scope.form.userError = false;
                $scope.form.connectionError = false;
                $scope.form.wasPasswordValidated = true;
                $scope.form.isPasswordValid = false;
                $scope.form.passwordValidText =
                  ERROR_TEXTS.login.passwordInvalid;
              }
              else{
                $scope.form.userError = true;
                $scope.form.connectionError = false;
                $scope.form.errorText = ERROR_TEXTS.userError;
              }
            }
          }

          UserService.login(network, $scope.form.email, $scope.form.password, _loginCallback);
        },
        hideError: function () {
          $scope.form.connectionError = false;
          $scope.form.userError = false;
        }
      };

      $scope.Signup = {
        IsInProgress: false,
        afterSubmit: false,
        onPasswordChange: function(){
          if($scope.Signup.wasPasswordValidated){
            $scope.Signup.validatePassword();
          }
        },
        submitSignup: function () {
          $scope.Signup.afterSubmit = false;
          $scope.form.validateUsername(function (usernameValid) {
            let emailValid = $scope.form.validateEmail();
            let passwordValid = $scope.form.validatePassword(false);
            let validateConfirmPassword = $scope.form.validateConfirmPassword();
            let captchaData = $scope.form.captchaResponseData;
            if(usernameValid && emailValid && passwordValid && validateConfirmPassword && captchaData !== null){
              $scope.Signup.IsInProgress = true;
              $scope.form.userError = false;
              let signupOptions = {
                username: $scope.form.username,
                email: $scope.form.email,
                password: CryptoJS.MD5($scope.form.password).toString(),
                captchaV2Response: captchaData,
                sendEmails: $scope.form.promotionalEmailsConsented,
              };
              TrackingService.trackEvent("User", "Signup", "submit");
              UserService.signup(signupOptions, function (response) {

                if(response.status === "error"){
                  $scope.Signup.afterSubmit = true;
                  $scope.Signup.IsInProgress = false;
                  if(!response.error || response.error === "" || !response.error.message){
                    $scope.form.userError = true;
                    $scope.form.errorText = ERROR_TEXTS.userError;
                    TrackingService.trackEvent("User", "Signup", "result",
                      "failure_other");
                    console.log("unexpected server response for signup", response);
                  }
                  if (response.error.message === "invalid captcha") {
                    TrackingService.trackEvent("User", "Signup", "result", 0,
                      "failure_captcha");
                    $scope.form.isCaptchaValid = false;
                    $scope.form.errorText = ERROR_TEXTS.captchaError;
                    $scope.form.replaceCaptcha();
                  }
                  else if (response.error.message === "email exist") {
                    TrackingService.trackEvent("User", "Signup", "result", 0,
                      "failure_email_exists");
                    $scope.form.wasEmailValidated = true;
                    $scope.form.isEmailValid = false;
                    $scope.form.emailValidText = ERROR_TEXTS.signup.emailExists;
                  }
                  else if (response.error.message === "username exist") {
                    $scope.form.wasUsernameValidated = true;
                    $scope.form.isUsernameValid = false;
                    $scope.form.usernameReason = "username taken";
                  }
                  else {
                    $scope.form.userError = true;
                    $scope.form.errorText = ERROR_TEXTS.userError;
                    TrackingService.trackEvent("User", "Signup", "result",
                      "failure_other");
                    console.log("unexpected server response for signup", response);
                    // $scope.form.replaceCaptcha();
                  }
                }
                else{
                  TrackingService.trackEvent("User", "Signup", "result", "success");
                  TrackingService.trackOnce("nu_signup_complete");
                  UserService.trackMixpanelLoggedIn('Email');
                  UserService.setToken(response.token, function (result) {
                    $scope.Signup.afterSubmit = true;
                    $scope.Signup.IsInProgress = false;

                    if(result.status === "error"){
                      $scope.form.userError = true;
                      $scope.form.errorText = ERROR_TEXTS.userError;
                      $scope.form.replaceCaptcha();
                    }
                    else {
                      $scope.changeState("verification");
                    }
                  });
                }
              });
            }
            else {
              console.log("invalid validation of signup form");
            }
          });
        }
      };

      $scope.onClickSocialLogin = function (networkName) {
        _this.resetFormErrors();
        $scope.Login.doLogin(OverwolfStore.login.enums.SocialNetwork[networkName]);
      };

      $scope.changeState = function (newState) {
        _this.resetFormErrors();
        $rootScope.signupOrLoginOpen = true;
        console.log("State " + newState);
        $scope.state = newState;
        _this.trackView();

        if(newState === "verification"){
          _this.startVerificationAnimation();
        }

        // $scope.$apply();
      };

      $scope.onClickSubmit = function () {
        _this.resetFormErrors();
        if($scope.openState === "change-password"){
          return;
        }
        switch($scope.state){
          case "login":
            $scope.Login.doLogin();
            break;
          case "signup":
            TrackingService.trackEvent("login_ow_create");
            $scope.Signup.submitSignup();
            break;
        }
      };

      $scope.resendVerification = function () {
        $scope.showResendAnimation = false;
        UserService.resendVerification($scope.form.email, function (result) {
          if(result) {
            $scope.showResendAnimation = true;
            // $scope.$apply();
          }
        });
      };

      $scope.closeLogin = function () {
        _this._doClose();
        $rootScope.$broadcast("closeAppModal");
      };

      $scope.goBack = function () {
        _this._doClose();
        $rootScope.$broadcast("showAppModal");
      };

      $scope.backToLogin = function () {
        $scope.changeState('login');
        localStorage.setItem("suspendedButAskedToSeeLogin", true);
      };

      $scope.onClickRestoreAccount = function () {
        $scope.restoreAccountLoader = true;
        UserService.cancelAccountDeletion(function (result) {
          $scope.restoreAccountLoader = false;
          console.log(`Cancel delete response ${JSON.stringify(result)}`);
          if(result.status === "success") {
            console.log("Cancel delete request success");
          }
          else {
            console.log("Cancel delete request failed");
          }
        });
      };

      $scope.finishedSlidesRound = function () {
        $scope.finishedIntro();
      };

      $scope.keyPress = function (evt) {

        if (evt.keyCode === 13 && $scope.openState !== "change-password") { // enter
          switch ($scope.state) {
            case "login":
              $scope.Login.doLogin();
              break;
            case "signup":
              $scope.Signup.submitSignup();
              break;
          }
        }
      };

      $scope.onUsernameBlur = function () {
        $scope.form.wasUsernameValidated = false;
        $scope.form.validateUsername(function(){});
      };

      $scope.onEmailBlur = function () {
        if($scope.state === "signup") {
          $scope.form.wasEmailValidated = false;
          $scope.form.validateEmail();
        }
      };

      $scope.onPasswordBlur = function () {
        if($scope.state === "signup") {
          $scope.form.wasPasswordValidated = false;
          $scope.form.validatePassword(false);
        }
      };

      $scope.onConfirmPasswordBlur = function () {
        $scope.form.wasConfirmPasswordValidated = false;
        $scope.form.validateConfirmPassword();
      };

      $scope.forgotPassword = function () {
        _this.resetFormErrors();
        if($scope.form.email.length === 0){
          $scope.form.wasEmailValidated = true;
          $scope.form.isEmailValid = false;
          $scope.form.emailValidText = ERROR_TEXTS.forgotPassword.required;
        }
        else {
          $scope.form.forgotPasswordInProgress = true;
          UserService.resetPassword($scope.form.email, function (result) {
            $scope.form.forgotPasswordInProgress = false;
            if(result.status === "success"){
              $scope.showMailSent = true;
            }
            else{
              if(result.statusCode === 401){
                $scope.form.wasEmailValidated = true;
                $scope.form.isEmailValid = false;
                $scope.form.emailValidText = ERROR_TEXTS.forgotPassword.notFound;
              }
              else{
                $scope.form.wasEmailValidated = true;
                $scope.form.isEmailValid = false;
                $scope.form.emailValidText = ERROR_TEXTS.forgotPassword.error;
              }
            }
          });
        }
      };

      $scope.$watch("service.isLoggedIn", function (newVal, oldVal) {
        if (!oldVal && newVal == true) {

          if($scope.state !== "signup" && $scope.state !== "verification"){
            if(typeof UserService.verified !== 'undefined' &&
                      UserService.verified !== null &&
                      !UserService.verified &&
                      $rootScope.installAppLoginFlow) {
              return;
            }

            setTimeout(function () {
              $scope.owModal.close();
            }, 0);
            // $scope.$apply();
          }
        }
      });

      $scope.$watch("service.verified", function (newVal) {
        if (typeof newVal !== 'undefined' && newVal !== null) {
          if(newVal && $scope.state === "verification"){
            // $scope.owModal.close();
            // $scope.$apply();
            setTimeout(function () {
              $scope.owModal.close();
            }, 0);
          }
        }
      });

      $scope.$watch("form.email", function (newVal) {
        if(typeof newVal !== 'undefined' && newVal !== null){
          $scope.form.wasEmailValidated = false;
        }
      });

      $scope.$watch("form.username", function (newVal) {
        if(typeof newVal !== 'undefined' && newVal !== null){
          $scope.form.wasUsernameValidated = false;
        }
      });

      $scope.$watch("form.password", function (newVal) {
        if(typeof newVal !== 'undefined' && newVal !== null){
          $scope.form.wasPasswordValidated = false;
        }
      });

      _this.init();

      $scope.$on("$destroy", function() {
        console.log("LOGIN CONTROLLER DESTROYED");
        UserService.removeListener(_this._onLoginStateChanged);
        OverwolfStore.login.onLoginConnectionError.removeListener(_this._onLoginError);
        _observer.disconnect();
      });

    }]);

})(angular);
