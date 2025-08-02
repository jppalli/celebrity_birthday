(function (angular) {
    'use strict';

    angular.module('overwolf')
        .service('SearchService', function ($q, $http, $rootScope) {
            var SearchService = {};
            var lastSearchParams;


            SearchService.search = function (params) {
                params || (params = {});
                var deferred = $q.defer();
                lastSearchParams = angular.copy(params)
                $http.get($rootScope.apiBase + 'search/v2/'+params.filter +'/' + params.query).then(
                    function(result) {

                        lastSearchParams.result = result;
                        deferred.resolve(result);
                    },
                    function(error){
                        deferred.reject(error);
                    }
                );

                return deferred.promise;

            };

            SearchService.getLastSearchInfo = function(){
                return lastSearchParams;
            }

            SearchService.updateLastSearchFilter = function(filter){
              if(lastSearchParams){
                  lastSearchParams.filter = filter;
              }
            };
            SearchService.clearLastSearch = function(){
                lastSearchParams = null;
            };


            return SearchService;
        });

})(angular);