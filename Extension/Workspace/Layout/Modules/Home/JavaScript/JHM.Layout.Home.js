// Entry point for javascript creates a router to handle new routes and adds a view inside the Product Details Page

define(
	'JHM.Layout.Home'
,   [
		'underscore'
	,	'SC.Configuration'

	,	'Utils'
	]
,   function
	(
		_
	,	Configuration
	)
{
	'use strict';

	try {

		var HomeView = require('Home.View')
		,	TestimonialsHomepageView = require('Testimonials.Homepage.View')
		,	NewsHomepageView = require('News.Homepage.View');

		if(HomeView && TestimonialsHomepageView && NewsHomepageView) {

            _.extend(HomeView.prototype, {

                getContext: _.wrap(HomeView.prototype.getContext, function(fn) {

                    var returnVariable = fn.apply(this, _.toArray(arguments).slice(1));

                    _.extend(returnVariable, {
                        customBuckets: Configuration.get('home.customBuckets', [])
					,	customSliders: Configuration.get('home.customSliders', [])
                    });

                    return returnVariable;
                })

                ,	childViews: {
                    'TestimonialsView': function() {
                        return new TestimonialsHomepageView({application: this.application});
                    }

				,	'NewsView': function() {
                        return new NewsHomepageView({application: this.application});
                    }
                }
            })
		}


	} catch(e) {
        console.log('Couldn\'t load FooterView. ' + e);
	}

	return  {
		mountToApp: function mountToApp (container)
		{
			console.log('ENV: ', container.getComponent('Environment'));
		}
	};
});
