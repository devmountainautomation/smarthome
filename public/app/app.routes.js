angular.module('smarthome')
    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
          .state('login', {
            url: '/login',
            templateUrl: './views/login.html'
          })
            .state('landing page', {
                url: '/',
                templateUrl: './app/component/landingPage/landingPage.html',
                controller: 'landingCtrl'
            })

    });
