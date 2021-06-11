// @module module_dep_name
define('JHM.Manuals.Manuals.Router'
,	[
		'JHM.Manuals.Manuals.Model'
	,	'Backbone'
	,	'Manuals.Page.View'
	]
,	function (
		ManualsModel
	,	Backbone
	,	ManualsPageView
	)
{
	'use strict';

	//@class JHM.Manuals.Manuals.Router @extend Backbone.Router
	return Backbone.Router.extend({

		routes: {
			'manuals': 'showManualsList'
		}

	,	initialize: function (application)
		{
			this.application = application;
            this.model = new ManualsModel();
		}

	,	showManualsList: function()
		{
            var view = new ManualsPageView({
                application: this.application
			,   model: this.model
            });

            this.model.fetch().then(function() {
                view.showContent();
            })
		}

	});
});
