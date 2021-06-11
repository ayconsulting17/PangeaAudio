define('JHM.Testimonials.Page.View'
,   [
        'Backbone'
    ,   'underscore'
    ,   'testimonials_page.tpl'
    ,   'jQuery'
    ,	'Backbone.CollectionView'
    ,   'JHM.Testimonials.Single.View'


    ,   'Utils'
    ]
,   function
    (
        Backbone
    ,   _
    ,   testimonials_page_tpl
    ,   jQuery
    ,	BackboneCollectionView
    ,   TestimonialsSingleView
    )
{
    'use strict';

    return Backbone.View.extend({

        template: testimonials_page_tpl

    ,   initialize(options) {

            var self = this;
            this.application = options.application;
            this.promise = options.promise;

            jQuery.when(this.promise).then(function() {
                self.render();
            })
        }

    ,   childViews: {
            'Testimonials': function() {

                return new BackboneCollectionView({
                    collection: this.model.get('testimonials')
                ,   childView: TestimonialsSingleView
                ,   viewsPerRow: 1
                });
            }
        }
    });
});