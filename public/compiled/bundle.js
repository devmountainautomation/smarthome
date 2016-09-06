'use strict';

angular.module('smarthome', ['ui.router']);
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
      element.on('blur', function () {
        if (element.hasClass('ng-invalid')) {
          $('.password-confirmation-alert').removeClass('hidden');
        }
      });
      element.on('keyup', function () {
        if (element.hasClass('ng-valid')) {
          $('.password-confirmation-alert').addClass('hidden');
        }
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
        $('.signup-expander').slideToggle();
      });
      $('#email').on('blur', function () {
        if ($('#email').hasClass('ng-invalid')) {
          $('.email-confirmation-alert').removeClass('hidden');
        }
      });
      $('#email').on('keyup', function () {
        if ($('#email').hasClass('ng-valid')) {
          $('.email-confirmation-alert').addClass('hidden');
        }
      });
    }
  };
});