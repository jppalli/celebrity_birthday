(function(angular) {
    'use strict';

    angular.module('overwolf')
        .service('RedeemService', function($q) {
            var RedeemService = {};

            RedeemService.redeem = function(params) {
                params || (params = {});

                if (angular.isUndefined(params.code)) {
                    return;
                }
                var deferred = $q.defer(),
                    reg = /^[a-z0-9]{24}$/i,
                    code = params.code.trim(),
                    result = {};

                result.code = code;
                result.error = null;
                result.isInstalled = false;


                if (!reg.test(code)) {
                    result.error = 'Please enter a valid code';
                    deferred.reject(result);
                    return deferred.promise;
                }

                OverwolfStore.apps.redeemAppCode(code, function (result) {
                    if (result.status == "success") {
                        if (angular.isUndefined(result.appName)) {
                            result.error = "Unable to redeem this code,\n please contact Overwolf support"
                            deferred.reject(result);
                        }
                        OverwolfStore.apps.getAppStatus(result.appId, function (appStateData) {
                            result.isInstalled = appStateData.installState == "Installed" ? true : false;
                            deferred.resolve(result);
                        })
                    }
                    else {
                        result.error = "Wrong code entered";
                        deferred.reject(result);
                    }
                });


                // end test code

                return deferred.promise;
            };

            return RedeemService;
        });

})(angular);