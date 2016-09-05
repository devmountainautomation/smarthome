angular.module('smarthome')
    .directive('sideDir', () => {
        return {
            restrict: 'EA',
            templateUrl: './app/component/sidebar/sidebar.html',
            link: (scope, elems, attrs) => {
                $(document).ready(() => {

                });
            }
        };
    });
