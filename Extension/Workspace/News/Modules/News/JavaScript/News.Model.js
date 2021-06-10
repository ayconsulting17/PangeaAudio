
define('JHM.News.News.Model'
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

	var NewsModel = BackboneCachedModel.extend({

		urlRoot: Utils.getAbsoluteUrl(getExtensionAssetsPath('services/News.Service.ss'))

	,	initialize: function (options)
		{
			this.options = options;
		}
	});

	return NewsModel;
});