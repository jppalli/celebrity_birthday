(function(angular) {
    'use strict';

    angular.module('overwolf')
        .controller('RedeemModalCtrl', ['RedeemService', 'UserService', '$scope',
          function(RedeemService, UserService, $scope) {
            var _this = this;

            _this.init = function() {
                _this.appname = '';
                _this.code = '';
                _this.redeemed = false;
                _this.error = null;
                _this.isInstalled = false;
                _this.finishedQuery = false;
                _this.appId = '';

                $scope.userService = UserService
            };

            _this.launch = function(event) {
                RedeemService.redeem({code: _this.code}).then(
                    // success
                    function(data) {
                        _this.appname = data.appName;
                        _this.appId = data.appId;
                        _this.code = data.code;
                        _this.redeemed = true;
                        _this.isInstalled = data.isInstalled;
                        _this.finishedQuery = true;
                    },
                    // fail
                    function(data) {
                        _this.error = data.error;
                        _this.code = data.code;
                        _this.redeemed = false;
                    }
                );

                event && event.preventDefault();
            };

            _this.install = function(event) {
                OverwolfStore.apps.installApp(_this.appId)
                event && event.preventDefault();
            };

            _this.launchApp = function (event) {
                OverwolfStore.apps.launchApp(_this.appId);
            };

            _this.hideErrors = function() {
                _this.error = null;
            };

            _this.init();
        }]);

})(angular);