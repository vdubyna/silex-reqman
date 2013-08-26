describe('Project provider', function(){

  beforeEach(module(function($provide) {
    $provide.provider('project', projectProvider);
  }));

  it('should exist', inject(function(project) {
    expect(!!project).toEqual(true);
  }));
});