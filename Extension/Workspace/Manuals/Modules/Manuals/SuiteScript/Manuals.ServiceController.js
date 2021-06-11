
define(
	'JHM.Manuals.Manuals.ServiceController'
,	[
		'ServiceController'
	,	'SC.Models.Init'
	,	'JHM.Manuals.Manuals.Model'
	]
,	function(
		ServiceController
	,	ModelsInit
	,	ManualsModel
	)
	{
		'use strict';

		return ServiceController.extend({

			name: 'JHM.Manuals.Manuals.ServiceController'

		,	get: function get()
			{
				var id = this.request.getParameter('id') || null;

				return ManualsModel.get(id);
			}

		});
	}
);