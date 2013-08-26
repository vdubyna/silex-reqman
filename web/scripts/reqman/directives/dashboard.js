'use strict';

angular.module('reqmanApp')
  .directive('projectsMenu', function (project) {
    return {
      template: '<li class="dropdown">\n    <a href="" class="dropdown-toggle">\n        <i class="glyphicon glyphicon-th-list"></i>\n        <span>Projects</span>\n    </a>\n    <ul class="dropdown-menu">\n        <li ng-repeat="project in projectlist">\n            <a href="/#/project/{{ project.id }}/view">{{ project.name }}</a>\n        </li>\n    </ul>\n</li>',
      restrict: 'A',
      replace: true,
      scope: {},
      link: function (scope, element, attrs) {
        project.query().then(function (result) {
          scope.projectlist = result;
        });
      }
    };
  })
  .directive('userStoryList', function (userStory, testCase, $location, $filter) {
    return {
      templateUrl: 'scripts/reqman/views/project-view.html',
      restrict: "A",
      scope: {
        projectId: "@",
        selectItem: "&"
      },
      link: function (scope, element, attrs) {

        var loadList = function (projectId) {
          userStory.query(projectId).then(function (result) {
            result.forEach(function (userStory) {
              testCase.query(userStory.id).then(function (result) {
                userStory.testCases = result;
                userStory.userStoryState = $filter('userStoryState')(userStory.testCases);
              })
            });
            scope.userStoryList = result;
          });
        }

        scope.deleteItem = function (userStoryId) {
          userStory.delete(attrs.projectId, userStoryId)
            .then(function () {
              $location.path('/project/'+attrs.projectId+'/view');
              loadList(attrs.projectId);
            });
        }

        attrs.$observe('projectId', function(projectId){
          if (projectId) {
            loadList(projectId);
          }
        });
      }
    };
  })
  .directive('testCaseList', function (testCase) {
    return {
      template: "<table class=\"table table-striped table-hover\">\n    <tr ng-repeat=\"testCase in testCaseList\">\n        <td>\n            <a href=\"\" ng-click=\"selectItem({testCaseId:testCase.id})\">{{ testCase.name }}</a>\n        </td>\n        <td>\n            <a href=\"\" ng-click=\"deleteItem(testCase.id)\"><i class=\"icon-trash\"></i></a>\n        </td>\n        <td>\n            <a href=\"\"><i class=\"icon-edit\"></i></a>\n        </td>\n    </tr>\n</table>\n",
      restrict: "A",
      scope: {
        userStoryId: "@",
        selectItem: "&"
      },
      link: function (scope, element, attrs) {
        attrs.$observe('userStoryId', function(userStoryId){
          if (userStoryId) {
            testCase.query(userStoryId).then(function (result) {
              scope.testCaseList = result;
            });
          }
        });
      }
    };
  })

  .directive('projectDelete', function (project, $location) {
    return {
      restrict: "A",
      scope: {
        projectId: "@"
      },
      link: function (scope, element, attrs) {
        element.bind('click', function () {
          project.delete(attrs.projectId).then(function () {

            $location.path('/');
          });
        });
      }
    };
  })
  .directive('testCaseView', function (testCase) {
    return {
      template: "<div class=\"widget-box\">\n    <div class=\"widget-title\">\n        <span class=\"icon\">\n            <i class=\"glyphicon glyphicon-time\"></i>\n        </span>\n        <h5>Test Case: {{ testCase.name }}</h5>\n    </div>\n    <div class=\"widget-content nopadding\">\n    </div>\n</div>",
      restrict: "A",
      scope: {
        userStoryId: "@",
        testCaseId: "@"
      },
      link: function (scope, element, attrs) {
        attrs.$observe('testCaseId', function(testCaseId){
          if (testCaseId) {
            testCase.get(attrs.userStoryId, testCaseId).then(function (result) {
              scope.testCase = result;
            });
          }
        });
        attrs.$observe('userStoryId', function (userStoryId) {
          if (userStoryId
            && scope.testCase
            && (userStoryId != scope.testCase.user_story_id)
          ) {
            scope.testCase = {};
          }
        });
      }
    };
  });