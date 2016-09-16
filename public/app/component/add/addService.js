angular.module('smarthome')
  .service('addService', function($http) {

    this.addDevice = settings => {
      return $http({
        method: 'POST',
        url: '/sensors/breech',
        data: settings
      }).then(response => {
        return response;
      });
    };

    this.addBreech = settings => {
      return $http({
        method: 'POST',
        url: '/settings/breech',
        data: settings
      }).then(response => {
        return response;
      });
    };

    this.getUser = () => {
      return $http.get('/me');
    };

  });
