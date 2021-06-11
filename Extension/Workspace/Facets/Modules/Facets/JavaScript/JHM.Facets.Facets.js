// Entry point for javascript creates a router to handle new routes and adds a view inside the Product Details Page

define(
	'JHM.Facets.Facets'
,   [
		'underscore'

	,	'Utils'
	]
,   function
	(
		_
	)
{
	'use strict';

	try {

		var FacetsItemCellView = require('Facets.ItemCell.View');

		_.extend(FacetsItemCellView.prototype, {

            getContext: _.wrap(FacetsItemCellView.prototype.getContext, function(fn) {

                var self = this
				,	returnVariable = fn.apply(this, _.toArray(arguments).slice(1));

                _.extend(returnVariable, {
                    productType: self.model.get('custitem_jhm_product_type')
				,	description: self.model.get('storedescription')
                });

                return returnVariable;
            })
		})

	} catch(e) {
        console.log('Couldn\'t load Facets.ItemCell.View. ' + e);
	}

	return  {
		mountToApp: function mountToApp (container)
		{

			// var layout = container.getComponent('Layout');
            //
			// if(layout) {
			// 	layout.addToViewContextDefinition(
			// 		'Facets.ItemCell.View'
			// 	,	'customData'
			// 	,	'object'
			// 	,	function(context) {
            //
			// 			var returnObj = {};
            //
			// 			// returnObj.productType = context.model
			// 			console.log('CONTEXT: ', context);
            //
			// 			return returnObj;
			// 		}
			// 	)
			// }






			// // create a model and instantate the router
			// var collection = new FacetsCollection();
			// new FacetsRouter(container);
            //
			// // using the 'PDP' component we add a new child view inside the 'Product.Information' existing view
			// // (there will be an DOM element with the HTML attribute data-view="Product.Information")
            //
			// /** @type {ProductDetailsComponent} */
			// var pdp = container.getComponent('PDP');
			//
			// if(pdp)
			// {
			// 	pdp.addChildViews(
			// 		'ProductDetails.Full.View'
			// 	,	{
			// 			'Product.Information': {
			// 				'JHM.Facets.Facets.List.View':
			// 				{
			// 					childViewIndex: 5
			// 				,	childViewConstructor: function()
			// 					{
			// 						collection.fetch();
            //
			// 						return new FacetsListView({
			// 							collection: collection
			// 						,	can_edit: false
			// 						});
			// 					}
			// 				}
			// 			}
			// 		}
			// 	);
			// }

		}
	};
});
