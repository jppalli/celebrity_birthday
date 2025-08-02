/**
 * Created by Yoske on 16/03/2015.
 */
(function (angular) {
  'use strict';

  angular.module('overwolf')
    .directive('owAutoReadMore', function ($rootScope) {
      return {
        restrict: 'A',
        transclude: true,
        scope: {
          text: "=",
          length: "="
        },
        link: function ($scope, $el, attrs, ctrl, transclude) {


          var isExapnded = false;
          //var autoSplitStrs = getAutomaticallySplittedStrings();

          //$el.append("<span style='display: inline'>" + autoSplitStrs.main +"</span>");
          //if (autoSplitStrs.more) {
          //    $el.append("<span ow-read-more-text style='display: none'>" + autoSplitStrs.more + "</span>");
          //}

          $el.append($scope.text);
          $el.css("max-height", "38px");
          $el.css("overflow-y", "hidden");
          $el.css("word-break", "break-word");

          const readMoreEl = $el.parent().find("[ow-read-more-trigger]:first");

          setTimeout(shouldShowReadMore, 1000);

          function shouldShowReadMore() {
            if ($el.get(0).scrollHeight <= $el.get(0).clientHeight) {
              return;
            }

            readMoreEl.removeAttr('hidden');
            readMoreEl.on("click", toggleReadMoreText);
          }

          function toggleReadMoreText() {
            if (!isExapnded) {
              $el.css("max-height", "");
              readMoreEl.html("Read less");
              isExapnded = true;
              readMoreEl.addClass("less");
            }
            else {
              $el.css("max-height", "38px");
              readMoreEl.html("Read more");
              readMoreEl.removeClass("less");
              // $rootScope.$broadcast("readLessPressed", {scrollToEl: $el});

              isExapnded = false;
            }
          }

          function getAutomaticallySplittedStrings() {
            var originalString = $scope.text;
            if (originalString.length <= $scope.length) {
              return { main: originalString };
            }

            var splitPos = findClosestSplitablePos(originalString, $scope.length);

            return { main: originalString.substring(0, splitPos), more: originalString.substring(splitPos) }

          }

          function findClosestSplitablePos(originalString, desiredSplitPos) {
            var splitableChars = [" ", "\n"];
            for (var i = 0; i < originalString.length; i++) {
              for (var j = 0; j < splitableChars.length; j++) {
                if (originalString.charAt($scope.length + i) == splitableChars[j]) {
                  return $scope.length + i;
                }
                else if (originalString.charAt($scope.length - i) == splitableChars[j]) {
                  return $scope.length - i;
                }
              }
            }

            return desiredSplitPos;
          }

          $scope.$on('$destroy', function () {
            readMoreEl.off("click", toggleReadMoreText);
          });

        }
      };
    });

})(angular);
