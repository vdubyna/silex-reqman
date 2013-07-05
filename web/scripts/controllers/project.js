'use strict';

angular.module('reqmanApp')
  .controller('ProjectCtrl', function ($scope, project, $dialog) {
    project.query().then(function(result) {
      $scope.projects = result.data;
    });

    $scope.deleteProject = function (projectItem, $index) {
      project.delete(projectItem.project_id).then(function(result) {
        if (result.status == 200) {
          $scope.projects.splice($index, 1);
        }
      });
    }

    $scope.saveDialog = function (projectItem) {
      $dialog.dialog()
        .open('views/project/save-form.html', function ($scope, dialog) {
          if (projectItem) {
            //populate form
            project.get(projectItem.project_id).then(function(result){
              $scope.projectInfo = result.data;
            });
          }

          // define save callback
          $scope.saveProject = function (projectInfo) {
            dialog.close(projectInfo);
          };

          // define cancel callback
          $scope.cancel = function () {
            dialog.close();
          };
        })
        .then(function (projectInfo) {
          if (!projectInfo) {
            return;
          }

          console.log(projectItem);
          if (projectItem) {
            project.update(projectInfo).then(function(result) {
              projectItem.name = result.data.description;
              projectItem.description = result.data.description;
            });
          } else {
            project.save(projectInfo).then(function(result){
              $scope.projects.push(result.data);
            });
          }
        });
    };
  });
