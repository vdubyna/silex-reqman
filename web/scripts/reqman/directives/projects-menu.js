'use strict';

angular.module('reqmanApp')

  .directive('projectsMenu', function (project) {
    return {
      template: '<li class="dropdown">\n    <a href="" class="dropdown-toggle">\n        <i class="glyphicon glyphicon-th-list"></i>\n        <span>Projects</span>\n    </a>\n    <ul class="dropdown-menu">\n        <li ng-repeat="project in projectlist">\n            <a href="/#/project/{{ project.id }}/view">{{ project.name }}</a>\n        </li>\n    </ul>\n</li>',
      restrict: 'A',
      replace: true,
      scope: {},
      controller: function ($scope) {
        project.query().then(function (result) {
          $scope.projectlist = result;
        });
      }
    };
  });