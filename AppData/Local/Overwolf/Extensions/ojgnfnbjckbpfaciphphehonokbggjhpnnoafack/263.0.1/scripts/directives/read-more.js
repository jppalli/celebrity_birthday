(function(angular) {
    'use strict';

    angular.module('overwolf')
        .directive('owReadMore', function() {
            return {
                restrict: 'A',
                transclude: true,
                scope: true,
                link: function($scope, $el, attrs, ctrl, transclude) {
                    transclude($scope, function(clone) {
                        $el.append(clone);
                    });

                    var _this = {},
                        $trigger = $el.find('[ow-read-more-trigger]'),
                        $moreText = $el.find('[ow-read-more-text]'),
                        $public = null,
                        readWord = ( attrs.readWord ? attrs.readWord  : "Read"),
                    messages = [readWord + ' more &raquo;', '&laquo; '+readWord+' less'];

                    $public = $scope.owReadMore || ($scope.owReadMore = {});    // create namespace for current directive

                    $public.visible = false;

                    _this.render = function() {
                        $moreText.toggleClass('ow-read-more-text-visible', $public.visible);
                        $trigger.html(messages[$public.visible ? 1 : 0]);
                        $scope.$broadcast('refresh');
                    };

                    _this.toggleVisibility = function(event) {
                        $public.visible = !$public.visible;
                        _this.render();
                        event && event.preventDefault();
                        $scope.$digest();
                    };

                    _this.render();

                    $trigger.on('click', _this.toggleVisibility);

                    $scope.$on('$destroy', function() {
                        $trigger.off('click', _this.toggleVisibility);
                    });
                }
            };
        });

})(angular);