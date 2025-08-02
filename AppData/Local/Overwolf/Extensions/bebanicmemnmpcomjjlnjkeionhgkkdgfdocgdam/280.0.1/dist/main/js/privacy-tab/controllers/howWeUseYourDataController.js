angular
  .module("PrivacyControlPanel")
  .controller(
    "HowWeUseYourDataController",
    function ($scope, $rootScope, PrivacyService) {
      PrivacyUtils.initScrollIntoView('how-we-use-your-data');

      const eTypes = {
        performance: {
          id: "performance",
          tracking: "improve ow",
        },
        usage: {
          id: "usage",
          tracking: "customized experience",
        },
      };

      $scope.form = {
        performance: true,
        usage: true,
      };

      PrivacyService.getPrivacySettings((result) => {
        if (!result.success) {
          console.error(result.error);
          return;
        }

        $scope.form.performance = result.flags.performance;
        $scope.form.usage = result.flags.usage;
      });

      $scope.handlePerformanceChecked = function () {
        if (!$scope.form.performance) {
          $rootScope.$broadcast(
            "showModal",
            "changeHowWeUseYourDataPerformance"
          );
        } else {
          updateSettings(eTypes.performance);
        }
      };

      $scope.handleUsageChecked = function () {
        if (!$scope.form.usage) {
          $rootScope.$broadcast("showModal", "changeHowWeUseYourDataUsage");
        } else {
          updateSettings(eTypes.usage);
        }
      };

      $rootScope.$on(
        "onHowWeUseYourDataPerformanceDisabled",
        function (evt, result) {
          updateSettings(eTypes.performance, () => {
            $scope.form.performance = true;
          });
        }
      );

      $rootScope.$on("onHowWeUseYourDataPerformanceCancelled", function (evt) {
        $scope.form.performance = true;
      });

      $rootScope.$on("onHowWeUseYourDataUsageDisabled", function (evt, result) {
        updateSettings(eTypes.usage, () => {
          $scope.form.usage = true;
        });
      });

      $rootScope.$on("onHowWeUseYourDataUsageCancelled", function (evt) {
        $scope.form.usage = true;
      });

      function updateSettings(type, errorCallback) {
        PrivacyService.setPrivacySettings(type, $scope.form, (result) => {
          if (!result.success) {
            console.error(result.error);
            if (errorCallback) {
              errorCallback();
            }
          }
        });
      }
    }
  );
