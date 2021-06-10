
function service(request, response)
{
	'use strict';
	try 
	{
		require('JHM.Layout.Layout.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('JHM.Layout.Layout.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}