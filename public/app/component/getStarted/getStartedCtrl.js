angular.module('smarthome').controller('getStartedCtrl', ($scope, getStartedSrvc) => {

  var getUser = function() {
    $scope.showLogin = true;
    $scope.showDashboard = false;
    getStartedSrvc.getUser().then(response => {
      if (response.data.id) {
        $scope.showLogin = false;
        $scope.showDashboard = true;
      }
    });
  };

  getUser();

  $scope.slides = getStartedSrvc.slides;

});
