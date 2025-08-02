/**
 * Created by Yoske on 04/12/2014.
 */

(function (angular) {
  'use strict';

  angular.module('overwolf')
    .controller('GiveawaysController', ["$scope", "AppsService", function ($scope, AppsService) {
      var _this = this;

      $scope.isUnlocked = false;

      _this.init = function () {

      };

      $scope.setGiveaway = function (giveawayInfo) {
        if (typeof giveawayInfo == "string") {
          giveawayInfo = { uid: giveawayInfo };
        }

        $scope.curGiveaway = { UID: giveawayInfo.UID, appName: giveawayInfo.title };

        OverwolfStore.giveaways.getGiveawayInfo(giveawayInfo.uid, function (result) {
          if (result.status == "success" && result.progress) {
            $scope.isUnlocked = result.progress.Done;
          } else {
            console.warn("unabled to load giveaway", giveawayInfo.uid, result)
          }
        });

      }


      $scope.launchGiveaway = function (giveawayId) {
        OverwolfStore.giveaways.executeAction(
          "LaunchExtension",
          JSON.stringify({
            UID: giveawayId,
            DownloadMissing: true

          }),
          function (result) {
            if (result.status == 'error') {
              console.warn("launch giveaway returned error", result);
            }
          }
        );
      };

      $scope.openGiveaway = $scope.launchGiveaway;

      $scope.web_installApp = function () {
        AppsService.webAppInstall($scope.curGiveaway.UID, $scope.curGiveaway.appName);
      };

      _this.init();
    }]
    )
})(angular);
