
define(
	'JHM.AddPriceToSearcherItems.AddPriceToSearcherItems'
,   [
		'underscore'
	]
,   function
	(
		_
	)
{
	'use strict';

	try {
		var ItemsSearcherItemView = require('ItemsSearcher.Item.View')
		,	ProductViewsPriceView = require('ProductViews.Price.View');

		if (ItemsSearcherItemView && ProductViewsPriceView) {

			_.extend(ItemsSearcherItemView.prototype, {

				childViews: _.extend({}, ItemsSearcherItemView.prototype.childViews, {

                    'ItemPrice': function ()
                    {
                        return new ProductViewsPriceView({
                            model: this.model
						,	origin: 'ITEMCELL'
                        });
                    }
				}) // End childViews
			}) // End extend module
		} // End if modules


	} catch(e) {
        console.log('Couldn\'t extend ItemsSearcherItemView ' + e);
	}

	return  {
		mountToApp: function mountToApp (container)
		{

		}
	};
});
