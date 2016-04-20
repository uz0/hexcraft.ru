'use strict';

var statusPanel = {
  id: 'statusPanel',
  component: 'Window',
  padding: 2,
  position: {
    x: 0,
    y: 0
  },
  width: window.innerWidth,
  height: 75,
  children: [{
    id: 'userName',
    text: 'username',
    component: 'label',
    font: {
      size: '24px',
      color: '#000'
    },
    width: 250,
    height: 50,
    position: {
      x: window.innerWidth - 200,
      y: 10
    }
  },{
    id: 'surrenderButton',
    text: 'Сдаться',
    component: 'Button',
    position: {
      x: window.innerWidth - 250,
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
      x: window.innerWidth - 110,
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

export default statusPanel;
