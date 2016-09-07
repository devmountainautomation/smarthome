angular.module('smarthome')
  .service('manageService', function ($http) {
    this.getDevices = function () {
      return $http({
        method: 'GET',
        url: '/sensors'
      }).then(function (response) {
        return response.data;
      })
    }
  })
