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

          if ($scope.user) {
            let elmnt = $compile(
              `<div class="menu-box-container">
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
                <div class="lp-boxes" id="box4" ui-sref="about">
                  <i class="fa fa-user fa-fw fa-3x" aria-hidden="true"></i>
                  <p>Our Team</p>
                </div>
              </div>
              <div class="menu-list-container">
                <div class="lp-menu-item update-profile" id="lp-contact">
                  <p>Update Profile</p>
                </div>
                <div class="lp-menu-item" id="lp-logout" ng-click="logout()">
                  <p>Logout</p>
                </div>
                <div class="social-hex">
                  <a href="https://github.com/devmountainautomation/smarthome"><div class="hexagon"><i class="fa fa-github fa-fw fa-2x" aria-hidden="true"></i></div></a>
                  <div class="hexagon"><i class="fa fa-linkedin fa-fw fa-2x" aria-hidden="true"></i></div>
                  <a href="https://www.facebook.com/dmsmarthome/"><div class="hexagon"><i class="fa fa-facebook fa-fw fa-2x" aria-hidden="true"></i></div></a>
                </div>
              </div>`)(scope);

              let deskElemnt = $compile(`<ul class="header-media">
                    <span ui-sref="landing page" class="logo-container" ui-sref="landing page">Home<img class="logo" src="../../../assets/img/devautomation logo-1.png" alt="logo" />One</span>
                    <div>
                        <li ui-sref="dashboard">Dashboard</li>
                        <li ui-sref="manage">Manage Devices</li>
                        <li ui-sref="about">Our Team</li>
                        <li ui-sref="getStarted">Get Started</li>
                        <li ng-click="logout()">Logout</li>
                    </div>
                </ul>`)(scope);

            $('.menu').html(elmnt);
            $('.desktop-header').html(deskElemnt);
          }

          $('.update-profile').on('click', () => {
            $('#hamburger').toggleClass('open');
            $('#menu').toggle('slide', 'left', 300);
            $('.user-update').show(300);
            $('body').css("overflow-y", "hidden");
          });

          $('.lp-boxes').on('click', () => {
            $('#hamburger').toggleClass('open');
            $('#menu').toggle('slide', 'left', 500);
          });

          $('.close-modal').on('click', () => {
            $('.user-update').hide(300);
            $('body').css("overflow-y", "auto");
            $('#hamburger').toggleClass('open');
            $('#menu').toggle('slide', 'left', 300);
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

          $(window).on('scroll', () => {
            if ($(window).scrollTop() > 50) {
              $('.desktop-header').addClass('active smaller');
              elem.find('li').addClass('li-invert');
            } else {
              $('.desktop-header').removeClass('active smaller');
              elem.find('li').removeClass('li-invert');
            }
          });

          $('#hamburger').click(() => {
            $('#hamburger').toggleClass('open');
            $('#menu').toggle('slide', 'left', 300);
            setTimeout(() => {
                $('html, body').scrollTop(0);
              }, 300);
            $('body').toggleClass('menu-open');
          });

        });
      }
    };
  });
