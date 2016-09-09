angular.module('smarthome')
  .controller('manageCtrl', ($scope, manageService) => {

    (() => {
      manageService.getDevices().then(response => {
        $scope.devices = response;
      })
    })();

  }); //End manageCtrl
