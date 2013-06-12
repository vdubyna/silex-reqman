require(['scripts/models/project'], function(Project) {

    describe('A Project Model', function() {
        beforeEach(function () {
            this.project = new Project();
        });

        it('should exist', function() {
            expect(Project).toBeDefined();
        });

        it('should contain default name and description', function() {
            expect(this.project.get('name')).toEqual('Project name');
            expect(this.project.get('description')).toEqual('Project description');
        });

        it('should validate the name as only strings allowed with min width 6 and max 256', function () {
            // validation is triggered only while save operation
            var status = this.project.validate({name: 'abc'});
            expect(status).toBeTruthy();
        });
    });
});