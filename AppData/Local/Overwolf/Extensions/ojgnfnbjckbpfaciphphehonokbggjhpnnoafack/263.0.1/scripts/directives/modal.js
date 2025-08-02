(function (angular) {
  'use strict';

  angular.module('overwolf')
    .directive('owModalTrigger', function ($rootScope, owModal) {
      return {
        restrict: 'A',
        transclude: true,
        scope: true,
        link: function ($scope, $el, attrs, ctrl, transclude) {
          function open(event) {
            var $target = angular.element(event.target),
              $currentTarget = angular.element(event.currentTarget),
              $ignored = $target.closest('a, [ow-modal-trigger-ignore]');

            var baseUrl = '';

            if ($ignored.length && !$currentTarget.closest($ignored).length) {
              return;
            }

            if (attrs.owModalTriggerBase) {
              baseUrl = attrs.owModalTriggerBase;
            }

            let controllerScopeParams = null;
            try {
              controllerScopeParams = JSON.parse(attrs.owControllerScopeParams);
            } catch (e) {
            }

            let modalOrigin = null;
            try {
              modalOrigin = JSON.parse(decodeURIComponent(attrs.owModalTriggerOrigin));
              modalOrigin.isOneApp = true;
              if (modalOrigin.page === '/') {
                modalOrigin.page = 'home';
              }
            } catch (e) {
            }

            const options = {
              templateUrl: baseUrl + attrs.owModalTrigger,
              container: attrs.owModalTriggerContainer,
              origin: modalOrigin
            };

            if (controllerScopeParams) {
              options.controllerScopeParams = controllerScopeParams;
            }

            if (window.storePlatform !== 'Client' && attrs.owModalRedirect && attrs.owModalRedirect !== '') {
              window.location.href = attrs.owModalRedirect;
              return;
            }

            if (attrs.owModalRedirectExternal && attrs.owModalRedirectExternal !== '') {
              openExternalLink(attrs.owModalRedirectExternal);
              return;
            }

            function openExternalLink(linkAddress) {
              if (window.storePlatform !== 'Client') {
                window.open(linkAddress, '_blank');
              } else {
                overwolf.utils.openUrlInDefaultBrowser(linkAddress)
              }
            }

            $scope.$apply(function () {
              $rootScope.$broadcast('owModal.open', options);
            });

            event && event.preventDefault();
          }

          $el.on('click', open);

          $scope.$on('$destroy', function () {
            $el.off('click', open);
          });

          transclude($scope, function (clone) {
            $el.append(clone);
          });
        }
      };
    })
    .directive('owModalWrapper', function ($rootScope, owModal) {
      return {
        terminal: true,
        link: function ($scope, $el, attrs, ctrl, transclude) {
          var innerHtml = $el.html();
          $rootScope.$broadcast('owModal.open', {
            template: innerHtml,
            container: attrs.owModalTriggerContainer
          });
          $el.html("");
        }
      }
    })
    .directive('owModal', function ($window, $document, owModal, ngProgress, $rootScope, OWModalService) {
      return {
        restrict: 'A',
        link: function ($scope, $el, attrs) {
          var _this = {},
            $public = {},
            $win = angular.element($window),
            $body = $document.find('body'),
            containerName = attrs.owModal,
            controller = attrs.owModalController,
            controllerAs = attrs.owModalControllerAs,
            strictClose = false,
            modal;

          owModal.activeCount || (owModal.activeCount = 0);


          $public.close = function (event, result, isDismissed) {
            // when clicked on the layer (without event bubbling)
            if (!event || event.target === event.currentTarget) {
              _this.close(result, isDismissed);
              if (event) {
                event.preventDefault();
              }

            }
          };

          $public.hide = function () {
            $el.hide();
          };

          $public.unHide = function () {
            $el.show();
          };


          _this.open = function (options, controllerScopeParams, moreOptions) {
            var templateUrl;
            if (typeof options == 'string') {
              templateUrl = options;
            } else {
              if (options.templateUrl) {
                templateUrl = options.templateUrl;
              }
            }

            if (templateUrl == $rootScope.serverBase) {
              console.log("requested to open modal with blank URL. doing nothing");
              return;
            }

            $rootScope.lastModalTemplateUrl = templateUrl;

            if (!modal) {
              owModal.activeCount++;
              var modalOptions = {
                controller: controller,
                controllerAs: controllerAs,
                container: $el
              };

              if (templateUrl != null && templateUrl != "") {
                modalOptions.templateUrl = templateUrl
              }
              else if (options.template) {
                modalOptions.template = options.template;
              }

              modal = owModal(modalOptions);

            } else { // modal != null
              if (modal.isModalLoading()) {
                console.log("Modal is already loading. Not opening a new one.");
                return;
              }

              modal.templateUrl = templateUrl;
              modal.replaceHtml(templateUrl)
            }

            var modalResultPromise = modal.activate({
              owModal: $public,
              controllerScopeParams: controllerScopeParams,
              moreOptions: moreOptions
            });

            $el.show();
            _this._afterAction();
            return modalResultPromise;
          };

          _this.close = function (result, isDismissed) {
            delete $rootScope.lastModalTemplateUrl;
            if (modal) {
              modal.deactivate(result, isDismissed);
              owModal.activeCount--;

              if (owModal.activeCount < 0) {
                owModal.activeCount = 0;
              }

              _this._afterAction();
            }
          };

          $public.closeIfNotStrict = function (evt) {
            if (!strictClose) {
              $public.close(evt);
            }
          };

          $public.getTemplateUrl = function () {
            console.log("getTemplateUrl called. returning", modal.templateUrl);
            return modal.templateUrl;
          };

          $public.openReviews = function () {
            // Find the reviews tab's anchor element. Note that if the html
            // changes, we need to change this string as well...
            const reviewsAnchor = $el.find("nav ul li:nth-child(2) a");
            if (reviewsAnchor.length <= 0) {
              return;
            }

            reviewsAnchor.click();
          };

          _this._afterAction = function () {
            console.log("AFTER ACTION FOR MODAL");
            if (owModal.activeCount > 0) {
              _this.disableScroll();
            } else {
              _this.enableScroll();
            }
          };

          _this._onDocumentWheel = function (event) {
            event.preventDefault();
          };

          _this.disableScroll = function () {
            $win.on('mousewheel', _this._onDocumentWheel);
            $document.on('mousewheel', _this._onDocumentWheel);
          };

          _this.enableScroll = function () {
            $win.off('mousewheel', _this._onDocumentWheel);
            $document.off('mousewheel', _this._onDocumentWheel);
          };

          _this.onKeyDownEscape = function (event) {
            if (event.keyCode === 27 && !strictClose) {
              // ESC key code
              var bigSliderBg = document.getElementsByClassName('big-slider-bg')[0];
              if (!bigSliderBg) {
                _this.close(null, true);
                $scope.$digest();
                return;
              }

              var isSliderExpanded = bigSliderBg.classList.contains('is-active');
              if (isSliderExpanded) {
                $rootScope.appModalScope.showLargeSlide = false;
                $rootScope.appModalScope.showSmallSlide = true;
                bigSliderBg.classList.remove('is-active');
                var appPage = document.getElementsByClassName('app-page')[0];
                if (appPage) {
                  appPage.classList.remove('hide-me-in-small-screen');
                }
                $scope.$digest();
              } else {
                _this.close(null, true);
                $scope.$digest();
              }

            }
          };

          $body.on('keydown', _this.onKeyDownEscape);

          $rootScope.$on('owModal.open', function (event, options) {
            if (options.container === containerName) {
              if (options.templateUrl) {
                _this.open(options.templateUrl, options.controllerScopeParams, options);
              }
              else if (options.template) {
                _this.open({ template: options.template }, options.controllerScopeParams);
              }
            }

            strictClose = options.strictClose || false;


          });

          $scope.$on('$destroy', function () {
            _this.close(null, true);
            $body.off('keydown', _this.onKeyDownEscape);
          });

          $scope.$on("closeAllModals", function () {
            console.log("close all recieved");
            if (typeof options == 'undefined' || !options.strictClose) {
              $public.close();
            }
          });

          OWModalService.registerModal(containerName, _this.open);
        }
      };
    });

})(angular);
