'use strict';

angular.module('reqmanApp')
  .directive("projectView", function (project) {

    return {
      templateUrl: 'scripts/reqman/views/directives/project-view.html',
      restrict: "E",
      scope: {
        projectId: "@"
      },
      controller: function ($scope) {
        this.selectUserStory = function (userStoryId) {
          $scope.userStoryId = userStoryId;
        }
      },
      link: function (scope, element, attrs) {
        attrs.$observe('projectId', function (projectId) {
          scope.project = (projectId) ? project.get(projectId) : {};
        });
      }
    }
  })
  .directive("userStoryList", function (userStory, testCase) {

    return {
      require: "^projectView",
      templateUrl: "scripts/reqman/views/directives/project-view/user-story-list.html",
      restrict: "A",
      controller: function ($scope) {
        $scope.$on("user_story_list_refresh", function() {
          $scope.userStoryList = userStory.query($scope.projectId);
        });
      },
      link: function (scope, element, attrs, projectView) {

        scope.projectView = projectView;

        scope.$watch('project', function (project) {
          scope.userStoryList = (angular.isDefined(project) && angular.isDefined(project['id']))
            ? userStory.query(project.id) : [];
        });

        scope.$watch('userStoryId', function (userStoryId) {
          scope.testCaseList = (userStoryId) ? testCase.query(userStoryId) : [];
        });
      }
    };
  })
  .directive("userStoryView", function (userStory) {

    return {
      templateUrl: "scripts/reqman/views/directives/project-view/user-story-view.html",
      restrict: "A",
      scope: {
        userStoryId: "@",
        projectId: "@"
      },
      link: function (scope, element, attrs) {
        attrs.$observe('userStoryId', function (userStoryId) {
          scope.currentUserStory = (userStoryId) ? userStory.get(attrs.projectId, userStoryId) : {};

        })
      }
    };
  })
  .directive("userStoryStatus", function (testCase, $filter) {

      return {
        restrict: "A",
        template: "<progress percent=\"status\"></progress>",
        scope: {
          userStoryId: "@"
        },
        link: function (scope, element, attrs) {
          scope.status = [];
          attrs.$observe('userStoryId', function (userStoryId) {
            if (!userStoryId) {
              return;
            }

            testCase.query(userStoryId).then(function (result) {
              scope.status = (result.length > 0) ? $filter('userStoryState')(result) : [{value: 100, type: "warning"}];
            })
          })
        }
      };
    })
  .directive('saveUserStoryDialog', function (userStory) {

    return {
      restrict: "A",
      controller: function ($scope, $dialog) {

        $scope.saveUserStory = function (currentUserStory) {
          $dialog.dialog()
            .open('scripts/reqman/views/directives/project-view/user-story-save.html', function ($scope, dialog) {

              $scope.userStory = (currentUserStory) ? angular.copy(currentUserStory) : {};

              $scope.save = function (item) {
                dialog.close(item);
              };
              $scope.cancel = function () {
                dialog.close();
              }
            })
            .then(function (item) {
              if (!item) {
                return false;
              }
              item.project_id = $scope.projectId;
              if (item.id) {
                userStory.update(item)
                  .then(function () {
                    $scope.$emit("user_story_list_refresh");
                  });
              } else {
                userStory.save(item)
                  .then(function () {
                    $scope.$emit("user_story_list_refresh");
                  });
              }
            });
        }
      }
    }
  })
  .directive('saveTestCaseDialog', function (testCase) {

    return {
      restrict: "A",
      scope: true,
      controller: function ($scope, $dialog) {
        $scope.saveTestCase = function (userStoryId) {
          $dialog.dialog()
            .open('scripts/reqman/views/directives/project-view/test-case-save.html', function ($scope, dialog) {
              $scope.save = function (item) {
                dialog.close(item);
              };
              $scope.cancel = function () {
                dialog.close();
              }
            })
            .then(function (item) {
              if (!item) {
                return false;
              }
              item.user_story_id = userStoryId;
              testCase.save(item);
            });
        }
      }
    }
  })
  .directive('deleteUserStoryDialog', function (userStory) {

    return {
      restrict: "A",
      scope: true,
      controller: function ($scope, $dialog) {
        $scope.deleteUserStory = function (projectId, userStoryId) {

          $dialog.messageBox(
              "Delete User Story",
              "You will delete User Story: " + userStoryId,
              [
                {result:'cancel', label: 'Cancel'},
                {result:'ok', label: 'OK', cssClass: 'btn-primary'}
              ]
            )
            .open()
            .then(function (result) {
              if (result == 'ok') {
                userStory.delete(projectId, userStoryId)
                  .then(function (result) {
                    $scope.$emit("user_story_list_refresh");
                  });
              }
            });
        }
      }
    }
  });