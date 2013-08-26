'use strict';

angular.module('reqmanApp')
  .controller('DashboardCtrl', function ($scope) {

    $scope.consoleLog = function (v) {
      console.log(v);
    }
  })
  .controller('ProjectViewCtrl', function ($scope, $routeParams, project) {

    $scope.project = project.get($routeParams.projectId);

  })
  .controller('ProjectNewCtrl', function ($scope, $location, project) {
    $scope.save = function () {
      project.save($scope.project).then(function (result) {
        $location.path('/');
      });
    }
  })
  .controller('ProjectEditCtrl', function ($scope, project, $routeParams, $location) {
    project.get($routeParams.projectId).then(function (result) {
      $scope.project = result;
    });

    $scope.save = function () {
      project.update($scope.project).then(function (result) {
        $location.path('/project/' + result.id + '/view');
      });
    }
  })
  .controller('UserStoryEditCtrl', function ($scope, userStory, $routeParams, $location) {
    userStory.get($routeParams.projectId, $routeParams.userStoryId)
      .then(function (result) {
        $scope.userStory = result;
      });

    $scope.save = function () {
      userStory.update($scope.userStory)
        .then(function (result) {
          $location.path('/project/' + result.data.project_id + '/view');
        });
    }
  })
  .controller('TestCaseNewCtrl', function ($scope, testCase, $routeParams, $location) {

    $scope.save = function () {
      $scope.testCase.user_story_id = $routeParams.userStoryId;

      testCase.save($scope.testCase).then(function(result){
        $location.path('/');
      });
    }
  })
.controller('UserStoryNewCtrl', function ($scope, userStory, $routeParams, $location) {

    $scope.save = function () {
      $scope.userStory.project_id = $routeParams.projectId;

      userStory.save($scope.userStory).then(function(result){
        $location.path('/project/'+result.data.project_id+'/view');
      });
    }
  });
