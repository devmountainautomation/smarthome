angular.module('smarthome')
  .controller('landingCtrl', (landingSrvc, $scope, $state) => {

    $scope.getUser = () => {
      landingSrvc.getUser().then((user) => {
        $scope.user = user;
      });
    };
  });
