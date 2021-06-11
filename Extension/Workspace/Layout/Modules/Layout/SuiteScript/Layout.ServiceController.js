
define(
	'JHM.Layout.Layout.ServiceController'
,	[
		'ServiceController'
	,	'SC.Models.Init'
	,	'JHM.Layout.Layout.Model'
	]
,	function(
		ServiceController
	,	ModelsInit
	,	LayoutModel
	)
	{
		'use strict';

		return ServiceController.extend({

			name: 'JHM.Layout.Layout.ServiceController'

			// The values in this object are the validation needed for the current service.
			// Can have values for all the request methods ('common' values) and specific for each one.
		,	options: {
				common: {
					requireLoggedInPPS: true
				}
			}

		,	get: function get()
			{
				return LayoutModel.get();
			}

		,	post: function post()
			{
				return LayoutModel.create(this.data);
			}

		,	put: function put()
			{
				return LayoutModel.update(this.data);
			}
			
		,	delete: function()
			{
				var id = this.request.getParameter('internalid');
          		return LayoutModel.remove(id);
			}
		});
	}
);