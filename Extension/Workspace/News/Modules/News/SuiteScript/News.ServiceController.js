
define(
	'JHM.News.News.ServiceController'
,	[
		'ServiceController'
	,	'SC.Models.Init'
	,	'JHM.News.News.Model'
	]
,	function(
		ServiceController
	,	ModelsInit
	,	NewsModel
	)
	{
		'use strict';

		return ServiceController.extend({

			name: 'JHM.News.News.ServiceController'

		,	get: function get()
			{
				// return NewsModel.get();
                var number = this.request.getParameter('number') || null
				,	homepage = this.request.getParameter('homepage') || null
				,	id = this.request.getParameter('id') || null;

                return NewsModel.get(number, homepage, id);
			}

		});
	}
);