/**
 * Created by Yoske on 09/12/2014.
 */
(function (angular) {
    'use strict';

    angular.module('overwolf')
        .directive('owImgRegressive', function () {
            return {
                restrict: 'A',
                transclude: true,
                scope: true,
                link: function ($scope, $el, attrs, ctrl, transclude) {
                    $el.css("opacity", "0");
                    $el.on("load",showImage)


                    function showImage(){
                        $el.css("opacity", "1");
                    }

                    $scope.$on("$destroy",function(){
                        $el.off("load",showImage);
                    })
                }
            }
        }
    )
})(angular);