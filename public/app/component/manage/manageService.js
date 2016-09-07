angular.module('smarthome')
  .service('manageService', function ($http) {
    this.getDevices = function () {
      return $http({
        method: 'GET',
        url: 'users/sensors'
      }).then(function (response) {
        return response.data;
      })
    }
    this.getSettings = function (id) {
      return $http({
        method: 'GET',
        url: `settings/${id}`
      }).then(function (response) {
        return response.data;
      })
    }
  })
