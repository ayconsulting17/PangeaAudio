define('JHM.Testimonials.Single.View'
,   [
        'Backbone'
    ,   'underscore'
    ,   'testimonials_single.tpl'
    ]
,   function
    (
        Backbone
    ,   _
    ,   testimonials_single_tpl
    )
{
    'use strict';

    return Backbone.View.extend({

        template: testimonials_single_tpl

    ,   getContext: function() {

            var values = this.model.get('values');

            return {
                // values: this.model.get('values')
                title: values.custrecord_jhm_testimonial_title
            ,   body: values.custrecord_jhm_testimonial_body
            ,   name: values.custrecord_jhm_testimonial_name
            }
        }
    });

});