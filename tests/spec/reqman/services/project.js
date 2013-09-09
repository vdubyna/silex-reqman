'use strict';

describe('Service: project', function () {

  // load the service's module
  beforeEach(module('reqmanApp'));

  // instantiate service
  var project;
  beforeEach(inject(function (_project_) {
    project = _project_;
  }));

  it('project is active', function () {
    expect(!!project).toBe(true);
  });




  it('test karma module', function () {
    expect(true).toBe(true);
  });
});
