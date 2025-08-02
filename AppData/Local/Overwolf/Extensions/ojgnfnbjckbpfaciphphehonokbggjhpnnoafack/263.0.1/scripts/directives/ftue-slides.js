(function(angular) {
  'use strict';

  angular.module('overwolf')
    .directive('owFtueSlides', function($rootScope, $location, $timeout, TrackingService) {

      return {
        restrict: 'A',
        link: function($scope, element, attrs, ctrl, transclude) {
          // var nextSlide = document.getElementById('next-slide');
          // var previousSlide = document.getElementById('previous-slide');
          var nextSlide = element.find('#next-slide');
          var previousSlide = element.find('#previous-slide');
          var closeFtueButton = element.find('#close-ftue');
          var inputElement = element.find('input');

          var allSlides = document.getElementsByClassName('ftue-slide');
          var ftueFooter = document.getElementsByClassName('ftue-footer');
          var allPags = document.getElementById('intro-slides').getElementsByClassName('pag');
          var lastSlideVideo = element.find('.last-slide-video');
          var videoTimeout;

          function closeSlidesModal() {
            $scope.owModal.close();
            $rootScope.removeSplash();
            $rootScope.$broadcast('ftue-slides-close');
            $rootScope.ftueActive = false;
          }

          function updateSlidesElements(){
            if ($scope.ftue.page === 1) {
              ftueFooter[0].classList.add('first-slide');
            }

            if ($scope.ftue.page > 1) {
              ftueFooter[0].classList.remove('first-slide');
            }

            if ($scope.ftue.page !== $scope.ftue.lastPage) {
              ftueFooter[0].classList.remove('last-slide');
              nextSlide.text('Next');
              $timeout.cancel(videoTimeout);
              lastSlideVideo.removeClass('active');
            }

            if ($scope.ftue.page === $scope.ftue.lastPage) {
              ftueFooter[0].classList.add('last-slide');
              nextSlide.text('Get started');

              videoTimeout = $timeout(function() {
                lastSlideVideo.addClass('active');
              }, 1000);
            }
          }

          function updatePage(){

            for (var i = 0; i < allPags.length; i++) {
              allPags[i].classList.remove('pag-active');
            }

            allPags[$scope.ftue.page-1].className += ' pag-active';

            var translateToCurrentSlide = (($scope.ftue.page - 1) * -100);

            for (i = 0; i < allSlides.length; i++) {
              allSlides[i].style.transform = "translateX(" + translateToCurrentSlide + "%)";
            }

            updateSlidesElements();

          }

          function advanceToNextSlide(){
            allPags[$scope.ftue.page-2].classList.remove('pag-active');
            allPags[$scope.ftue.page-1].classList.add('pag-active');

            var translateToNextSlide = (($scope.ftue.page - 1) * -100);

            for (i = 0; i < allSlides.length; i++) {
              allSlides[i].style.transform = "translateX(" + translateToNextSlide + "%)";
            }

            updateSlidesElements();

          }

          function advanceToPreviousSlide(){
            allPags[$scope.ftue.page-1].classList.add('pag-active');
            allPags[$scope.ftue.page].classList.remove('pag-active');

            var translateToPreviousSlide = (($scope.ftue.page - 1) * -100);

            for (i = 0; i < allSlides.length; i++) {
              allSlides[i].style.transform = "translateX(" + translateToPreviousSlide + "%)";
            }

            updateSlidesElements();
          }

          nextSlide.on('click', function() {
            if ($scope.ftue.page < $scope.ftue.lastPage) {
              $scope.$apply($scope.incrFtuePage);
            } else {
              TrackingService.trackOnce('nu_welcome_finish', {closeMethod: 'get started'});
              closeSlidesModal();
            }
          });

          previousSlide.on('click', function() {
            $scope.$apply($scope.decrFtuePage);
          });

          closeFtueButton.on('click', function() {
            if ($scope.ftue.page === $scope.ftue.lastPage) {
              TrackingService.trackOnce('nu_welcome_finish', {closeMethod: 'x'});
            } else {
              TrackingService.trackOnce('nu_welcome_abort', {lastSlideVisible: $scope.ftue.page});
            }
            closeSlidesModal();
          });

          $scope.$watch('ftue.active', function (newValue) {
            if (newValue) {
              inputElement.focus();
              element.addClass('active');
            } else {
              element.removeClass('active');
            }
          });

          $scope.$watch('ftue.page', function (newValue, oldValue) {
            if ((newValue < oldValue) && (newValue >= 0)) {
              advanceToPreviousSlide();
            }

            if ((newValue > oldValue) && (newValue <= $scope.ftue.lastPage)) {
              advanceToNextSlide();
            }
          });

          for (var i = 0; i < allPags.length; i++) {
            allPags[i].onclick = (function(n) {
              n++;
              return function(e) {
                $scope.ftue.page = n;
                updatePage();
              };
            })(i);
          }

        }
      }
    });
})(angular);