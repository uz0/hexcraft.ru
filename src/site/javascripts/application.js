'use strict';

import editorCtrl from './editor.ctrl.js';
import registerCtrl from './register.ctrl.js';
import newsCtrl from './news.ctrl.js';
import newsDateFilter from './newsDate.filter.js';
import WaterDirective from './water.directive.js';

angular.module('hexcraft', [])
       .controller('editorCtrl', editorCtrl)
       .controller('newsCtrl', newsCtrl)
       .controller('registerCtrl', registerCtrl)
       .directive('water', () => new WaterDirective())
       .filter('newsDateFilter', newsDateFilter);
