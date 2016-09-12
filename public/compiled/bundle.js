'use strict';

angular.module('smarthome', ['ui.router']);
'use strict';

(function ($) {
        $.fn.timeDropper = function (options, callbackFnk) {
                var deg;
                var move;
                return $(this).each(function () {

                        var _td_input = $(this),
                            _td_input_on = false,
                            _td_mobile = false,
                            _td_num = function _td_num(n) {
                                return n < 10 ? '0' + n : n;
                        },
                            _td_id = $('.td-clock').length,
                            _td_alert,
                            _td_event = null,
                            _td_options = $.extend({

                                format: 'h:mm a',
                                autoswitch: false,
                                meridians: true,
                                mousewheel: false,
                                setCurrentTime: false,
                                init_animation: "fadein",
                                primaryColor: "#F56A4C",
                                borderColor: "#17a2c6",
                                backgroundColor: "#36454f",
                                textColor: '#FFF'

                        }, options);

                        var _td_color = function _td_color(col, amt) {

                                var usePound = false;

                                if (col[0] == "#") {
                                        col = col.slice(1);
                                        usePound = true;
                                }

                                var num = parseInt(col, 16);

                                var r = (num >> 16) + amt;

                                if (r > 255) r = 255;else if (r < 0) r = 0;

                                var b = (num >> 8 & 0x00FF) + amt;

                                if (b > 255) b = 255;else if (b < 0) b = 0;

                                var g = (num & 0x0000FF) + amt;

                                if (g > 255) g = 255;else if (g < 0) g = 0;

                                return (usePound ? "#" : "") + (g | b << 8 | r << 16).toString(16);
                        };

                        _td_input.prop({
                                'readonly': true
                        }).addClass('td-input');

                        $('body').append('<div class="td-wrap td-n2" id="td-clock-' + _td_id + '"><div class="td-overlay"></div><div class="td-clock td-init"><div class="td-deg td-n"><div class="td-select"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 35.4" enable-background="new 0 0 100 35.4" xml:space="preserve"><g><path fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M98.1,33C85.4,21.5,68.5,14.5,50,14.5S14.6,21.5,1.9,33"/><line fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="1.9" y1="33" x2="1.9" y2="28.6"/><line fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="1.9" y1="33" x2="6.3" y2="33"/><line fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="98.1" y1="33" x2="93.7" y2="33"/><line fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="98.1" y1="33" x2="98.1" y2="28.6"/></g></svg></div></div><div class="td-medirian"><span class="td-icon-am td-n">AM</span><span class="td-icon-pm td-n">PM</span></div><div class="td-lancette"><div></div><div></div></div><div class="td-time"><span class="on"></span>:<span></span></div></div></div>');

                        $('head').append('<style>#td-clock-' + _td_id + ' .td-clock {color:' + _td_options.textColor + ';background: ' + _td_options.backgroundColor + '; box-shadow: 0 0 0 1px ' + _td_options.borderColor + ',0 0 0 8px rgba(0, 0, 0, 0.05); } #td-clock-' + _td_id + ' .td-clock .td-time span.on { color:' + _td_options.primaryColor + '} #td-clock-' + _td_id + ' .td-clock:before { border-color: ' + _td_options.borderColor + '} #td-clock-' + _td_id + ' .td-select:after { box-shadow: 0 0 0 1px ' + _td_options.borderColor + ' } #td-clock-' + _td_id + ' .td-clock:before,#td-clock-' + _td_id + ' .td-select:after {background: ' + _td_options.backgroundColor + ';} #td-clock-' + _td_id + ' .td-lancette {border: 2px solid ' + _td_options.primaryColor + '; opacity:0.1}#td-clock-' + _td_id + ' .td-lancette div:after { background: ' + _td_options.primaryColor + ';} #td-clock-' + _td_id + ' .td-bulletpoint div:after { background:' + _td_options.primaryColor + '; opacity:0.1}</style>');

                        var _td_container = $('#td-clock-' + _td_id),
                            _td_overlay = _td_container.find('.td-overlay'),
                            _td_c = _td_container.find('.td-clock');

                        _td_c.find('svg').attr('style', "stroke:" + _td_options.borderColor);

                        var _td_init_deg = -1,
                            _td_event_deg = 0,
                            _td_wheel_deg = 0,
                            _td_h,
                            _td_m,
                            _td_define_deg = function _td_define_deg() {

                                var o = _td_c.find('.td-time span.on'),
                                    v = parseInt(o.attr('data-id'));

                                if (o.index() == 0) deg = Math.round(v * 360 / 23);else deg = Math.round(v * 360 / 59);

                                _td_init_deg = -1;
                                _td_event_deg = deg;
                                _td_wheel_deg = deg;
                        },
                            _td_rotation = function _td_rotation(deg) {

                                var t = _td_c.find('.td-time span.on');

                                var value = t.attr('data-id');

                                if (!value) value = 0;

                                var h = Math.round(deg * 23 / 360);
                                var m = Math.round(deg * 59 / 360);

                                if (t.index() == 0) {

                                        t.attr('data-id', _td_num(h));

                                        if (_td_options.meridians) {

                                                if (h >= 12 && h < 24) {
                                                        _td_c.find('.td-icon-pm').addClass('td-on');
                                                        _td_c.find('.td-icon-am').removeClass('td-on');
                                                } else {

                                                        _td_c.find('.td-icon-am').addClass('td-on');
                                                        _td_c.find('.td-icon-pm').removeClass('td-on');
                                                }

                                                if (h > 12) h = h - 12;
                                                if (h == 0) h = 12;
                                        }

                                        t.text(_td_num(h));
                                } else {
                                        t.attr('data-id', _td_num(m)).text(_td_num(m));
                                }

                                _td_wheel_deg = deg;
                                _td_c.find('.td-deg').css('transform', 'rotate(' + deg + 'deg)');

                                if (t.index() == 0) {
                                        var c = Math.round(h * 360 / 12);
                                        _td_c.find('.td-lancette div:last').css('transform', 'rotate(' + c + 'deg)');
                                } else {
                                        _td_c.find('.td-lancette div:first').css('transform', 'rotate(' + deg + 'deg)');
                                }

                                var _td_h = _td_c.find('.td-time span:first').attr('data-id'),
                                    _td_m = _td_c.find('.td-time span:last').attr('data-id');

                                if (Math.round(_td_h) >= 12 && Math.round(_td_h) < 24) {
                                        var h = Math.round(_td_h) - 12,
                                            a = 'pm',
                                            A = 'PM';
                                } else {
                                        var h = Math.round(_td_h),
                                            a = 'am',
                                            A = 'AM';
                                }

                                if (h == 0) h = 12;

                                var str = _td_options.format.replace(/\b(H)\b/g, Math.round(_td_h)).replace(/\b(h)\b/g, Math.round(h)).replace(/\b(m)\b/g, Math.round(_td_m)).replace(/\b(HH)\b/g, _td_num(Math.round(_td_h))).replace(/\b(hh)\b/g, _td_num(Math.round(h))).replace(/\b(mm)\b/g, _td_num(Math.round(_td_m))).replace(/\b(a)\b/g, a).replace(/\b(A)\b/g, A);

                                _td_input.val(str);
                        };

                        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                                _td_mobile = true;
                        }

                        _td_c.find('.td-time span').on('click', function (e) {

                                var o = $(this);

                                _td_c.find('.td-time span').removeClass('on');
                                o.addClass('on');

                                var v = parseInt(o.attr('data-id'));

                                if (o.index() == 0) deg = Math.round(v * 360 / 23);else deg = Math.round(v * 360 / 59);

                                _td_init_deg = -1;
                                _td_event_deg = deg;
                                _td_wheel_deg = deg;
                                _td_rotation(deg);
                        });

                        _td_c.find('.td-deg').on('touchstart mousedown', function (e) {

                                _td_define_deg();

                                e.preventDefault();

                                clearInterval(_td_alert);

                                _td_c.find('.td-deg').removeClass('td-n');
                                _td_c.find('.td-select').removeClass('td-rubber');

                                _td_input_on = true;

                                var offset = _td_c.offset();
                                var center = {
                                        y: offset.top + _td_c.height() / 2,
                                        x: offset.left + _td_c.width() / 2
                                };

                                var a,
                                    b,
                                    deg,
                                    tmp,
                                    rad2deg = 180 / Math.PI;

                                _td_c.removeClass('td-rubber');

                                $(window).on('touchmove mousemove', function (e) {

                                        if (_td_input_on == true) {

                                                if (_td_mobile) move = e.originalEvent.touches[0];else move = e;

                                                a = center.y - move.pageY;
                                                b = center.x - move.pageX;
                                                deg = Math.atan2(a, b) * rad2deg;

                                                if (deg < 0) deg = 360 + deg;

                                                if (_td_init_deg == -1) _td_init_deg = deg;

                                                tmp = Math.floor(deg - _td_init_deg + _td_event_deg);

                                                if (tmp < 0) tmp = 360 + tmp;else if (tmp > 360) tmp = tmp % 360;

                                                _td_rotation(tmp);
                                        }
                                });
                        });

                        if (_td_options.mousewheel) {

                                _td_c.on('mousewheel', function (e) {

                                        e.preventDefault();

                                        _td_c.find('.td-deg').removeClass('td-n');

                                        if (e.originalEvent.wheelDelta > 0) {
                                                if (_td_wheel_deg <= 360) {
                                                        if (e.originalEvent.wheelDelta <= 120) _td_wheel_deg++;else if (e.originalEvent.wheelDelta > 120) _td_wheel_deg = _td_wheel_deg + 20;
                                                        if (_td_wheel_deg > 360) _td_wheel_deg = 0;
                                                }
                                        } else {
                                                if (_td_wheel_deg >= 0) {
                                                        if (e.originalEvent.wheelDelta >= -120) _td_wheel_deg--;else if (e.originalEvent.wheelDelta < -120) _td_wheel_deg = _td_wheel_deg - 20;
                                                        if (_td_wheel_deg < 0) _td_wheel_deg = 360;
                                                }
                                        }

                                        _td_init_deg = -1;
                                        _td_event_deg = _td_wheel_deg;
                                        _td_rotation(_td_wheel_deg);
                                });
                        }

                        $(document).on('touchend mouseup', function () {

                                if (_td_input_on) {

                                        _td_input_on = false;

                                        if (_td_options.autoswitch) {
                                                _td_c.find('.td-time span').toggleClass('on');
                                                _td_c.find('.td-time span.on').click();
                                        }

                                        _td_c.find('.td-deg').addClass('td-n');
                                        _td_c.find('.td-select').addClass('td-rubber');
                                }
                        });

                        var _td_init = function _td_init(value) {

                                var d = new Date(),
                                    _td_span_h = _td_c.find('.td-time span:first'),
                                    _td_span_m = _td_c.find('.td-time span:last'),
                                    h,
                                    m;

                                if (_td_input.val().length && !_td_options.setCurrentTime) {

                                        var reg = /\d+/g,
                                            am;
                                        var st = _td_input.val().split(':');

                                        if (st) {

                                                h = st[0].match(reg);
                                                m = st[1].match(reg);
                                                if (_td_input.val().indexOf("am") != -1 || _td_input.val().indexOf("AM") != -1 || _td_input.val().indexOf("pm") != -1 || _td_input.val().indexOf("PM") != -1) {
                                                        if (_td_input.val().indexOf("am") != -1 || _td_input.val().indexOf("AM") != -1) am = true;else am = false;

                                                        if (!am) {
                                                                if (h < 13) {
                                                                        h = parseInt(h) + 12;
                                                                        if (h == 24) h = 0;
                                                                }
                                                        } else if (h == 12) h = 0;
                                                } else if (h == 24) h = 0;
                                        } else {

                                                if (!parseInt(_td_span_h.text())) h = _td_num(d.getHours());else h = _td_num(_td_span_h.text());
                                                if (!parseInt(_td_span_m.text())) m = _td_num(d.getMinutes());else m = _td_num(_td_span_m.text());
                                        }
                                } else {

                                        if (!parseInt(_td_span_h.text())) h = _td_num(d.getHours());else h = _td_num(_td_span_h.text());
                                        if (!parseInt(_td_span_m.text())) m = _td_num(d.getMinutes());else m = _td_num(_td_span_m.text());
                                }

                                _td_span_h.attr('data-id', h).text(h);
                                _td_span_m.attr('data-id', m).text(m);

                                _td_event_deg = Math.round(h * 360 / 23);

                                _td_c.find('.td-lancette div:first').css('transform', 'rotate(' + Math.round(m * 360 / 59) + 'deg)');

                                _td_rotation(_td_event_deg);
                                _td_wheel_deg = _td_event_deg;
                                _td_init_deg = -1;
                        };

                        _td_init();

                        _td_input.focus(function (e) {
                                e.preventDefault();
                                _td_input.blur();
                        });

                        _td_input.click(function (e) {

                                clearInterval(_td_event);

                                _td_container.removeClass('td-fadeout');
                                _td_container.addClass('td-show').addClass('td-' + _td_options.init_animation);
                                _td_c.css({
                                        'top': _td_input.offset().top + (_td_input.outerHeight() - 8),
                                        'left': _td_input.offset().left + _td_input.outerWidth() / 2 - _td_c.outerWidth() / 2
                                });

                                if (_td_c.hasClass('td-init')) {

                                        _td_alert = setInterval(function () {
                                                _td_c.find('.td-select').addClass('td-alert');
                                                setTimeout(function () {
                                                        _td_c.find('.td-select').removeClass('td-alert');
                                                }, 1000);
                                        }, 2000);

                                        _td_c.removeClass('td-init');
                                }
                        });
                        _td_overlay.click(function () {

                                _td_container.addClass('td-fadeout').removeClass('td-' + _td_options.init_animation);
                                _td_event = setTimeout(function () {
                                        _td_container.removeClass('td-show');
                                }, 300);
                        });
                        $(window).on('resize', function () {

                                _td_define_deg();
                                _td_c.css({
                                        'top': _td_input.offset().top + (_td_input.outerHeight() - 8),
                                        'left': _td_input.offset().left + _td_input.outerWidth() / 2 - _td_c.outerWidth() / 2
                                });
                        });
                });
        };
})(jQuery);
'use strict';

angular.module('smarthome').config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('landing page', {
    url: '/',
    templateUrl: './app/component/landingPage/landingPage.html'
  }).state('login', {
    url: '/login',
    templateUrl: '/app/component/login/login.html',
    controller: 'loginCtrl',
    resolve: {
      checkAuth: function checkAuth($state, dashboardSrvc) {
        return dashboardSrvc.checkAuth().then(function (response) {
          if (response.data !== 'unauthorized') {
            $state.go('dashboard');
          }
        });
      }
    }
  }).state('dashboard', {
    url: '/dashboard',
    templateUrl: '/app/component/dashboard/dashboard.html',
    controller: 'dashboardCtrl',
    resolve: {
      user: function user(dashboardSrvc) {
        return dashboardSrvc.getUser();
      },
      checkAuth: function checkAuth($state, dashboardSrvc) {
        return dashboardSrvc.checkAuth().then(function (response) {
          if (response.data === 'unauthorized') {
            $state.go('login');
            setTimeout(function () {
              swal("Error", 'Please Login or Sign Up', 'error');
            }, 400);
          }
        });
      }
    }
  }).state('manage', {
    url: '/manage',
    templateUrl: '/app/component/manage/manage.html',
    controller: 'manageCtrl',
    resolve: {
      user: function user(dashboardSrvc) {
        return dashboardSrvc.getUser();
      },
      checkAuth: function checkAuth($state, dashboardSrvc) {
        return dashboardSrvc.checkAuth().then(function (response) {
          if (response.data === 'unauthorized') {
            $state.go('login');
            setTimeout(function () {
              swal("Error", 'Please Login or Sign Up', 'error');
            }, 400);
          }
        });
      }
    }
  }).state('addDevice', {
    url: '/add',
    templateUrl: 'app/component/add/add.html',
    controller: 'addCtrl'
  });
});
'use strict';

angular.module('smarthome').controller('addCtrl', function ($scope, addService) {
  $scope.settings = {};
  $('#breech-start').timeDropper({ setCurrentTime: true });
  $('#breech-end').timeDropper({ setCurrentTime: true });
  $('#smoke-start').timeDropper({ setCurrentTime: true });
  $('#smoke-end').timeDropper({ setCurrentTime: true });
  $('#sound-start').timeDropper({ setCurrentTime: true });
  $('#sound-end').timeDropper({ setCurrentTime: true });
  $('#motion-start').timeDropper({ setCurrentTime: true });
  $('#motion-end').timeDropper({ setCurrentTime: true });

  var gotoElement = function gotoElement(eID) {
    addService.scrollTo(eID);
  };

  $scope.$watch('module_type', function (value) {
    switch (value) {
      case "breech":
        {
          $("#door-window-settings").slideDown();
          $("#smoke-settings").slideUp();
          $("#sound-settings").slideUp();
          $("#motion-settings").slideUp();
          break;
        }
      case "smoke_detector":
        {
          $("#smoke-settings").slideDown();
          $("#door-window-settings").slideUp();
          $("#sound-settings").slideUp();
          $("#motion-settings").slideUp();
          break;
        }
      case "sound":
        {
          $("#sound-settings").slideDown();
          $("#door-window-settings").slideUp();
          $("#smoke-settings").slideUp();
          $("#motion-settings").slideUp();
          break;
        }
      case "motion":
        {
          $("#motion-settings").slideDown();
          $("#door-window-settings").slideUp();
          $("#smoke-settings").slideUp();
          $("#sound-settings").slideUp();
          break;
        }
    }
  });
  $scope.addBreech = function () {
    addService.addDevice($scope.settings).then(function (response) {
      addService.addBreech($scope.settings).then(function (response) {
        return response;
      });
    });
  };
});
'use strict';

angular.module('smarthome').service('addService', function ($http) {
  this.addDevice = function (settings) {
    return http({
      method: 'POST',
      url: '/sensors',
      data: {
        nickname: settings.nickname
      }
    });
  };
  this.addBreech = function (settings) {
    return http({
      method: 'POST',
      url: '/settings/breech',
      data: settings
    });
  };
});
'use strict';

angular.module('smarthome').directive('dashDir', function () {
  return {
    restrict: 'EA',
    controller: 'dashboardCtrl',
    link: function link(scope, elems, attrs) {
      $(document).ready(function () {

        $('.add-widget').on('click', function () {
          $("body").css("overflow-y", "hidden");
          $('.widget-selector').show(300);
        });
        $('.close-modal').on('click', function () {
          $("body").css("overflow-y", "auto");
          $('.widget-selector').hide(300);
        });
      });
    }
  };
});
'use strict';

angular.module('smarthome').controller('dashboardCtrl', function ($scope, dashboardSrvc) {

  (function () {
    dashboardSrvc.getUser().then(function (response) {
      $scope.user = response.data;
    });
  })();
});
'use strict';

angular.module('smarthome').service('dashboardSrvc', function ($http) {

  this.checkAuth = function () {
    return $http({
      method: 'GET',
      url: '/checkAuth'
    }).then(function (response) {
      return response;
    });
  };

  this.getUser = function () {
    return $http.get('/me');
  };
});
'use strict';

angular.module('smarthome').directive('headDir', function ($state, $compile) {
  return {
    restrict: 'EA',
    templateUrl: './app/component/header/header.html',
    scope: false,
    controller: 'headerCtrl',
    link: function link(scope, elem, attrs) {
      var $scope = scope;
      $(document).ready(function () {

        if (!$scope.user) {
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
        } else {

          var elmnt = $compile('<div class="menu-box-container">\n                  <div class="lp-boxes" id="box1" ui-sref="dashboard">\n                      <i class="fa fa-tachometer fa-fw fa-3x" aria-hidden="true"></i>\n                      <p>Dashboard</p>\n                  </div>\n                  <div class="lp-boxes" id="box2">\n                      <i class="fa fa-plus-square fa-fw fa-3x" aria-hidden="true"></i>\n                      <p>Add Device</p>\n                  </div>\n                  <div class="lp-boxes" id="box3" ui-sref="manage">\n                      <i class="fa fa-wrench fa-fw fa-3x" aria-hidden="true"></i>\n                      <p>Manage Devices</p>\n                  </div>\n                  <div class="lp-boxes" id="box4">\n                      <i class="fa fa-question fa-fw fa-3x" aria-hidden="true"></i>\n                      <p>FAQ</p>\n                  </div>\n              </div>\n              <div class="menu-list-container">\n                  <div class="lp-menu-item" id="lp-contact">\n                      <p>Update Profile</p>\n                  </div>\n                  <div class="lp-menu-item" id="lp-logout" ng-click="logout()">\n                      <p>Logout</p>\n                  </div>\n                  <div class="social-hex">\n                      <div class="hexagon"><i class="fa fa-github fa-fw fa-2x" aria-hidden="true"></i></div>\n                      <div class="hexagon"><i class="fa fa-linkedin fa-fw fa-2x" aria-hidden="true"></i></div>\n                      <div class="hexagon"><i class="fa fa-facebook fa-fw fa-2x" aria-hidden="true"></i></div>\n                  </div>\n              </div>')(scope);

          $('.menu').empty();
          $('.menu').html(elmnt);

          $('#hamburger').click(function () {
            $('#hamburger').toggleClass('open');
            $('#menu').toggle('slide', 'left', 500);
            $('.landing-page').toggleClass('menu-open');
          });

          $('#lp-contact').on('click', function () {
            $('#hamburger').toggleClass('open');
            $('#menu').toggle('slide', 'left', 500);
            $('.user-update').show(300);
            $('body').css("overflow-y", "hidden");
          });

          $('.close-modal').on('click', function () {
            $('.user-update').hide(300);
            $('body').css("overflow-y", "auto");
            $('#hamburger').toggleClass('open');
            $('#menu').toggle('slide', 'left', 500);
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
        }
      });
    }
  };
});
'use strict';

angular.module('smarthome').controller('headerCtrl', function (headerSrvc, $scope, $state, $rootScope) {

  (function () {
    headerSrvc.getUser().then(function (response) {
      $scope.user = response.data;
      console.log($scope.user);
    });
  })();

  $scope.logout = function () {
    console.log('hit');
    headerSrvc.logout().then(function (response) {
      swal("Success!", "Logout Successful!", "success");
      setTimeout(function () {
        if (response) {
          $state.go('landing page');
        }
      }, 1500);
    });
  };

  $scope.updateMe = function (updateUser) {
    headerSrvc.updateMe(updateUser).then(function (response) {
      if (response.status === 200) {
        $('.user-update').hide(300);
        swal("Success!", "Your Information Has Been Saved!", "success");
      } else {
        swal("Error!", "Hmm...Something Wasn't Right", "error");
      }
    });
  };
});
'use strict';

angular.module('smarthome').service('headerSrvc', function ($http) {

  this.getUser = function () {
    return $http.get('/me');
  };

  this.logout = function () {
    return $http.get('/logout').then(function (response) {
      console.log(response);
      return response.data;
    }).catch(function (err) {
      console.log(err);
    });
  };

  this.updateMe = function (updateUser) {
    return $http({
      method: 'PUT',
      url: '/users/',
      data: updateUser
    }).then(function (response) {
      return response;
    }).catch(function (err) {
      console.log(err);
    });
  };
});
'use strict';

angular.module('smarthome').directive('update', function () {
  return {
    restrict: 'EA',
    templateUrl: './app/component/header/update.html',
    scope: false,
    controller: 'headerCtrl',
    link: function link(scope, elem, attrs) {
      var $scope = scope;
    }
  };
});
'use strict';

angular.module('smarthome').directive('landingDir', function () {
  return {
    restrict: 'EA',
    link: function link(scope, elem, attrs) {
      $(document).ready(function () {
        // $(window).scroll(() => {
        //     let winScroll = $(window).scrollTop() - 35;
        //     if (winScroll < $('.landing-banner').offset().top - ($(window).height() / 3)) {
        //         console.log(winScroll);
        //         $('.skew-right').css("transform", "skewY(" + (winScroll / 2) + "deg)");
        //         $('.skew-left').css("transform", "skewY(" + (-winScroll / 2) + "deg)");
        //     }
        // });
      });
    }
  };
});
'use strict';

angular.module('smarthome').controller('landingCtrl', function (landingSrvc, $scope) {

  (function () {
    landingSrvc.getUser().then(function (response) {
      $scope.user = response.data;
      console.log($scope.user);
    });
  })();
});
'use strict';

angular.module('smarthome').service('landingSrvc', function ($http) {

  this.getUser = function () {
    return $http.get('/me');
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

  $scope.localLogin = function (email, password) {
    loginService.login(email, password).then(function (response) {
      $state.go('landing page');
    });
  };

  (function () {
    loginService.getUser().then(function (response) {
      $scope.user = response.data;
    });
  })();

  $scope.logout = function () {
    console.log('hit');
    headerSrvc.logout().then(function (response) {
      swal("Success!", "Logout Successful!", "success");
      setTimeout(function () {
        if (response) {
          $state.go('landing page');
        }
      }, 1500);
    });
  };
}); //End loginCtrl
'use strict';

angular.module('smarthome').service('loginService', function ($http, $state) {
  this.login = function (email, password) {
    return $http({
      method: 'POST',
      url: '/auth/local',
      data: {
        username: email,
        password: password
      }
    }).then(function (response) {
      return response.status;
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
      $state.go('landing page');
    });
  };

  this.getUser = function () {
    return $http.get('/me');
  };
}); //End loginService
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
'use strict';

angular.module('smarthome').directive('deviceCard', function (manageService) {
  return {
    restrict: 'EA',
    templateUrl: './app/component/manage/deviceCard.html',
    scope: {
      type: "@",
      nickname: "@",
      id: "@"
    },
    link: function link(scope, element, attrs) {
      switch (scope.type) {
        case "Door/Window Sensor":
          {
            scope.icon_url = '/assets/img/window-door_icon.png';
            break;
          }
        case "Sound Sensor":
          {
            scope.icon_url = './assets/img/sound-placeholder.jpg';
            break;
          }
        case "Smoke Detector":
          {
            scope.icon_url = './assets/img/thermometer-icon.png';
            break;
          }
        case "Motion Sensor":
          {
            scope.icon_url = './assets/img/motion-placeholder.jpg';
            break;
          }
        default:
          {
            scope.icon_url = './assets/img/protect-icon-01.png';
          }
      }
      manageService.getSettings(scope.id).then(function (response) {
        element.find('i').on('click', function () {
          var setting = response;
          var id = setting.id;

          var startTime = setting.start_time;
          var endTime = setting.end_time;
          /// Door + Window Sensor ///
          if (scope.type == "Door/Window Sensor") {
            element.find('section').append('\n                  <div id="appended">\n                    <i id="appended-close" class="fa fa-close"></i>\n                    <div>\n                      <h2>Notification Window</h2>\n                      <h3>Start Time</h3>\n                        <input type="text" id="start' + id + '" value="' + startTime + '"></input>\n                      <h3>End Time</h3>\n                        <input type="text" id="end' + id + '" value="' + endTime + '"></input>\n                    </div>\n\n                    <div class="checkbox-section">\n                      <h2>Notifications</h2>\n                        <div class="check-box">\n                          <div class="squaredOne">\n                            <input type="checkbox" value="email" id="settings-email-radio" name="check" checked />\n                            <label for="settings-email-radio"></label>\n                          </div>\n                          <h4> Send me an email </h4>\n                        </div>\n\n                        <div class="check-box">\n                          <div class="squaredOne">\n                            <input type="checkbox" value="text" id="settings-text-radio" name="check" checked />\n                            <label for="settings-text-radio"></label>\n                          </div>\n                          <h4> Send me a text </h4>\n                        </div>\n\n                      </div>\n                      <hr>\n                      <div class="enable-section">\n                          <div class="slide-checkbox">\n    \t\t                      <input type="checkbox" value="true" ng-model="isEnabled" id="checkboxThreeInput" checked />\n\t  \t                        <label for="checkboxThreeInput"></label>\n\t                         </div>\n                         <h4>Enable/Disable Device</h4>\n                      </div>');
          } else if (scope.type == "Smoke Detector") {
            var _startTime = setting.start_time;
            var _endTime = setting.end_time;
            element.find('section').append('\n                  <div id="appended">\n                    <i id="appended-close" class="fa fa-close"></i>\n                    <div>\n                      <h2>Notification Window</h2>\n                      <h3>Start Time</h3>\n                        <input type="text" id="start' + id + '" value="' + _startTime + '"></input>\n                      <h3>End Time</h3>\n                        <input type="text" id="end' + id + '" value="' + _endTime + '"></input>\n                    </div>\n\n                    <div class="checkbox-section">\n                      <h2>Notifications</h2>\n                        <div class="check-box">\n                          <div class="squaredOne">\n                            <input type="checkbox" value="None" id="settings-email-radio" name="check" checked />\n                            <label for="settings-email-radio"></label>\n                          </div>\n                          <h4> Send me an email </h4>\n                        </div>\n\n                        <div class="check-box">\n                          <div class="squaredOne">\n                            <input type="checkbox" value="None" id="settings-text-radio" name="check" checked />\n                            <label for="settings-text-radio"></label>\n                          </div>\n                          <h4> Send me a text </h4>\n                        </div>\n\n                      </div>\n                      <hr>\n                      <div class="enable-section">\n                          <div class="slide-checkbox">\n    \t\t                      <input type="checkbox" value="1" id="checkboxThreeInput" checked />\n\t  \t                        <label for="checkboxThreeInput"></label>\n\t                         </div>\n                         <h4>Enable/Disable Device</h4>\n                      </div>');
          } else if (scope.type == "Sound Sensor") {
            var _startTime2 = setting.start_time;
            var _endTime2 = setting.end_time;
            element.find('section').append('\n                  <div id="appended">\n                    <i id="appended-close" class="fa fa-close"></i>\n                    <div>\n                      <h2>Notification Window</h2>\n                      <h3>Start Time</h3>\n                        <input type="text" id="start' + id + '" value="' + _startTime2 + '"></input>\n                      <h3>End Time</h3>\n                        <input type="text" id="end' + id + '" value="' + _endTime2 + '"></input>\n                    </div>\n\n                    <div class="checkbox-section">\n                      <h2>Notifications</h2>\n                        <div class="check-box">\n                          <div class="squaredOne">\n                            <input type="checkbox" value="None" id="settings-email-radio" name="check" checked />\n                            <label for="settings-email-radio"></label>\n                          </div>\n                          <h4> Send me an email </h4>\n                        </div>\n\n                        <div class="check-box">\n                          <div class="squaredOne">\n                            <input type="checkbox" value="None" id="settings-text-radio" name="check" checked />\n                            <label for="settings-text-radio"></label>\n                          </div>\n                          <h4> Send me a text </h4>\n                        </div>\n\n                      </div>\n                      <hr>\n                      <div class="enable-section">\n                          <div class="slide-checkbox">\n    \t\t                      <input type="checkbox" value="1" id="checkboxThreeInput" checked />\n\t  \t                        <label for="checkboxThreeInput"></label>\n\t                         </div>\n                         <h4>Enable/Disable Device</h4>\n                      </div>');
          } else if (scope.type == "Motion Sensor") {
            var _startTime3 = setting.start_time;
            var _endTime3 = setting.end_time;
            element.find('section').append('\n                  <div id="appended">\n                    <i id="appended-close" class="fa fa-close"></i>\n                    <div>\n                      <h2>Notification Window</h2>\n                      <h3>Start Time</h3>\n                        <input type="text" id="start' + id + '" value="' + _startTime3 + '"></input>\n                      <h3>End Time</h3>\n                        <input type="text" id="end' + id + '" value="' + _endTime3 + '"></input>\n                    </div>\n\n                    <div class="checkbox-section">\n                      <h2>Notifications</h2>\n                        <div class="check-box">\n                          <div class="squaredOne">\n                            <input type="checkbox" value="None" id="settings-email-radio" name="check" checked />\n                            <label for="settings-email-radio"></label>\n                          </div>\n                          <h4> Send me an email </h4>\n                        </div>\n\n                        <div class="check-box">\n                          <div class="squaredOne">\n                            <input type="checkbox" value="None" id="settings-text-radio" name="check" checked />\n                            <label for="settings-text-radio"></label>\n                          </div>\n                          <h4> Send me a text </h4>\n                        </div>\n\n                      </div>\n                      <hr>\n                      <div class="enable-section">\n                          <div class="slide-checkbox">\n    \t\t                      <input type="checkbox" value="1" id="checkboxThreeInput" checked />\n\t  \t                        <label for="checkboxThreeInput"></label>\n\t                         </div>\n                         <h4>Enable/Disable Device</h4>\n                      </div>');
          }
          $(element.find('section')).slideDown();
          console.log('id', scope.id);
          $("#start" + scope.id).timeDropper();
          $("#end" + scope.id).timeDropper();
        });
      });
      $(element.find('section')).on('click', '#appended-close', function () {
        $(element.find('section')).slideUp('slow', function () {
          $('#appended').remove();
        });
      });
    },
    controller: function controller($scope) {
      $scope.showSettings = false;
    }
  };
}); //End directive
'use strict';

angular.module('smarthome').controller('manageCtrl', function ($scope, manageService, user) {

  $scope.user = user.data;

  (function () {
    manageService.getDevices().then(function (response) {
      $scope.devices = response;
    });
  })();
}); //End manageCtrl
'use strict';

angular.module('smarthome').service('manageService', function ($http) {

  this.getDevices = function () {
    return $http({
      method: 'GET',
      url: 'users/sensors'
    }).then(function (response) {
      return response.data;
    });
  };

  this.getSettings = function (id) {
    return $http({
      method: 'GET',
      url: 'settings/' + id
    }).then(function (response) {
      var startTime = timeConverter(response.data[0].start_time);
      var endTime = timeConverter(response.data[0].end_time);
      response.data[0].start_time = startTime;
      response.data[0].end_time = endTime;
      return response.data[0];
    });
  };

  var timeConverter = function timeConverter(rawTime) {
    if (rawTime) {
      var result = void 0;
      var time = rawTime.split(':');
      time.pop();
      var min = time[1];
      var hour = time[0];
      time.splice(0, 2);
      if (Number(hour) > 12) {
        hour -= 12;
        time.push(hour, min);
        result = time.join(':');
        result += " PM";
      } else if (Number(hour) === 12) {
        time.push(hour, min);
        result = time.join(':');
        result += " PM";
      } else if (Number(hour) === 0) {
        hour = 12;
        time.push(hour, min);
        result = time.join(':');
        result += " AM";
      } else {
        time.push(hour, min);
        result = time.join(':');
        result += " AM";
      }
      return result;
    } else {
      return "N/A";
    }
  };
}); //End manageService