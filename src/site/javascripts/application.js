'use strict';

import editorCtrl from './editor.ctrl.js';
import newsCtrl from './news.ctrl.js';
import newsDateFilter from './newsDate.filter.js';
import waterDirective from './water.directive.js';

angular.module('hexcraft', [])
       .controller('editorCtrl', editorCtrl)
       .controller('newsCtrl', newsCtrl)
       .directive('water', () => new waterDirective())
       .filter('newsDateFilter', newsDateFilter);