'use strict';

export default [{
  id: 'textAuth',
  text: 'Авторизация',
  font: {
    size: '30px',
    color: '#fff'
  },
  component: 'Label',
  position: {
    x: 95 ,
    y: 20
  },
  width: 200,
  height: 50
},
{
  id: 'authUsername',
  text: '',
  component: 'Input',
  position: {
    x: 75,
    y: 100
  },
  width: 250,
  height: 50
},
{
  id: 'authPassword',
  text: '',
  component: 'Input',
  position: {
    x: 75,
    y: 200
  },
  width: 250,
  height: 50
},
{
  id: 'authSubmit',
  text: 'Вход',
  component: 'Button',
  position: {
    x: 90,
    y: 300
  },
  width: 100,
  height: 50
},
{
  id: 'demoBtn',
  text: 'Демо',
  component: 'Button',
  position: {
    x: 210,
    y: 300
  },
  width: 100,
  height: 50
},
{
  id: 'ErrorMessage',
  font: {
    size: '15px',
    color: '#900'
  },
  component: 'Label',
  position: {
    x: 100,
    dy: -50,
    y: -50
  },
  width: 200,
  height: 50
}];