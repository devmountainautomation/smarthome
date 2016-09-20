angular.module('smarthome')
  .controller('getStartedCtrl', ($scope, getStartedSrvc) => {

  (() => {
    getStartedSrvc.getUser().then((response => {
      $scope.user = response.data;
    }));
  })(); 

  $scope.slides = getStartedSrvc.slides;
});
