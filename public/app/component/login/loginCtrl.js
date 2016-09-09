angular.module('smarthome')
  .controller('loginCtrl', ($scope, $state, loginService) => {

    $scope.localLogin = (email, password) => {
      loginService.login(email, password).then(response => {
        $state.go('landing page');
      });
    };
  }); //End loginCtrl
