(function (angular) {
  'use strict';

  angular.module('overwolf')
    .controller('SkinsController', ['$scope', '$rootScope', '$attrs', 'SkinsService', 'GeolocationService', 'UserService', 'TrackingService',
      function ($scope, $rootScope, $attrs,
        SkinsService, GeolocationService,
        UserService, TrackingService) {
        var _this = this;

        $scope.curSkin = {};
        $scope.curSkin.isInstalling = false;
        $scope.userService = UserService;

        _this.init = function () {
          $scope.$on("ItemsUpdated", function () {

            SkinsService.getSkinById($scope.curSkin.UID, function (skin) {
              $scope.curSkin = skin;
              $scope.curSkin.isInstalled = ($scope.curSkin.InstallState == "Installed");
            });
          })
        };

        $scope.setSkin = function (uid, appFilterObj, skinInfo) {

          $scope.curSkin.UID = uid;
          if (skinInfo) {//check if exists for backwards compatibility
            $scope.curSkin.appName = skinInfo.title;
          }

          SkinsService.getSkinById(uid, function (skin) {
            $scope.curSkin = skin;
            $scope.curSkin.isInstalled = ($scope.curSkin.InstallState == "Installed");

            SkinsService.getItemTotalDownloads(uid, function (skinDownloads) {
              $scope.curSkin.totalDownloads = parseInt(skinDownloads).toLocaleString('en') + " ";
              //$scope.$apply();
            })
          });


        };

        $scope.installSkin = function () {
          console.log("installing", $scope.curSkin);
          $scope.curSkin.isInstalling = true;
          let extra = {
            skinId: $scope.curSkin.UID
          }

          TrackingService.trackEvent("Skin", "Install", null, 0, "tile", extra, false);
          SkinsService.installSkin($scope.curSkin.UID, function (result) {
            if (result.status === "success") {
              $scope.curSkin.isInstalled = true;

            }
            else {
              if (result.error === "Not signed in.") {
                $rootScope.installAppLoginFlow = true;
                $scope.skinWaitingForLogin = $scope.curSkin.UID;
                _this.openLoginPage("login");
              }
              else if (result.error === "Unverified") {
                $rootScope.installAppLoginFlow = true;
                $scope.skinWaitingForVerification = $scope.curSkin.UID;
                _this.openLoginPage("verification");
              }
            }
            $scope.$digest();
            $scope.curSkin.isInstalling = false;
          });
        };

        $scope.launchSkin = function () {
          SkinsService.launchSkin($scope.curSkin.UID);
        };

        $scope.web_installApp = function () {
          let extra = {
            skinId: $scope.curSkin.UID,
          }
          TrackingService.trackEvent("Skin", "Web_Install", null, 0, "tile", extra);
          SkinsService.webAppInstall($scope.curSkin.UID, $scope.curSkin.appName);
        };

        _this.openLoginPage = function openLoginPage(openState) {
          $rootScope.$broadcast('owModal.open', {
            templateUrl: "templates/login-modal.html",
            container: "login",
            controllerScopeParams: { openState: openState, source: "app" }
          });
        };

        _this.init();

        $scope.$watch("userService.isLoggedIn", function (newVal, oldVal) {
          if (typeof newVal !== 'undefined' && newVal !== null) {
            _readyForInstall(newVal);
          }
        });

        $scope.$watch("userService.verified", function (newVal, oldVal) {
          if (typeof newVal !== 'undefined' && newVal !== null) {
            _readyForInstall(newVal);
          }
        });

        function _readyForInstall(newVal) {
          if (newVal) {
            if ($scope.skinWaitingForVerification && $scope.skinWaitingForVerification === $scope.curSkin.UID) {
              $scope.skinWaitingForVerification = null;
              $scope.installSkin();
            }

            if ($scope.skinWaitingForLogin && $scope.skinWaitingForLogin === $scope.curSkin.UID) {
              $scope.skinWaitingForLogin = null;
              $scope.installSkin();
            }
          }
        }

        $rootScope.$on("closeAppModal", function () {
          $scope.skinWaitingForLogin = null;
          $scope.skinWaitingForVerification = null;
        });
      }
    ])
})(angular);
