'use strict';

angular.module('reqmanApp')
  .directive('categories', function (category) {

    return {
      templateUrl: 'views/category/list.html',
      restrict: 'E'
    };
  });
