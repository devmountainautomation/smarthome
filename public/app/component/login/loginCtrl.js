angular.module('smarthome')
  .controller('loginCtrl', ($scope, $state, loginService) => {

    $scope.localLogin = (email, password) => {
      loginService.login(email, password).then(response => {
        $state.go('landing page');
      });
    };

    $scope.createLocalUser = (name, email, password, phone) => {
      loginService.createLocalUser(name, email, password, phone);
    };

  }); //End loginCtrl
