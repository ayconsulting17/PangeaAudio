define('News.Page.View'
,   [
        'Backbone'
    ,   'underscore'
    ,   'news_page.tpl'
    ,	'Backbone.CollectionView'
    ,   'News.Homepage.Single.View'
    ]
,   function
    (
        Backbone
    ,   _
    ,   news_page_tpl
    ,	BackboneCollectionView
    ,   NewsHomepageSingleView
    )
{
    'use strict';

    return Backbone.View.extend({

        template: news_page_tpl

    ,   initialize(options)
        {
            this.application = options.application;
            this.promise = options.promise;
        }

    ,   childViews:
        {
            'News': function() {

                return new BackboneCollectionView({
                    collection: this.model.get('news')
                ,   childView:  NewsHomepageSingleView
                ,   viewsPerRow: 1
                });
            }
        }
    });
});