
function service(request, response)
{
	'use strict';
	try 
	{
		require('JHM.DealerPriceListPage.DealerPriceListPage.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('JHM.DealerPriceListPage.DealerPriceListPage.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}