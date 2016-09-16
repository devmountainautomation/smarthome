angular.module('smarthome')
  .service('aboutSrvc', function($http) {

    this.getUser = () => {
      return $http.get('/me');
    };
    
  });
