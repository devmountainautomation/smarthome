angular.module('smarthome').controller('aboutCtrl', ($scope, aboutService) => {

  $scope.sendEmail = () => {
    aboutService.sendEmail().then(response => {
      console.log(response);
    });
  };

});
