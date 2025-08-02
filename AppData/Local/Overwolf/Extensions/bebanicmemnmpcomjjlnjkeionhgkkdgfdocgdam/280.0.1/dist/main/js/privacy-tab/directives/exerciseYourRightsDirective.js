angular.module('PrivacyControlPanel')
  .directive('owExerciseYourRights', function() {
    return {
      restrict: 'A',
      templateUrl: 'templates/exercise-your-rights.html',
      link: async function($scope, element) {
        const kPathOfSupportedConsents
          = `https://features.overwolf.com/get-supported-consent`;
        $scope.showUsvp1 = false;
        try {
          const response = await fetch(kPathOfSupportedConsents);
          if (!response) {
            return;
          }

          const supportedConsent = await response.json()
          if (supportedConsent.includes('uspv1')) {
            $scope.showUsvp1 = true;
          }
        } catch {}
        
      }
    };
  });
