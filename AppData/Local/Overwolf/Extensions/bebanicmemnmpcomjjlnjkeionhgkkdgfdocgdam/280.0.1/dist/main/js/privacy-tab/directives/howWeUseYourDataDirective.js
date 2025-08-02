angular.module('PrivacyControlPanel')
  .directive('owHowWeUseYourData', function() {
    return {
      restrict: 'A',
      templateUrl: 'templates/how-we-use-your-data.html'
    };
  });
