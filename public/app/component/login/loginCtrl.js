angular.module('smarthome')
  .controller('loginCtrl', ($scope, $state, loginService) => {

    $scope.localLogin = (email, password) => {
      loginService.login(email, password).then(response => {
        $state.go('dashboard');
      });
    };

    (() => {
        loginService.getUser().then((response => {
          $scope.user = response.data;
        }));
    })();

    $scope.logout = () => {
      headerSrvc.logout().then((response) => {
        swal("Success!", "Logout Successful!", "success");
        setTimeout(() => {
          if (response) {
            $state.go('landing page');
          }
        }, 1500);
      });
    };

  }); //End loginCtrl
