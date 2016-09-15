angular.module('smarthome').service('aboutService', function($http) {

    this.sendEmail = () => {
        return $http({
            method: 'POST',
            url: '/email'
        }).then(response => {
            return response;
        });
    };
})
