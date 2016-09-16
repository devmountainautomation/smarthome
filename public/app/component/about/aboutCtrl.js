angular.module('smarthome')
  .controller('aboutCtrl', ($scope, aboutSrvc) => {

    (() => {
      aboutSrvc.getUser().then((response => {
        $scope.user = response.data;
      }));
    })();

  });
