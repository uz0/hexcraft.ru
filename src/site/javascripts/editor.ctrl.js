'use strict';

export default class editorCtrl {
  static $inject = ['$http']; // jshint ignore:line

  constructor($http) {
    this.$http = $http;

    this.token = window.localStorage.getItem('token');
    this.verify();
    this.initMapList();
    this.clear();

    this.field = [];
    for(let i=0; i<10; i++) {
      for(let j=0; j<7; j++) {
        if (j % 2 !== 0 && i === 9) {
          continue;
        }

        this.field.push({
          i: i,
          j: j
        });
      }
    }

    this.states = [
      'empty',
      'player1',
      'player2'
    ];
  }

  clear(){
    this.map = {
      MapData: []
    };
  }

  create(field){
    this.map.MapData.push({
      cellstate: 'empty',
      i: field.i,
      j: field.j
    });
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
      left: ((hex.j % 2 === 0)? hex.i*80 : hex.i*80+40)+'px',
      top: hex.j*80+'px'
    };
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
    function filter(object) {
      delete object.createdAt;
      delete object.updatedAt;
      delete object.MapId;
      delete object.id;
      return object;
    }

    if(this.map.id) {
      this.delete();
    }

    this.map = filter(this.map);
    this.map.MapData = this.map.MapData.map(element => filter(element));

    this.$http.post(`/api/maps?token=${this.token}`, this.map).then(() => {
      this.initMapList();
      this.clear();
    });
  }

  export() {
    this.save();

    let mapData = [];
    this.map.MapData.forEach(element => {
      mapData.push(`{
        MapId: id,
        i: ${element.i},
        j: ${element.j},
        cellstate: '${element.cellstate}',
        createdAt: new Date(),
        updatedAt: new Date()
      }`);
    });

    let template = `
      'use strict';module.exports = {up: function (q, s, d) {q.bulkInsert('Maps', [{
        description: '${this.map.description}',
        createdAt: new Date(),
        updatedAt: new Date()
      }]).then(id => {q.bulkInsert('MapData',[${mapData.join()}]).then(()=>{d();});});}};
    `;

    console.log(template);

    let blob = new window.Blob([template], {type:'text/plain'});
    let link = document.createElement('a');
    link.download = `${this.map.description}.js`;
    link.href = window.URL.createObjectURL(blob);
    link.style.display = 'none';
    document.body.appendChild(link);

    link.click();
    link.remove();
  }

  delete() {
    this.$http.delete(`/api/maps/${this.map.id}?token=${this.token}`).then(() => {
      this.initMapList();
    });
  }

  verify() {
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
    }).then(() => {
      window.localStorage.removeItem('token');
      delete this.user;
    });
  }
}