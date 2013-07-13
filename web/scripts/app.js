'use strict';

angular.module('reqmanApp', ['ui.bootstrap'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/project', {
        templateUrl: 'views/project/list.html',
        controller: 'ProjectListCtrl'
      })
      .when('/project/:projectId', {
        templateUrl: 'views/project/view.html',
        controller: 'ProjectViewCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
