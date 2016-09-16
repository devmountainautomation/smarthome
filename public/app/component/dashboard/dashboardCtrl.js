angular.module('smarthome')
  .controller('dashboardCtrl', ($scope, dashboardSrvc) => {

    (() => {
      dashboardSrvc.getUser().then((response => {
        $scope.user = response.data;
      }));
    })();

    $scope.getNotifications = () => {
      dashboardSrvc.getNotifications().then(response => {
        $scope.notes = response.data;
        if(response.data.length < 1) {
          $('.notifications').css('display', 'none');
          $('.no-notes').removeClass('hidden');
        }
        else if(response.data.length >= 1) {
          $('.notifications').css('display', 'block');
          $('.no-notes').addClass('hidden');
        }
      });
    };

    $scope.getNotifications();

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
