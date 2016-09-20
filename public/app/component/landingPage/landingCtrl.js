angular.module('smarthome')
  .controller('landingCtrl', (landingSrvc, $scope) => {

    (() => {
      landingSrvc.getUser().then((response => {
        $scope.user = response.data;
      }));
    })();

  });
