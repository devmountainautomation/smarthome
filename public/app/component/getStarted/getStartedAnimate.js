angular.module('smarthome')
  .directive('fullPage', () => {
    return {
      restrict: 'EA',
      templateUrl: './app/component/getStarted/fullPage.html',
      controller: 'getStartedCtrl',
      link: (scope, elems, attrs) => {
        $(document).ready(() => {
          var length = scope.slides.length;
          $('#fullpage').fullpage({
            anchors: ['section1', 'section2', 'section3', 'section4', 'section5'],
            navigation: true,
            navigationPosition: 'left',
            onLeave: (index, nextIndex, direction) => {
              if (index === 1 || nextIndex === 1) $('.move-up').toggle();
              if (index === length || nextIndex === length) $('.move-down').toggle();
              scope.currentIndex = nextIndex;
            }
          });
          $(document).on('click', '.move-up', () => {
            scope.currentIndex--;
            $.fn.fullpage.moveTo('section' + (scope.currentIndex));
          });
          $(document).on('click', '.move-down', () => {
            scope.currentIndex++;
            $.fn.fullpage.moveTo('section' + (scope.currentIndex));
          });
        });
      }
    };
  });
