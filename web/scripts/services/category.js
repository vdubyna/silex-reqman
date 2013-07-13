'use strict';

angular.module('reqmanApp')
  .factory('category', function ($http, $routeParams) {

    var url = function() {
      return '/api.php/project/' + $routeParams.projectId + '/category/';
    }

    return {
      query: function() {
        return $http.get(url()).
          success(function(data) {
            return data;
          }).
          error(function(data) {
            console.error(data);
          });
      },
      get: function(id) {
        return $http.get(url()+id).
          success(function(data) {
            return data;
          }).
          error(function(data) {
            console.error(data);
          });
      },
      delete: function(id) {
        return $http.delete(url() + id).
          success(function(data) {
            return data;
          }).
          error(function(data) {
            console.error(data);
          });
      },
      update: function(info) {
        return $http.put(url() + info.id, info,
            {
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
              }
            }).
          success(function(data) {
            return data;
          }).
          error(function(data) {
            console.error(data);
          });
      },
      save: function(info) {
        return $http.post(url(), info,
          {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
              var str = [];
              for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
              return str.join("&");
            }
          }).
          success(function(data) {
            return data;
          }).
          error(function(data) {
            console.error(data);
          });
      }
    }
  });
