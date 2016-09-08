angular.module('smarthome')
  .service('headerSrvc', function($http) {

    this.logout = () => {
      this.logout = () => {
      return $http.get('/logout')
        .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
    };
  };

  });
