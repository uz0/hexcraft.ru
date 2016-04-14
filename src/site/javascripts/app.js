'use strict';

import newsCtrl from './news.ctrl.js';
import newsDateFilter from './newsDate.filter.js';

angular.module('hexcraft', [])
       .controller('newsCtrl', newsCtrl)
       .filter('newsDateFilter', newsDateFilter);
