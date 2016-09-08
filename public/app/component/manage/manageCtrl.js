angular.module('smarthome')
  .controller('manageCtrl', function ($scope, manageService) {
    var getDevices = () => {
      manageService.getDevices().then(function (response) {
        var devices = [{
          module_id: '12r443',
          type: 'Door/Window Sensor',
          nickname: 'Razzbury Piii'
        },
        {
          module_id: '12303',
          type: 'Door/Window Sensor',
          nickname: 'Yo mama'
        }];
        devices.forEach((e) => {
          if (e.type == 'Door/Window Sensor') {
            e.icon_url = '/assets/img/window-door_icon.png';
          }
        })
        $scope.devices = devices;
      })
    };
    // getDevices();

    var devices = [{
      module_id: '12r443',
      type: 'Door/Window Sensor',
      nickname: 'Razzbury Piii'
    },
    {
      module_id: '12303',
      type: 'Door/Window Sensor',
      nickname: 'Yo mama'
    }];
    devices.forEach((e) => {
      if (e.type == 'Door/Window Sensor') {
        e.icon_url = '/assets/img/window-door_icon.png';
      }
    })
    $scope.devices = devices;

  });
