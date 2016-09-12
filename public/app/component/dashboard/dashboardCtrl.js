angular.module('smarthome')
  .controller('dashboardCtrl', ($scope, dashboardSrvc) => {

    (() => {
      dashboardSrvc.getUser().then((response => {
        $scope.user = response.data;
      }));
    })();

  //   $scope.getNotifications = () => {
  //     dashboardSrvc.getNotifications().then(response => {
  //       $scope.notes = response.data;
  //     });
  //   };
  // });
  // $scope.getNotifications();
  //
  // $scope.updateNote = (id) => {
  //   dashboardSrvc.updateNote(id).then(response => {
  //     if (response) {
  //       $('#' + id).fadeOut().toggle('slide', 'left');
  //       $scope.getNotifications();
  //     }
  //     else {
  //       swal('Error', 'Hmm, something happened. Please Try Again.', 'error');
  //     }
  //   });
  // };



});
