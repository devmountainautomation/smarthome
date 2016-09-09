angular.module('smarthome')
  .controller('manageCtrl', ($scope, manageService) => {

    (() => {
      manageService.getDevices().then(response => {
        // let devices = response;
        // devices.forEach((e) => {
        //   if (e.type === 'Door/Window Sensor') {
        //     e.icon_url = './assets/img/window-door_icon.png';
        //   } else if (e.type === "Smoke Detector") {
        //     e.icon_url = './assets/img/thermometer-icon.png';
        //   } else if (e.type === 'Motion Sensor') {
        //     e.icon_url = './assets/img/motion-placeholder.jpg';
        //   } else if (e.type === 'Sound Sensor') {
        //     e.icon_url = './assets/img/sound-placeholder.jpg';
        //   }
        // })
        $scope.devices = response;
      })
    })();

  }); //End manageCtrl
