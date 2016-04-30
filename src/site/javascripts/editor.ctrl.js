'use strict';

export default class editorCtrl {
  static $inject = ['$http']; // jshint ignore:line

  constructor($http) {
    this.$http = $http;
    // $http.get('/api/news').then((res)=>{
    //   this.list = res.data;
    // });
  }

  auth() {
    this.$http.post('/api/auth', {
      login: this.login,
      password: this.password
    }).then(res => {
      console.log(res)
    });
  }
}