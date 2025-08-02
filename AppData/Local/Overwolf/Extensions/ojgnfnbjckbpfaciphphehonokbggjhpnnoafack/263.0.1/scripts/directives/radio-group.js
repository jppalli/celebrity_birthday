(function(angular) {
    'use strict';

    angular.module('overwolf')
        .directive('owRadioGroup', function() {
            return {
                restrict: 'A',
                transclude: true,
                scope: {
                    'value': '=owRadioGroup'
                },
                controller: function($scope) {
                    var _this = this,
                        $public = null,
                        options = {};

                    $public = $scope.owRadioGroup || ($scope.owRadioGroup = {});    // create namespace for current directive
                    $public.name = '';
                    $public.value = $scope.value;

                    _this.select = function(key) {
                        if (options[key]) {
                            for (var i in options) {
                                options[i].selected = false;
                            }
                            options[key].selected = true;

                            $scope.value = key;
                            $public.value = key;
                            $public.name = options[key].name;
                        }
                    };

                    _this.reset = function() {
                        var key = void 0;       // undefined
                        $scope.value = key;
                        $public.value = key;
                        $public.name = '';
                    };

                    _this.addOption = function(option) {
                        options[option.key] = option;
                    };

                    _this.removeOption = function(option) {
                        delete options[option.key];
                    };


                    $scope.$watch('value', function(value) {
                        if (!angular.isUndefined(value)) {
                            _this.select(value);
                        }
                    });
                },
                link: function($scope, $el, attrs, ctrl, transclude) {
                    var _this = {},
                        $public;

                    $public = $scope.owRadioGroup || ($scope.owRadioGroup = {});    // create namespace for current directive

                    $public.reset = ctrl.reset;
                    ctrl.activeClass = attrs.owRadioGroupCssClass || 'active';

                    transclude($scope, function(clone) {
                        $el.append(clone);
                    });
                }
            };
        })
        .directive('owRadio', function() {
            return {
                require: '^owRadioGroup',
                restrict: 'A',
                scope: true,
                link: function($scope, $el, attrs, radiogroupCtrl) {
                    var _this = {},
                        $public = null;

                    $public = $scope.owRadio || ($scope.owRadio = {});    // create namespace for current directive
                    $public.key = attrs.owRadio;
                    $public.name = attrs.owRadioName || $el.text();

                    $public.select = function() {
                        radiogroupCtrl.select($public.key);
                    };

                    _this.click = function(event) {
                        $scope.$apply(function() {
                            $public.select();
                            event && event.preventDefault();
                        });
                    };

                    $el.on('click', _this.click);

                    radiogroupCtrl.addOption($public);

                    if (attrs.active === 'true') {
                        $public.select();
                    }

                    $scope.$watch('owRadio.selected', function(value) {
                        $el.toggleClass(radiogroupCtrl.activeClass, !!value);
                    });

                    $scope.$on('$destroy', function() {
                        radiogroupCtrl.removeOption($public);
                        $el.off('click', _this.click);
                    });
                }
            };
        });

})(angular);