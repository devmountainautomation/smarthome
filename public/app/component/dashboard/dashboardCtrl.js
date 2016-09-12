angular.module('smarthome')
  .controller('dashboardCtrl', ($scope, dashboardSrvc) => {

    (() => {
        dashboardSrvc.getUser().then((response => {
          $scope.user = response.data;
        }));
    })();



  });
