angular.module('smarthome')
  .service('dashboardSrvc', function($http) {

    this.checkAuth = () => {
      return $http({
        method: 'GET',
        url: '/checkAuth'
      }).then((response) => {
        return response;
      });
    };

    this.getUser = () => {
      return $http.get('/me');
    };

    this.getNotifications = () => {
      return $http.get('/notifications');
    };

    this.updateNote = id => {
      return $http({
        method: 'PUT',
        url: `/notifications/${id}`
      }).then(response => {
        return response;
      });
    };

    this.getHistory = (id) => {
      console.log('id', id);
      return $http({
        method: 'GET',
        url: `/history/${id}`
      }).then(response => {
        return response.data;
      });
    };

  });
