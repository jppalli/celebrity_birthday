(function(angular) {
    'use strict';

    angular.module('overwolf')
        .directive('owRating', function() {
            return {
                restrict: 'A',
                transclude: true,
                scope: {
                    rating: '=owRating',
                    hoverRating: '=owRatingHover'
                },
                link: function($scope, $el, attrs, ctrl, transclude) {
                    transclude($scope, function(clone) {
                        $el.append(clone);
                    });

                    var _this = {},
                        $stars = $el.find('> i'),
                        prevRatingClass = null,
                        prevHoverRatingClass = null;

                    _this.update = function(event) {
                        var $star = angular.element(event.currentTarget),
                            index = $stars.index($star);

                        if (angular.isNumber(index)) {
                            $scope.$apply(function() {
                                $scope.rating = (index - 0) + 1;
                            });
                        }
                    };

                    _this.enter = function(event) {
                        var $star = angular.element(event.currentTarget),
                            index = $stars.index($star);

                        if (angular.isNumber(index)) {
                            $scope.$apply(function() {
                                $scope.hoverRating = (index - 0) + 1;
                            });
                        }
                    };

                    _this.leave = function(event) {
                        $scope.$apply(function() {
                            $scope.hoverRating = 0;
                        });
                    };

                    _this.ratingToString = function(rating, prefix) {
                        if (angular.isNumber(rating)) {
                            prefix || (prefix = '');
                            return 'rating-' + prefix + (rating.toFixed(1).replace('.0', '').replace('.', '-'));
                        }
                        return null;
                    };

                    if (attrs.owRatingEditable === 'true') {
                        $stars.on('click', _this.update);
                        $stars.on('mouseenter', _this.enter);
                        $stars.on('mouseleave', _this.leave);
                    }

                    $scope.$watch('rating', function(value) {
                        var currentRatingClass = _this.ratingToString(value);
                        prevRatingClass && $el.removeClass(prevRatingClass);
                        currentRatingClass && $el.addClass(currentRatingClass);
                        prevRatingClass = currentRatingClass;
                    });

                    $scope.$watch('hoverRating', function(value) {
                        var currentHoverRatingClass = _this.ratingToString(value, 'hover-');
                        prevHoverRatingClass && $el.removeClass(prevHoverRatingClass);
                        currentHoverRatingClass && $el.addClass(currentHoverRatingClass);
                        prevHoverRatingClass = currentHoverRatingClass;
                    });

                    $scope.$on('$destroy', function() {
                        $stars.off('click', _this.update);
                        $stars.off('mouseenter', _this.enter);
                        $stars.off('mouseleave', _this.leave);
                    });
                }
            };
        });

})(angular);