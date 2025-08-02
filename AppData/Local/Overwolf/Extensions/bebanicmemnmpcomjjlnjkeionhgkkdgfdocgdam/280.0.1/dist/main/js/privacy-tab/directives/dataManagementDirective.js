angular.module('PrivacyControlPanel')
  .directive('owDataManagement', function($timeout, AccountService) {
    return {      
      restrict: 'A',
      templateUrl: 'templates/data-management.html',
      link: function($scope, element) {

        // We only show the "Data Manage" section if the user doesn't have the 
        // "no-cmp" experiment parameter (Iteration 141).
        // We use a negation (no-cmp instead of show-cmp) in order to be 
        // backwards compatible - i.e. users that already saw the CMP button 
        // will still have it
        $scope.showCmp = false;

        // Since this is one of the least common pages (privacy) - we want to 
        // delay the request to Overwolf's APIs and thus allow other, more 
        // common pages to receive an API reply faster (since we are limited by
        // the amount of concurrent APIs called)
        $timeout(() => {
          AccountService.getCurrentUserPublic(profile => {
            if (!profile.parameters) {
              return;
            }

            const hideCmp = profile.parameters.hasOwnProperty("no-cmp");
            $scope.showCmp = !hideCmp;
            $scope.$apply();
          });
        }, 100);

        function openCmpWindow() {
          overwolf.windows.obtainDeclaredWindow("cmp", result => {
            if (result.status != "success") {
              console.error("Failed to open cmp: " + JSON.stringify(result));
              return;
            }

            overwolf.windows.restore("cmp");
          });
        }

        $scope.openDataManage = function() {          
          // NOTE(twolf): This is just in case our cmp is stuck opened
          overwolf.windows.close("cmp", () => {
            setTimeout(openCmpWindow, 0);
          });
        }
      }
    };
  });