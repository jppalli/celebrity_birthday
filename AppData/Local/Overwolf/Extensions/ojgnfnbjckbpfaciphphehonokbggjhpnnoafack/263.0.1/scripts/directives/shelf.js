/**
 * Created by Yoske on 02/12/2014.
 */
(function (angular) {
    'use strict';

    angular.module('overwolf')
        .directive('owShelf', function (AppsService, $timeout) {
            return {
                scope: true,
                link: function (scope, element, attrs) {


                    var pendingPopularSort = false;
                    scope.appService = AppsService
                    scope.sortSel = (attrs.owDefaultSort ? attrs.owDefaultSort  :'name') ;

                    scope.$watch("sortSel", function () {
                        console.log("SORT SEL CHANGE", scope.sortSel);
                        doSort();
                    });

                    function sortWithParseInt(a,b){
                      var aVal = a.s[0];
                      var bVal = b.s[0];

                      if (typeof aVal === 'string') {
                        aVal = aVal.replace(",","");
                      }

                      if (typeof bVal === 'string') {
                        bVal = bVal.replace(",","");
                      }

                      aVal = parseInt(aVal);
                      bVal = parseInt(bVal);

                      return aVal === bVal ? 0 : (aVal < bVal ? 1 : -1);
                    }


                    function doSort(){
                        var sortSelector = (attrs.owSortItemsSelector ? attrs.owSortItemsSelector : "article");
                        var allArticles = element.find(sortSelector);
                        switch(scope.sortSel){
                            case "name":
                                allArticles.tsort('article', {data: 'appTitle'});
                                break;
                            case "newest releases" :
                                allArticles.tsort('article', {
                                  data: 'releaseDate',
                                  sortFunction: sortWithParseInt
                                });
                                break;
                            case "ranking":
                                setTimeout(function(){
                                    sortByMostPopular(allArticles);
                                },500); break;
                            case "most downloaded":
                                allArticles.tsort('.total-downloads', {
                                    sortFunction: sortWithParseInt
                                });
                        }
                    }

                    scope.$watch("appService.numOfPendingDownloadsCallbacks", function(newVal, oldVal){
                       if(newVal == 0 && oldVal > 0 && pendingPopularSort){
                           var allArticles = element.find("article");
                           sortByMostPopular(allArticles);
                           pendingPopularSort = false;
                       }
                    });

                    function sortByMostPopular(allArticles) {
                        allArticles.tsort('.rating-big', {
                          data: 'rating',
                          order: 'desc',
                          sortFunction: function(a, b) {
                            var aVal = a.s[0] || 0;
                            var bVal = b.s[0] || 0;

                            if (typeof aVal === 'string') {
                                aVal = aVal.replace("-", ".");
                            }

                            if (typeof bVal === 'string') {
                                bVal = bVal.replace("-", ".");
                            }

                            aVal = parseFloat(aVal);
                            bVal = parseFloat(bVal);

                            return aVal === bVal ? 0 : (aVal < bVal ? 1 : -1);
                          }
                        });
                    }
                }
            };
        })
})(angular);
