angular.module('smarthome')
    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
          .state('login', {
            url: '/login',
            templateUrl: '/app/component/login/login.html',
            controller: 'loginCtrl'
          })
          .state('manage', {
            url: '/manage',
            templateUrl: '/app/component/manage/manage.html',
            controller: 'manageCtrl'
          })
    });
