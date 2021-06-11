
function service(request, response)
{
	'use strict';
	try 
	{
		require('JHM.News.News.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('JHM.News.News.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}