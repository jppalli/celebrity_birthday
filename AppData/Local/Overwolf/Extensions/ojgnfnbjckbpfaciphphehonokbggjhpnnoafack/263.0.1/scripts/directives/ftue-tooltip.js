/**
 * Created by Yoske on 02/12/2014.
 */

(function (angular) {
    'use strict';

    angular.module('overwolf')
        .directive('owFtueTooltip',
          function ($document, $timeout, $rootScope, TrackingService) {
            if ($rootScope.webMode) {
              return {
                link: function () {}
              };
            }

            return {
                scope: true,
                restrict: 'E',
                templateUrl: '/templates/ftue-tooltip.html',
                link: function (scope, element, attrs) {
                    var button = element.find('#ftue-tooltip-button');
                    var mainWrapper = $document.find('#main-wrapper');
                    var overlay = $document.find('.ftue-overlay');
                    var tooltipContainer = element.find('.ftue-tooltip-container');

                    function removeFtueTooltipElements() {
                      var parentElement = element.parent();
                      var scrollWrapper = $document.find('#dvScrollWrapper');
                      var topYOffset = parseInt(scrollWrapper.attr('scroll-top-y-offset'));
                      scrollWrapper.perfectScrollbar({
                        topYOffset: topYOffset
                      });
                      scrollWrapper.perfectScrollbar('update');
                      parentElement.removeClass('ftue-mode');
                      parentElement.removeClass('ftue-mode-active');
                      mainWrapper.removeClass('disabled');
                      overlay.remove();
                      tooltipContainer.remove();
                      $rootScope.ftueTooltipShowing = false;
                    }

                    function closeButtonClick() {
                      TrackingService.trackOnce('nu_hello_popup_closed');
                      closeFtueTooltip();
                    }

                    function closeFtueTooltip() {
                      removeFtueTooltipElements();
                      localStorage.ftueTooltipShown = true;
                    }

                    function closeFtueWasShown() {
                      OverwolfStore.getIsFirstStoreExecution(isFirstRun => {
                        if (isFirstRun) {
                          return;
                        }

                        closeFtueTooltip();
                      });
                    }

                    function init() {
                      if ($rootScope.webMode) {
                        closeFtueTooltip();
                        return;
                      }                                      

                      // added on 166, do not show the ftue again on update
                      if (!localStorage.ftueTooltipShown) {
                        closeFtueWasShown();
                      }

                      showIfNeeded();

                      // closing ftu modal if we request to navigate
                      // (i.e open sub's, review.. login)
                      $rootScope.$on('owModal.open', function (event, options) {                       
                          if (!$rootScope.ftueTooltipShowing) {
                            return;
                          }

                          if (options && options.section) {
                            console.log("[FTUE] closing ftue due to navigation to:" + options.section)
                            closeFtueTooltip();
                          }
                      });

                      $rootScope.$on('loginModalRequest', function () {
                        if (!$rootScope.ftueTooltipShowing) {
                          return;
                        }
                        console.log("[FTUE] ogin request, closing ftue");
                        closeFtueTooltip();
                      });
                
                      $rootScope.$on('ftue-slides-close', function () {
                        showIfNeeded();
                      });

                      $rootScope.$on('request-ftue-tooltip', function () {
                        showIfNeeded();
                      });

                      $rootScope.$on("closeAllModals", function () {
                        showIfNeeded();
                      });

                      $rootScope.$on("$routeChangeSuccess", function () {
                        console.log('dismissing FTUE tooltip');
                        closeFtueTooltip();
                      });
                    }

                    function showIfNeeded() {
                      if ($rootScope.loginopenState) {
                        return;
                      }

                      var ftueTooltipShown = localStorage.ftueTooltipShown;
                      var parentElement = element.parent();
                      var scrollWrapper = $document.find('#dvScrollWrapper');

                      if (ftueTooltipShown) {
                          closeFtueTooltip();
                          return;
                      }

                      button.off('click', closeButtonClick);
                      overlay.off('click', closeButtonClick);

                      button.on('click', closeButtonClick);
                      overlay.on('click', closeButtonClick);

                      $rootScope.ftueTooltipShowing = true;
                      mainWrapper.addClass('disabled');
                      parentElement.addClass('ftue-mode');
                      scrollWrapper.perfectScrollbar('destroy');

                      TrackingService.trackOnce('nu_hello_popup_vis');

                      $timeout(function () {
                        parentElement.addClass('ftue-mode-active');
                      }, 1200);
                    }

                    function shake(evt) {
                      evt.preventDefault();

                      if (tooltipContainer.hasClass('shake')) {
                          return;
                      }

                      tooltipContainer.addClass('shake');
                      $timeout(function () {
                        tooltipContainer.removeClass('shake');
                      }, 800);
                    }

                    init();
                }
            };
        })
})(angular);