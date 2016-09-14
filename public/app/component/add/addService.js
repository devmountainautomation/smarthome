angular.module('smarthome')
  .service('addService', function ($http) {
    this.addDevice = function (settings) {
      console.log(settings);
      return $http({
        method: 'POST',
        url: '/sensors',
        data: settings
      }).then(response => {
        return response;
      });
    };
    this.addBreech = function (settings) {
      console.log(settings);
      return $http({
        method: 'POST',
        url: '/settings/breech',
        data: settings
      }).then(response => {
        return response;
      });
    };

  });
