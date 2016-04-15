'use strict';

export default class AUTH extends PIXI.Stage {
  constructor(resourses) {
    super();

    this.centerPosX = window.innerWidth / 2;
    this.centerPosY = window.innerHeight / 2;

    this.guiObj = {
      id: 'myWindow',
      component: 'Window',
      padding: 4,
      position: { x: 0, y: 0 },
      width: window.innerWidth,
      height: window.innerHeight,
      children: [
       null,
        {
          id: 'authBg',
          component: 'Window',
          position: { x: this.centerPosX - 200, y: this.centerPosY - 200 },
          width: 400,
          height: 350,
          children: [
            null,
            {
              id: 'authLogin',
              text: 'Логин',
              component: 'Input',
              position: { x: 75, y: 50 },
              width: 250,
              height: 50
            },
            {
              id: 'authPass',
              text: 'Пароль',
              component: 'Input',
              position: { x: 75, y: 150},
              width: 250,
              height: 50
            },
            {
               id: 'authSubmit',
              text: 'Вход',
              component: 'Button',
              position: { x: 150, y: 250 },
              width: 100,
              height: 50
            }
          ]
        }
      ]
    };

    EZGUI.Theme.load(['../vendor/ezgui/assets/kenney-theme/kenney-theme.json'], () => {
      this.guiElt = EZGUI.create(this.guiObj, 'kenney');
      this.addChild(this.guiElt);
    });

  }

  update(){

  }
}