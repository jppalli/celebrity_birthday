(function (angular) {
  'use strict';

  angular.module('overwolf')
    .controller('ProfileController',['$scope', 'UserService',
      function ($scope, UserService) {

      let _this = this;
      $scope.active = false;
      $scope.state = 'profile';

      $scope.service = UserService;

      _this._doClose = function() {
        $scope.active = false;
        localStorage["FirstLogin"] = "false";
        $scope.owModal.close();
      };

      _this.init = function () {
        if (localStorage["FirstLogin"] == "false") return;

        OverwolfStore.requestFocus();

        OverwolfStore.login.getCurrentUser((res) => {
          if (res.status != "success") {
            return;
          }

          const profileModal = document.querySelector('.profile-username-edit-modal');
          profileModal.querySelector('h1').innerHTML = 'Welcome ' + res.profile.nickname;
          profileModal.querySelector('img').src = res.profile.avatar;
          profileModal.parentElement.classList.add('is-active');
          document.querySelector('.edit-profile-tooltip').classList.add('is-open');
        });
      };

      $scope.manageUserAccount = () => {
        OverwolfStore.login.openProfileEditor();
        $scope.closeModal();
      };

      $scope.closeModal = () => {
        setTimeout(function () {
          document.querySelector('.edit-profile-tooltip').classList.remove('is-open');
        // Setting localStorage FirstLogin to false, this will make sure
        // it would be presented only once.
          localStorage["FirstLogin"] = "false";
         }, 5000);

         _this._doClose();
      };

      $scope.$watch("service.isLoggedIn", function(newVal,oldVal){
        if (typeof newVal !== 'undefined' && newVal !== null && newVal) {
          _this.init();
        }
      });
    }]);

})(angular);
