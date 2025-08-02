(function(angular) {
    'use strict';

    angular.module('overwolf')
        .service('GamesLibraryService', function($q) {
            var GamesLibraryService = {};

            GamesLibraryService.fetch = function(params) {
                params || (params = {});

                var deferred = $q.defer(),
                    result = {};

                // start test code
                // todo: implement $http api call or use $resource service
                if (params.query.length > 3) {
                    result = {
                        games: {
                            length: 0
                        }
                    };
                } else {
                    result = {
                        games: {
                            length: 10
                        }
                    };
                }

                deferred.resolve(result);
                // end test code

                return deferred.promise;
            };


            return GamesLibraryService;
        });

})(angular);