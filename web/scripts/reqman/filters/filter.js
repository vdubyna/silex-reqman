'use strict';

angular.module('reqmanApp')
  .filter('testState', function () {
    var map = {
      passed: 'success',
      failed: 'important',
      pending: 'warning'
    }
    return function (text) {
      return map[text];
    }
  })
  .filter('userStoryState', function () {
    var map = {
      passed: 'success',
      failed: 'danger',
      pending: 'warning'
    }

    return function (testCases) {
      var stats = {
        passed: 0,
        failed: 0,
        pending: 0
      };

      var countPercent = function (value, total) {
        return (value*100)/total;
      }

      testCases.forEach(function (testCase) {
        stats[testCase.state]++;
      });

      var total = testCases.length;

      return [
        {value: countPercent(stats.passed, total), type: map['passed']},
        {value: countPercent(stats.pending, total), type: map['pending']},
        {value: countPercent(stats.failed, total), type: map['failed']}
      ];
    }
  });




