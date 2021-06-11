define('Manuals.Single.View'
,   [
        'Backbone'
    ,   'underscore'
    ,   'manuals_single_item.tpl'
    ]
,   function
    (
        Backbone
    ,   _
    ,   manuals_single_item_tpl
    )
{
    'use strict';

    return Backbone.View.extend({

        template: manuals_single_item_tpl

    ,   getContext: function()
        {

            return {
                title: this.model.get('title')
            ,   size: this.model.get('size')
            ,   file: this.model.get('file')
            };
        }
    });
});