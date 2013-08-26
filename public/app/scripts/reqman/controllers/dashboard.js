'use strict';

angular.module('reqmanApp')
  .controller('DashboardCtrl', function ($scope) {
    var $this = $scope;

    $this.projectList = [1,2,3];

    return $scope.DashboardCtrl = $this;
  });
