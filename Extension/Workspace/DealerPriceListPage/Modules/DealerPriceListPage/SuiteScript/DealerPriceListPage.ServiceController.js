
define(
	'JHM.DealerPriceListPage.DealerPriceListPage.ServiceController'
,	[
		'ServiceController'
	,	'JHM.DealerPriceListPage.DealerPriceListPage.Model'
	]
,	function(
		ServiceController
	,	DealerPriceListPageModel
	)
	{
		'use strict';

		return ServiceController.extend({

			name: 'JHM.DealerPriceListPage.DealerPriceListPage.ServiceController'

		,	get: function get()
			{
                var custId = this.request.getParameter('custId') || null;

				return DealerPriceListPageModel.get(custId);
			}

		});
	}
);