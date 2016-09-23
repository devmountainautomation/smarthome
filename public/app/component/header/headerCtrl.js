angular.module('smarthome')
  .controller('headerCtrl', (headerSrvc, $scope, $state, $location, $anchorScroll, $window) => {

    $scope.scrollTo = (id) => {
      $location.hash(id);
      $('#hamburger').toggleClass('open');
      $('#menu').toggle('slide', 'left', 500);
      $('body').toggleClass('menu-open');
      $anchorScroll();

    }

    (() => {
      headerSrvc.getUser().then(response => {
        $scope.user = response.data;
      });
    })();

    $scope.logout = () => {
      headerSrvc.logout().then(response => {
        swal("Success!", "Logout Successful!", "success");
            $state.go('landing page');
            $window.location.reload();
      });
    };

    $scope.updateMe = (updateUser) => {
      headerSrvc.updateMe(updateUser).then(response => {
        if (response.status === 200) {
          $('.user-update').hide(300);
          $('body').css('overflow', 'auto');
          swal("Success!", "Your Information Has Been Saved!", "success");
        } else {
          swal("Error!", "Hmm...Something Wasn't Right", "error");
        }
      });
    };

    $scope.deleteUser = () => {
      swal({
        title: 'Are you sure?',
        text: "We'd Hate To See You Go.",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false
      }).then(() => {
        headerSrvc.deleteUser().then(results => {
          if (results.status === 200) {
            swal(
              'Deleted!',
              'Your Account Has Been Deleted.',
              'success'
            );
            $state.go('landing page');
          } else {
            swal('Hmm, There Was An Issue.', 'Please Try That Again.', 'error');
          }
        });
      }, function(dismiss) {
        if (dismiss === 'cancel') {
          swal(
            'Cancelled',
            'Your Account Is Safe!',
            'error'
          );
        }
      });
    };

}); //End headerCtrl
