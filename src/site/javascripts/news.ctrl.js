'use strict';

export default class newsCtrl {
  static $inject = ['$http'];

  constructor($http) {
    $http.get('/news').then((res)=>{
      this.list = res.data;
    });
  }
}