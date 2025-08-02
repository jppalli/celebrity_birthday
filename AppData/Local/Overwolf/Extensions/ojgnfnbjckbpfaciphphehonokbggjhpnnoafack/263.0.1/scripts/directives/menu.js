(function (angular) {
    'use strict';

    angular.module('overwolf')
        .directive('owMenu', function ($window, $timeout) {
            return {
                restrict: 'A',
                transclude: true,
                scope: true,
                controller: function ($scope) {
                    var _this = this,
                        $public = null,
                        items = [],
                        timer,
                        active;

                    $public = $scope.owMenu || ($scope.owMenu = {});    // create namespace for current directive
                    $public.activeBorder = {};
                    $public.hoverBorder = {};

                    _this.select = function (item) {
                        angular.forEach(items, function (item) {
                            item.selected = false;
                        });

                        active = item;

                        if (item) {
                            var pos = _this._extractPos(item);
                            $public.activeBorder = pos;
                            $public.hoverBorder = pos;

                            item.selected = true;
                        }
                    };

                    _this.refresh = function () {
                        _this.select(active);
                    };

                    _this.hover = function (item) {
                        $timeout.cancel(timer);

                        if (!item) {
                            timer = $timeout(function () {
                                $public.hoverBorder = _this._extractPos(active);
                            }, 200);
                        } else {
                            $public.hoverBorder = _this._extractPos(item);
                        }
                    };

                    _this._extractPos = function (item) {
                        item.refresh();
                        var dims = item.dims;
                        if ($public.type === 'horizontal') {
                            return {
                                left: dims.left,
                                width: dims.width
                            };
                        }

                        return {
                            top: dims.top,
                            height: dims.height
                        };
                    };


                    _this.addItem = function (item) {
                        if (items.length === 0) {
                            _this.select(item);
                        } else {
                            item.selected = false;
                        }
                        items.push(item);
                    };

                    _this.removeItem = function (item) {
                        if (item.selected && items.length) {
                            _this.select(items[0]);
                        }

                        var index = items.indexOf(item);
                        if (index >= 0) {
                            items.splice(index, 1);
                        }
                    };
                },
                link: function ($scope, $el, attrs, ctrl, transclude) {
                    var $win = angular.element($window),
                        $public = $scope.owMenu || ($scope.owMenu = {});    // create namespace for current directive

                    $public.type = attrs.owMenu;
                    ctrl.interactive = attrs.owMenuInteractive;
                    ctrl.borderSize = attrs.owMenuBorderSize || 'auto';

                    transclude($scope, function (clone) {
                        $el.append(clone);
                    });

                    ctrl.refresh();
                    $win.on('load', ctrl.refresh);

                    $scope.$on('$destroy', function () {
                        $win.off('load', ctrl.refresh);
                    });
                }
            };
        })
        .directive('owMenuItem', function ($location, $rootScope, $timeout) {
            return {
                require: '^owMenu',
                restrict: 'A',
                scope: true,
                link: function ($scope, $el, attrs, menuCtrl) {
                    var _this = {},
                        $public = null,
                        $link = $el.find('a:first');

                    if (!$link.length) {
                        $link = $el;
                    }

                    _this.menuItemId = attrs.owMenuItemId;

                    $public = $scope.owMenuItem || ($scope.owMenuItem = {});    // create namespace for current directive

                    _this.borderSize = attrs.owMenuItemBorderSize || menuCtrl.borderSize;

                    $public.refresh = function () {
                        var dims = $link.position(),
                            borderSize = _this.borderSize;

                        dims.left += parseInt($link.css('padding-left'), 10);
                        dims.top += parseInt($link.css('padding-top'), 10);
                        dims.width = $link.width();
                        dims.height = $link.height();

                        if (borderSize !== 'auto') {
                            borderSize = borderSize - 0;
                            dims = {
                                left: dims.left + (dims.width - borderSize) / 2,
                                top: dims.top + (dims.height - borderSize) / 2,
                                width: borderSize,
                                height: borderSize
                            };
                        }

                        $public.dims = dims;
                    };

                    $public.select = function () {
                        menuCtrl.select($public);
                    };


                    $link.on('click.owMenuItem', function (event) {
                        $scope.$apply(function () {
                            if(!angular.isUndefined(attrs.selectOnClick)) {
                                $public.select();
                            };
                            //event && event.stopPropagation(); //stopPropagation intefered with angular HTML5MODE. removed for now.
                        });
                        $rootScope.$broadcast("closeAllModals");
                    });

                    if (menuCtrl.interactive) {
                        $link.on('mouseenter.owMenuItem', function (event) {
                            $scope.$apply(function () {
                                menuCtrl.hover($public);
                                event && event.stopPropagation();
                            });
                        });
                        $link.on('mouseleave.owMenuItem', function (event) {
                            $scope.$apply(function () {
                                menuCtrl.hover();
                                event && event.stopPropagation();
                            });
                        });
                    }


                    $public.refresh();
                    menuCtrl.addItem($public);

                    if (attrs.active === 'true') {
                        $public.select();
                    }

                    $scope.$watch(attrs.owMenuItemActive, function (value) {
                        if (value === true) {
                            $timeout(function(){
                                $public.select();
                            },100)
                        }
                    });

                    $scope.$watch('owMenuItem.selected', function (value) {
                        $el.toggleClass('active', value);
                    });

                    $scope.$on('$destroy', function () {
                        menuCtrl.removeItem($public);
                        $link.off('.owMenuItem');
                    });


                    $rootScope.$on("splashRemoved", function () {
                        selectCurrentLinkInClient();
                    });

                    if($rootScope.isInOwClient) {
                        $rootScope.$on("$routeChangeSuccess", selectCurrentLinkInClient);
                    }
                    else{
                        $rootScope.$on("$routeChangeSuccess", selectCurrentLinkInBrowser);
                    }
                    //$rootScope.$watch("$rootScope.navBarLoaded", function(){
                    //    selectCurrentLinkInClient();
                    //});

                    function selectCurrentLinkInClient() {
                        var routePath = $location.path();//.substr("//files".length);
                        if(routePath == "")
                        {
                            routePath="/apps";
                        }
                        var linkHref = $el.find("a").attr("href");

                        if (linkHref) {
                            var linkPath = linkHref.substr("index.html#".length);
                            if (linkPath != "" && linkPath == routePath) {
                                $timeout(function(){
                                    $public.select();
                                },300);
                            }
                        }
                    }

                    function selectCurrentLinkInBrowser(evt,route) {
                        var routePath = route.loadedTemplateUrl;
                        routePath = routePath.substring(routePath.indexOf("MainContent/")+"MainContent".length);
                        if(routePath.substring(0,2) == "//"){
                            routePath = routePath.substring(1);
                        }
                        if(routePath.charAt(routePath.length-1) == '/') {
                            routePath = routePath.substring(0, routePath.length - 1);
                        }

                        if(routePath == "")
                        {
                            routePath="/apps";
                        }
                        var linkHref = $el.find("a").attr("href");

                        if (linkHref) {

                            if (linkHref != "" && linkHref == routePath) {
                                $timeout(function(){
                                    $public.select();
                                },100);
                            }
                        }
                    }

                    $rootScope.$on("owSelectMenuItem", function (params, itemIdToSelect) {
                        if (_this.menuItemId == itemIdToSelect) {
                            $public.select();
                        }
                    });

                    $rootScope.$on("owSelectMenuItemByHref", function (params, linkToSelectHref) {

                        var linkHref = $el.find("a").attr("href");
                        if(!linkHref){
                            return;
                        }
                        var linkPath = linkHref.substr("index.html#".length);
                        if(linkPath == linkToSelectHref){
                            $public.select();
                        }
                    });
                }
            };
        });

})(angular);