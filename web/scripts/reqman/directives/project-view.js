'use strict';

angular.module('reqmanApp')
  .directive("projectView", function (project, userStory) {

    return {
      templateUrl: 'scripts/reqman/views/directives/project-view.html',
      restrict: "E",
      scope: {
        projectId: "@"
      },
      controller: function ($scope) {
        $scope.log = function (v) {
          console.log(v);
        }

        $scope.selectUserStory = function (userStoryId) {
          $scope.userStory = userStory.get($scope.activeProject.id, userStoryId);
        }

        $scope.$watch('projectId', function (projectId) {
          if (projectId) {
            project.get(projectId).then(function (result) {
              $scope.activeProject = result;
              $scope.userStoryList = userStory.query(result.id);
            });
          }
        });

        $scope.$on("user_story_save", function () {
          $scope.userStoryList = userStory.query($scope.activeProject.id);
        });

        $scope.$on("user_story_delete", function () {
          $scope.userStoryList = userStory.query($scope.activeProject.id);
          $scope.userStory = {};
        });

      }
    }
  })

  .directive("testCaseList", function (testCase) {

    return {
      templateUrl: 'scripts/reqman/views/directives/project-view/test-case-list.html',
      restrict: "A",
      scope: {
        userStoryId: "@"
      },
      controller: function ($scope) {
        $scope.$watch('userStoryId', function (userStoryId) {
          $scope.testCaseList = (userStoryId) ? testCase.query(userStoryId) : [];
        });

        $scope.$on("test_case_save", function () {
          $scope.testCaseList = testCase.query($scope.userStoryId);
        });
        $scope.$on("test_case_delete", function () {
          $scope.testCaseList = testCase.query($scope.userStoryId);
        });
      }
    }
  })

  .directive("stepList", function (step) {

    return {
      restrict: "A",
      scope: {
        testCaseId: "@"
      },
      controller: function ($scope) {
        $scope.$watch('testCaseId', function (testCaseId) {
          step.query({test_case_id: testCaseId}).then(function (result) {
            console.log(result);
            $scope.stepList = result;
          })
        });
      }
    }
  })

  .directive("userStoryStatus", function (testCase, $filter) {
      return {
        restrict: "A",
        template: "<progress percent=\"status\"></progress>",
        scope: {
          userStoryId: "@"
        },
        controller: function ($scope) {
          $scope.status = [];
          $scope.$watch('userStoryId', function (userStoryId) {
            testCase.query(userStoryId).then(function (result) {
              $scope.status = (result.length > 0)
                ? $filter('userStoryState')(result)
                : [{value: 100, type: "warning"}];
            });
          });
        }
      };
    })

  .directive('saveUserStoryDialog', function (userStory, $rootScope) {

    return {
      restrict: "A",
      scope: true,
      controller: function ($scope, $modal) {
        $scope.saveUserStory = function (currentUserStory) {
          $modal.open('scripts/reqman/views/directives/project-view/user-story-save.html', function ($scope, dialog) {
              $scope.userStory = (currentUserStory) ? angular.copy(currentUserStory) : {};
              $scope.save = function (item) {
                dialog.close(item);
              };
              $scope.cancel = function () {
                dialog.close();
              }
            }).then(function (item) {
              if (!item) {
                return;
              }
              if (item.id) {
                userStory.update(item).then(function () {
                    $rootScope.$broadcast("user_story_save");
                  });
              } else {
                userStory.save(item).then(function () {
                    $rootScope.$broadcast("user_story_save");
                  });
              }
            });
        }
      }
    }
  })

  .directive('saveTestCaseDialog', function (testCase, $rootScope) {
    return {
      restrict: "A",
      scope: true,
      controller: function ($scope, $modal) {
        $scope.saveTestCase = function (currentTestCase) {
          $modal.open('scripts/reqman/views/directives/project-view/test-case-save.html', function ($scope, dialog) {
              $scope.testCase = (currentTestCase) ? angular.copy(currentTestCase) : {};
              $scope.save = function (item) {
                dialog.close(item);
              };
              $scope.cancel = function () {
                dialog.close();
              }
            }).then(function (item) {
              if (!item) {
                return;
              }
              if (item.id) {
                testCase.update(item).then(function () {
                  $rootScope.$broadcast("test_case_save");
                });
              } else {
                testCase.save(item).then(function () {
                  $rootScope.$broadcast("test_case_save");
                });
              }
            });
        }
      }
    }
  })

  .directive('saveStepDialog', function (step, $rootScope) {
    return {
      restrict: "A",
      scope: true,
      controller: function ($scope, $modal) {
        $scope.saveStep = function (currentStep) {
          $modal.open('scripts/reqman/views/directives/project-view/step-save.html', function ($scope, dialog) {
              $scope.step = (currentStep) ? angular.copy(currentStep) : {};
              $scope.save = function (item) {
                dialog.close(item);
              };
              $scope.cancel = function () {
                dialog.close();
              }
            }).then(function (item) {
              if (!item) {
                return;
              }
              if (item.id) {
                step.update(item).then(function () {
                  $rootScope.$broadcast("step_save");
                });
              } else {
                step.save(item).then(function () {
                  $rootScope.$broadcast("step_save");
                });
              }
            });
        }
      }
    }
  })

  .directive('deleteUserStoryDialog', function (userStory) {
    return {
      restrict: "A",
      scope: true,
      controller: function ($scope, $modal) {
        $scope.deleteUserStory = function (activeUserStory) {

          $modal.messageBox(
              "Delete User Story",
              "You will delete User Story: " + activeUserStory.name,
              [
                {result:'cancel', label: 'Cancel'},
                {result:'ok', label: 'OK', cssClass: 'btn-primary'}
              ]
            )
            .open()
            .then(function (result) {
              if (result == 'ok') {
                userStory.delete(activeUserStory.project_id, activeUserStory.id)
                  .then(function (result) {
                    $scope.$emit("user_story_delete");
                  });
              }
            });
        }
      }
    }
  })

  .directive('deleteTestCaseDialog', function (testCase, $rootScope) {
    return {
      restrict: "A",
      scope: true,
      controller: function ($scope, $modal) {
        $scope.deleteTestCase = function (activeTestCase) {
          $modal.messageBox(
              "Delete User Story",
              "You will delete Test Case: " + activeTestCase.name,
              [
                {result:'cancel', label: 'Cancel'},
                {result:'ok', label: 'OK', cssClass: 'btn-primary'}
              ]
            )
            .open()
            .then(function (result) {
              if (result == 'ok') {
                testCase.delete(activeTestCase.user_story_id, activeTestCase.id)
                  .then(function (result) {
                    $rootScope.$broadcast("test_case_delete");
                  });
              }
            });
        }
      }
    }
  })

  .directive('saveProjectDialog', function (project, $rootScope) {
    return {
      restrict: "A",
      scope: true,
      controller: function ($scope, $modal) {
        $scope.saveProject = function (currentProject) {
          $modal.open('scripts/reqman/views/directives/project-view/project-save.html', function ($scope, dialog) {
              $scope.project = (currentProject) ? angular.copy(currentProject) : {};
              $scope.save = function (item) {
                dialog.close(item);
              };
              $scope.cancel = function () {
                dialog.close();
              }
            }).then(function (item) {
              if (!item) {
                return;
              }
              if (item.id) {
                project.update(item).then(function () {
                  $rootScope.$broadcast("project_save");
                });
              } else {
                project.save(item).then(function () {
                  $rootScope.$broadcast("project_save");
                });
              }
            });
        }
      }
    }
  })

;