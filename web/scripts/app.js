'use strict';

angular.module('reqmanApp', ['ui.bootstrap'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'scripts/reqman/views/controllers/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .when('/project/:projectId/view', {
        templateUrl: 'scripts/reqman/views/controllers/project-view.html',
        controller: 'ProjectViewCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });