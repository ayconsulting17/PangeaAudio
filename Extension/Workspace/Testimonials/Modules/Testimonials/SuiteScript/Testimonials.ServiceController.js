
define(
	'JHM.Testimonials.Testimonials.ServiceController'
,	[
		'ServiceController'
	,	'SC.Models.Init'
	,	'JHM.Testimonials.Testimonials.Model'
	]
,	function(
		ServiceController
	,	ModelsInit
	,	TestimonialsModel
	)
	{
		'use strict';

		return ServiceController.extend({

			name: 'JHM.Testimonials.Testimonials.ServiceController'

		,	get: function get()
			{
				var number = this.request.getParameter('number') || null
				,	homepage = this.request.getParameter('homepage') || null;

				// return TestimonialsModel.get();
                return TestimonialsModel.get(number, homepage);
			}

		});
	}
);