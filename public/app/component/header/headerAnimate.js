angular.module('smarthome')
  .directive('headDir', ($state) => {
    return {
      restrict: 'EA',
      templateUrl: './app/component/header/header.html',
      link: (scope, elems, attrs) => {
        $(document).ready(() => {
          // $('.logged-in').hide();

          if ($state.current.name === 'landing page' || $state.current.name === 'login') {
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

          } else {
            $('.menu-box-container').replaceWith(`<div class="menu-box-container">
                  <div class="lp-boxes" id="box1">
                      <i class="fa fa-tachometer fa-fw fa-3x" aria-hidden="true"></i>
                      <p>Dashboard</p>
                  </div>
                  <div class="lp-boxes" id="box2">
                      <i class="fa fa-plus-square fa-fw fa-3x" aria-hidden="true"></i>
                      <p>Add Device</p>
                  </div>
                  <div class="lp-boxes" id="box3">
                      <i class="fa fa-question fa-fw fa-3x" aria-hidden="true"></i>
                      <p>FAQ</p>
                  </div>
                  <div class="lp-boxes" id="box4">
                      <i class="fa fa-comments fa-fw fa-3x" aria-hidden="true"></i>
                      <p>Comments</p>
                  </div>
              </div>
              <div class="menu-list-container" ng-click="logout()">
                  <div class="lp-menu-item" id="lp-logout">
                      <p>Logout</p>
                  </div>
                  <div class="lp-menu-item" id="lp-contact">
                      <p>Contact</p>
                  </div>
                  <div class="social-hex">
                      <div class="hexagon"><i class="fa fa-github fa-fw fa-2x" aria-hidden="true"></i></div>
                      <div class="hexagon"><i class="fa fa-linkedin fa-fw fa-2x" aria-hidden="true"></i></div>
                      <div class="hexagon"><i class="fa fa-facebook fa-fw fa-2x" aria-hidden="true"></i></div>
                  </div>
              </div>`);

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
          }


        });
      }
    };
  });
