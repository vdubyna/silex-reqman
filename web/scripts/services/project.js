'use strict';

angular.module('reqmanApp')
  .factory('project', function ($resource) {
    // Public API here
    return {
      list: function () {
        return $resource('/api.php/project').query();
      }
    };
  });
