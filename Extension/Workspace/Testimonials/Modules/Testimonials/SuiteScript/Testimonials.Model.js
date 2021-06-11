
// Example of basic CRUD operations of JHM.Testimonials.Testimonials

define('JHM.Testimonials.Testimonials.Model'
,	[
		'SC.Model'
	,	'SC.Models.Init'

	,	'underscore'
	]
,	function (
		SCModel
	,	ModelsInit

	,	_
	)
{
	'use strict';

	return SCModel.extend({
		
		name: 'JHM.Testimonials.Testimonials'

	,	get: function (number, homepage)
		{
			var url
			,	response
			,	body = {};

			try {

                url = nlapiResolveURL('SUITELET', 'customscript_jhm_sl_get_testimonials', 'customdeploy_jhm_sl_get_testimonials', true);

                if(number) {
                	url = url + '&number=' + number;
				}

				if(homepage) {
                	url = url + '&homepage=' + homepage;
				}

				response = nlapiRequestURL(url);
                body = response.getBody();

			} catch(e) {
				nlapiLogExecution('ERROR', 'Testimonials.Model: Error retrieving testimonials', e);
			}

            return body;
		}


	});
});