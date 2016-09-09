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
        controller: 'loginCtrl',
        // resolve: {
        //   user: (headerSrvc) => {
        //     return homeSrvc.getUser();
        //   },
        //   authUser: ($state, headerSrvc) => {
        //     return homeSrvc.checkAuth().then((response) => {
        //       console.log(response);
        //       if (response.data === 'unauthorized') {
        //         $state.go('login');
        //         setTimeout(() => {
        //           swal("Error", 'Please Login or Sign Up', 'error');
        //         }, 400);
        //       } else {
        //         return response.data;
        //       }
        //     });
        //   }
        // }
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: '/app/component/dashboard/dashboard.html',
        controller: 'dashboardCtrl',
        // resolve: {
        //   user: (dashboardSrvc) => {
        //      return dashboardSrvc.getUser();
        //  },
        //  authUser: ($state, dashboardSrvc) => {
    //    return dashboardSrvc.checkAuth().then((response) => {
    //      console.log(response);
    //      if (response.data === 'unauthorized') {
    //        $state.go('login');
    //        setTimeout(() => {
    //          swal("Error", 'Please Login or Sign Up', 'error');
    //        }, 400);
    //      } else {
    //        return response.data;
    //      }
    //    });
    //  }
        //  }
      })
      .state('manage', {
        url: '/manage',
        templateUrl: '/app/component/manage/manage.html',
        controller: 'manageCtrl',
        // resolve: {
        //   user: ($state, headerSrvc) => {
        //     return homeSrvc.checkAuth().then((response) => {
        //       console.log(response);
        //       if (response.data === 'unauthorized') {
        //         $state.go('login');
        //         setTimeout(() => {
        //           swal("Error", 'Please Login or Sign Up', 'error');
        //         }, 400);
        //       } else {
        //         return response.data;
        //       }
        //     });
        //   }
        // }
      })
  });
