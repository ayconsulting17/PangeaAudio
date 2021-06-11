define('Manuals.Page.View'
,   [
        'Backbone'
    ,   'underscore'
    ,   'manuals_page.tpl'
    ,	'Backbone.CollectionView'
    ]
,   function
    (
        Backbone
    ,   _
    ,   manuals_page_tpl
    ,	BackboneCollectionView
    )
{
    'use strict';

    return Backbone.View.extend({

        template: manuals_page_tpl

    ,   initialize(options)
        {
            this.application = options.application;
            this.promise = options.promise;
        }

    ,   getContext: function()
        {
            var manuals = this.model.get('manuals')
            ,   collection = new Backbone.Collection(manuals);

            collection.comparator = function(model) {

                // Return name OR push it to the end of the list
                return model.get('name') || 'zzzz';
            };
            collection.sort();

            return {
                manuals: collection
            }
        }

    })
});