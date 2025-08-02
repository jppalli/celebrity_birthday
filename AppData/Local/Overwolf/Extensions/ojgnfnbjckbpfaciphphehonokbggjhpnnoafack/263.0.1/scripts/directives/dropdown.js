(function(angular) {
    'use strict';

    angular.module('overwolf')
        .directive('owDropdown', function($document, $timeout) {
            return {
                restrict: 'A',
                transclude: true,
                scope: true,
                link: function($scope, $el, attrs, ctrl, transclude) {
                    var _this = {},
                        $public = null,
                        $body = $document.find('body'),
                        leaveTimeout = null;

                    $public = $scope.owDropdown || ($scope.owDropdown = {});    // create namespace for current directive

                    $public.active = false;

                    //DO close dropdown when item within is clicked.
//                    $public.containerClick = function(event) {
//                        event.stopPropagation();
//                    };

                    _this.open = function(event) {
                        // if we click on an item within the dropdown - don't close it :)
                        $public.active = !$public.active;
                        event.preventDefault();
                        $scope.$digest();
                        event.stopPropagation();
                        $timeout.cancel(leaveTimeout);
                        $el.mouseleave(function(){
                            $timeout.cancel(leaveTimeout);
                            leaveTimeout = $timeout(function(){
                                $public.active = false;
                                $scope.$digest();
                            }, 1000)
                        })
                    };

                    $el.mouseenter(function(){
                        if($public.active){
                            $timeout.cancel(leaveTimeout);
                        }
                    });



                    _this.bodyClick = function(event) {
                        // bind click event on the body, to close any dropdowns when a user clicks outside a dropdown
                        if (!angular.element(event.target).closest($el).length) {
                            $public.active = false;
                            $timeout.cancel(leaveTimeout);
                            $scope.$digest();
                        }
                    };

                    $(window).on("blur", function () {
                        $public.active = false;
                        $timeout.cancel(leaveTimeout);
                        $scope.$digest();
                    });

                    _this.onKeyDownEscape = function(event) {
                        if (event.keyCode === 27) {         // ESC key code
                            $public.active = false;
                            $timeout.cancel(leaveTimeout);
                            $scope.$digest();
                        }
                    };


                    $body.on('click', _this.bodyClick);
                    $body.on('keydown', _this.onKeyDownEscape);

                    if (attrs.owTriggerAction == "hover") {
                        $el.on('mouseenter', _this.open);
                        $el.on("mouseleave", makeActive);

                    }
                    else {
                        $el.on('click', _this.open);
                    }

                    function makeActive() {
                        $public.active = false;
                        $timeout.cancel(leaveTimeout);
                        $scope.$digest();
                    }

                    $scope.$watch('owDropdown.active', function(value) {
                        $el.toggleClass('active', value);
                        if (value) {
                            $scope.$broadcast('refresh');
                        }
                    });

                    attrs.$observe('owDropdown', function(value) {
                        $public.picture = value;
                    });


                    $scope.$on('$destroy', function() {
                        $el.off('click', _this.open);
                        $body.off('click', _this.open);
                        $body.off('keydown', _this.onKeyDownEscape);
                        $body.off('click', _this.bodyClick);
                        $el.off('mouseenter', _this.open);
                        $el.off("mouseleave", makeActive);
                    });

                    transclude($scope, function(clone) {
                        $el.append(clone);
                    });
                }
            };
        });

})(angular);