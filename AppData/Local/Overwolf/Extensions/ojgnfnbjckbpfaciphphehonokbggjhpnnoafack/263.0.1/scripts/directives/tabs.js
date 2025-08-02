(function(angular) {
    'use strict';

    angular.module('overwolf')
        .directive('owTabs', function() {
            return {
                restrict: 'A',
                transclude: true,
                scope: true,
                controller: function($scope) {
                    var _this = this,
                        $public = null,
                        panes = [],
                        active;

                    $public = $scope.owTabs || ($scope.owTabs = {});    // create namespace for current directive
                    $public.panes = panes;

                    _this.select = function(pane) {
                        angular.forEach(panes, function(pane) {
                            pane.selected = false;
                        });

                        active = pane;
                        pane.selected = true;
                    };

                    _this.refresh = function() {
                        if (active.visible) {
                            _this.select(active);
                        } else {
                            var visiblePanes = panes.filter(function(pane) {
                                return pane.visible;
                            });

                            if (visiblePanes.length) {
                                _this.select(visiblePanes[0]);
                            }
                        }
                    };


                    _this.addPane = function(pane) {
                        if (panes.length === 0) {
                            _this.select(pane);
                        } else {
                            pane.selected = false;
                        }
                        panes.push(pane);
                    };

                    _this.removePane = function(pane) {
                        if (pane.selected && panes.length) {
                            _this.select(panes[0]);
                        }

                        var index = panes.indexOf(pane);
                        if (index >= 0) {
                            panes.splice(index, 1);
                        }
                    };
                },
                link: function($scope, $el, attrs, ctrl, transclude) {
                    transclude($scope, function(clone) {
                        $el.append(clone);
                    });
                }
            };
        })
        .directive('owPane', function() {
            return {
                require: '^owTabs',
                restrict: 'A',
                scope: true,
                link: function($scope, $el, attrs, tabsCtrl) {
                    var $public = $scope.owPane || ($scope.owPane = {});    // create namespace for current directive

                    $public.select = function(event) {
                        tabsCtrl.select($public);
                        event && event.preventDefault();
                    };

                    $public.title = attrs.owPane;
                    $public.style = attrs.owPaneStyle ? [attrs.owPaneStyle] : null;

                    tabsCtrl.addPane($public);

                    if (attrs.active === 'true') {
                        $public.select();
                    }

                    $scope.$watch('owPane.selected', function(value) {
                        $el.toggleClass('active', value);
                    });
                    $scope.$watch('owPane.visible', function(value) {
                        $el.toggleClass('ow-pane-hidden', !value);
                    });

                    $scope.$watch(attrs.owPaneVisible, function(value) {
                        if (angular.isUndefined(value)) {
                            value = true;
                        }
                        $public.visible = value;
                        //tabsCtrl.refresh();
                    });

                    $scope.$on('$destroy', function() {
                        tabsCtrl.removePane($public);
                    });
                }
            };
        });

})(angular);