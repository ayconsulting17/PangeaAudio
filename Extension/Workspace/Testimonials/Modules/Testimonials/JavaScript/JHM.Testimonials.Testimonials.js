// Entry point for javascript creates a router to handle new routes and adds a view inside the Product Details Page

define(
	'JHM.Testimonials.Testimonials'
,   [
		'Testimonials.Homepage.View'
	,	'JHM.Testimonials.Router'
	]
,   function
	(
		TestimonialsHomepageView
	,	TestimonialsRouter
	)
{
	'use strict';

	return  {

        TestimonialsHomepageView: TestimonialsHomepageView

	,	mountToApp: function mountToApp (container)
		{
			new TestimonialsRouter(container);
		}
	};
});
