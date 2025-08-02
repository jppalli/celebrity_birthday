angular.module('PrivacyControlPanel')
  .controller('ExerciseYourRightsController', function($scope, $rootScope, PrivacyService) {
    PrivacyUtils.initScrollIntoView('exercise-your-rights');

    const kRemoteConfigExtId = "ppagiehdogdjlomggmoejfamedbjggdggnjbilhe"
    const kTimeToRelaunchRemoteConfigs = 15 * 1000;
    let syncTimer = null;

    const eTypes = {
      amazonPublisher: {
        id: 'amazonPublisher',
        tracking: 'amazonPublisher'
      },
      uspv1: {
        id: 'uspv1',
        tracking: 'uspv1'
      },
    };

    $scope.form = {
      amazonPublisher: false,
      uspv1: false,
    };

    PrivacyService.getPrivacySettings(result => {
      if (!result.success) {
        console.error(result.error);
        return;
      }

      $scope.form.amazonPublisher = result.flags.amazonPublisher;
      $scope.form.uspv1 = result.flags.uspv1;
    })

    $scope.handleExerciseRightsAdditionalExpandedContainer = function($event) {
      ($event.currentTarget).classList.toggle('is-expanded');
    };

    $scope.toolTipHoverIn = function($event) {
      //Temp solution 
      //TODO: check more cases of positioning tooltip
      const moreInfoBox = $event.currentTarget;
      const rect = moreInfoBox.getBoundingClientRect();
      const toolTip = moreInfoBox.querySelector('.ng-tooltip');
      const toolTipWidth = toolTip.offsetWidth;
      const toolTipHeight = toolTip.offsetHeight;
      const tooltipWidthOffset = 10;
      const tooltipHeightOffset = 16;

      toolTip.style.cssText = `
        top: ${rect.top - toolTipHeight - tooltipHeightOffset}px;
        left: ${rect.left - toolTipWidth / 2 + tooltipWidthOffset}px;
      `;
      toolTip.classList.add('is-shown');
   
    };

    $scope.toolTipHoverOut = function($event) {
      const moreInfoBox = $event.currentTarget;
      const toolTip = moreInfoBox.querySelector('.ng-tooltip');
      toolTip.classList.remove('is-shown');
    };

    $scope.handleAmazonPublisher = function() {
      updateSettings(eTypes.amazonPublisher, () => {
        $scope.form.amazonPublisher = true;
      });
    };

    $scope.handleUspv1 = function() {
      if (!$scope.form.uspv1) {
        updateSettings(eTypes.uspv1, () => {
          $scope.form.uspv1 = false;
        });
        
      } else {
        $rootScope.$broadcast("showModal", "doNotSellOrShareMyPersonalInformation");
      }
    };


    $rootScope.$on("onNotSellOrShareMyPersonalInformationEnabled", function (evt, result) {
      updateSettings(eTypes.uspv1, () => {
        $scope.form.uspv1 = false;
      });
    });

    $rootScope.$on("onNotSellOrShareMyPersonalInformationCanceled", function (evt, result) {
      $scope.form.uspv1 = !$scope.form.uspv1;
      updateSettings(eTypes.uspv1, () => {
        $scope.form.uspv1 = false;
      });
    });

    // -------------------------------------------------------------------------
    function updateSettings(type, errorCallback) {
      PrivacyService.setPrivacySettings(type, $scope.form, result => {
        if (!result.success) {
          console.error(result.error);
          if (errorCallback) {
            errorCallback();
          }
        }
      })

      launchRemoteConfigIfShould();
    }

    // -------------------------------------------------------------------------
    async function launchRemoteConfigIfShould() {
      if (syncTimer) {
        return;
      }


      const isRunning = await isRemoteConfigsRunning();
      if (!isRunning) {
        launchRemoteConfig();
        return;
      }

      syncTimer = setTimeout(() => {
        launchRemoteConfig();
        syncTimer = null;
      }, kTimeToRelaunchRemoteConfigs)
    }

    // -------------------------------------------------------------------------
    function isRemoteConfigsRunning() {
      return new Promise((resolve, reject ) => {
        overwolf.extensions.getRunningState(kRemoteConfigExtId, (res) =>{
          if (!res.success) {
            reject(null);
            return;
          }

          resolve(res.isRunning)
        })

      })
    }

    // -------------------------------------------------------------------------
    function launchRemoteConfig() {
      overwolf.extensions.launch(kRemoteConfigExtId);
    }
  });
