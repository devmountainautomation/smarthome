angular.module('smarthome')
  .directive('dashDir', () => {
    return {
      restrict: 'EA',
      link: (scope, elems, attrs) => {
        $(document).ready(() => {
        });
      }
    };
  });
