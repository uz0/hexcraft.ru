'use strict';

export default class editorCtrl {
  static $inject = ['$http']; // jshint ignore:line

  constructor($http) {
    this.$http = $http;

    this.token = window.localStorage.getItem('token');
    this.verify();
    this.initMapList();

    this.field = [];
    for(let i=0; i<20; i++){
      for(let j=0; j<13; j++){
        if (j % 2 !== 0 && i === 19) {
          continue;
        }
        this.field.push({
          x: i,
          y: j
        })
      }
    }

    this.states = [
      'empty',
      'player1',
      'player2'
    ]
  }

  create(field){
    this.map.MapData.push({
      cellstate: 'empty',
      x: field.x,
      y: field.y
    })
  }

  change(hex){
    let index = this.states.indexOf(hex.cellstate);
    index +=1;
    hex.cellstate = this.states[index];

    if(!hex.cellstate) {
      let index = this.map.MapData.indexOf(hex);
      this.map.MapData.splice(index, 1);
    }
  }

  calcPosition(hex) {
    return {
      left: ((hex.y % 2 === 0)? hex.x*40 : hex.x*40+20)+'px',
      top: hex.y*40+'px'
    }
  }

  select(map) {
    this.$http.get(`/api/maps/${map.id}`).then(res => {
      this.map = res.data;
    });
  }

  initMapList() {
    this.$http.get('/api/maps').then(res => {
      this.mapList = res.data;
    });
  }

  save() {
    console.log(this.map)
  }

  delete() {
    this.$http.delete(`/api/maps/${this.map.id}?token=${this.token}`).then(res => {
      this.initMapList()
    });
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