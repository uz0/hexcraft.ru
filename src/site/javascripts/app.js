'use strict';

import newsCtrl from './news.ctrl.js';
import newsDateFilter from './newsDate.filter.js';

angular.module('newsApp', [])
       .controller('newsCtrl', newsCtrl)
       .filter('newsDateFilter', newsDateFilter);