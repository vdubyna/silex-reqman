'use strict';

angular.module('reqmanApp')
  .controller('ProjectCtrl', function ($scope, project) {
    $scope.projects = project.list();
  });
