'use strict';

angular.module('smarthome', [ui.router]);
'use strict';

angular.module('smarthome').config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('login', {
    url: '/login',
    templateUrl: './views/login.html'
  });
});
'use strict';

angular.module('smarthome').directive('compareTo', function () {
  return {
    restrict: 'A',
    require: "ngModel",
    scope: {
      otherValue: "=compareTo"
    },
    link: function link(scope, element, attrs, ngModel) {
      ngModel.$validators.compareTo = function (modelValue) {
        return modelValue == scope.otherValue;
      };
      scope.$watch("otherValue", function () {
        ngModel.$validate();
      });
    }
  };
});
'use strict';

angular.module('smarthome').controller('loginCtrl', function ($scope, $state, loginService) {
  $scope.localLogin = function () {
    loginService.login($scope.email, $scope.password);
  };
  $scope.createLocalUser = function () {
    loginService.createLocalUser($scope.signup - name, $scope.signup - email, $scope.signup - password, $scope.signup - phone);
  };
});
'use strict';

angular.module('smarthome').service('loginService', function ($http) {
  this.login = function (email, password) {
    return $http({
      method: 'POST',
      url: '/auth/local',
      data: {
        email: email,
        password: password
      }
    }).then(function (response) {
      return response;
    });
  };

  this.createLocalUser = function (name, email, password, phone) {
    return $http({
      method: 'POST',
      url: '/users',
      data: {
        name: name,
        email: email,
        password: password,
        phone: phone
      }
    }).then(function (response) {
      return response;
    });
  };
});
'use strict';

angular.module('smarthome').directive('signupForm', function ($scope) {
  return {
    restrict: 'E',
    templateUrl: "/components/login/signupForm.html",
    controller: function controller($scope, loginService) {
      $scope.createLocalUser = function () {
        loginService.createLocalUser($scope.signup - name, $scope.signup - email, $scope.signup - password, $scope.signup - phone);
      };
    },
    link: function link(scope, element, attrs) {
      $('#signup-trigger').on('click', function () {
        $('.signup-expander').removeClass('hidden');
      });
    }
  };
});