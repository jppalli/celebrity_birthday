(function (angular) {
  'use strict';

  angular.module('overwolf')
    .controller('UserController', ['$scope', 'UserService', '$rootScope', 'TrackingService',
      function ($scope, UserService, $rootScope, TrackingService) {
      let _this = this;
        _this.initialized = false;
      /* we're using a service for user because the login button and the avatar button are seperate LI elements
       that use the controller. Meaning angular creates two separate scopes. The service is used to communicate
       and propagate changes between both controller scopes. */
      $scope.service = UserService;
      $scope.loginError = false;

      $scope.$watch("service.isLoggedIn", function (oldVal, newVal, scope) {
        $scope.isLoggedIn = oldVal;
        if (oldVal) {
          // console.log(`updateScopeInfoFromService from isLoggedIn`);
          // updateScopeInfoFromService();
        }
      });

      // $scope.$watch("service.displayName", updateScopeInfoFromService);
      // $scope.$watch("service.email", updateScopeInfoFromService);
      // $scope.$watch("service.avatar", updateScopeInfoFromService);
      // $scope.$watch("service.verified", updateScopeInfoFromService);

      $rootScope.$on("userDataChanged", updateScopeInfoFromService);

      function updateScopeInfoFromService() {
        $scope.$apply(updateUserDetails);
      }

      function updateUserDetails() {
        $scope.username = UserService.username;
        $scope.email = UserService.email;
        $scope.avatar = UserService.avatar;
        $scope.displayName = UserService.displayName;
        // Not showing the welcome tooltip for the first time user sign in
        // edit-profile-tooltip is show instead.
        if (localStorage["FirstLogin"] == "false") {
          showWelcomeTooltip();
        }
      }

      function showWelcomeTooltip() {
        if (!UserService.userAction) {
          return;
        }

        if (UserService.newUser) {
          $scope.welcomeTooltipTitle = 'Welcome ' + UserService.displayName + '!';
          $scope.welcomeTooltipText = 'Your account was created';
        } else {
          $scope.welcomeTooltipTitle = 'Hi ' + UserService.displayName + '!';
          $scope.welcomeTooltipText = 'Welcome back';
        }

        $scope.welcomeTooltipActive = true;
        UserService.clearUserAction();
        setTimeout(function () {
          $scope.welcomeTooltipActive = false;
        }, 7000);
      }

      $scope.logOut = function () {
        TrackingService.trackEvent("User", "signout", null);
        UserService.logout();
      };

      $scope.manageUserAccount = function () {
        OverwolfStore.login.openProfileEditor();
      };

    }]);

})(angular);