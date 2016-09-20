angular.module('smarthome').controller('getStartedCtrl', ($scope, dashboardSrvc) => {

  var getUser = function() {
    $scope.showLogin = true;
    $scope.showDashboard = false;
    dashboardSrvc.getUser().then(function(response) {
      if (response.data.id) {
        $scope.showLogin = false;
        $scope.showDashboard = true;
      }
    });
  };

  getUser();

  $scope.slides = [
    {
      id: 1,
      title: "Equipment",
      header: "Get the right equipment",
      text: "HomeOne is configured to integrate seamlessly with a Rasberry Pi.  Sensors and wires are also needed according to your desired home automation module.",
      img: "../../../assets/img/getStarted/raspberrypi.png"
    },
    {
      id: 2,
      title: "PubNub",
      header: "Create a PubNub account",
      text: "PubNub is the link between your Raspberry Pi and your HomeOne portal.  Clicking on the image will take you to PubNub where you can create an account and obtain essential PubNub keys.",
      img: "../../../assets/img/getStarted/pubnub.png"
    },
    {
      id: 3,
      title: "HomeOne",
      header: "Register your device on your HomeOne account",
      text: "Registering your device gives you the ability to set notification time windows and view historical data.  This is your home base for monitoring your Raspbery Pi devices.",
      img: "../../../assets/img/devautomation logo-1.png"
    },
    {
      id: 4,
      title: "Software",
      header: "Download the HomeOne software on your Raspberry Pi",
      text: "After installing a Raspberry Pi OS, download node and npm install home-one.  Follow the README.md and you will be good to go.",
      img: "../../../assets/img/getStarted/download.svg"
    },
    {
      id: 5,
      title: "Install",
      header: "Install the device in your home",
      text: "Once the device is installed into your home, HomeOne will take care of the rest.  Generating insights one your personalized home automation system has never been so simple.",
      img: "../../../assets/img/getStarted/tools.svg"
    }
  ];

});
