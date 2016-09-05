'use strict';

angular.module('smarthome', ['ui.router']);
'use strict';

angular.module('smarthome').config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('landing page', {
        url: '/',
        templateUrl: './app/component/landingPage/landingPage.html',
        controller: 'landingCtrl'
    });
});
'use strict';

angular.module('smarthome').directive('headDir', function () {
    return {
        restrict: 'EA',
        templateUrl: './app/component/header/header.html',
        link: function link(scope, elems, attrs) {
            $(document).ready(function () {
                $('.logged-in').hide();
                $('.close').hide();
                $('.hamburger').click(function () {
                    var elem = document.getElementById("menu");
                    var cssProp = window.getComputedStyle(elem, null).getPropertyValue("display");
                    if (cssProp === "none") {
                        $('.menu').toggle('slide', 'left', 500);
                        setTimeout(function () {
                            $('.close').fadeIn(200);
                        }, 500);
                    } else {
                        $('.menu').toggle('slide', 'left', 500);
                        $('.close').fadeOut(500);
                    }
                });

                $('.close').click(function () {
                    $('.menu').toggle('slide', 'left', 500);
                    $('.close').fadeOut(500);
                });
            });
        }
    };
});
'use strict';

angular.module('smarthome').directive('sideDir', function () {
    return {
        restrict: 'EA',
        templateUrl: './app/component/sidebar/sidebar.html',
        link: function link(scope, elems, attrs) {
            $(document).ready(function () {});
        }
    };
});
'use strict';

angular.module('smarthome').directive('landingDir', function () {
  return {
    restrict: 'EA',
    link: function link(scope, elem, attrs) {
      $(document).ready(function () {
        $(window).scroll(function () {
          var winScroll = $(window).scrollTop();

          if (winScroll < $('.landing-CTA').offset().top - $(window).height() / 2) {
            $('.skew-right').css("transform", "skewY(" + winScroll / 2 + "deg)");
            $('.skew-left').css("transform", "skewY(" + -winScroll / 2 + "deg)");
          }
        });
      });
    }
  };
});
'use strict';

angular.module('smarthome').controller('landingCtrl', function ($scope, landingSrvc) {});
'use strict';

angular.module('smarthome').service('landingSrvc', function ($http) {});