angular.module('smarthome')
  .controller('manageCtrl', ($scope, manageService) => {

    (() => {
      manageService.getDevices().then(response => {
        $scope.devices = response;
      });
    })();

    (() => {
      manageService.getUser().then((response => {
        $scope.user = response.data;
      }));
    })();

  }); //End manageCtrl
