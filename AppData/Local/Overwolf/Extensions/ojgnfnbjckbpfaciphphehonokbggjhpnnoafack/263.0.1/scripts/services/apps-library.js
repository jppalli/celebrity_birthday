(function(angular) {
    'use strict';

    angular.module('overwolf')
        .service('AppsLibraryService', function($q) {
            var AppsLibraryService = {};

            AppsLibraryService.fetch = function(params) {
                params || (params = {});

                var deferred = $q.defer(),
                    result = {};

                // start test code
                // todo: implement $http api call or use $resource service
                if (params.query.length > 3) {
                    result = {
                        apps: {
                            length: 0
                        }
                    };
                } else {
                    result = {
                        apps: {
                            length: 10
                        }
                    };
                }

                deferred.resolve(result);
                // end test code

                return deferred.promise;
            };


            return AppsLibraryService;
        });

})(angular);