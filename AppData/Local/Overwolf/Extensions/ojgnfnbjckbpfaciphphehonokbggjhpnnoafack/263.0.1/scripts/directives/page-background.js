/**
 * Created by Yoske on 02/12/2014.
 */

(function (angular) {
    'use strict';

    angular.module('overwolf')
        .directive('owPageBackground', function ($routeParams, $rootScope, $route) {
            return {
                scope:true,
                restrict: 'E',
                link: function (scope, element, attrs) {
                    var bgTemplateFileName = "default";


                    console.log("CURRENT ROUTE FOR DIRECTIVE " + JSON.stringify($routeParams));


                    scope.getContentUrl = function () {
                        if(attrs.section){
                            bgTemplateFileName = attrs.section;
                        }

                        return 'partials/sliders/' + bgTemplateFileName + '.html';
                    };

                    scope.$on("setBgSliders", function (evt, templateName) {
                        bgTemplateFileName = templateName;
                    });


                    $rootScope.$on("$routeChangeSuccess", function () {
                        element.show();
                        console.log("SHOWING ELEMENT", element);
                        if ($route.current && $route.current.$$route.bgSliders) {
                            bgTemplateFileName = $route.current.$$route.bgSliders;
                        } else {
                            if ($routeParams.section) {
                                bgTemplateFileName = $routeParams.section;
                                if ($routeParams.category) {
                                    bgTemplateFileName += "_inner"
                                }

                            }
                            else {
                                bgTemplateFileName = "default";
                            }
                        }
                    })

                },

                template: '<div class="sliders-container" ng-include="getContentUrl()"></div>'
            };
        })
})(angular);