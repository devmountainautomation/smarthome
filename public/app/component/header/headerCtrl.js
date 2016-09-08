angular.module('smarthome')
  .controller('headerCtrl', (headerSrvc, $scope) => {

    $scope.logout = () => {
      console.log('hit');
            sidebarSrvc.logout().then((response) => {
                swal("Success!", "Logout Successful!", "success");
                setTimeout(() => {
                    if (response) {
                        $state.go('landing page');
                    }
                }, 1500);
            });
        };

  });
