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
        let startTime = timeConverter(response.data[0].start_time);
        let endTime = timeConverter(response.data[0].end_time);
        response.data[0].start_time = startTime;
        response.data[0].end_time = endTime;
        return response.data[0];
      })
    };

    let timeConverter = rawTime => {
      if (rawTime) {
        let result;
        let time = rawTime.split(':');
        time.pop();
        let min = time[1];
        let hour = time[0];
        time.splice(0, 2);
        if (Number(hour) > 12) {
          hour -= 12;
          time.push(hour, min);
          result = time.join(':');
          result += " PM";
      } else if (Number(hour) === 12) {
          time.push(hour, min);
          result = time.join(':');
          result += " PM";
      } else if (Number(hour) === 0) {
          hour = 12;
          time.push(hour, min);
          result = time.join(':');
          result += " AM";
        } else {
          time.push(hour, min);
          result = time.join(':');
          result += " AM";
        }
        return result;
      } else {
        return "N/A";
      }
    };
  }); //End manageService
