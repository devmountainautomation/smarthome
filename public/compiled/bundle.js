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
                $('#hamburger').click(function () {
                    $('#hamburger').toggleClass('open');
                    $('#menu').toggle('slide', 'left', 500);
                    $('.landing-page').toggleClass('menu-open');
                });

                $(window).on('scroll', function () {
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
'use strict';

angular.module('smarthome').directive('landingDir', function () {
    return {
        restrict: 'EA',
        link: function link(scope, elem, attrs) {
            $(document).ready(function () {
                $(window).scroll(function () {
                    var winScroll = $(window).scrollTop() - 35;
                    if (winScroll < $('.landing-banner').offset().top - $(window).height() / 2) {
                        console.log(winScroll);
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