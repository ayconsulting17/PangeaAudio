define('JHM.Testimonials.Router'
,   [
        'Backbone'
    ,   'underscore'
    ,   'JHM.Testimonials.Page.View'
    ,   'JHM.Testimonials.Testimonials.Model'

    ,   'Utils'
    ]
,   function
    (
        Backbone
    ,   _
    ,   TestimonialsPageView
    ,   TestimonialsModel
    )
{
    'use strict';

    return Backbone.Router.extend({

        routes: {
            'testimonials': 'testimonials'
        }

    ,   initialize: function(application) {

            this.application = application;
            this.model = new TestimonialsModel();
            // this.promise = this.model.fetch({data: {number: 3, homepage: true}});
            this.promise = this.model.fetch();
        }

    ,   testimonials: function() {

            var view = new TestimonialsPageView({
                application: this.application
            ,   model: this.model
            ,   promise: this.promise
            });

            view.showContent();
        }
    });
});