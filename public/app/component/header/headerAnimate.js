angular.module('smarthome')
  .directive('headDir', ($state, $compile) => {
    return {
      restrict: 'EA',
      templateUrl: './app/component/header/header.html',
      scope: false,
      controller: 'headerCtrl',
      link: (scope, elem, attrs) => {
        let $scope = scope;
        $(document).ready(() => {

          if (!$scope.user) {
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

            let elmnt = $compile(`<div class="menu-box-container">
                  <div class="lp-boxes" id="box1" ui-sref="dashboard">
                      <i class="fa fa-tachometer fa-fw fa-3x" aria-hidden="true"></i>
                      <p>Dashboard</p>
                  </div>
                  <div class="lp-boxes" id="box2" ui-sref="addDevice">
                      <i class="fa fa-plus-square fa-fw fa-3x" aria-hidden="true"></i>
                      <p>Add Device</p>
                  </div>
                  <div class="lp-boxes" id="box3" ui-sref="manage">
                      <i class="fa fa-wrench fa-fw fa-3x" aria-hidden="true"></i>
                      <p>Manage Devices</p>
                  </div>
                  <div class="lp-boxes" id="box4">
                      <i class="fa fa-question fa-fw fa-3x" aria-hidden="true"></i>
                      <p>FAQ</p>
                  </div>
              </div>
              <div class="menu-list-container">
                  <div class="lp-menu-item" id="lp-contact">
                      <p>Update Profile</p>
                  </div>
                  <div class="lp-menu-item" id="lp-logout" ng-click="logout()">
                      <p>Logout</p>
                  </div>
                  <div class="social-hex">
                      <div class="hexagon"><i class="fa fa-github fa-fw fa-2x" aria-hidden="true"></i></div>
                      <div class="hexagon"><i class="fa fa-linkedin fa-fw fa-2x" aria-hidden="true"></i></div>
                      <div class="hexagon"><i class="fa fa-facebook fa-fw fa-2x" aria-hidden="true"></i></div>
                  </div>
              </div>`)(scope);

            $('.menu').empty();
            $('.menu').html(elmnt);

            $('#hamburger').click(() => {
              $('#hamburger').toggleClass('open');
              $('#menu').toggle('slide', 'left', 500);
              $('.landing-page').toggleClass('menu-open');
            });

            $('#lp-contact').on('click', () => {
              $('#hamburger').toggleClass('open');
              $('#menu').toggle('slide', 'left', 500);
              $('.user-update').show(300);
              $('body').css("overflow-y", "hidden");
            });

            $('.close-modal').on('click', () => {
              $('.user-update').hide(300);
              $('body').css("overflow-y", "auto");
              $('#hamburger').toggleClass('open');
              $('#menu').toggle('slide', 'left', 500);
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
