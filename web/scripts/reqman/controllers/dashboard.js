'use strict';

angular.module('reqmanApp')
  .controller('DashboardCtrl', function ($scope) {

    $scope.consoleLog = function (v) {
      console.log(v);
    }
  })
  .controller('ProjectViewCtrl', function ($scope, $routeParams) {

    $scope.projectId = $routeParams.projectId;

  });
