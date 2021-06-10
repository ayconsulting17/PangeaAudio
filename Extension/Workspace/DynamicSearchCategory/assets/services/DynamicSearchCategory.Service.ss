
function service(request, response)
{
	'use strict';
	try 
	{
		require('JHM.DynamicSearchCategory.DynamicSearchCategory.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('JHM.DynamicSearchCategory.DynamicSearchCategory.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}