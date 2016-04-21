'use strict';

import newsCtrl from './news.ctrl.js';
import indexCtrl from './index.ctrl.js';
import newsDateFilter from './newsDate.filter.js';

angular.module('hexcraft', [])
       .controller('newsCtrl', newsCtrl)
       .controller('indexCtrl', indexCtrl)
       .filter('newsDateFilter', newsDateFilter);