
function service(request, response)
{
	'use strict';
	try 
	{
		require('JHM.Manuals.Manuals.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('JHM.Manuals.Manuals.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}