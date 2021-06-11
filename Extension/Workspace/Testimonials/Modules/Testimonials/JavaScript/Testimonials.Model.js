
define('JHM.Testimonials.Testimonials.Model'
,	[
		'Backbone'
	,	'Utils'
	,	'underscore'
	]
,	function (
		Backbone
	,	Utils
	,	_
	)
{
	'use strict';

	var TestimonialsModel = Backbone.Model.extend({

		urlRoot: Utils.getAbsoluteUrl(getExtensionAssetsPath('services/Testimonials.Service.ss'))

	,	initialize: function (options)
		{
			this.options = options;
		}
	});

	return TestimonialsModel;
});