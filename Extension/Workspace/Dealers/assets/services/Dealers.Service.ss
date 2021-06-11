
function service(request, response)
{
	'use strict';
	try 
	{
		require('JHM.Dealers.Dealers.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('JHM.Dealers.Dealers.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}