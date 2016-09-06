angular.module('smarthome')
  .directive('signupForm', function () {
    return {
      restrict: 'E',
      templateUrl: "app/component/login/signupForm.html",
      controller: function ($scope, loginService) {
        $scope.createLocalUser = function () {
          loginService.createLocalUser($scope.signup_name,
            $scope.signup_email, $scope.signup_password,
            $scope.signup_phone)
          }
        },
        link: function (scope, element, attrs) {
          $('#signup-trigger').on('click', function () {
            $('.signup-expander').slideToggle();
          })
          $('#email').on('blur', function () {
            if ($('#email').hasClass('ng-invalid')) {
              $('.email-confirmation-alert').removeClass('hidden');
            }
          })
          $('#email').on('keyup', function () {
            if ($('#email').hasClass('ng-valid')) {
              $('.email-confirmation-alert').addClass('hidden');
            }
          })

        }
    }
  });
