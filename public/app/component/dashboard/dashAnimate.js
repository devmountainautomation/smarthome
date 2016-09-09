angular.module('smarthome')
  .directive('dashDir', () => {
    return {
      restrict: 'EA',
      controller: 'dashboardCtrl',
      link: (scope, elems, attrs) => {
        $(document).ready(() => {

          $('.add-widget').on('click', () => {
            $("body").css("overflow-y", "hidden");
            $('.widget-selector').show(300);
          });
          $('.close-modal').on('click', () => {
            $("body").css("overflow-y", "auto");
            $('.widget-selector').hide(300);
          });

        });
      }
    };
  });
