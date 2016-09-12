angular.module('smarthome')
  .service('addService', function ($http) {
    this.addDevice = function (settings) {
      return http({
        method: 'POST',
        url: '/sensors',
        data: {
          nickname: settings.nickname
        }
      })
    };
    this.addBreech = function (settings) {
      return http({
        method: 'POST',
        url: '/settings/breech',
        data: settings
      })
    }

  })
