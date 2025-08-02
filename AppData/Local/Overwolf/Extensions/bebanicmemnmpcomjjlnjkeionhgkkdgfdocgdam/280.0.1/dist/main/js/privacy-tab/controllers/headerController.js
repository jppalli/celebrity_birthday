angular.module('PrivacyControlPanel')
  .controller('HeaderController', function($scope) {

    const WINDOW_ID = 'index';

    let _currentWindow;

    overwolf.windows.getCurrentWindow(function(result) {
      if (result.status === 'success') {
        _currentWindow = result.window;
      }
    });

    $scope.closeApp = function () {
      overwolf.windows.close(_currentWindow.id);
    }
  });
