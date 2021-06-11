
define(
	'JHM.Dealers.Dealers.ServiceController'
,	[
		'ServiceController'
	,	'JHM.Dealers.Dealers.Model'
	]
,	function(
		ServiceController
	,	DealersModel
	)
	{
		'use strict';

		return ServiceController.extend({

			name: 'JHM.Dealers.Dealers.ServiceController'

		,	get: function get()
			{
                return DealersModel.get();
			}
		});
	}
);