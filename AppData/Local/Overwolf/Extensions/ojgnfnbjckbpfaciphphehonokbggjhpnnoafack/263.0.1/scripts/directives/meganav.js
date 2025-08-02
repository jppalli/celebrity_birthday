(function(angular) {
  'use strict';

  angular.module('overwolf')
    .directive('owMeganav', function($rootScope, $location, $timeout) {

      // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
      if (!String.prototype.endsWith) {
        String.prototype.endsWith = function(searchString, position) {
          var subjectString = this.toString();
          if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
            position = subjectString.length;
          }
          position -= searchString.length;
          var lastIndex = subjectString.lastIndexOf(searchString, position);
          return lastIndex !== -1 && lastIndex === position;
        };
      }

      var DELAY_IN_MS = 50;

      return {
        restrict: 'A',
        scope: {},
        link: function($scope, element, attrs, ctrl, transclude) {
          var hoverTimeout;
          var collapsedMainSectionElement =
            element.find('.appstore-nav-collapsed .main-section');
          var collapsedLeftSectionElement =
            element.find('.appstore-nav-collapsed .left-section a');
          var collapsedRightSectionElement =
            element.find('.appstore-nav-collapsed .right-section a');

          var meganavLinks = element.find('a');

          function selectActiveLink(path) {
            var i, element, link;

            meganavLinks.removeClass('selected');

            for (i = 0; i < meganavLinks.length; i++) {
              element = angular.element(meganavLinks[i]);
              link = element.attr('href');

              if (link.endsWith(path) ||
                ((link === '/') && (path === '/index.html'))) {
                element.addClass('selected');
              }
            }
          }

          function addActiveClassDelayed() {
            $timeout.cancel(hoverTimeout);
            hoverTimeout = $timeout(function(){
              element.addClass("active");
            }, DELAY_IN_MS);
          }

          function removeActiveClass() {
            $timeout.cancel(hoverTimeout);
            element.removeClass('active');
          }

          function trackSearchClicked() {
            if (typeof(mixpanel) !== 'undefined') {
              mixpanel.track('appstore_searchpage_initialized', {
                'Platform': window.storePlatform
              });
            }
          }

          collapsedMainSectionElement.on('mouseover mousemove', addActiveClassDelayed);
          collapsedLeftSectionElement.on('mouseover mousemove', addActiveClassDelayed);

          element.on('mouseleave', removeActiveClass);
          collapsedRightSectionElement.on("click", removeActiveClass);
          collapsedRightSectionElement.on("click", trackSearchClicked);

          // collapsedMainSectionElement.on('mouseleave', removeActiveClass);
          // collapsedLeftSectionElement.on('mouseleave', removeActiveClass);

          $rootScope.$on("$routeChangeSuccess", function (event, current, prev) {
            selectActiveLink($location.path());
            element.removeClass('active');
          });

          $rootScope.$watch("navBarLoaded", function () {
            selectActiveLink($location.path());
          });

        }
      }
    });
})(angular);