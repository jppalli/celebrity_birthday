(function(angular) {
    'use strict';

    angular.module('overwolf')
        .directive('owSelect', function($document) {
            return {
                restrict: 'A',
                transclude: true,
                scope: {
                    'value': '=owSelect'
                },
                controller: function($scope, $location) {
                    var _this = this,
                        $public = null,
                        options = {},
                        initialValue = $scope.value;

                    $public = $scope.owSelect || ($scope.owSelect = {});    // create namespace for current directive
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

                            localStorage["ow_select_"+ $location.path()+ "_" + initialValue] = key;
                        }
                    };

                    _this.addOption = function(option) {
                        options[option.key] = option;
                    };

                    _this.removeOption = function(option) {
                        delete options[option.key];
                    };

                    $scope.$watch('value', function(value) {
                        if(localStorage["ow_select_"+ $location.path()+ "_" + initialValue]){
                            _this.select(localStorage["ow_select_"+ $location.path()+ "_" + initialValue]);
                        }
                        else if (!angular.isUndefined(value)) {
                            _this.select(value);
                        }
                    });

                    if(localStorage["ow_select_"+ $location.path()+ "_" + initialValue]){
                        _this.select(localStorage["ow_select_"+ $location.path()+ "_" + initialValue]);
                    }
                },
                link: function($scope, $el, attrs, ctrl, transclude) {
                    var _this = {},
                        $public = null,
                        $body = $document.find('body');

                    $public = $scope.owSelect || ($scope.owSelect = {});    // create namespace for current directive

                    $public.active = false;

                    $public.containerClick = function(event) {
                        event.stopPropagation();
                    };

                    _this.open = function(event) {
                        // if we click on an item within the dropdown - don't close it :)
                        $public.active = !$public.active;
                        event.preventDefault();
                        $scope.$digest();
                    };

                    _this.bodyClick = function(event) {
                        // bind click event on the body, to close any dropdowns when a user clicks outside a dropdown
                        if (!angular.element(event.target).closest($el).length) {
                            $public.active = false;
                            $scope.$digest();
                        }
                    };


                    $el.on('click', _this.open);
                    $body.on('click', _this.bodyClick);

                    $scope.$watch('owSelect.active', function(value) {
                        $el.toggleClass('active', value);
                        if (value) {
                            $scope.$broadcast('refresh');
                        }
                    });


                    $scope.$on('$destroy', function() {
                        $el.off('click', _this.open);
                        $body.off('click', _this.open);
                        $body.off('click', _this.bodyClick);
                    });

                    transclude($scope, function(clone) {
                        $el.append(clone);
                    });
                }
            };
        })
        .directive('owSelectOption', function() {
            return {
                require: '^owSelect',
                restrict: 'A',
                scope: true,
                link: function($scope, $el, attrs, selectCtrl) {
                    var _this = {},
                        $public = null;

                    $public = $scope.owSelectOption || ($scope.owSelectOption = {});    // create namespace for current directive
                    $public.key = attrs.owSelectOption;

                    //when the selectbox is done at the server, the text we get is already translated.
                    //When it is done at the client, it is an angular expression that we have to treat specially.
                    var elText = $el.text();
                    if(elText.indexOf("{") != -1) {
                        var strippedElText = $el.text().replace("{{", "").replace("}}", "")
                        var elTranslatedText = $scope.$eval(strippedElText);
                    }
                    else{
                        elTranslatedText = elText;
                    }
                    $public.name = attrs.owSelectOptionName || elTranslatedText;

                    $public.select = function() {
                        selectCtrl.select($public.key);
                    };

                    _this.click = function(event) {
                        $scope.$apply(function() {
                            $public.select();
                            event && event.preventDefault();
                        });
                    };

                    $el.on('click', _this.click);

                    selectCtrl.addOption($public);

                    if (attrs.active === 'true') {
                        $public.select();
                    }

                    $scope.$watch('owSelectOption.selected', function(value) {
                        $el.toggleClass('active', value);
                    });

                    $scope.$on('$destroy', function() {
                        selectCtrl.removeOption($public);
                        $el.off('click', _this.click);
                    });
                }
            };
        });

})(angular);