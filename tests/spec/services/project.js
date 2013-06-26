'use strict';

describe('Service: project', function () {

  // load the service's module
  beforeEach(module('reqmanApp'));

  // instantiate service
  var project;
  beforeEach(inject(function (_project_) {
    project = _project_;
  }));

  it('should exist', function () {
    expect(!!project).toBe(true);
  });

  it('should return list of projects', function () {
    expect(project.list().length).toBe(2);
  });

  it('should return project by project id', function () {
      var id = 'project_1';
      expect(project.getProject(id)).toEqual(
          {
              project_id: 'project_1',
              name: "Project 1",
              description: "Description"
          }
      );
  });

});
