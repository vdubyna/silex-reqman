'use strict';

angular.module('reqmanApp')
  .directive('menu', function () {

    var menu = [
      {
        route: "/dashboard",
        name: "Dashboard"
      },
      {
        route: "/",
        name: "About"
      },
      {
        route: "/projects",
        name: "Projects"
      }
    ];

    return {
      templateUrl: 'scripts/reqman/views/menu.html',
      replace: true,
      restrict: 'E',
      link: function (scope, element, attrs) {
        scope.menu = menu;
      }
    };
  });
