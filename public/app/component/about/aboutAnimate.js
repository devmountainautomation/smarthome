angular.module('smarthome')
  .directive('aboutDir', () => {
    return {
      restrict: 'EA',
      controller: 'aboutCtrl',
      link: (scope, elem, attrs) => {
        $(document).ready(() => {
        
        });
      }
    };
  });
