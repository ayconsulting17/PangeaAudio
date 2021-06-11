define('News.Homepage.Single.View'
,   [
        'Backbone'
    ,   'underscore'
    ,   'news_homepage_single_item.tpl'
    ,   'Moment'
    ]
,   function
    (
        Backbone
    ,   _
    ,   news_homepage_single_item_tpl
    ,   Moment
    )
{
    'use strict';

    return Backbone.View.extend({

        template: news_homepage_single_item_tpl

    ,   getContext: function()
        {
            var values = this.model.get('values')
            ,   date;

            date = values.custrecord_jhm_news_art_date;
            if(date) {
                date = Moment(date).format('MMMM Do, YYYY');
            }

            return {
                date: date
            ,   title: values.custrecord_jhm_news_art_title
            ,   desc: values.custrecord_jhm_news_art_short_desc
            ,   id: values.internalid[0].value
            }
        }
    });
});