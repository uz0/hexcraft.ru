'use strict';

app.controller('newsCtrl', ['$http', function($http) {
  $http.get('/news').then((res)=>{
    this.list = res.data;
  });
}]);