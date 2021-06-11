define('News.Single.View'
,   [
        'Backbone'
    ,   'underscore'
    ,   'news_single_item.tpl'
    ,   'Moment'
    ]
,   function
    (
        Backbone
    ,   _
    ,   news_single_item_tpl
    ,   Moment
    )
{
    'use strict';

    return Backbone.View.extend({

        template: news_single_item_tpl

    ,   initialize: function(options)
        {
            this.application = options.application;
        }

    ,   getContext: function()
        {
            var values = this.model.get('news')[0].values
            ,   date
            ,   image = null;

            date = values.custrecord_jhm_news_art_date;
            if(date) {
                date = Moment(date).format('MMMM Do, YYYY');
            }

            if(values.hasOwnProperty('image') && values.image) {
                image = values.image.replace('Web Site Hosting Files/Live Hosting Files', '');
            }

            return {
                date: date
            ,   title: values.custrecord_jhm_news_art_title
            ,   fullText: values.custrecord_jhm_news_art_full_text
            ,   image: image
            }
        }
    });
});