'use strict';

var panelGui = {
  id: 'panel',
  component: 'Window',
  padding: 2,
  position: {
    x: 0,
    y: 0
  },
  width: 800,
  height: 75,
  children: [{
    id: 'userName',
    text: 'username',
    component: 'label',
    font: {
      size: '16px',
      color: '#000'
    },
    width: 150,
    height: 50,
    position: {
      x: 520,
      y: 10
    }
  },{
    id: 'surrenderButton',
    text: 'Сдаться',
    component: 'Button',
    position: {
      x: 150,
      y: 10
    },
    width: 125,
    height: 50
   },
   {
    id: 'logoutButton',
    text: 'Выйти',
    component: 'Button',
    position: {
      x: 680,
      y: 10
    },
    width: 100,
    height: 50
   },
   {
     id: 'userStatus',
     text: '',
     component: 'label',
     font: {
       size: '16px',
       color: '#000'
     },
     width: 250,
     height: 50,
     position: {
       x: 10,
       y: 10
     }
   }]
};

export default panelGui;
