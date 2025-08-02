

(function(angular) {
  'use strict';

  angular.module('overwolf')
    .controller('AppModalCtrl',
    ['AppsService', '$scope', '$rootScope', 'GeolocationService',
      'TrackingService', 'UserService', 'ReviewsService', 'GamesService',
      'SubscriptionService', 'SkinsService', 'LogsService', '$location',
      '$timeout', '$sce', '$q',
      function (AppsService, $scope, $rootScope, GeolocationService,
                TrackingService, UserService, ReviewsService, GamesService,
                SubscriptionService, SkinsService, LogsService, $location,
                $timeout, $sce, $q) {
      let _this = this;
      _this.curApp = {};
      _this.curApp.isInstalling = false;
      _this.reviewsPageSize = 5;
      _this.currentPage = 1;
      _this.reviewSubmitInProgress = false;
      _this.gotLastReviewPage = false;
      _this.appType = "";

      _this.subscription = null;

      let _installingTextTimeout = null;

      $scope.userService = UserService;
      $scope.reviews = [];

      _this.init = function() {
        SubscriptionService.events.subscriptionUpdated.register(handleSubscriptionUpdated);
        OverwolfStore.apps.onAppInstalled.addListener(_this.onAppInstalled);
        OverwolfStore.apps.onAppUninstalled.addListener(_this.onAppUninstalled);
        OverwolfStore.skins.onSkinInstalled.addListener(_this.onAppInstalled);
        if (typeof(overwolf) !== 'undefined') {
          overwolf.profile.onLoginStateChanged.addListener(_this.onLoginStateChanged);
        }

        $scope.$on("$destroy", function(){
          OverwolfStore.apps.onAppInstalled.removeListener(_this.onAppInstalled);
          OverwolfStore.apps.onAppUninstalled.removeListener(_this.onAppUninstalled);
          OverwolfStore.skins.onSkinInstalled.removeListener(_this.onAppInstalled);
          if (typeof(overwolf) !== 'undefined') {
            overwolf.profile.onLoginStateChanged.removeListener(_this.onLoginStateChanged);
          }

          $rootScope.appModalLastSlideIndex = -1;

          if($rootScope.webMode) {
            //Modal is closed.change URL to what it was before
            $rootScope.pauseRouting = true; //pause angular router so changing the URL won't affect it.
            window.history.pushState({},"Apps", $scope.oldPath );
            $timeout(function () {
              $rootScope.pauseRouting = false;//in 0.5 seconds, make angular routing work again.
            }, 500);
          }
        });

        if($rootScope.webMode) {
          if(!_this.isOneAppPageUrl()) {
            $rootScope.pauseRouting = true; //pause angular router so changing the URL won't affect it.
            $scope.oldPath = (window.location.pathname.indexOf("/app/") == -1 ? window.location.pathname : '/apps/');
            $location.url(_this.getOneAppDirectUrl());
          }
          else {
            $scope.oldPath = window.loadedOneAppPageCategory.toLowerCase();
          }
        }

        OverwolfStore.getManifestData(result => {
          if(!result.meta || !result.meta.version) {
            return;
          }

          const versionMajor = result.meta.version.split('.')[0];
          if (versionMajor && parseInt(versionMajor) > 157) {
            $rootScope.repliesSupported = true;
          }
        });
      };


      function handleSubscriptionUpdated(subscription) {
          initSubscription(subscription.extid);
      }

      $rootScope.$on("$locationChangeSuccess", function () {
        if(!_this.isOneAppPageUrl()){
          $rootScope.$broadcast("closeAllModals");
        }
      });

      _this.isOneAppPageUrl = function(){
        return /.*\/app\/.*|.*\/skin\/.*|.*\/game\/.*/.test($location.url());
      };

      _this.getOneAppDirectUrl = function(){
        let modalContentUrl = $scope.owModal.getTemplateUrl();
        let baseUrl;
        if(modalContentUrl.indexOf("/skin-editor/") != -1){
          baseUrl = "/skin"
        }
        else if(modalContentUrl.indexOf("/game-editor/") != -1){
          baseUrl = "/game"
        }
        else{
          baseUrl = "/app"
        }

        return baseUrl + modalContentUrl.substring(modalContentUrl.lastIndexOf("/"));
      };

      $scope.onClickClose = function () {
        $scope.owModal.close();
      };

      $rootScope.appModalScope = {
        showSmallSlide: true,
        showLargeSlide: false
      };

      // TODO connect this to slider logic
      $scope.onClickCloseSliderPopUp = function () {
        $rootScope.appModalScope.showLargeSlide = false;
        $rootScope.appModalScope.showSmallSlide = true;

        var popSlider = angular.element(document.getElementsByClassName('big-slider-bg')[0]);
        var appPagePopUp = angular.element(document.getElementsByClassName('app-page')[0]);
        popSlider.removeClass('is-active');
        appPagePopUp.removeClass('hide-me-in-small-screen');
      };

      $scope.openLoginPage = function(openState){
        $rootScope.$broadcast('owModal.open', {
          templateUrl: "templates/login-modal.html",
          container: "login",
          controllerScopeParams: {openState: openState, source: "app"}
        });
      };

      $scope.getNextReviewPage = function(){

        if(_this.gotLastReviewPage){
          return;
        }

        _this.currentPage++;
        ReviewsService.getReviewsForApp(_this.curApp.UID, _this.currentPage, _this.reviewsPageSize).then(function(info){
          _this.curApp.reviews = _this.curApp.reviews.concat(info.comments);
          if(info.comments.length < _this.reviewsPageSize){
            _this.gotLastReviewPage = true;
          }

        });

      };

      _this.setApp = function (appId) {
        _this.appType = "App";
        console.log("SETAPP MODAL CALLED " + appId);

        if (appId == "") {
          console.warn("Received empty app id init call")
          return;
        }
//                $scope.$watch("appsService.apps['" + appId + "']", function(){
//                    if($scope.appsService.apps[appId]) {
//                        $scope.curApp = $scope.appsService.apps[appId];
//                    }
//
//                }, true);

        _this.curApp = {UID: appId};
        let extra = {
          appId: _this.curApp,
        }
        TrackingService.trackEvent("OneApp","Open",null , 1, null, extra, false);
          if (typeof(mixpanel) != 'undefined') {
            let origin = $scope.moreOptions.origin || null;
            mixpanel.track('App_one_page_Initialized', {
              'App ID': appId,
              'Page': origin != null ? origin.page : null,
              'Shelf': origin != null ? origin.shelf : null,
              'Carousel': origin != null ? origin.fromCarousel : null,
              'Platform': window.storePlatform,
              'Source': origin != null ? (origin.shelf ? 'shelf' : (origin.fromCarousel ? 'carousel': 'external'))  : 'external',
            });
          }
        
        AppsService.getAppById(appId, function (app) {
          if(!app.UID){
            app.UID = appId;
          }
          console.log("modal page get app", app);
          _this.curApp = app;
          _this.curApp.isInstalled = (_this.curApp.InstallState == "Installed");

          $rootScope.author = app.Author;
          if(localStorage.deletedReviews && localStorage.deletedReviews[_this.curApp.UID]) {
            _this.deletedReview = localStorage.deletedReviews[_this.curApp.UID];
          }
        });

        initSubscription(appId);

        AppsService.getAppTotalDownloads(appId, function (appDownloads) {
          _this.curApp.totalDownloads = parseInt(appDownloads).toLocaleString('en');

        });

        _this.getAppReviews();
        if(UserService.isLoggedIn) {
          _this.getOwnReview();
        }

        $scope.$watch("userService.isLoggedIn", function(newVal,oldVal){
          if (typeof newVal !== 'undefined' && newVal !== null && newVal !== oldVal) {
            _readyForInstallation(newVal);

            if ((newVal === false) &&
              ($scope.moreOptions &&
                $scope.moreOptions.section === "subscriptions")) {
              $rootScope.$broadcast("closeAllModals");
            }
          }
        });

        $scope.$watch("userService.verified", function(newVal,oldVal){
          if (typeof newVal !== 'undefined' && newVal !== null && newVal !== oldVal) {
            _readyForInstallation(newVal);
          }
        });

        function _readyForInstallation(newVal) {
          if (newVal) {
            _this.getOwnReview();

            if($rootScope.appWaitingForVerification &&
              $rootScope.appWaitingForVerification === _this.curApp.UID ||
              $rootScope.oneappWaitingForLogin &&
              $rootScope.oneappWaitingForLogin === _this.curApp.UID
            ){
              console.log("app " + _this.curApp.UID + " was waiting for" +
                " verification or login, installing");
              $rootScope.appWaitingForVerification = null;
              $rootScope.oneappWaitingForLogin = null;
              $scope.owModal.unHide();
              setTimeout(function () {
                _this.installApp();
              }, 500);
            }

            if($scope.skinWaitingForVerification &&
              $scope.skinWaitingForVerification === _this.curApp.UID ||
              $scope.oneskinWaitingForLogin &&
              $scope.oneskinWaitingForLogin === _this.curApp.UID){

              console.log("skin " + _this.curApp.UID + " was waiting for" +
                " verification or login, installing");

              $scope.skinWaitingForVerification = null;
              $scope.oneskinWaitingForLogin = null;
              $scope.owModal.unHide();
              setTimeout(function () {
                _this.installSkin();
              }, 500);
            }

          }
          else {
            delete _this.myReview;
          }
        }

      };

      function initSubscription(appId){
        if (!$rootScope.isInOwClient) {
          return;
        }

        var subscription = null;
        SubscriptionService.getPlans(appId)
          .then(function(plans) {
            if (!plans || !plans.length) {
              return;
            }

            subscription = {
              plans: plans,
            };
          })
          .then(function() {
            return SubscriptionService.getActiveSubscriptionByExtensionId(appId);
          })
          .then(function (data) {
            if (data) {
              subscription.activeSubscription = data;
            }

            _this.subscription = subscription;

            // in case we were asked to open another section from outside the
            // store
            if ($scope.moreOptions) {
              if ($scope.moreOptions.section !== "subscriptions") {
                _this.trackSubscribeButtonView();
              }

              if ($scope.moreOptions.section === "subscriptions") {
                setTimeout(function () {
                  _this.openSubscriptionPage();
                }, 100);
              }

              if ($scope.moreOptions.section === "reviews") {
                if ($scope.moreOptions.extra && $scope.moreOptions.extra.id) {
                  _this.getAppReview($scope.moreOptions.extra.id);
                }

                setTimeout(function () {
                  $scope.owModal.openReviews();
                }, 100);
              }
            }
          })
          .catch(function (e) {
            console.error('error initializing subscription data: ' + e.message);
          });
      }

      _this.trackSubscribeButtonView = function() {
        if (
          _this.subscription &&
          _this.curApp.isInstalled &&
          !_this.subscription.activeSubscription
        ) {
          var extra = {
            app_id: _this.curApp.UID,
            in_app: false
          };
          
          TrackingService.trackEvent(
            "subscription_view",
            null,
            null,
            1,
            null,
            extra
          );
        }
      };

      _this.onLoginStateChanged = function(loginInfo) {
        if (_this.curApp.UID) {
          initSubscription(_this.curApp.UID)
        }
      };

      _this.onAppInstalled = function(appInfo){
        if(appInfo.uid == _this.curApp.UID){
          _this.curApp.isInstalling = false;
          _this.curApp.isInstalled = true;

          let reviewsStorage = {
            reviewScore: _this.curApp.reviewScore,
            reviewScoreForCssClass:_this.curApp.reviewScoreForCssClass,
            totalNumOfReviews: _this.curApp.totalNumOfReviews,
            reviews: _this.curApp.reviews
          };

          AppsService.getAppById(appInfo.uid, function(app){
            _this.curApp = app;
            // HACK(sabraham): apps should be updated by now, but they are not.
            // the items in the apps array should always be kept up to date...
            _this.curApp.isInstalled = true;
            angular.extend(_this.curApp, reviewsStorage);
            $scope.$apply();
            _this.trackSubscribeButtonView();
          });
        }
      };

      _this.onAppUninstalled = function(appInfo){
        if (appInfo.uid != _this.curApp.UID) {
          return;
        }

        _this.curApp.isInstalling = false;
        _this.curApp.isInstalled = false;
        $scope.$apply();
      };

      _this.getAppReviews = function(){
        ReviewsService.getReviewsForApp(_this.curApp.UID, 1, _this.reviewsPageSize).then(function(info){

          _this.curApp.reviewScore = info.average_score;
          _this.curApp.reviewScoreForCssClass = info.average_score.toString().replace(".","-");
          _this.curApp.totalNumOfReviews = info.rate_count + "\uFEFF"; //adding byte-order mark white space character because ng-hide considers 0 (even string) as false.
          _this.curApp.reviews = $scope.reviews.concat(info.comments);
          if(info.comments.length < _this.reviewsPageSize){
            _this.gotLastReviewPage = true;
          }

        });
      };

      _this.getAppReview = function(commentId){
        ReviewsService.getReviewForApp(_this.curApp.UID, commentId).then(function(info){
          if (info.success) {
            _this.curApp.reviews.unshift(info.comment);
          }
        });
      };

      _this.getOwnReview = function(){

        ReviewsService.getOwnReview(_this.curApp.UID, UserService.token).then(
          function(info){
            _this.myReview = info;
            _this.originalReview = angular.copy(info);
            _this.editMode = false;
            _this.myReview.safeText = $sce.trustAsHtml(_this.myReview.text);
          },
          function(info){//fail
            _this.editMode = true;
          }
        );
      };

      _this.openOtherApp = function (newAppUrl) {
        let extra = {
          appUrl: newAppUrl
        }

        TrackingService.trackEvent("OneApp","Open",null, null, null, extra, false);
        $rootScope.$broadcast('owModal.open', {
          templateUrl: newAppUrl,
          container: "app"
        });
      };

      _this.launchApp = function () {
        AppsService.launchApp(_this.curApp.UID);
      };

      _this.resetInstallError = function(){
        AppsService.resetInstallError(_this.curApp.UID);
      };

      _this.openSubscriptionPage = function () {
        _this.verifyEmailIfNeeded(_this.openSubscriptionPageCallback);
      };

      _this.openSubscriptionPageCallback = function(verified) {
        if (!verified) return;
        $rootScope.$broadcast('owModal.open', {
          templateUrl: "templates/subscription-modal.html",
          container: "subscription",
          controllerScopeParams: {
            appId: _this.curApp.UID,
            appName: _this.curApp.Name,
            activeSubscription: _this.subscription.activeSubscription,
            plans: _this.subscription.plans,
          }
        });
      };

      _this.manageSubscriptions = () => {
        location.href = 'overwolf://settings/subscriptions';
      };

      _this.installApp = function () {
        console.log("Trying to install app " + _this.curApp.UID +
          "from app modal");

        _installingTextTimeout = setTimeout(function () {
          _this.curApp.isInstalling = true;
        }, 500);

        let extra = {
          appId: _this.curApp.UID,
        }
        TrackingService.trackEvent("App","Install", null, 0,"modal", extra, false);
        $rootScope.$broadcast("appInstallStarted", _this.curApp.UID);

        let origin = $scope.moreOptions != null ? $scope.moreOptions.origin : null;
        AppsService.installApp(_this.curApp.UID, function (result) {
          console.log("Install app result " + JSON.stringify(result));
          clearTimeout(_installingTextTimeout);
          _this.curApp.isInstalling = false;
          if(result.status !== "success") {

            if (result.error === "Extension already installed.") {
              _this.curApp.isInstalled = true;
              _this.curApp.isUninstalling = false;
              _this.curApp.IsCurrentlyInDock = true;
              return;
            }

            $rootScope.$broadcast("appInstallFailed", _this.curApp.UID);
            _this.curApp.isInstalled = false;
            _this.curApp.isUninstalling = false;
            _this.curApp.IsCurrentlyInDock = false;

            if (result.error === "Not signed in.") {
              console.log("Not logged in - opening log in window");
              $rootScope.installAppLoginFlow = true;
              $rootScope.oneappWaitingForLogin = _this.curApp.UID;
              $scope.openLoginPage("login");

            }

            if (result.error === "Unverified") {
              console.log("Not verified - opening log in window");
              $rootScope.installAppLoginFlow = true;
              $scope.appWaitingForVerification = _this.curApp.UID;
              $scope.openLoginPage("verification");
            }

            if (result.error === "Suspended") {
              $rootScope.$broadcast('owModal.open', {
                templateUrl: "templates/login-modal.html",
                container: "login",
                strictClose: true,
                controllerScopeParams: {openState: "suspended", source: "welcome"}
              });
            }
          } else {
            _this.curApp.isInstalled = true;
            _this.curApp.isUninstalling = false;
            _this.curApp.IsCurrentlyInDock = true;
          }
        },
        origin);
      };

      _this.uninstallApp = function () {
        let appId = _this.curApp.UID;
        let appVersion = _this.curApp.Version;
        _this.curApp.isUninstalling = true;
        $rootScope.$broadcast("appUninstallStarted", appId);
        let extra = {
          appId,
          appVersion
        }
        TrackingService.trackEvent("App", "Uninstall", null, null, null, extra);
        OverwolfStore.apps.uninstallApp(appId, function (result) {
          console.log("Install app callback", result);
          // (fake the) wait for animation of the dock icon
          setTimeout(function () {
            if (result.status == "success") {
              _this.curApp.isInstalled = false;
              _this.curApp.isUninstalling = false;
              _this.curApp.isInstalling = false;
              _this.curApp.IsCurrentlyInDock = false;
            }
          }, 3000);
        });
        console.log("uninstalling ", appId);
      };

      _this.removeAppFromDock = function() {
        let appId = _this.curApp.UID;
        console.log("Remove from dock called", appId);
        AppsService.removeFromDock(appId, function(result){
          _this.curApp.IsCurrentlyInDock = false;
          console.log("remove app ", appId, "from dock. result:", result);
        });
      };

      _this.addAppToDock = function(){
        let appId = _this.curApp.UID;
        AppsService.addToDock(appId, function(result){
          _this.curApp.IsCurrentlyInDock = true;
          console.log("remove app ", appId, "from dock. result:", result);
        });
      };

      _this.desktopShortCutSupported = function(){
        return AppsService.desktopShortCutSupported(_this.curApp);
      };

      _this.hasDesktopShortcuts = function(){
        return AppsService.hasDesktopShortcuts(_this.curApp);
      };

      _this.addDesktopShortcut = function() {
        let appId = _this.curApp.UID;
        AppsService.addDesktopShortcut(appId);
      };

      _this.removeDesktopShortcut = function(){
        let appId = _this.curApp.UID;
        AppsService.removeDesktopShortcut(appId);
      };

      _this.openGamePageUrl = function (linkObj) {
        GeolocationService.openLinkAccordingToLocation(linkObj);
      };

      _this.sendReview = function(event){
        _this.reviewSubmitInProgress = true;
        let eventCustomField = (_this.myReview.text ? "with_text": "stars_only");
        let extra = {
          appId: _this.curApp.UID,
        }

        TrackingService.trackEvent("Review","Submit", null, 0,eventCustomField, extra);

        ReviewsService.save(_this.myReview, _this.curApp.UID, UserService.token)
          .then(function(info){
            _this.editMode = false;
            _this.reviewSubmitInProgress = false;
            _this.getAppReviews();

            if (_this.myReview.stars <= 5) {
              LogsService.
              getUrlForLogSending(UserService.username, _this.curApp.UID).then(function(result) {
                OverwolfStore.sendLogs(result.SendUrl, result.LogId + '');
                ReviewsService.addLog(result.LogId, _this.curApp.UID, UserService.token);
              });
            }
          });
      };

      _this.clearReview = function(event){
        if(_this.originalReview){
          _this.myReview = angular.copy(_this.originalReview);
          _this.editMode = false;
        }
        else {
          _this.myReview = {};
        }
      };

      _this.editMyReview = function(event){
        _this.editMode = true;
      };

      _this.deleteMyReview = function(event){

        if(!localStorage.deletedReviews){
          localStorage.deletedReviews = {}
        }
        _this.deletedReview = angular.copy(_this.myReview);

      };

      _this.forgetMyReview = function(event){
        ReviewsService.remove(_this.curApp.UID,UserService.token).then(function(){

          delete _this.deletedReview ;
          _this.myReview = {};
          _this.editMode = true;
        })
      };

      _this.restoreMyReview = function(){
        _this.myReview = angular.copy(_this.deletedReview) ;
        delete _this.deletedReview ;
      };

      _this.setGame = function (gameId) {
        GamesService.getGameById(gameId, function(gameInfo){
          _this.curGame = gameInfo;
          console.log("got game", _this.curGame);
        })
      };

      $scope.launchGame = function(){
        console.log("Launching game", _this.curGame);
        OverwolfStore.games.launchGame(_this.curGame.GameId, function(info){
          console.log("launch game result", info);
        })
      };

      _this.shouldShowDownloads = function(){
        return !angular.isUndefined(_this.curApp.totalDownloads)
      };

      /**************************************SKINS***************************************/
      //TODO: Move this to skin modal controller instead of hijacking app-modal which is fugly

      _this.setSkin = function (skinId) {
        _this.appType = "Skin";
        console.log("SETSkin MODAL CALLED");

        if (skinId == "") {
          console.warn("Received empty skin id init call")
          return;
        }
//                $scope.$watch("appsService.apps['" + appId + "']", function(){
//                    if($scope.appsService.apps[appId]) {
//                        $scope.curApp = $scope.appsService.apps[appId];
//                    }
//
//                }, true);
        _this.curApp = {UID: skinId};
        let extra = {
          skinId: _this.curApp.UID,
        }
        TrackingService.trackEvent("OneSkin", "Open", null, 1, null, extra, false);
        SkinsService.getSkinById(skinId, function (skin) {
          _this.curApp = skin;
          _this.curApp.isInstalled = (_this.curApp.InstallState == "Installed");

          if (localStorage.deletedReviews && localStorage.deletedReviews[_this.curApp.UID]) {
            _this.deletedReview = localStorage.deletedReviews[_this.curApp.UID];
          }
        });

        SkinsService.getItemTotalDownloads(skinId, function (appDownloads) {
          _this.curApp.totalDownloads = parseInt(appDownloads).toLocaleString('en');

        });

        _this.getAppReviews();
        if(UserService.isLoggedIn) {
          _this.getOwnReview();
        }
      };

      _this.launchSkin = function () {
        SkinsService.launchSkin(_this.curApp.UID);
      };

      _this.installSkin = function () {
        _this.curApp.isInstalling = true;
        _this.curApp.isUninstalling = false;
        let extra = {
          skinId: _this.curApp.UID,
        }

        TrackingService.trackEvent("Skin","Install", null, 0,"modal", extra, false);
        SkinsService.installSkin(_this.curApp.UID, function (result) {
          console.log("Install skin callback", result);
          _this.curApp.isInstalling = false;
          if (result.status === "success") {
            _this.curApp.isInstalled = true;
          }
          else{
            if(result.error === "Not signed in."){
              $rootScope.installAppLoginFlow = true;
              $rootScope.oneskinWaitingForLogin = _this.curApp.UID;
              $scope.openLoginPage("login");
            }
            else if(result.error === "Unverified"){
              $rootScope.installAppLoginFlow = true;
              $scope.skinWaitingForVerification = _this.curApp.UID;
              $scope.openLoginPage("verification");
            }
          }
        });
      };

      _this.uninstallSkin = function () {
        _this.curApp.isInstalling = false;
        _this.curApp.isUninstalling = true;
        let extra = {
          skinId: _this.curApp.UID,
        }
        TrackingService.trackEvent("Skin","Uninstall", null, 0,"modal", extra, false);
        SkinsService.unInstallSkin(_this.curApp.UID, function (result) {
          console.log("Install skin callback", result);
          // (fake the) wait for animation of the dock icon
          setTimeout(function () {
            if (result.status == "success") {
              _this.curApp.isInstalled = false;
              _this.curApp.isInstalling = false;
              _this.curApp.isUninstalling = false;
            }
          }, 3000);
        });
      };


      //web install
      _this.webAppInstall = function(appId, appName){
        let extra = {
          appId: _this.curApp.UID,
        }
        
        TrackingService.trackEvent(_this.appType,"Install",null, 0,"modal" ,extra );
        AppsService.webAppInstall(appId,appName, function(){
          $scope.owModal.hide();
          $scope.$on("download-modal-dismissed", function(){
            $scope.owModal.unHide();
          })
        });

      };

      $rootScope.$on("showAppModal", function () {
        $scope.owModal.unHide();
      });

      $rootScope.$on("closeAppModal", function () {
        $scope.appWaitingForLogin = null;
        $scope.skinWaitingForLogin = null;
        $scope.owModal.close();
      });

      _this.verifyEmailIfNeeded = function(callback) {
        let verified = true;
        overwolfInternal.profile.getCurrentUser((res) => {
          if (res.status !== "success") {
            callback(verified)
          }

          if (res.profile.unverified) {
            verified = false;
            $scope.showResendAnimation = false;
            UserService.resendVerification(UserService.email, function (result) {
              $rootScope.$broadcast('owModal.open', {
                templateUrl: "templates/login-modal.html",
                container: "login",
                controllerScopeParams: { openState: "verification", source: "welcome" }
              });
            });
          }

          callback(verified);
        });
      }

      _this.init();

    }]);

})(angular);
