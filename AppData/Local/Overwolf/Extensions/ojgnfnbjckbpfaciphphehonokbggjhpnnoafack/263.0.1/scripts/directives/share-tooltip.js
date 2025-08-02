(function(angular) {
    'use strict';

    angular.module('overwolf')
        .directive('owShareTooltip', function($document, owModal) {
            return {
                restrict: 'A',
                transclude: true,
                scope: true,
                link: function($scope, $el, attrs, ctrl, transclude) {
                    var _this        = {},
                        $public      = {},
                        $parent      = $el.parent(),
                        $body        = $document.find('body'),
                        controller   = attrs.owShareTooltipController,
                        controllerAs = attrs.owShareTooltipControllerAs,
                        modal;


                    $public.close = function(event) {
                        // when clicked on the layer (without event bubbling)
                        if (event.target === event.currentTarget) {
                            _this.close();
                        }
                        event.preventDefault();
                    };

                    $public.selectAll = function(event) {
                        var el = event.target;
                        if (el.nodeName === 'INPUT') {
                            el.focus();
                            el.select();
                        }
                    };


                    _this.open = function(templateUrl) {
                        if (modal && modal.active()) {
                            return;
                        }

                        $public.shareLink = attrs.owShareTooltip;
                        $public.position = attrs.owShareTooltipPosition || 'top-center';

                        var box = $el.position();
                        box.left += parseInt($el.css('margin-left'), 10);
                        box.top += parseInt($el.css('margin-top'), 10);
                        box.width = $el.outerWidth();
                        box.height = $el.outerHeight();

                        modal = owModal({
                            templateUrl: templateUrl,
                            controller: controller,
                            controllerAs: controllerAs,
                            container: $parent,
                            position: {
                                box: box,
                                align: $public.position,
                                offset: {
                                    x: attrs.owShareTooltipOffsetX ? attrs.owShareTooltipOffsetX - 0 : 10,
                                    y: attrs.owShareTooltipOffsetY ? attrs.owShareTooltipOffsetY - 0 : 15
                                }
                            }
                        });

                        modal.activate({owShareTooltip: $public});

                        $el.addClass('active');
                    };

                    _this.close = function() {
                        if (modal && modal.active()) {
                            modal.deactivate();
                            $el.removeClass('active');
                        }
                    };

                    _this.onKeyDownEscape = function(event) {
                        if (event.keyCode === 27) {         // ESC key code
                            _this.close();
                            $scope.$digest();
                        }
                    };
                    $body.on('keydown', _this.onKeyDownEscape);

                    _this.bodyClick = function(event) {
                        // bind click event on the body, to close tooltip when a user clicks outside a tooltip box
                        if (!angular.element(event.target).closest($parent).length) {
                            _this.close();
                            $scope.$digest();
                        }
                    };
                    $body.on('click', _this.bodyClick);

                    _this.openTrigger = function(event) {
                        $scope.$apply(function() {
                            _this.open(attrs.owShareTooltipTemplate || 'templates/share-tooltip.html');
                        });
                        event.preventDefault();
                    };
                    $el.on('click', _this.openTrigger);

                    $scope.$on('$destroy', function() {
                        _this.close();
                        $el.off('click', _this.openTrigger);
                        $body.off('click', _this.bodyClick);
                        $body.off('keydown', _this.onKeyDownEscape);
                    });

                    transclude($scope, function(clone) {
                        $el.append(clone);
                    });
                }
            };
        });

})(angular);