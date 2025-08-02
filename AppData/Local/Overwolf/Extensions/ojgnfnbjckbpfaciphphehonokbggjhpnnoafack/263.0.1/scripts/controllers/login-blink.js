(function (angular) {
  'use strict';

  angular.module('overwolf')
    .controller('BlinkController',['$scope', '$rootScope', function ($scope, $rootScope) {

      const FIRST_BLINK_TIME_IN_MS = 8000;
      const BLINK_WAIT_MIN = 8000;
      const BLINK_WAIT_MAX = 14000;

      $scope.isBlink = false;
      $scope.isOuch = false;

      let _blinkTimeout = null;

      function startBlinking() {
        // Start blinking after 8 seconds
        // Then, every 8-14 seconds

        _startBlinkTimeout(FIRST_BLINK_TIME_IN_MS)
      }

      function stopBlinking() {
        if (_blinkTimeout) {
          clearTimeout(_blinkTimeout);
        }
      }

      function _startBlinkTimeout(time) {
        _blinkTimeout = setTimeout(() => {
          _blinkAndContinue();
        }, time);
      }

      function _blinkAndContinue(isOuch) {
        clearTimeout(_blinkTimeout);

        _blink(isOuch);

        // Blink again after random time
        _startBlinkTimeout(BLINK_WAIT_MIN + (BLINK_WAIT_MAX - BLINK_WAIT_MIN) *
          Math.random());
      }

      function _blink(isOuch) {
        $scope.isBlink = true;
        if (isOuch) {
          $scope.isOuch = true;
        }
        else {
          $scope.$apply();
        }

        setTimeout(() => {
          $scope.isBlink = false;
          $scope.isOuch = false;
          $scope.$apply();
        }, 0.15 * 1000);
      }

      $scope.blinkAndContinue = _blinkAndContinue;

      $rootScope.$on("startBlinking", startBlinking);
      $rootScope.$on("stopBlinking", stopBlinking);

    }]);
})(angular);
