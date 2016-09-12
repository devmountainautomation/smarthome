angular.module('smarthome').controller('getStartedCtrl', function($scope) {

  $scope.currentIndex = 1;

  $scope.slides = [
    {
      id: 1,
      header: "Get the right equipment",
      text: "HomeOne is configured to work with a Rasberry Pi",
      img: "../../../assets/img/getStarted/raspberrypi.png"
    },
    {
      id: 2,
      header: "Create a PubNub account",
      text: "PubNub is the link between your Raspberry Pi and your HomeOne portal",
      img: "../../../assets/img/getStarted/pubnub.png"
    },
    {
      id: 3,
      header: "Register your device on your HomeOne account",
      text: "Registering your device gives you the ability to set notification time windows and view historical data",
      img: "../../../assets/img/devautomation logo-1.png"
    },
    {
      id: 4,
      header: "Download the HomeOne software on your Raspberry Pi",
      text: "After installing a Raspberry Pi OS, download node and npm install home-one",
      img: "../../../assets/img/getStarted/download.svg"
    },
    {
      id: 5,
      header: "Install the device in your home",
      text: "Once the device is installed, HomeOne will take care of the rest",
      img: "../../../assets/img/getStarted/tools.svg"
    }
  ];

});
