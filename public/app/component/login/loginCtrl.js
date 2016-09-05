angular.module('smarthome')
  .controller('loginCtrl', function ($scope, $state, loginService) {
      $scope.localLogin = function () {
        loginService.login($scope.email, $scope.password);
      }
      $scope.createLocalUser = function () {
        loginService.createLocalUser($scope.signup-name, $scope.signup-email,
          $scope.signup-password, $scope.signup-phone);
      }
  })
