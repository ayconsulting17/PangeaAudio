// @module module_dep_name
define('JHM.News.News.Router'
,	[
        'Backbone'
	,   'underscore'
	,   'News.Page.View'
	,   'JHM.News.News.Model'
	,	'News.Single.View'

	,   'Utils'
	]

,	function
	(
        Backbone
	,   _
	,   NewsPageView
	,   NewsModel
	,	NewsSingleView
	)
{
	'use strict';

	//@class JHM.News.News.Router @extend Backbone.Router
	return Backbone.Router.extend({

		routes: {
			'news': 'showNewsList'
		,	'news/:id': 'showSingleNewsItem'
		}

	,	initialize: function (application)
		{
			this.application = application;
            this.model = new NewsModel();
		}

	,	showNewsList: function()
		{
            var view = new NewsPageView({
                application: this.application
			,   model: this.model
            });

			this.model.fetch().then(function() {
				view.showContent();
			})
		}

	,	showSingleNewsItem: function(id)
		{
            var view = new NewsSingleView({
                application: this.application
            ,   model: this.model
            });

            this.model.fetch({data: {id: id}}).then(function(data) {
                view.showContent();
			});
		}

	});
});
