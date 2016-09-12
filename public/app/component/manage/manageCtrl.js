angular.module('smarthome')
  .controller('manageCtrl', ($scope, manageService, user) => {

    $scope.user = user.data;

    (() => {
      manageService.getDevices().then(response => {
        $scope.devices = response;
      });
    })();

  }); //End manageCtrl
