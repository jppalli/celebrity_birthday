(function(angular) {
    'use strict';

    angular.module('overwolf')
        .service('LogsService', function($q, $http, $rootScope, OPK_VERSION) {
            var LogsService = {};

            LogsService.getUrlForLogSending = function(userName, appId) {
                var deferred = $q.defer();

                var req = {
                    method: 'POST',
                    url: 'https://newlog.overwolf.com/LogSystem/Logs',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: [{
                              logHash: 'RATINGS_AND_REVIEWS',
                              version: OPK_VERSION,
                              process: 'store.opk',
                              subSystem: appId,
                              userName: userName,
                              isUnique: true
                          }]
                };

                $http(req).success(function (result) {
                    if (result && result.Success && result.SendUrl) {
                        // console.log('got log url:', result);
                        deferred.resolve(result);
                    } else {
                        // console.log('failed to send logs', result);
                        deferred.reject();
                    }
                }).error(function (result) {
                    // console.log('failed to send logs', result);
                    deferred.reject();
                });

                return deferred.promise;
            };

            return LogsService;
        });
})(angular);
