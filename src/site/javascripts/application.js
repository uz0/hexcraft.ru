'use strict';

import editorCtrl from './editor.ctrl';
import registerCtrl from './register.ctrl';
import newsCtrl from './news.ctrl';
import newsDateFilter from './newsDate.filter';
import WaterDirective from './water.directive';

angular.module('hexcraft', [])
       .controller('editorCtrl', editorCtrl)
       .controller('newsCtrl', newsCtrl)
       .controller('registerCtrl', registerCtrl)
       .directive('water', () => new WaterDirective())
       .filter('newsDateFilter', newsDateFilter);
