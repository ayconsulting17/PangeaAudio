
function service(request, response)
{
	'use strict';
	try 
	{
		require('JHM.Contact.Contact.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('JHM.Contact.Contact.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}