'use strict';

angular.module('reqmanApp')
  .factory('step', function ($http) {

    var url = '/api.php/test-case/';

    return {
      query: function(step) {

        return $http.get(url+step.test_case_id+'/step/')
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
      get: function(step) {
        return $http.get(url+step.test_case_id+'/step/'+step.id).
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
      delete: function(step, id) {
        return $http.delete(url+step.test_case_id+'/step/'+step.id).
          success(function(data) {
            return data;
          }).
          error(function(data) {
            console.error(data);
          });
      },
      update: function(step) {
        return $http.put(url+step.test_case_id+'/step/' + step.id, step,
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
      save: function(step) {
        return $http.post(url+step.test_case_id+'/step/', step,
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
