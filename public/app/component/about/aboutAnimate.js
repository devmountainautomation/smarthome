angular.module('smarthome')
  .directive('aboutDir', () => {
    return {
      restrict: 'EA',
      controller: 'aboutCtrl',
      link: (scope, elem, attrs) => {
        $(document).ready(() => {
          $(window).scroll(function() {

            var winScroll = $(this).scrollTop();
            if (winScroll > $('#craig').offset().top - ($(window).height())) {
              $('#craig').each((i) => {
                setTimeout(() => {
                  $('#craig').eq(i).addClass('is-showing');
                }, 150 * (i + 1));
              });
            }

            if (winScroll > $('#jon').offset().top - ($(window).height() / 1.5)) {
              $('#jon').each((i) => {
                setTimeout(() => {
                  $('#jon').eq(i).addClass('is-showing');
                }, 150 * (i + 1));
              });
            }

            if (winScroll > $('#noelle').offset().top - ($(window).height() / 1.5)) {
              $('#noelle').each((i) => {
                setTimeout(() => {
                  $('#noelle').eq(i).addClass('is-showing');
                }, 150 * (i + 1));
              });
            }

            if (winScroll > $('#steven').offset().top - ($(window).height() / 1.5)) {
              $('#steven').each((i) => {
                setTimeout(() => {
                  $('#steven').eq(i).addClass('is-showing');
                }, 150 * (i + 1));
              });
            }
          });

        });
      }
    };
  });
