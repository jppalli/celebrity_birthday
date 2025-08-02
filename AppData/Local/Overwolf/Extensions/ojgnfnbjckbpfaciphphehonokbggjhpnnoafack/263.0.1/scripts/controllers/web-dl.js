/**
 * Created by Yoske on 04/08/2015.
 */

(function(angular) {
    'use strict';

    angular.module('overwolf')
        .controller('webDlController', ['$scope', '$rootScope', '$timeout',
        function ($scope, $rootScope, $timeout) {
            var _this = this;
            $scope.isHidden = true;
            $scope.dlFileName = $scope.appName + window.owStoreWebAppDownloadFileSuffix;
            $scope.isChrome = /chrome/i.test(window.navigator.userAgent)
            _this.init = function() {

                console.log("WEBdl Controller initiated" );

                $scope.owStoreWebAppDownloadBase = window.owStoreWebAppDownloadBase;
                $timeout(function(){
                    $scope.isHidden = false;
                    $scope.$apply();
                }, 100);

            };

            $scope.dismissModal = function(){
                $scope.owModal.close();
                $rootScope.$broadcast("download-modal-dismissed");
            };

            _this.init();
        }]);

})(angular);