(function (angular) {
  'use strict';

  angular.module('overwolf')
    .directive('owSlider', function ($interval, $rootScope, TrackingService,
                                     GeolocationService) {
      return {
        restrict: 'A',
        transclude: true,
        scope: {
          slides: "=owSlider",
        },
        controller: function ($scope) {
          let _largeSliderModalBg =
            angular.element(document.querySelector('.big-slider-bg'));
          let _appPagePopUp =
            angular.element(document.querySelector('.app-page'));
          var _this = this,
            $public = null,
            autoRotate = true,
            slides,
            sliderBlurElement,
            rotator,
            wasAutoRotateOnBeforeGameStart,
            current,

          // create namespace for current directive
          $public = $scope.owSlider || ($scope.owSlider = {});
          $public.animation = 'next';

          $scope.serverBase = $rootScope.serverBase;

          _this.runGeoFiltering = function () {
            if (!GeolocationService.currentUserCountry) {
              // geolocation data still not available - retry
              setTimeout(function () {
                _this.runGeoFiltering();
              }, 500);
              return;
            }

            slides = _this.filterGeo($public.slides);
            $public.slides = slides;
          };

          _this.filterGeo = function (list) {
            let filteredList = list.slice(); // copy array
            for (let i = 0; i < list.length; i++) {
              let item = list[i];
              if (!item.geoFilter) {
                continue;
              }

              // we assume there are no real async calls at this
              // point
              let shouldShow = GeolocationService.shouldShowToUsersGeoSync(item.geoFilter);
              if (!shouldShow) {
                filteredList[i] = null;
              }
            }

            filteredList = filteredList.filter(item => item); // filter nulls

            return filteredList;
          };

          _this.init = function (list, interval, blurElement) {
            if (list) {
              
              // Not displaying website only carousel items on the client appstore
              if (window.storePlatform !== 'Web') {
                list = list.filter((slide) => !slide.websiteOnly)
              }
              // _largeSliderModalBg =
              //   angular.element(document.querySelector('big-slider-bg'));
              // _appPagePopUp =
              //   angular.element(document.querySelector('modal-page'));

              list.forEach(function (slide) {
                var style = [];
                if (slide.style) {
                  style.push('btn-' + slide.style);
                }
                slide.style = style;
              });

              slides = list;
              $scope.pendingAssestsPreload = slides.length;
              $public.slides = slides;
              _this.runGeoFiltering();

              _this.interval = interval;

              // dudu: 22/05/2017 - Game Centric Store iteration 105
              // weird behavior here - the link function is called
              // twice (like a double directive is present)
              // so the blur function of the ow-slide when it is
              // marked as active is called twice and cause the new
              // blur to skip the animation.
              // i couldn't find the reason for the double-link
              // but the controller will be present only once so  we
              // expose the blur element via the controller as a workaround
              if (blurElement) {
                // will be public
                _this.sliderBlurElement =
                  angular.element(document.getElementById(blurElement));
              }

              // When the user choses to expand/collapse the
              // slider, we want him to be on the same slide. Will
              // be reset to -1 when the app modal closes
              let index = 0;
              if ($rootScope.appModalLastSlideIndex) {
                // In some cases, the last index is out of bounds
                $rootScope.appModalLastSlideIndex =
                  Math.min(slides.length -1,
                    $rootScope.appModalLastSlideIndex);

                index = Math.max(0, $rootScope.appModalLastSlideIndex);
              }
              _this.select(slides[index]);
              _this.stopAutoRotate();
              _this.startAutoRotate();
              setTimeout(function () {
                if (jQuery("#atf-slider-container").length > 0) {
                  window.jQuery("#atf-slider-container")[0].style.display = 'none';
                }
              }, 1000);

              OverwolfStore.games.onRunningGameDataUpdated.addListener(_this.stopIfGameRunning);
            }
          };

          _this.showBigSlider = function () {
            $rootScope.appModalScope.showLargeSlide = true;
            $rootScope.appModalScope.showSmallSlide = false;
            _largeSliderModalBg.addClass('is-active');

            // hide app page container when big slider is open and in the
            // smallest screen size
            _appPagePopUp.addClass('hide-me-in-small-screen');
          };

          _this.hideBigSlider = function () {
            $rootScope.appModalScope.showLargeSlide = false;
            $rootScope.appModalScope.showSmallSlide = true;

            _largeSliderModalBg.removeClass('is-active');
            _appPagePopUp.removeClass('hide-me-in-small-screen');
          };

          _this.stopIfGameRunning = function (info) {
            if (info.runningGameData) {
              wasAutoRotateOnBeforeGameStart = autoRotate;
              _this.stopAutoRotate()
            } else {
              if (wasAutoRotateOnBeforeGameStart) {
                _this.startAutoRotate();
              }
            }
          };

          _this.startAutoRotate = function (interval) {
            if (autoRotate) {
              rotator = $interval(_this.next, _this.interval || 5000);
            }
          };

          _this.stopAutoRotate = function (forever) {
            if (!angular.isUndefined(forever)) {
              autoRotate = !forever;
            }
            $interval.cancel(rotator);
          };


          _this.select = function (slideToSelect) {
            let lastIndex = 0;
            slides.forEach((slide, index) => {
              slide.active = false;
              if (slide === slideToSelect) {
                lastIndex = index;
              }
            });
            slideToSelect.active = true;
            current = slideToSelect;
            $rootScope.appModalLastSlideIndex = lastIndex;
          };

          _this.prev = function () {
            var ind = _this.index();
            ind = (ind - 1 + slides.length) % slides.length;
            _this.select(slides[ind]);
          };

          _this.next = function () {
            var ind = _this.index();
            if (ind == slides.length - 1 && typeof $scope.finishedSlidesRound == "function") {//there must be a nicer way to do this than to call parent scope function. find it.
              $scope.finishedSlidesRound();
            }
            ind = (ind + 1) % slides.length;
            _this.select(slides[ind]);
          };

          _this.index = function () {
            return slides.indexOf(current);
          };

          $public.startAutoRotate = _this.startAutoRotate;
          $public.stopAutoRotate = _this.stopAutoRotate;


          $public.trackCarouselClick = function (url) {
            let extra = {
              url,
          }

            TrackingService.trackEvent("Carousel", "click", null, null, null, extra);
          };


          $public.select = function (slide) {
            $public.animation = 'next';
            _this.stopAutoRotate(true);
            _this.select(slide);
          };

          $public.showBigSlider = function (event) {
            _this.showBigSlider();
            event && event.preventDefault();
          }

          $public.hideBigSlider = function (event) {
            _this.hideBigSlider();
            event && event.preventDefault();
          }

          $public.prev = function (event) {
            $public.animation = 'prev';
            _this.stopAutoRotate(true);
            _this.prev();
            event && event.preventDefault();
          };

          $public.nextWithoutStopping = function () {
            _this.stopAutoRotate(false);
            $public.animation = 'next';
            _this.next();

          }

          $public.next = function (event) {
            $public.animation = 'next';
            _this.stopAutoRotate(true);
            _this.next();
            event && event.preventDefault();
          };


          $scope.$on('$destroy', function () {
            _this.stopAutoRotate();
            OverwolfStore.games.onRunningGameDataUpdated.removeListener(_this.stopIfGameRunning);
          });
        },
        link: function ($scope, $el, attrs, ctrl, transclude) {
          var transcludedContent;
          var transcludedScope;

          // ctrl.init($scope.slides, attrs.owSliderInterval, attrs.owSliderBlurElement);
          $scope.$watch(attrs.owSlider, function (value) {
            ctrl.init(value, attrs.owSliderInterval, attrs.owSliderBlurElement);
          });

          $scope.$watch(attrs.owSliderActive, function (value) {
            if (!angular.isUndefined(value)) {
              ctrl.stopAutoRotate();
              if (value) {
                ctrl.startAutoRotate();
              }
            }
          });

          $scope.$watch('owSlider.animation', function (newValue, prevValue) {
            prevValue && $el.removeClass('ow-slider-animation-' + prevValue);
            newValue && $el.addClass('ow-slider-animation-' + newValue);
          });


          if (attrs.scrollPauseElement) {
            var scrollElement = angular.element(document.getElementById(attrs.scrollPauseElement));
            scrollElement.on("scroll", toggleScrollPause);

            $scope.$on("$destroy", function () {
              scrollElement.off("scroll", toggleScrollPause)
            });
          }


          transclude($scope, function (clone, scopee) {
            transcludedContent = clone;
            transcludedScope = scopee;

            $el.append(clone);


          });

          $scope.$parent.$on("$destroy", function () {
            if (transcludedScope) {
              transcludedScope.$destroy();
              transcludedScope = null;
            }
            transcludedContent.remove();


          });

          function toggleScrollPause() {
            if (scrollElement.scrollTop() == 0) {
              ctrl.startAutoRotate();
            } else {
              ctrl.stopAutoRotate();
            }
          }
        }
      };
    });

})(angular);
