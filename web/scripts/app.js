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
      .when('/project/new', {
        templateUrl: 'scripts/reqman/views/project-save.html',
        controller: 'ProjectNewCtrl'
      })
      .when('/project/:projectId/edit', {
        templateUrl: 'scripts/reqman/views/project-save.html',
        controller: 'ProjectEditCtrl'
      })
      .when('/project/:projectId/user-story/new', {
        templateUrl: 'scripts/reqman/views/user-story-save.html',
        controller: 'UserStoryNewCtrl'
      })
      .when('/project/:projectId/user-story/:userStoryId/edit', {
        templateUrl: 'scripts/reqman/views/user-story-save.html',
        controller: 'UserStoryEditCtrl'
      })
      .when('/user-story/:userStoryId/test-case/new', {
        templateUrl: 'scripts/reqman/views/test-case-save.html',
        controller: 'TestCaseNewCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });