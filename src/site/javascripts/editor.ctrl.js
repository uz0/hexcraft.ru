'use strict';

export default class editorCtrl {
  static $inject = ['$http']; // jshint ignore:line

  constructor($http) {
    this.$http = $http;

    this.token = window.localStorage.getItem('token');
    this.verify();
  }

  verify(token) {
    if(!this.token) {
      return;
    }

    this.$http.post('/api/auth/verify', {
      token: this.token
    }).then(res => {
      this.user = res.data.User;
    });
  }

  login() {
    this.$http.post('/api/auth/login', {
      username: this.username,
      password: this.password
    }).then(response => {
      this.user = response.data.user;
      window.localStorage.setItem('token', response.data.token.token);
    });
  }

  logout() {
    this.$http.post('/api/auth/logout', {
      token: this.token
    }).then(response => {
      window.localStorage.removeItem('token');
      delete this.user;
    });
  }
}