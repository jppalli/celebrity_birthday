angular.module('PrivacyControlPanel')
  .controller('AccountController', function($scope, $rootScope, AccountService) {

    PrivacyUtils.initScrollIntoView("account");

    const STATES = {
      loggedOut: "loggedOut",
      loggedIn: "loggedIn",
      unverified: "unverified"
    };

    let _loaded = false;

    $scope.state = STATES.loggedOut;
    $scope.isProcessingData = false;

    $scope.processingfulldate = "";
    $scope.processingday = "";
    $scope.processingmonth = "";
    $scope.processingyear = "";

    $scope.form = {
      sendUpdates: true,
      account: {
        username: "",
        email: "",
        avatar: ""
      }
    };

    $scope.requestDataError = false;
    $scope.deleteError = false;
    $scope.emailOptionsError = false;

    AccountService.onLoginStateChanged(_onLoginStateChanged);
    AccountService.onUserProfileChanged("accountController", _onUserProfileChanged);
    AccountService.getCurrentUser(_setCurrentUser);

    $scope.openLogin = function () {
      AccountService.openLoginDialog();
    };

    $scope.switchAccounts = function () {
      AccountService.doLogout(function (result) {
        if(result.status === "success") {
          AccountService.openLoginDialog();
        }
      });
    };

    $scope.showModal = function (type) {
      $rootScope.$broadcast("showModal", type);
    };

    $scope.onClickSendVerificationEmail = function () {
      AccountService.resendVerification();
    };

    $scope.$watch("form.sendUpdates", function (newVal) {
      if(typeof newVal === 'undefined' || newVal === null) {
        return;
      }

      if(!_loaded){
        _loaded = true;
        return;
      }

      if ($scope.state !== STATES.loggedIn) {
        return;
      }

      _updateEmailOptions(newVal);
    });

    $rootScope.$on("requestAccountDataSent", function (evt, result) {
      if(result.success) {
        _checkRequestAccountDataInProgress(result.date, true);
      }
      else {
        $scope.requestDataError = true;
        document.getElementById("request-data__error").scrollIntoView({behavior: "smooth"});
      }
    });

    $rootScope.$on("deleteAccountSent", function (evt, result) {
      if(result.success) {
        AccountService.doLogout(function (result) {
          console.log(`[ACCOUNT CONTROLLER] log out after delete account request: ` +
            `${JSON.stringify(result)}`);
        });
      }
      else {
        $scope.deleteError = true;
        _bringElementIntoViewOverTime("delete-account__error");
      }
    });

    function _bringElementIntoViewOverTime(elementId) {
      let errorElement = document.getElementById(elementId);
      let interval = setInterval(() => {
        errorElement.scrollIntoView(true);
      }, 1000 / 60.0);
      setTimeout(() => { clearInterval(interval); }, 300);  // 300: transition is .3s
    }

    function _setState(newState) {
      $scope.state = newState;
      $scope.$apply();
    }

    function _setCurrentUser(profile) {
      if(profile.status === "success" && !profile.suspended) {
        $scope.form.account.username = profile.username;
        $scope.form.account.nickname = profile.nickname;
        $scope.form.account.avatar = profile.avatar;
        $scope.form.account.email = profile.email;
        $scope.form.sendUpdates = !profile.dontSendMarketingMails;

        // checks localstorage for saved date
        _checkRequestAccountDataInProgress(null, false);

        if(profile.unverified) {
          _setState(STATES.unverified);
        }
        else {
          _setState(STATES.loggedIn);
        }
      }
      else{
        _resetUI();
        _setState(STATES.loggedOut);
      }
    }

    function _onLoginStateChanged(event) {
      console.log(`[ACCOUNT CONTROLLER] Login state changed: ${JSON.stringify(event)}`);
      if(event.status === "success" && event.connectionState === "Online") {
        AccountService.getCurrentUser(_setCurrentUser);
      }
      else {
        _resetUI();
        _setState(STATES.loggedOut);
      }
    }

    function _onUserProfileChanged(event) {
      console.log(`[ACCOUNT CONTROLLER] user profile changed: ${JSON.stringify(event)}`);
      if(event.profile) {
        let profile = event.profile;
        profile.status = event.status;
        _setCurrentUser(profile);
      }
    }

    function _checkRequestAccountDataInProgress(date, setScope) {
      let future;

      if(date) {
        future = date;
      }
      else {
        let millis = localStorage.getItem("expectedUntil");
        let now = Date.now();
        if(millis && now < parseInt(millis)) {
          future = new Date(parseInt(millis));
        }
        else if(setScope) {
          future = new Date();
          future = new Date(future.setDate(future.getDate() + 30));
        }
      }

      if(!future) {
        return;
      }

      localStorage["expectedUntil"] = future.getTime();

      let day = future.getDate();
      let month = future.getMonth() + 1;
      let year = future.getFullYear();
      $scope.processingfulldate = `${day}.${month}.${year}`;
      $scope.processingday = day;
      $scope.processingmonth = month;
      $scope.processingyear = year;
      $scope.isProcessingData = true;
      document.getElementById("processing-data").scrollIntoView({behavior: "smooth"});
    }

    function _updateEmailOptions() {
      $scope.emailOptionsError = false;
      AccountService.updateSendUpdates($scope.form.sendUpdates, function (result) {
        if(result.status !== 200) {
          $scope.emailOptionsError = true;
        }

        console.log(`[ACCOUNT CONTROLLER] send updates response: ${result.statusText}`);
      });
    }

    function _resetUI() {
      localStorage.removeItem("expectedUntil");
      $scope.isProcessingData = false;
      $scope.form = {
        sendUpdates: true,
        account: {
          username: "",
          email: "",
          avatar: ""
        }
      };
      $scope.requestDataError = false;
      $scope.deleteError = false;
      $scope.emailOptionsError = false;
    }

  });
