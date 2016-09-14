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
        return response.data[0];
      })
    };

    this.saveSettings = (id, settings) => {
      return $http({
        method: 'PUT',
        url: `settings/${id}`,
        data: {
          active: settings.active,
          email: settings.email,
          sms: settings.text,
          start_time: settings.startTime,
          end_time: settings.endTime
        }
      })
    }
  }); //End manageService
