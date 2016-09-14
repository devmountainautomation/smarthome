angular.module('smarthome')
  .config(($stateProvider, $urlRouterProvider) => {

      $urlRouterProvider.otherwise('/');

      $urlRouterProvider.when(/section[0-9]+/, () => {
          // no op
      });

    $stateProvider
      .state('landing page', {
        url: '/',
        templateUrl: './app/component/landingPage/landingPage.html',
        resolve: {
          classStrip: () => {
            $('body').removeClass('menu-open');
          }
        }
      })
      .state('getStarted', {
        url: '/getstarted',
        templateUrl: './app/component/getStarted/getStarted.html',
        resolve: {
          classStrip: () => {
            $('body').removeClass('menu-open');
          }
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: './app/component/login/login.html',
        controller: 'loginCtrl',
        resolve: {
          checkAuth: ($state, dashboardSrvc) => {
            return dashboardSrvc.checkAuth().then(response => {
              if (response.data !== 'unauthorized') {
                $state.go('dashboard');
              }
            });
          },
          classStrip: () => {
            $('body').removeClass('menu-open');
          }
        }
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: './app/component/dashboard/dashboard.html',
        controller: 'dashboardCtrl',
        resolve: {
          user: (dashboardSrvc) => {
            return dashboardSrvc.getUser();
          },
          checkAuth: ($state, dashboardSrvc) => {
            return dashboardSrvc.checkAuth().then(response => {
              if (response.data === 'unauthorized') {
                $state.go('login');
                setTimeout(() => {
                  swal("Error", 'Please Login or Sign Up', 'error');
                }, 400);
              }
            });
          },
          classStrip: () => {
            $('body').removeClass('menu-open');
          }
        }
      })
      .state('manage', {
        url: '/manage',
        templateUrl: './app/component/manage/manage.html',
        controller: 'manageCtrl',
        resolve: {
          user: (dashboardSrvc) => {
            return dashboardSrvc.getUser();
          },
          checkAuth: ($state, dashboardSrvc) => {
            return dashboardSrvc.checkAuth().then(response => {
              if (response.data === 'unauthorized') {
                $state.go('login');
                setTimeout(() => {
                  swal("Error", 'Please Login or Sign Up', 'error');
                }, 400);
              }
            });
          },
          classStrip: () => {
            $('body').removeClass('menu-open');
          }
        }
      })
      .state('addDevice', {
        url: '/add',
        templateUrl: 'app/component/add/add.html',
        controller: 'addCtrl',
        resolve: {
          checkAuth: ($state, dashboardSrvc) => {
            return dashboardSrvc.checkAuth().then(response => {
              if (response.data === 'unauthorized') {
                $state.go('login');
                setTimeout(() => {
                  swal("Error", 'Please Login or Sign Up', 'error');
                }, 400);
              }
            });
          },
          classStrip: () => {
            $('body').removeClass('menu-open');
          }
        }
      })
      .state('about', {
        url: '/about',
        templateUrl: '/app/component/about/about.html',
        controller: 'aboutCtrl',
        resolve: {
          classStrip: () => {
            $('body').removeClass('menu-open');
          }
        }
      })

  });
