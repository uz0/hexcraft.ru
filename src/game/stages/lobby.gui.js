'use strict';

var lobbyGui = [{
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
    x:0,
    y:125
  },
  width: 190,
  height: 300,
  layout: [null, 3],
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
    x: window.innerWidth - 200,
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
    x:window.innerWidth - 190,
    y:125
  },
  width: 190,
  height: 300,
  layout: [null, 3],
  children: []
},{
  id: 'gameSubmit',
  text: 'В БОЙ',
  component: 'Button',
  position: {
    x: window.innerWidth / 2 - 100,
    y: window.innerHeight / 2
  },
  width: 100,
  height: 50
}]

export default lobbyGui;