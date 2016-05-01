'use strict';

export default [{
  id: 'textAuth',
  text: 'Авторизация',
  font: {
    size: '24px',
    color: '#fff'
  },
  component: 'Label',
  position: {
    x: 310 ,
    y: 150
  },
  width: 200,
  height: 50
},
{
  id: 'authUsername',
  text: '',
  component: 'Input',
  position: {
    x: 310,
    y: 230
  },
  width: 200,
  height: 35
},
{
  id: 'authPassword',
  text: '',
  component: 'Input',
  position: {
    x: 310,
    y: 300
  },
  width: 200,
  height: 35
},
{
  id: 'authSubmit',
  text: 'Вход',
  font: {
    size: '16px'
  },
  component: 'Button',
  position: {
    x: 310,
    y: 380
  },
  width: 95,
  height: 40
},
{
  id: 'demoBtn',
  text: 'Демо',
  font: {
    size: '16px'
  },
  component: 'Button',
  position: {
    x: 415,
    y: 380
  },
  width: 95,
  height: 40
},
{
  id: 'ErrorMessageBg',
  text: '',
  component: 'Window',
  position: {
    x: 260,
    y: -50
  },
  width: 300,
  height: 50,
  children: [{
    id: 'ErrorMessage',
    font: {
      size: '16px',
      color: '#fff'
    },
    component: 'Label',
    position: {
      x: 100,
      y: 0
    },
    width: 100,
    height: 50
  }]
}];