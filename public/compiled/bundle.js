'use strict';

angular.module('smarthome', [ui.router]);
'use strict';

angular.module('smarthome').config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');
});