'use strict';

var gamesListTitle = {
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
		};

var gamesList = {
			id: 'gamesList',
			component: 'List',
			padding: 3,
    	draggable: false,
			position: {x:0, y:125},
			width: 190,
			height: 300,
			layout: [null, 3],
			children: []
		};

var usersListTitle = {
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
		};

var usersList = {
		id: 'usersList',
		component: 'List',
		padding: 3,
    draggable: false,
		position: {x:window.innerWidth - 190, y:125},
		width: 190,
		height: 300,
		layout: [null, 3],
		children: []
};

var gameSubmit = {
		id: 'gameSubmit',
		text: 'В БОЙ',
		component: 'Button',
		position: {
			x: window.innerWidth / 2 - 100,
			y: window.innerHeight / 2
		},
		width: 100,
		height: 50
};

export {gamesListTitle, gamesList, usersListTitle, usersList, gameSubmit};
