angular.module('smarthome')
  .service('manageService', function ($http) {
    this.getDevices = () => {
      return $http({
        method: 'GET',
        url: 'users/sensors'
      }).then(function (response) {
        return response.data;
      })
    }
    this.getSettings = (id) => {
      return $http({
        method: 'GET',
        url: `settings/${id}`
      }).then(function (response) {
        return response.data;
      })
    }
  })
