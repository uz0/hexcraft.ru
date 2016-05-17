'use strict';

export default class registerCtrl {
  static $inject = ['$http']; // jshint ignore:line

  constructor($http) {
    this.$http = $http;
  }

  register() {
    this.$http.post('/api/users', {
      username: this.username,
      password: this.password
    })
    .then(res => {
      this.responseData = 'Вы успешно зарегистрировались';
      this.reset();
    })
    .catch(res => {
      this.responseData = res.data.error;
      this.reset();
    });
  }
  reset() {
      this.username = '';
      this.password = '';
  }

}
