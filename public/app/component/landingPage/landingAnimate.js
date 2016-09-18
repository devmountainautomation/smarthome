angular.module('smarthome')
  .directive('landingDir', () => {
    return {
      restrict: 'EA',
      link: (scope, elem, attrs) => {
        $(document).ready(() => {
          
        });
      }
    };
  });
