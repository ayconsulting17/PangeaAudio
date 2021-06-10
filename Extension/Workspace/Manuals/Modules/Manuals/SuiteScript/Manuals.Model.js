
// Example of basic CRUD operations of JHM.Manuals.Manuals

define('JHM.Manuals.Manuals.Model'
,	[
		'SC.Model'
	,	'underscore'
	]
,	function (
		SCModel
	,	_
	)
{
	'use strict';

	return SCModel.extend({
		
		name: 'JHM.Manuals.Manuals'

	// ,	validation: {
	// 		title: {required: true, msg: 'Title is required'}
	// 	}

	,	get: function (id)
		{
            var url
			,	response
			,	body = {};

            try {

                url = nlapiResolveURL('SUITELET', 'customscript_jhm_sl_get_manuals', 'customdeploy_jhm_sl_get_manuals', true);

                if(id) {
                    url = url + '&id=' + id;
                }

                response = nlapiRequestURL(url, null, {'Content-Type': 'application/json'});
                body = response.getBody();

            } catch(e) {
                nlapiLogExecution('ERROR', 'Manuals.Model: Error retrieving manuals', e);
            }

            return body;
		}

	});
});