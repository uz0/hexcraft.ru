'use strict';

export default function newsDateFilter($filter) {
  return function(input) {

    if (input == "") return "";

    var inputDay = $filter('date')(new Date(input), 'dd');
    var inputDate = $filter('date')(new Date(input), 'MM:yyyy');
    var inputFullDate = $filter('date')(new Date(input), 'dd:MM:yyyy');

    var currentFullDate = $filter('date')(new Date(), 'dd:MM:yyyy');
    var currentDate = $filter('date')(new Date(), 'MM:yyyy');
    var currentDay = $filter('date')(new Date(), 'dd');

    var yesterday = (currentDay - 1).toString()
    yesterday = (yesterday.length === 1) ? '0' + yesterday : yesterday;

    if (currentFullDate === inputFullDate) {
      return "Сегодня"
    }

    if (yesterday === inputDay && currentDate === inputDate) {
      return "Вчера";
    }

    return inputFullDate;
  }
}