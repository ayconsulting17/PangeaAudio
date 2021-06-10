define('Testimonials.Homepage.View'
,   [
        'Backbone'
    ,   'underscore'
    ,   'testimonials_homepage.tpl'
    ,   'JHM.Testimonials.Testimonials.Model'
    ,   'jQuery'

    ,   'Utils'
    ]
,   function
    (
        Backbone
    ,   _
    ,   testimonials_homepage_tpl
    ,   TestimonialsModel
    ,   jQuery
    )
{
    'use strict';

    return Backbone.View.extend({

        template: testimonials_homepage_tpl

    ,   initialize: function()
        {
            var self = this;

            this.model = new TestimonialsModel();
            this.promise = this.model.fetch({data: {number: 3, homepage: true}});

            jQuery.when(this.promise).then(function() {
                self.render();
            });

            this.on('afterViewRender', function()
            {
                _.initBxSlider(self.$('[data-slider]'), {
                    nextText: '<a class="home-gallery-next-icon"></a>'
                ,	prevText: '<a class="home-gallery-prev-icon"></a>'
                ,   auto: true
                });
            });

            var windowResizeHandler = _.throttle(function ()
            {
                if (_.getDeviceType(this.windowWidth) === _.getDeviceType(jQuery(window).width()))
                {
                    return;
                }
                this.showContent();

                _.resetViewportWidth();

                this.windowWidth = jQuery(window).width();

            }, 1000);

            this._windowResizeHandler = _.bind(windowResizeHandler, this);

            jQuery(window).on('resize', this._windowResizeHandler);
        }

    ,   getContext: function()
        {
            return {
                testimonials: this.model.get('testimonials')
            };
        }
    })
});