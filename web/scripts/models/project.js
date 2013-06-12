define(['backbone', 'underscore'], function(Backbone, _) {
    'use strict';

    return Backbone.Model.extend({
        initialize: function () {
            this.set({
                name: "Project name",
                description: "Project description"
            });
        },
        validate: function (attrs) {
            if ( attrs.name.length <= 3 || attrs.name.length > 256 ) {
                return 'Project "name" should be greater then 3 and less then 256';
            }
        }
    });

});