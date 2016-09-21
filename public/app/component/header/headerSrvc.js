angular.module('smarthome')
  .service('headerSrvc', function($http) {

    this.getUser = () => {
    return $http.get('/me');
  };


    this.logout = () => {
      return $http.get('/logout')
        .then(response => {
          return response.data;
        })
        .catch(err => {
          console.log(err);
        });
    };

    this.updateMe = updateUser => {
      return $http({
        method: 'PUT',
        url: '/users/',
        data: updateUser
      })
        .then(response => {
          return response;
      })
      .catch(err => {
        console.log(err);
      });
    };

    this.deleteUser = () => {
      return $http({
        method: 'DELETE',
        url: '/users'
      })
      .then(response => {
        return response.data;
      });
    };

  });
