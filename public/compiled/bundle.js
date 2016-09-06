'use strict';

angular.module('smarthome', ['ui.router']);
'use strict';

angular.module('smarthome').config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: './app/component/login/login.html'
    }).state('landing page', {
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
'use strict';

angular.module('smarthome').directive('compareTo', function () {
  return {
    restrict: 'A',
    require: "ngModel",
    scope: {
      otherValue: "=compareTo"
    },
    link: function link(scope, element, attrs, ngModel) {
      ngModel.$validators.compareTo = function (modelValue) {
        return modelValue == scope.otherValue;
      };
      scope.$watch("otherValue", function () {
        ngModel.$validate();
      });
    }
  };
});
'use strict';

angular.module('smarthome').controller('loginCtrl', function ($scope, $state, loginService) {
  $scope.localLogin = function () {
    loginService.login($scope.email, $scope.password);
  };
  $scope.createLocalUser = function () {
    loginService.createLocalUser($scope.signup - name, $scope.signup - email, $scope.signup - password, $scope.signup - phone);
  };
});
'use strict';

angular.module('smarthome').service('loginService', function ($http) {
  this.login = function (email, password) {
    return $http({
      method: 'POST',
      url: '/auth/local',
      data: {
        email: email,
        password: password
      }
    }).then(function (response) {
      return response;
    });
  };

  this.createLocalUser = function (name, email, password, phone) {
    return $http({
      method: 'POST',
      url: '/users',
      data: {
        name: name,
        email: email,
        password: password,
        phone: phone
      }
    }).then(function (response) {
      return response;
    });
  };
});
'use strict';

angular.module('smarthome').directive('signupForm', function () {
  return {
    restrict: 'E',
    templateUrl: "app/component/login/signupForm.html",
    controller: function controller($scope, loginService) {
      $scope.createLocalUser = function () {
        loginService.createLocalUser($scope.signup_name, $scope.signup_email, $scope.signup_password, $scope.signup_phone);
      };
    },
    link: function link(scope, element, attrs) {
      $('#signup-trigger').on('click', function () {
        $('.signup-expander').toggleClass('hidden');
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