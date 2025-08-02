angular.module('PrivacyControlPanel')
  .directive('owModal', function() {
    return {
      restrict: 'A',
      templateUrl: 'templates/modal.html'
    };
  });