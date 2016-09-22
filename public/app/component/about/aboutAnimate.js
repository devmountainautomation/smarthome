angular.module('smarthome')
  .directive('aboutDir', () => {
    return {
      restrict: 'EA',
      controller: 'aboutCtrl',
      link: (scope, elem, attrs) => {
        $(document).ready(() => {
          $(window).scroll(() => {

            let winScroll = $(window).scrollTop();

            if (winScroll > $('#craig').offset().top - ($(window).height() / 1.5)) {
              setTimeout(() => {
                $('#craig').addClass('is-showing');
              }, 150);
            }

            if (winScroll > $('#jon').offset().top - ($(window).height() / 1.5)) {
              setTimeout(() => {
                $('#jon').addClass('is-showing');
              }, 150);
            }

            if (winScroll > $('#noelle').offset().top - ($(window).height() / 1.5)) {
              setTimeout(() => {
                $('#noelle').addClass('is-showing');
              }, 150);
            }

            if (winScroll > $('#steven').offset().top - ($(window).height() / 1.5)) {
              setTimeout(() => {
                $('#steven').addClass('is-showing');
              }, 150);
            }
          });

        });
      }
    };
  });
