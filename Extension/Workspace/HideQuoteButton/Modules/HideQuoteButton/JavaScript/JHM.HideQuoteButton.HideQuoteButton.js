
define('JHM.HideQuoteButton.HideQuoteButton'
, 	[
		'underscore'
	,	'SC.Configuration'
	]
,   function
	(
		_
	,	Configuration
	)
{
	'use strict';

	try {
		var ProductDetailToQuoteView = require('ProductDetailToQuote.View');

		if (ProductDetailToQuoteView) {

			_.extend(ProductDetailToQuoteView.prototype, {

				// If user is not logged in OR user has role that prohibits quotes, hide the quote button
                isQuotable: function ()
                {
                	if (!this.hasOwnProperty('profile_model')) {
                		return false;
					}

                    return !(this.model.get('item') &&
								(
									this.model.get('item').get('itemtype') === 'GiftCert' ||
									this.model.get('item').get('itemtype') === 'Discount'
								)
							) &&
							this.application.ProductListModule.Utils.isProductListEnabled() &&
                        	this.profile_model.get('isLoggedIn') === 'T' &&
                        	this.state.quote_permissions;
                }
			})
		}

	} catch(e) {
        console.log('Couldn\'t load ProductDetailToQuoteView. ' + e);
	}

	try {
		var RequestQuoteHeaderLinkView = require('RequestQuoteAccessPoints.HeaderLink.View');

		if (RequestQuoteHeaderLinkView) {

            // Hide request a quote sidebar menu link if user doesn't have quote permissions
			_.extend(RequestQuoteHeaderLinkView.prototype, {

				getContext: _.wrap(RequestQuoteHeaderLinkView.prototype.getContext, function(fn) {

					var returnVar = fn.apply(this, _.toArray(arguments).slice(1))
					,	showTitle;

					showTitle = Configuration.get('quote.showHyperlink') &&
							SC.ENVIRONMENT.permissions.transactions.tranEstimate >= 2;

					returnVar.showTitle = showTitle;

                    return returnVar;
				})
			});
		}

	} catch(e) {
        console.log('Couldn\'t load RequestQuoteAccessPointsHeaderLinkView. ' + e);
	}

	return  {
		mountToApp: function mountToApp (container)
		{

		}
	};
});
