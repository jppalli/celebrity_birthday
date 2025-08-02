/**
 * watch the value of scroll-param attribute of the element
 * when scrollParam matches a certain value defined in scroll-value attribute
 * of the element - scroll the element into view
 */

(function (angular) {
    'use strict';

    angular.module('overwolf')
        .directive('owScrollOnSelect', function ($window) {

            return {
                restrict: 'A',
                scope: {
                  scrollParam: "="
                },

                link: function ($scope, $el, attrs, ctrl, transclude) {

                    function isScrolledIntoView(elem) {
                      var wnd = angular.element(window);
                      var docViewTop = wnd.scrollTop();
                      var docViewBottom = docViewTop + wnd.height();

                      var elemTop = elem.offset().top;
                      var elemBottom = elemTop + elem.height();

                      return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
                    }

                    $scope.$watch("scrollParam", function(newVal){
                        if(newVal == attrs.scrollValue){
                          if (isScrolledIntoView($el)) {
                            return;
                          }

                          $el[0].scrollIntoView(true);
                           // $el.focus();
                       }
                    });
                }
            };
        })

})(angular);