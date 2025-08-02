/**
 * Created by Yoske on 11/12/2014.
 */
(function (angular) {
    'use strict';

    angular.module('overwolf')
        .directive('owSmartViewall', function ($window, $document) {
            return {
                restrict: 'A',
                link: function ($scope, $el, attrs) {

                    var $win = angular.element($window);
                    console.log("SMART VIEWALL");
                    $win.on("resize", showViewAllIfNeeded)


                    function showViewAllIfNeeded() {
                        var hiddenTilesNum = 0;
                        $el.find("article").each(
                            function (articleIndex, articleItem) {
                                if ($(articleItem).css("display") == "none") {
                                    hiddenTilesNum++;
                                }
                            }
                        )

                        if (hiddenTilesNum > 0) {
                            $el.find(".js-view-all-tiles").css("display", "block")
                        } else {
                            $el.find(".js-view-all-tiles").css("display", "none")
                        }
                    }

                    $scope.$on('$destroy', function () {
                        $win.off("resize", showViewAllIfNeeded)
                    });

                    showViewAllIfNeeded();
                }
            };
        });

})(angular);