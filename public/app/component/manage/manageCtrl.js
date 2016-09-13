angular.module('smarthome')
  .controller('manageCtrl', ($scope, manageService, user) => {

    (() => {
      manageService.getDevices().then(response => {
        $scope.devices = response;
      });
    })();

  }); //End manageCtrl
