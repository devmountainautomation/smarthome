angular.module('smarthome')
  .service('loginService', function ($http) {
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
        })
      }

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
        })
      }
  })
