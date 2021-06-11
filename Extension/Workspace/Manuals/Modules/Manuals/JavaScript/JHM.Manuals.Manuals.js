// Entry point for javascript creates a router to handle new routes and adds a view inside the Product Details Page

define(
	'JHM.Manuals.Manuals'
,   [
		'JHM.Manuals.Manuals.Router'
	]
,   function
	(
		ManualsRouter
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (container)
		{
			return new ManualsRouter(container);
		}
	};
});
