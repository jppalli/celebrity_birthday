/**
 * Created on 25/05/2017.
 * for top-blur, part of the Game Centric changes
 */

(function (angular) {
  'use strict';

  angular.module('overwolf')
    .directive('owBackgroundBlur', function ($routeParams, $rootScope, $route, $document) {
      return {
        scope: true,
        restrict: 'A',
        link: function (scope, element, attrs) {
          // swap images for appstore-header-background
          var replaceTopBlur = function(section) {
            var root = attrs.backgroundRoot;
            // var src = root + 'images/global/store-bg-blurred.jpg';
            var src = root + '';
            var headerBackground = $document.find('#appstore-header-background');
            var scrollWrapper = $document.find('#dvScrollWrapper');
            var body = angular.element(document.body);

            if (section === 'library') {
              // src = root + 'images/global/library-bg-blurred.jpg';
              src = root + '';
              headerBackground.addClass('appstore-header-background-library');
              // scrollWrapper.addClass('library-section');
              // body.css('background-image', "url('images/global/library-bg.jpg')");
              body.css('background-image', "none");
            } else {
              src = root + 'images/global/store-bg-blurred.jpg';
              // src = root + '';
              headerBackground.removeClass('appstore-header-background-library');
              // scrollWrapper.removeClass('library-section');
              body.css('background-image', "url('/.content/assets/images/store-bg-blurred-header.jpg')");
              // body.css('background-image', "none");
            }
            var newImg = element.find("img:not(.active)");
            var oldImg = element.find("img.active");
            newImg.attr("src", src);
            newImg.addClass("active");
            oldImg.removeClass("active");
          };

          var bgTemplateFileName = "default";

          $rootScope.$on("$routeChangeSuccess", function () {
            if ($route.current && $route.current.$$route.bgSliders === 'library') {
              bgTemplateFileName = $route.current.$$route.bgSliders;
            } else {
              bgTemplateFileName = "default";
            }

            replaceTopBlur(bgTemplateFileName);
          });

        }

      };
    })
})(angular);