'use strict';

angular.module('reqmanApp')
  .directive('menu', function () {

    var menu = [
      {
        route: "/project",
        name: "Projects"
      },
      {
        route: "/",
        name: "About"
      }
    ];

    return {
      templateUrl: 'views/menu.html',
      replace: true,
      restrict: 'E',
      link: function (scope, element, attrs) {
        scope.menu = menu;
      }
    };
  });
