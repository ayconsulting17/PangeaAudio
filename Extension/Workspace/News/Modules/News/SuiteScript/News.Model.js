
// Example of basic CRUD operations of JHM.News.News

define('JHM.News.News.Model'
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
		
		name: 'JHM.News.News'

	// ,	get: function (id)
	,	get: function (number, homepage, id)
		{
			// var list = nlapiGetContext().getSessionObject('news_list');
			// list = list !== null && list !== '' ? JSON.parse(list) : [];
			// return list;

            var url
			,	response
			,	body = {};

            try {

                url = nlapiResolveURL('SUITELET', 'customscript_jhm_sl_get_news', 'customdeploy_jhm_sl_get_news', true);

                if(number) {
                    url = url + '&number=' + number;
                }

                if(homepage) {
                    url = url + '&homepage=' + homepage;
                }

                if(id) {
                	url = url + '&id=' + id;
				}

                response = nlapiRequestURL(url, null, {'Content-Type': 'application/json'});
                body = response.getBody();

            } catch(e) {
                nlapiLogExecution('ERROR', 'News.Model: Error retrieving news', e);
            }

            return body;
		}

	});
});