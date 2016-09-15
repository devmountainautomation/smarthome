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

  $urlRouterProvider.when(/section[0-9]+/, function () {
    // no op
  });

  $stateProvider.state('landing page', {
    url: '/',
    templateUrl: './app/component/landingPage/landingPage.html',
    resolve: {
      classStrip: function classStrip() {
        $('body').removeClass('menu-open');
      }
    }
  }).state('getStarted', {
    url: '/getstarted',
    templateUrl: './app/component/getStarted/getStarted.html',
    controller: 'getStartedCtrl',
    resolve: {
      classStrip: function classStrip() {
        $('body').removeClass('menu-open');
      }
    }
  }).state('login', {
    url: '/login',
    templateUrl: './app/component/login/login.html',
    controller: 'loginCtrl',
    resolve: {
      checkAuth: function checkAuth($state, dashboardSrvc) {
        return dashboardSrvc.checkAuth().then(function (response) {
          if (response.data !== 'unauthorized') {
            $state.go('dashboard');
          }
        });
      },
      classStrip: function classStrip() {
        $('body').removeClass('menu-open');
      }
    }
  }).state('dashboard', {
    url: '/dashboard',
    templateUrl: './app/component/dashboard/dashboard.html',
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
      },
      classStrip: function classStrip() {
        $('body').removeClass('menu-open');
      }
    }
  }).state('manage', {
    url: '/manage',
    templateUrl: './app/component/manage/manage.html',
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
      },
      classStrip: function classStrip() {
        $('body').removeClass('menu-open');
      }
    }
  }).state('addDevice', {
    url: '/add',
    templateUrl: 'app/component/add/add.html',
    controller: 'addCtrl',
    resolve: {
      checkAuth: function checkAuth($state, dashboardSrvc) {
        return dashboardSrvc.checkAuth().then(function (response) {
          if (response.data === 'unauthorized') {
            $state.go('login');
            setTimeout(function () {
              swal("Error", 'Please Login or Sign Up', 'error');
            }, 400);
          }
        });
      },
      classStrip: function classStrip() {
        $('body').removeClass('menu-open');
      }
    }
  }).state('about', {
    url: '/about',
    templateUrl: 'app/component/about/about.html',
    controller: 'aboutCtrl',
    resolve: {
      classStrip: function classStrip() {
        $('body').removeClass('menu-open');
      }
    }
  });
});
'use strict';

angular.module('smarthome').directive('aboutDir', function () {
  return {
    restrict: 'EA',
    controller: 'aboutCtrl',
    link: function link(scope, elem, attrs) {
      $(document).ready(function () {});
    }
  };
});
'use strict';

angular.module('smarthome').controller('aboutCtrl', function ($scope) {});
'use strict';

angular.module('smarthome').controller('addCtrl', function ($scope, addService) {
  $scope.settings = {};

  $('#breech-start').timeDropper({
    setCurrentTime: true
  });
  $('#breech-end').timeDropper({
    setCurrentTime: true
  });
  $('#smoke-start').timeDropper({
    setCurrentTime: true
  });
  $('#smoke-end').timeDropper({
    setCurrentTime: true
  });
  $('#sound-start').timeDropper({
    setCurrentTime: true
  });
  $('#sound-end').timeDropper({
    setCurrentTime: true
  });
  $('#motion-start').timeDropper({
    setCurrentTime: true
  });
  $('#motion-end').timeDropper({
    setCurrentTime: true
  });

  $("#door-window-settings").hide();
  $("#smoke-settings").hide();
  $("#sound-settings").hide();
  $("#motion-settings").hide();
  $("#camera-settings").hide();
  $("#therm-settings").hide();

  var gotoElement = function gotoElement(eID) {
    addService.scrollTo(eID);
  };

  $scope.$watch('module_type', function (value) {
    switch (value) {
      case "breech":
        {
          $("#door-window-settings").slideDown();
          $("#smoke-settings").hide();
          $("#sound-settings").hide();
          $("#motion-settings").hide();
          $("#therm-settings").hide();
          $("#camera-settings").hide();
          break;
        }
      case "therm":
        {
          $("#therm-settings").slideDown();
          $("#camera-settings").hide();
          $("#door-window-settings").hide();
          $("#smoke-settings").hide();
          $("#sound-settings").hide();
          $("#motion-settings").hide();
          break;
        }
      case "camera":
        {
          $("#camera-settings").slideDown();
          $("#door-window-settings").hide();
          $("#smoke-settings").hide();
          $("#sound-settings").hide();
          $("#motion-settings").hide();
          $("#therm-settings").hide();
          break;
        }
      case "smoke_detector":
        {
          $("#smoke-settings").slideDown();
          $("#door-window-settings").hide();
          $("#sound-settings").hide();
          $("#motion-settings").hide();
          $("#therm-settings").hide();
          $("#camera-settings").hide();
          break;
        }
      case "sound":
        {
          $("#sound-settings").slideDown();
          $("#door-window-settings").hide();
          $("#smoke-settings").hide();
          $("#motion-settings").hide();
          $("#therm-settings").hide();
          $("#camera-settings").hide();
          break;
        }
      case "motion":
        {
          $("#motion-settings").slideDown();
          $("#door-window-settings").hide();
          $("#smoke-settings").hide();
          $("#sound-settings").hide();
          $("#therm-settings").hide();
          $("#camera-settings").hide();
          break;
        }
    }
  });
  $scope.addBreech = function () {
    $scope.settings.start_time = $('#breech-start').val();
    $scope.settings.end_time = $('#breech-end').val();
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
    return $http({
      method: 'POST',
      url: '/sensors/breech',
      data: settings
    }).then(function (response) {
      return response;
    });
  };

  this.addBreech = function (settings) {
    return $http({
      method: 'POST',
      url: '/settings/breech',
      data: settings
    }).then(function (response) {
      return response;
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

  $scope.getNotifications = function () {
    dashboardSrvc.getNotifications().then(function (response) {
      console.log(response.data);
      $scope.notes = response.data;
      if (response.data.length < 1) {
        $('.notifications').css('display', 'none');
        $('.no-notes').removeClass('hidden');
      } else if (response.data.length >= 1) {
        $('.notifications').css('display', 'block');
        $('.no-notes').addClass('hidden');
      }
    });
  };
  $scope.getNotifications();

  $scope.updateNote = function (id) {
    dashboardSrvc.updateNote(id).then(function (response) {
      if (response.status === 200) {
        $('#' + id).addClass('slide-out');
        setTimeout(function () {
          $scope.getNotifications();
        }, 800);
      } else {
        console.log(response);
        swal('Error', 'Hmm, something happened. Please Try Again.', 'error');
      }
    });
  };
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

  this.getNotifications = function () {
    return $http.get('/notifications');
  };

  this.updateNote = function (id) {
    return $http({
      method: 'PUT',
      url: '/notifications/' + id
    }).then(function (response) {
      return response;
    });
  };
});
'use strict';

angular.module('smarthome').directive('slider', function () {
  return {
    restrict: 'EA',
    templateUrl: './app/component/getStarted/slider.html',
    controller: 'getStartedCtrl',
    link: function link(scope, elem, attrs) {
      $(document).ready(function () {

        var scrolling = false;
        var contentSections = $('.cd-section'),
            verticalNavigation = $('.cd-vertical-nav'),
            navigationItems = verticalNavigation.find('a'),
            navTrigger = $('.cd-nav-trigger'),
            scrollArrow = $('.cd-scroll-down');

        $(window).on('scroll', checkScroll);

        //smooth scroll to the selected section
        verticalNavigation.on('click', 'a', function (event) {
          event.preventDefault();
          smoothScroll($(this.hash));
          verticalNavigation.removeClass('open');
        });

        //smooth scroll to the second section
        scrollArrow.on('click', function (event) {
          event.preventDefault();
          smoothScroll($(this.hash));
        });

        // open navigation if user clicks the .cd-nav-trigger - small devices only
        navTrigger.on('click', function (event) {
          event.preventDefault();
          verticalNavigation.toggleClass('open');
        });

        function checkScroll() {
          if (!scrolling) {
            scrolling = true;
            !window.requestAnimationFrame ? setTimeout(updateSections, 300) : window.requestAnimationFrame(updateSections);
          }
        }

        function updateSections() {
          var halfWindowHeight = $(window).height() / 2,
              scrollTop = $(window).scrollTop();
          contentSections.each(function () {
            var section = $(this),
                sectionId = section.attr('id'),
                navigationItem = navigationItems.filter('[href^="#' + sectionId + '"]');
            section.offset().top - halfWindowHeight < scrollTop && section.offset().top + section.height() - halfWindowHeight > scrollTop ? navigationItem.addClass('active') : navigationItem.removeClass('active');
          });
          scrolling = false;
        }

        function smoothScroll(target) {
          $('body,html').animate({
            'scrollTop': target.offset().top
          }, 300);
        }

        // var contentSections = $('.cd-section'),
        // navigationItems = $('.cd-vertical-nav a');
        //
        // updateNavigation();
        //
        // $(window).on('scroll', function(){
        // 	updateNavigation();
        // });
        //
        // //smooth scroll to the section
        // navigationItems.on('click', function(event){
        //       event.preventDefault();
        //       console.log("should scroll");
        //       smoothScroll($(this.hash));
        //   });
        //   //smooth scroll to second section
        //   $('.cd-scroll-down').on('click', function(event){
        //       event.preventDefault();
        //       smoothScroll($(this.hash));
        //   });
        //
        //   //open-close navigation on touch devices
        //   $('.touch .cd-nav-trigger').on('click', function(){
        //   	$('.touch #cd-vertical-nav').toggleClass('open');
        //
        //   });
        //   //close navigation on touch devices when selectin an elemnt from the list
        //   $('.touch #cd-vertical-nav a').on('click', function(){
        //   	$('.touch #cd-vertical-nav').removeClass('open');
        //   });
        //
        // function updateNavigation() {
        // 	contentSections.each(function(){
        // 		// $this = $(this);
        // 		var activeSection = $('#cd-vertical-nav a[href="#'+$(this).attr('id')+'"]').data('number') - 1;
        // 		if ( ( $(this).offset().top - $(window).height()/2 < $(window).scrollTop() ) && ( $(this).offset().top + $(this).height() - $(window).height()/2 > $(window).scrollTop() ) ) {
        // 			navigationItems.eq(activeSection).addClass('is-selected');
        // 		}else {
        // 			navigationItems.eq(activeSection).removeClass('is-selected');
        // 		}
        // 	});
        // }
        //
        // function smoothScroll(target) {
        //       $('body,html').animate(
        //       	{'scrollTop':target.offset().top},
        //       	600
        //       );
        // }
      });
    }
  };
});
'use strict';

angular.module('smarthome').controller('getStartedCtrl', function ($scope) {

  $scope.slides = [{
    id: 1,
    title: "Equipment",
    header: "Get the right equipment",
    text: "HomeOne is configured to work with a Rasberry Pi",
    img: "../../../assets/img/getStarted/raspberrypi.png"
  }, {
    id: 2,
    title: "PubNub",
    header: "Create a PubNub account",
    text: "PubNub is the link between your Raspberry Pi and your HomeOne portal",
    img: "../../../assets/img/getStarted/pubnub.png"
  }, {
    id: 3,
    title: "HomeOne",
    header: "Register your device on your HomeOne account",
    text: "Registering your device gives you the ability to set notification time windows and view historical data",
    img: "../../../assets/img/devautomation logo-1.png"
  }, {
    id: 4,
    title: "Software",
    header: "Download the HomeOne software on your Raspberry Pi",
    text: "After installing a Raspberry Pi OS, download node and npm install home-one",
    img: "../../../assets/img/getStarted/download.svg"
  }
  // {
  //   id: 5,
  //   title: "Install",
  //   header: "Install the device in your home",
  //   text: "Once the device is installed, HomeOne will take care of the rest",
  //   img: "../../../assets/img/getStarted/tools.svg"
  // }
  ];
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
            setTimeout(function () {
              $('html, body').scrollTop(0);
            }, 500);
            $('body').toggleClass('menu-open');
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
          var elmnt = $compile('<div class="menu-box-container">\n                <div class="lp-boxes" id="box1" ui-sref="dashboard">\n                  <i class="fa fa-tachometer fa-fw fa-3x" aria-hidden="true"></i>\n                  <p>Dashboard</p>\n                </div>\n                <div class="lp-boxes" id="box2" ui-sref="addDevice">\n                  <i class="fa fa-plus-square fa-fw fa-3x" aria-hidden="true"></i>\n                  <p>Add Device</p>\n                </div>\n                <div class="lp-boxes" id="box3" ui-sref="manage">\n                  <i class="fa fa-wrench fa-fw fa-3x" aria-hidden="true"></i>\n                  <p>Manage Devices</p>\n                </div>\n                <div class="lp-boxes" id="box4" ui-sref="about">\n                  <i class="fa fa-user fa-fw fa-3x" aria-hidden="true"></i>\n                  <p>Our Team</p>\n                </div>\n              </div>\n              <div class="menu-list-container">\n                <div class="lp-menu-item" id="lp-contact">\n                  <p>Update Profile</p>\n                </div>\n                <div class="lp-menu-item" id="lp-logout" ng-click="logout()">\n                  <p>Logout</p>\n                </div>\n                <div class="social-hex">\n                  <a href="https://github.com/devmountainautomation/smarthome"><div class="hexagon"><i class="fa fa-github fa-fw fa-2x" aria-hidden="true"></i></div></a>\n                  <div class="hexagon"><i class="fa fa-linkedin fa-fw fa-2x" aria-hidden="true"></i></div>\n                  <a href="https://www.facebook.com/dmsmarthome/"><div class="hexagon"><i class="fa fa-facebook fa-fw fa-2x" aria-hidden="true"></i></div></a>\n                </div>\n              </div>')(scope);

          $('.menu').empty();
          $('.menu').html(elmnt);

          $('#hamburger').click(function () {
            $('#hamburger').toggleClass('open');
            $('#menu').toggle('slide', 'left', 500);
            $('body').toggleClass('menu-open');
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

angular.module('smarthome').controller('headerCtrl', function (headerSrvc, $scope, $state, $location, $anchorScroll) {

  $scope.scrollTo = function (id) {
    $location.hash(id);
    $('#hamburger').toggleClass('open');
    $('#menu').toggle('slide', 'left', 500);
    $('body').toggleClass('menu-open');
    $anchorScroll();
  };

  (function () {
    headerSrvc.getUser().then(function (response) {
      $scope.user = response.data;
    });
  })();

  $scope.logout = function () {
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
}); //End headerCtrl
'use strict';

angular.module('smarthome').service('headerSrvc', function ($http) {

  this.getUser = function () {
    return $http.get('/me');
  };

  this.logout = function () {
    return $http.get('/logout').then(function (response) {
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
      $state.go('dashboard');
    });
  };

  (function () {
    loginService.getUser().then(function (response) {
      $scope.user = response.data;
    });
  })();

  $scope.logout = function () {
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

angular.module('smarthome').directive('deviceCard', function (manageService, $compile) {
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
            scope.icon_url = './assets/img/sound_icon.png';
            break;
          }
        case "Smoke Detector":
          {
            scope.icon_url = './assets/img/thermometer-icon.png';
            break;
          }
        case "Motion Sensor":
          {
            scope.icon_url = './assets/img/motion_icon.png';
            break;
          }
        default:
          {
            scope.icon_url = './assets/img/protect_icon.png';
          }
      }
      manageService.getSettings(scope.id).then(function (response) {
        var settings = response;
        element.find('i').on('click', function () {
          var id = scope.id;
          var startTime = settings.start_time;
          var endTime = settings.end_time;
          // let active = setting.active;
          // let email;
          // let sms = setting.sms;
          var content = void 0;
          /// Door + Window Sensor ///
          if (scope.type == "Door/Window Sensor") {
            content = $compile('\n                  <div id="appended">\n                    <i id="appended-close" class="fa fa-close"></i>\n                    <div>\n                      <h2>Notification Window</h2>\n                      <h3>Start Time</h3>\n                    <input type="text" id="start' + id + '" value="' + startTime + '"></input>\n                      <h3>End Time</h3>\n                    <input type="text" id="end' + id + '" value="' + endTime + '"></input>\n                    </div>\n                    <div class="checkbox-section">\n                      <h2>Notifications</h2>\n                        <div class="check-box">\n                          <div class="squaredOne">\n                            <input type="checkbox" id="settings-email-radio" ng-model="settings.email"/>\n                            <label for="settings-email-radio"></label>\n                          </div>\n                          <h4> Send me an email </h4>\n                        </div>\n                        <div class="check-box">\n                          <div class="squaredOne">\n                            <input type="checkbox" id="settings-text-radio" ng-model="settings.sms" />\n                            <label for="settings-text-radio"></label>\n                          </div>\n                          <h4> Send me a text </h4>\n                        </div>\n\n                      </div>\n                      <hr>\n                      <div class="enable-section">\n                          <div class="slide-checkbox">\n    \t\t                      <input type="checkbox" ng-model="settings.active" id="checkboxThreeInput"/>\n\t  \t                        <label for="checkboxThreeInput"></label>\n\t                         </div>\n                         <h4>Enable/Disable Device</h4>\n                      </div>\n                      <div>\n                      <hr>\n                      <button type="button" ng-click="saveSettings()"> Save Settings </button>\n                      </div>')(scope);
          } else if (scope.type == "Smoke Detector") {
            var _startTime = setting.start_time;
            var _endTime = setting.end_time;
            content = $compile('\n                  <div id="appended">\n                    <i id="appended-close" class="fa fa-close"></i>\n                    <div>\n                      <h2>Notification Window</h2>\n                      <h3>Start Time</h3>\n                        <input type="text" id="start' + id + '" value="' + _startTime + '"></input>\n                      <h3>End Time</h3>\n                        <input type="text" id="end' + id + '" value="' + _endTime + '"></input>\n                    </div>\n\n                    <div class="checkbox-section">\n                      <h2>Notifications</h2>\n                        <div class="check-box">\n                          <div class="squaredOne">\n                            <input type="checkbox" value="None" id="settings-email-radio" name="check" checked />\n                            <label for="settings-email-radio"></label>\n                          </div>\n                          <h4> Send me an email </h4>\n                        </div>\n\n                        <div class="check-box">\n                          <div class="squaredOne">\n                            <input type="checkbox" value="None" id="settings-text-radio" name="check" checked />\n                            <label for="settings-text-radio"></label>\n                          </div>\n                          <h4> Send me a text </h4>\n                        </div>\n\n                      </div>\n                      <hr>\n                      <div class="enable-section">\n                          <div class="slide-checkbox">\n    \t\t                      <input type="checkbox" value="1" id="checkboxThreeInput" checked />\n\t  \t                        <label for="checkboxThreeInput"></label>\n\t                         </div>\n                         <h4>Enable/Disable Device</h4>\n                      </div>\n                      <button type="button" ng-click="saveSettings()"></button>\n                    ')(scope);
          } else if (scope.type == "Sound Sensor") {
            var _startTime2 = setting.start_time;
            var _endTime2 = setting.end_time;
            content = $compile('\n                  <div id="appended">\n                    <i id="appended-close" class="fa fa-close"></i>\n                    <div>\n                      <h2>Notification Window</h2>\n                      <h3>Start Time</h3>\n                        <input type="text" id="start' + id + '" value="' + _startTime2 + '"></input>\n                      <h3>End Time</h3>\n                        <input type="text" id="end' + id + '" value="' + _endTime2 + '"></input>\n                    </div>\n\n                    <div class="checkbox-section">\n                      <h2>Notifications</h2>\n                        <div class="check-box">\n                          <div class="squaredOne">\n                            <input type="checkbox" value="None" id="settings-email-radio" name="check" checked />\n                            <label for="settings-email-radio"></label>\n                          </div>\n                          <h4> Send me an email </h4>\n                        </div>\n\n                        <div class="check-box">\n                          <div class="squaredOne">\n                            <input type="checkbox" value="None" id="settings-text-radio" name="check" checked />\n                            <label for="settings-text-radio"></label>\n                          </div>\n                          <h4> Send me a text </h4>\n                        </div>\n\n                      </div>\n                      <hr>\n                      <div class="enable-section">\n                          <div class="slide-checkbox">\n    \t\t                      <input type="checkbox" value="1" id="checkboxThreeInput" checked />\n\t  \t                        <label for="checkboxThreeInput"></label>\n\t                         </div>\n                         <h4>Enable/Disable Device</h4>\n                      </div>\n                      <button type="button" ng-click="saveSettings()"></button>\n                    ')(scope);
          } else if (scope.type == "Motion Sensor") {
            var _startTime3 = setting.start_time;
            var _endTime3 = setting.end_time;
            content = $compile('\n                  <div id="appended">\n                    <i id="appended-close" class="fa fa-close"></i>\n                    <div>\n                      <h2>Notification Window</h2>\n                      <h3>Start Time</h3>\n                    <input type="text" id="start' + id + '" ng-value="settings.startTime" ng-model="settings.start_time"></input>\n                      <h3>End Time</h3>\n                    <input type="text" id="end' + id + '" ng-value="settings.endTime"></input>\n                    </div>\n\n                    <div class="checkbox-section">\n                      <h2>Notifications</h2>\n                        <div class="check-box">\n                          <div class="squaredOne">\n                            <input type="checkbox" value="true" ng-value="settings.email" id="settings-email-radio"/>\n                            <label for="settings-email-radio"></label>\n                          </div>\n                          <h4> Send me an email </h4>\n                        </div>\n\n                        <div class="check-box">\n                          <div class="squaredOne">\n                            <input type="checkbox" value="true" ng-value="settings.text" id="settings-text-radio"/>\n                            <label for="settings-text-radio"></label>\n                          </div>\n                          <h4> Send me a text </h4>\n                        </div>\n\n                      </div>\n                      <hr>\n                      <div class="enable-section">\n                          <div class="slide-checkbox">\n    \t\t                      <input ng-value="settings.active" type="checkbox" value="1" id="checkboxThreeInput" checked />\n\t  \t                        <label for="checkboxThreeInput"></label>\n\t                         </div>\n                         <h4>Enable/Disable Device</h4>\n                      </div>\n                      <hr>\n                      <button type="button" ng-click="saveSettings()"></button>\n                    ')(scope);
          }
          $(element.find('section')).html(content);
          $('.devices').css("overflow", "hidden");
          $("#start" + scope.id).timeDropper();
          $("#end" + scope.id).timeDropper();
          $(element.find('section')).slideDown();
        });
      });
      $(element.find('section')).on('click', '#appended-close', function () {
        $(element.find('section')).slideUp('slow', function () {
          $('.devices').css("overflow", "auto");
          $('#appended').remove();
        });
      });
    },
    controller: function controller($scope, manageService) {

      manageService.getSettings($scope.id).then(function (response) {
        $scope.settings = response;
      });
      $scope.saveSettings = function () {
        console.log('saved settings', $scope.settings);
        var crazy = $('#start' + $scope.id).val();
        console.log('start', crazy);
        $scope.settings.start_time = $('#start' + $scope.id).val();
        $scope.settings.end_time = $('#end' + $scope.id).val();
        manageService.saveSettings($scope.settings).then(function (response) {
          $('#appended').closest('section').slideUp('slow', function () {
            $('.devices').css("overflow", "auto");
            $('#appended').remove();
          });
        });
      };
    }
  };
}); //End directive
'use strict';

angular.module('smarthome').controller('manageCtrl', function ($scope, manageService) {

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
      return response.data[0];
    });
  };

  this.saveSettings = function (settings) {
    return $http({
      method: 'PUT',
      url: 'settings/',
      data: settings
    });
  };
}); //End manageService