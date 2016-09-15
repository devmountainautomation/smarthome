angular.module('smarthome')
  .controller('dashboardCtrl', ($scope, dashboardSrvc) => {

    (() => {
      dashboardSrvc.getUser().then((response => {
        $scope.user = response.data;
      }));
      dashboardSrvc.getNotifications().then(response => {
        $scope.notes = response.data;
      });
    })();

    $scope.getNotifications = () => {
      dashboardSrvc.getNotifications().then(response => {
        $scope.notes = response.data;
      });
    };

    $scope.updateNote = (id) => {
      dashboardSrvc.updateNote(id).then(response => {
        if (response.status === 200) {
              $('#' + id).addClass('slide-out');
          setTimeout(() => {
            $scope.getNotifications();
          }, 800);
        } else {
          console.log(response);
          swal('Error', 'Hmm, something happened. Please Try Again.', 'error');
        }
      });
    };

  });
