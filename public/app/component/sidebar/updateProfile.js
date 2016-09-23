angular.module('smarthome')
  .directive('update', () => {
    return {
      restrict: 'EA',
      templateUrl: './app/component/sidebar/update.html',
      scope: false,
      controller: 'headerCtrl',
      link: (scope, elem, attrs) => {
        let $scope = scope;
      }
    };
  });
