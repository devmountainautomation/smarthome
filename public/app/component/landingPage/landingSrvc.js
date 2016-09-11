angular.module('smarthome')
  .service('landingSrvc', function($http) {

    this.getUser = () => {
      return $http.get('/me');
    };

  });
