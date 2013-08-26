'use strict';

angular.module('reqmanApp')
  .factory('testCase', function ($http) {

    var url = '/api.php/user-story/';

    return {
      query: function(userStoryId) {

        return $http.get(url+userStoryId+'/test-case/')
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
      get: function(userStoryId, id) {
        return $http.get(url+userStoryId+'/test-case/'+id).
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
      delete: function(id) {
        return $http.delete(url + id).
          success(function(data) {
            return data;
          }).
          error(function(data) {
            console.error(data);
          });
      },
      update: function(info) {
        return $http.put(url+info.userStoryId+'/test-case/' + info.id, info,
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
        console.log(info);
        return $http.post(url+info.user_story_id+'/test-case/', info,
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
