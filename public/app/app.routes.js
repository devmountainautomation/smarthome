angular.module('smarthome')
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $urlRouterProvider.when(/section[0-9]+/, function () {
      // no op
    });

    $stateProvider
      .state('landing page', {
        url: '/',
        templateUrl: './app/component/landingPage/landingPage.html',
      })

      .state('login', {
        url: '/login',
        templateUrl: '/app/component/login/login.html'
      })

      .state('getStarted', {
        url: '/getstarted',
        templateUrl: './app/component/getStarted/getStarted.html'
      })

  });
