angular.module('smarthome')
    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
          .state('login', {
            url: '/login',
            templateUrl: './app/component/login/login.html'
          })
          .state('landing page', {
              url: '/',
              templateUrl: './app/component/landingPage/landingPage.html',
              controller: 'landingCtrl'
          })

    });
