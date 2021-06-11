define('News.Homepage.View'
,   [
        'Backbone'
    ,   'underscore'
    ,   'jQuery'
    ,   'news_homepage.tpl'
    ,   'JHM.News.News.Model'
    ,   'News.Homepage.Single.View'
    ,	'Backbone.CollectionView'
    ]
,   function
    (
        Backbone
    ,   _
    ,   jQuery
    ,   news_homepage_tpl
    ,   NewsModel
    ,   NewsHomepageSingleView
    ,	BackboneCollectionView
    )
{
    'use strict';

    return Backbone.View.extend({

        template: news_homepage_tpl

    ,   initialize: function()
        {
            var self = this;

            this.model = new NewsModel();
            this.promise = this.model.fetch({data: {number: 3, homepage: true}});

            jQuery.when(this.promise).then(function() {
                self.render();
            });
        }

    ,   childViews: {
            'HomepageNews': function() {

                return new BackboneCollectionView({
                    collection: this.model.get('news')
                ,   childView: NewsHomepageSingleView
                ,   viewsPerRow: 1
                });
            }
        }

    ,   getContext: function()
        {
            return {
                news: this.model.get('news')
            };
        }
    });
});