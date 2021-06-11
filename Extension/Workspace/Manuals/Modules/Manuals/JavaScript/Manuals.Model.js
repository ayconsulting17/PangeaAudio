
define('JHM.Manuals.Manuals.Model'
,	[
		'Backbone.CachedModel'
	,	'Utils'
	,	'underscore'
	]
,	function (
		BackboneCachedModel
	,	Utils
	,	_
	)
{
	'use strict';

	var ManualsModel = BackboneCachedModel.extend({

		urlRoot: Utils.getAbsoluteUrl(getExtensionAssetsPath('services/Manuals.Service.ss'))

	,	initialize: function (options)
		{
			this.options = options;
		}
	});

	return ManualsModel;
});