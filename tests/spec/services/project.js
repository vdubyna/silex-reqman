'use strict';

describe('Service: project', function () {


  // load the service's module
  beforeEach(module('reqmanApp'));

  // instantiate service
  var project;
  var $httpBackend;
  beforeEach(inject(function (_project_, $injector) {
    project = _project_;

    // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');
    // backend definition common for all tests
//    $httpBackend.when('GET', '/auth.py').respond();

  }));

  it('should exist', function () {
    expect(!!project).toBe(true);
  });

  it('should be able to get list of projects from the server', function () {
    $httpBackend.expectGET('/api.php/project/')
      .respond(200, {id: 1, identifier: 'project_1', name: 'project 1'});

    project.query().then(function(res){
      expect(res).toBe({id: 1, identifier: 'project_1', name: 'project 1'});
      $httpBackend.flush();
    });

  });
});
