define('Manuals.Product.View'
,   [
        'Backbone'
    ,   'underscore'
    ,   'manuals_product.tpl'
    ,   'JHM.Manuals.Manuals.Model'
    ,	'Backbone.CollectionView'
    ,   'Manuals.Single.View'
    ]
,   function
    (
        Backbone
    ,   _
    ,   manuals_product_tpl
    ,   ManualsModel
    ,	BackboneCollectionView
    ,   ManualsSingleView
    )
{
    'use strict';

    return Backbone.View.extend({

        template: manuals_product_tpl

    ,   initialize: function(options)
        {
            var self = this;

            this.model = new ManualsModel();
            this.promise = this.model.fetch({data: {id: options.id}});

            jQuery.when(this.promise).then(function() {
                self.render();
            });
        }

    ,   childViews: {

            'Manuals.Product': function() {

                return new BackboneCollectionView({
                    collection: this.model.get('manuals')
                ,   childView: ManualsSingleView
                ,   viewsPerRow: 1
                });
            }
        }

    })
});