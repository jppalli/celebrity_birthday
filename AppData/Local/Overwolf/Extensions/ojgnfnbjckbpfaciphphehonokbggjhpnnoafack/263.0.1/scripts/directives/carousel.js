(function(angular) {
    'use strict';

    angular.module('overwolf')
        .directive('owCarousel', function($timeout) {
            return {
                restrict: 'A',
                transclude: true,
                scope: true,
                link: function($scope, $el, attrs, ctrl, transclude, TrackingService) {
                    transclude($scope, function(clone) {
                        $el.append(clone);
                    });

                    var _this = {},
                        $container = $el.find('[ow-carousel-container]'),
                        $list = $el.find('[ow-carousel-list]'),
                        $public,
                        current,
                        slidesCount,
                        containerWidth,
                        initAttempts = 0,
                        totalWidth;

                    $public = $scope.owCarousel || ($scope.owCarousel = {});    // create namespace for current directive


                    _this.init = function() {
                        containerWidth = $container.width();
                        if(containerWidth == 0){

                            if(initAttempts > 1000){
                                console.error("Tried to init carousel for 1000 times and failed.")
                                return;
                            }
                            $timeout(_this.init,100);
                            initAttempts++;
                            return;
                        }

                        current = 0;
                        totalWidth = 0;
                        $list.children().each(function(num, el) {
                            totalWidth += $(el).outerWidth();
                        });
                        $list.width(totalWidth);

                        slidesCount = Math.ceil(totalWidth / containerWidth) - 1;
                        _this.redraw();
                    };

                    _this.prev = function() {
                        if (current > 0) {
                            current--;
                            _this.redraw();
                        }
                    };

                    _this.next = function() {
                        if (current < slidesCount) {
                            current++;
                            _this.redraw();
                        }
                        _this.redraw();
                    };

                    _this.redraw = function() {
                        $list.css({
                            'left': -current * containerWidth
                        });
                        $public.isPrevDisabled = (current === 0);
                        $public.isNextDisabled = (current === slidesCount);
                    };


                    $public.prev = function(event) {
                        _this.prev();
                        event && event.preventDefault();
                    };

                    $public.next = function(event) {
                        _this.next();
                        event && event.preventDefault();
                    };

                    $public.trackCarouselClick = function(slide){
                        var url = slide.link
                        let extra = {
                            url,
                        }

                        TrackingService.trackEvent(
                            "Carousel",
                            "click",
                            null,
                            null,
                            null,
                            extra
                        );
                    }

                    _this.init();
                }
            };
        });

})(angular);