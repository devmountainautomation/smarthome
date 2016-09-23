angular.module('smarthome')
  .service('loginService', function($http, $state) {
    this.login = (email, password) => {
      return $http({
        method: 'POST',
        url: '/auth/local',
        data: {
          username: email,
          password: password
        }
      }).then(response => {
        return response.data.redirect;
      });
    };

    this.createLocalUser = (name, email, password, phone) => {
      return $http({
        method: 'POST',
        url: '/users',
        data: {
          name: name,
          email: email,
          password: password,
          phone: phone
        }
      }).then(response => {
        $state.go('landing page');
      });
    };

    this.getUser = () => {
      return $http.get('/me');
    };

  }); //End loginService
