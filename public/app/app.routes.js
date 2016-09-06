angular.module('smarthome')
    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('landing page', {
                url: '/',
                templateUrl: './app/component/landingPage/landingPage.html',
                controller: 'landingCtrl'
            });

    });
