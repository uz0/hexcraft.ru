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
		});
	}

}
