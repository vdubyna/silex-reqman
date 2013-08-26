'use strict';

angular.module('reqmanApp')
  .factory('userStory', function ($http) {

    var url = '/api.php/project/';

    return {
      query: function(projectId) {

        return $http.get(url+projectId+'/user-story/')
          .success(function(data) {
            return data;
          })
          .error(function(data) {
            console.error(data);
          })
          .then(function(result){
            return result.data;
          });

      },
      get: function(projectId, id) {
        return $http.get(url+projectId+'/user-story/'+id).
          success(function(data) {
            return data;
          }).
          error(function(data) {
            console.error(data);
          })
          .then(function(result){
            return result.data;
          });
      },
      delete: function(projectId, id) {
        return $http.delete(url+projectId+'/user-story/' + id).
          success(function(data) {
            return data;
          }).
          error(function(data) {
            console.error(data);
          });
      },
      update: function(info) {
        return $http.put(url+info.project_id+'/user-story/' + info.id, info,
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
        return $http.post(url+info.project_id+'/user-story/', info,
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
