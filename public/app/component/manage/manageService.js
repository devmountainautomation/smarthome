angular.module('smarthome')
  .service('manageService', function($http) {

    this.getDevices = () => {
      return $http({
        method: 'GET',
        url: 'users/sensors'
      }).then(response => {
        return response.data;
      })
    };

    this.getSettings = (id) => {
      return $http({
        method: 'GET',
        url: `settings/${id}`
      }).then(response => {
        return response.data;
      })
    };
  }); //End manageService
