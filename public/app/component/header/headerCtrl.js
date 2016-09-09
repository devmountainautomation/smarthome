angular.module('smarthome')
  .controller('headerCtrl', (headerSrvc, $scope, $state) => {

    // $scope.user = user.data;
    // console.log($scope.user);

    $scope.logout = () => {
      console.log('hit');
      headerSrvc.logout().then((response) => {
        swal("Success!", "Logout Successful!", "success");
        setTimeout(() => {
          if (response) {
            $state.go('landing page');
          }
        }, 1500);
      });
    };

  });
