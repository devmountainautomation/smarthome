angular.module('smarthome')
  .directive('signupForm', () => {
    return {
      restrict: 'E',
      templateUrl: "app/component/login/signupForm.html",
      controller: ($scope, loginService) => {
        $scope.createLocalUser = () => {
          loginService.createLocalUser($scope.signup_name,
            $scope.signup_email, $scope.signup_password,
            $scope.signup_phone);
        }
      },
      link: (scope, element, attrs) => {
        $('#signup-trigger').on('click', () => {
          $('.signup-expander').slideToggle();
        })
        $('#email').on('blur', () => {
          if ($('#email').hasClass('ng-invalid')) {
            $('.email-confirmation-alert').removeClass('hidden');
          }
        })
        $('#email').on('keyup', () => {
          if ($('#email').hasClass('ng-valid')) {
            $('.email-confirmation-alert').addClass('hidden');
          }
        })

      }
    }
  });
