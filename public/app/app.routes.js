angular.module('smarthome')
  .config(($stateProvider, $urlRouterProvider) => {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('landing page', {
        url: '/',
        templateUrl: './app/component/landingPage/landingPage.html',
      })
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
