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
    expect(!!project).toBe(true);
  });

});
