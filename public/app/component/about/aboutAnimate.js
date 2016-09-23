angular.module('smarthome')
  .directive('aboutDir', ($state) => {
    return {
      restrict: 'EA',
      controller: 'aboutCtrl',
      link: (scope, elem, attrs) => {
        $(document).ready(() => {
          $(window).scroll(function() {
            if ($state.current.name === 'about') {
              let winScroll = $(this).scrollTop();

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

              if (winScroll > $('#semo').offset().top - ($(window).height() / 1.5)) {
                setTimeout(() => {
                  $('#semo').addClass('is-showing');
                }, 150);
              }

              if (winScroll > $('.media-svg').offset().top - ($(window).height() / 1.5)) {
                $('.media-svg').each((i) => {
                  setTimeout(() => {
                    $('.media-svg').eq(i).addClass('is-showing');
                  }, 150 * (i + 1));
                });
              }

              if (winScroll > $('.this-is-it').offset().top - ($(window).height() / 1.5)) {
                $('.this-is-it').each((i) => {
                  setTimeout(() => {
                    $('.this-is-it').eq(i).addClass('is-showing');
                  }, 250 * (i + 1));
                });
              }



            }
          });
        });
      }
    };
  });
