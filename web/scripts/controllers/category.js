'use strict';

angular.module('reqmanApp')
  .controller('CategoryListCtrl', function ($scope, category, $dialog, $routeParams) {

    category.query().then(function(result) {
      $scope.items = result.data;
    });

    $scope.delete = function (item, $index) {
      category.delete(item.id).then(function(result) {
        if (result.status == 200) {
          $scope.items.splice($index, 1);
        }
      });
    }

    $scope.saveDialog = function (item) {
      $dialog.dialog()
        .open('views/category/save.html', function ($scope, dialog) {
          if (item) {
            category.get(item.id).then(function(result){
              $scope.info = result.data;
            });
          } else {
            $scope.info = {};
            $scope.info.project_id = $routeParams.projectId;
          }

          // define save callback
          $scope.save = function (info) {
            dialog.close(info);
          };

          // define cancel callback
          $scope.cancel = function () {
            dialog.close();
          };
        })
        .then(function (info) {
          if (!info) {
            return;
          }

          if (item) {
            category.update(info).then(function(result) {
              item.name = result.data.name;
              item.project_id = result.data.project_id;
            });
          } else {
            category.save(info).then(function(result){
              $scope.items.push(result.data);
            });
          }
        });
    };
//  })
//  .controller('ProjectViewCtrl', function ($scope, project, $routeParams) {
//
//    project.get($routeParams.projectId).then(function(result){
//      $scope.project = result.data;
//    });
  });
