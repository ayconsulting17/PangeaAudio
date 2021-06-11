// Entry point for javascript creates a router to handle new routes and adds a view inside the Product Details Page

define(
	'JHM.News.News'
,   [
		'JHM.News.News.Router'
	]
,   function (
		NewsRouter
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (container)
		{
			new NewsRouter(container);
		}
	};
});
