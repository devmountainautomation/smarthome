angular.module('smarthome')
  .directive('headDir', () => {
    return {
      restrict: 'EA',
      templateUrl: './app/component/header/header.html',
      link: (scope, elems, attrs) => {
        $(document).ready(() => {
          $('.logged-in').hide();
          $('#hamburger').click(() => {
            $('#hamburger').toggleClass('open');
            $('#menu').toggle('slide', 'left', 500);
            $('.landing-page').toggleClass('menu-open');
          });

          $(window).on('scroll', () => {
            if ($(window).scrollTop() > 50) {
              $('.header').addClass('active');
              $('.ham-slide').addClass('span-invert');
            } else {
              $('.header').removeClass('active');
              $('.ham-slide').removeClass('span-invert');
            }
          });
        });
      }
    };
  });
