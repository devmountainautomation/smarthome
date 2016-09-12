angular.module('smarthome')
  .controller('headerCtrl', (headerSrvc, $scope, $state, $rootScope) => {

    (() => {
      headerSrvc.getUser().then((response => {
        $scope.user = response.data;
        console.log($scope.user);
      }));
    })();

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

    $scope.updateMe = (updateUser) => {
      headerSrvc.updateMe(updateUser).then(response => {
        if (response.status === 200) {
          $('.user-update').hide(300);
          swal("Success!", "Your Information Has Been Saved!", "success");
        } else {
          swal("Error!", "Hmm...Something Wasn't Right", "error");
        }
      });
    };

  });
