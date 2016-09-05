angular.module('smarthome')
  .directive('signupForm', function ($scope) {
    return {
      restrict: 'E',
      templateUrl: "/components/login/signupForm.html",
      controller: function ($scope, loginService) {
        $scope.createLocalUser = function () {
          loginService.createLocalUser($scope.signup-name,
            $scope.signup-email, $scope.signup-password,
            $scope.signup-phone)
          }
        },
        link: function (scope, element, attrs) {
          $('#signup-trigger').on('click', function () {
            $('.signup-expander').removeClass('hidden');
          })
        }
    }
  });
