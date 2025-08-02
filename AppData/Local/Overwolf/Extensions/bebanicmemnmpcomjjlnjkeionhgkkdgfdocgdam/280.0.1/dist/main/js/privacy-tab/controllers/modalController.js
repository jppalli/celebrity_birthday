angular.module('PrivacyControlPanel')
  .controller('ModalController', function($scope, $rootScope, $filter, AccountService) {

    let _filter = $filter("translate");

    $scope.active = false;
    $scope.type = "";
    $scope.title = "";
    $scope.message = "";
    $scope.buttonText = "";
    $scope.hideCancel = true,

    $scope.modals = {
      requestData: {
        title: _filter("requestYourDataTitle"),
        message: _filter("requestDataModalText"),
        button: _filter("requestYourDataBtn"),
        buttonDisabled: false,
        hideCancel: false,
        action: _doRequestData
      },
      deleteAccount: {
        title: _filter("deleteAcccountModalTitle"),
        message: _filter("deleteAcccountModalText"),
        button: _filter("deleteAcccountModalButton"),
        buttonDisabled: false,
        hideCancel: false,
        action: _doDeleteAccount
      },
      changeHowWeUseYourDataPerformance: {
        title: _filter("changeHowWeUseYourDataPerformanceModalTitle"),
        message: _filter("changeHowWeUseYourDataPerformanceModalText"),
        button: _filter("generalYes"),
        buttonDisabled: false,
        hideCancel: false,
        action: _doEnableHowWeUseYourDataPerformance,
        cancel: _doCancelHowWeUseYourDataPerformance
      },
      doNotSellOrShareMyPersonalInformation: {
        title: _filter("doNotSellOrShareMyPersonalInformationTitle"),
        message: _filter("doNotSellOrShareMyPersonalInformationModalText"),
        button: _filter("generalContinue"),
        buttonDisabled: false,
        hideCancel: true,
        action: _doNotSellOrShareMyPersonalInformation,
        cancel: _doCancelNotSellOrShareMyPersonalInformation
      },
      changeHowWeUseYourDataUsage: {
        title: _filter("changeHowWeUseYourDataUsageModalTitle"),
        message: _filter("changeHowWeUseYourDataUsageModalText"),
        button: _filter("generalYes"),
        buttonDisabled: false,
        hideCancel: false,
        action: _doEnableHowWeUseYourDataUsage,
        cancel: _doCancelHowWeUseYourDataUsage
      }
    };

    $scope.onClickConfirm = function () {
      if($scope.modals[$scope.type]) {
        $scope.modals[$scope.type].buttonDisabled = true;
        $scope.buttonDisabled = true;

        let action = $scope.modals[$scope.type].action;
        if(action) {
          action(_reset);
        }
      }
    };

    $scope.onClickCancel = function () {
      const modal = $scope.modals[$scope.type];
      if (modal && modal.cancel) {
        modal.cancel();
      }

      _reset();
    };

    $scope.closeModal = function () {
      const modal = $scope.modals[$scope.type];
      if (modal && modal.cancel) {
        modal.cancel();
      }

      _reset();
    };

    $rootScope.$on("showModal", function (evt, type) {
      if($scope.modals[type]){
        $scope.active = true;
        $scope.type = type;
        $scope.title = $scope.modals[type].title;
        $scope.message = $scope.modals[type].message;
        $scope.buttonText = $scope.modals[type].button;
        $scope.buttonDisabled = $scope.modals[type].buttonDisabled;
        $scope.hideCancel = $scope.modals[type].hideCancel;
      }
    });

    function _reset() {
      $scope.active = false;
      setTimeout(function () {
        let type = $scope.type;
        $scope.type = "";
        $scope.title = "";
        $scope.message = "";
        $scope.buttonText = "";
        $scope.buttonDisabled = false;
        $scope.modals[type].buttonDisabled = false;
        $scope.hideCancel = true;
      }, 100);
    }

    function _doRequestData(callback) {
      AccountService.requestAccountData(function (result) {
        $rootScope.$broadcast("requestAccountDataSent",
          {success: result.success, date: result.date});
        callback();
      });
    }

    function _doDeleteAccount(callback) {
      AccountService.deleteAccount(function (success) {
        $rootScope.$broadcast("deleteAccountSent", {success});
        callback();
      });
    }

    function _doEnableHowWeUseYourDataPerformance(callback) {
      $rootScope.$broadcast("onHowWeUseYourDataPerformanceDisabled");
      callback();
    }

    function _doCancelHowWeUseYourDataPerformance() {
      $rootScope.$broadcast("onHowWeUseYourDataPerformanceCancelled");
    }

    function _doNotSellOrShareMyPersonalInformation (callback) {
      $rootScope.$broadcast("onNotSellOrShareMyPersonalInformationEnabled");
      callback();
    }

    function _doCancelNotSellOrShareMyPersonalInformation () {
      $rootScope.$broadcast("onNotSellOrShareMyPersonalInformationCanceled");
    }

    function _doEnableHowWeUseYourDataUsage(callback) {
      $rootScope.$broadcast("onHowWeUseYourDataUsageDisabled");
      callback();
    }

    function _doCancelHowWeUseYourDataUsage() {
      $rootScope.$broadcast("onHowWeUseYourDataUsageCancelled");
    }
  });

