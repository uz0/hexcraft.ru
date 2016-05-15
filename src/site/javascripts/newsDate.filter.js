'use strict';

export default function newsDateFilter($filter) {
  return function(input) {

    if (input === ''){ return ''; }

    var inputDay = $filter('date')(new Date(input), 'dd');
    var inputDate = $filter('date')(new Date(input), 'longDate');
    var inputFullDate = $filter('date')(new Date(input), 'longDate');

    var currentFullDate = $filter('date')(new Date(), 'longDate');
    var currentDate = $filter('date')(new Date(), 'longDate');
    var currentDay = $filter('date')(new Date(), 'dd');

    var yesterday = (currentDay - 1).toString();
    yesterday = (yesterday.length === 1) ? '0' + yesterday : yesterday;

    if (currentFullDate === inputFullDate) {
      return 'Сегодня';
    }

    if (yesterday === inputDay && currentDate === inputDate) {
      return 'Вчера';
    }

    return inputFullDate;
  };
}
