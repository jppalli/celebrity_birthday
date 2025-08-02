/**
 * Created by Yoske on 09/11/2014.
 */
(function (angular) {
  'use strict';

  angular.module('overwolf')
    .controller('ErrorController', [
      '$scope', '$rootScope', 'ErrorMessagesService', '$timeout', '$sce',
      function ($scope, $rootScope, ErrorMessagesService, $timeout, $sce) {
      var _this = this;
      var currentError;
      var hasPendingUserAction = false;

      $rootScope.hasError = false;
      $scope.errorButtons = {};

      _this.init = function () {

        OverwolfStore.onShowErrorMessage.addListener(showError);

        $rootScope.$on("errorOccurred", function (evt, args) {
          showError(args);
        });
      };

      function showError(errorInfo) {
        $rootScope.$broadcast("closeAllModals");
        currentError = errorInfo;
        var buttons = errorInfo.buttons;
        var error = ErrorMessagesService.getError(errorInfo.error);

        if (buttons) {
          $scope.errorButtons = {};
          for (var i = 0; i < buttons.length; i++) {
            $scope.errorButtons[buttons[i]] = true;
          }
        }

        $scope.errorMessage = $sce.trustAsHtml(error.message);
        $scope.errorDescription = error.description;
        $rootScope.hasError = true;
      }

      $rootScope.$on("$routeChangeSuccess", function () {
        if (currentError && (currentError.error == "__MSG_NoConnection__" || currentError.error == "__MSG_404_PageNotFound__")) {
          $rootScope.hasError = false;
        }

      });


      //Dock waiting

      OverwolfStore.onDockConnectionStateChanged.addListener(function (status) {
        console.log("dock conn state " + status);
        if (status.connectionState == "Connected") {
          $("*").css("cursor", "")
        }
        if (currentError && currentError.code == "__MSG_DockLaunchError__") {
          $rootScope.hasError = false;
        }
      })

      $rootScope.$on("UserActionStarted", function () {
        OverwolfStore.getDockConnectionState(function (status) {
          if (status.connectionState != "Connected") {
            console.log("User action initiated but not connected to dock. Waiting for dock connection");
            $("*").css("cursor", "progress")
          }
        });
      })
      //
      //            $rootScope.$on("UserActionCompleted", function(){
      //                hasPendingUserAction = true;
      //            })

      _this.init();

      $scope.retry = function () {
        $rootScope.hasError = false;
        currentError = null;

        OverwolfStore.shutDownOverwolf(false);
      }

    }]);

})(angular);