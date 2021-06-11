
define(
	'JHM.Contact.Contact.ServiceController'
,	[
		'ServiceController'
	,	'SC.Models.Init'
	,	'JHM.Contact.Contact.Model'
	]
,	function(
		ServiceController
	,	ModelsInit
	,	ContactModel
	)
	{
		'use strict';

		return ServiceController.extend({

			name: 'JHM.Contact.Contact.ServiceController'

		,	post: function post()
			{
				return ContactModel.create(this.data);
			}

		});
	}
);