(function (angular) {
  'use strict';

  angular.module('overwolf')
    .service('FtueSlidesService', function ($rootScope, $http, $q, ngProgress) {

      this.ftueSlidesShown = function () {
        var localStorageValue = localStorage['ftueSlidesShown'];
        var forceShowFtueSlides = localStorage['forceShowFtueSlides'];

        if(forceShowFtueSlides === "true"){
          return false;
        }

        var result =
          (angular.isDefined(localStorageValue) &&
          (localStorageValue !== 'false'));
        return result;
      };

      this.setFtueSlidesShown = function (value) {
        localStorage['ftueSlidesShown'] = value;
      }
    });

})(angular);