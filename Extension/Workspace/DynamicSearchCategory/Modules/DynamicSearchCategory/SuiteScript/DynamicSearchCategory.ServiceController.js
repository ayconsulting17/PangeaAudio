
define(
	'JHM.DynamicSearchCategory.DynamicSearchCategory.ServiceController'
,	[
		'ServiceController'
	,	'SC.Models.Init'
	,	'JHM.DynamicSearchCategory.DynamicSearchCategory.Model'
	]
,	function(
		ServiceController
	,	ModelsInit
	,	SearchModel
	)
	{
		'use strict';

		return ServiceController.extend({

			name: 'JHM.DynamicSearchCategory.DynamicSearchCategory.ServiceController'

		,	get: function get()
			{
                var search = this.request.getParameter('search') || null;

                return SearchModel.get(search);
			}

		});
	}
);