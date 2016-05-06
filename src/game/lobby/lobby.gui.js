'use strict';

export default [{
  id: 'gamesListTitle',
  text: 'Игровой процесс',
  font: {
    size: '30px',
    color: '#000'
  },
  component: 'Label',
  position: {
    x: 25,
    y: 75
  },
  width: 200,
  height: 50
},{
  id: 'gamesList',
  component: 'List',
  padding: 3,
  draggable: false,
  position: {
    x: 0,
    y: 125
  },
  width: 190,
  height: 300,
  // layout: [null, 3],
  children: []
},{
  id: 'usersListTitle',
  text: 'Игроки',
  font: {
    size: '30px',
    color: '#000'
  },
  component: 'Label',
  position: {
    x: 560,
    y: 75
  },
  width: 200,
  height: 50
},{
  id: 'usersList',
  component: 'List',
  padding: 3,
  draggable: false,
  position: {
    x:610,
    y:125
  },
  width: 190,
  height: 300,
  // layout: [null, 4],
  children: []
},{
  id: 'gameSubmit',
  text: 'В БОЙ',
  component: 'Label',
  font: {
    color: '#fff',
    size: '18px'
  },
  position: {
    x: 350,
    y: 275
  },
  width: 100,
  height: 50
}];
