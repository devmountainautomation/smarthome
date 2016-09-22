angular.module('smarthome')
  .directive('sideDir', () => {
    return {
      restrict: 'EA',
      templateUrl: './app/component/sidebar/sidebar.html',
      controller: 'headerCtrl',
      link: (scope, elem, attrs) => {
        let $scope = scope;
        $(document).ready(() => {
          $('.update-user').on('click', () => {
            $('.user-update').show(300);
            $('body').css('overflow-y', 'hidden');
          });

          elem.find('i').on('click', () => {
            $('.user-update').hide(300);
            $('body').css('overflow-y', 'auto');
          });

        });
      }
    };
  });
