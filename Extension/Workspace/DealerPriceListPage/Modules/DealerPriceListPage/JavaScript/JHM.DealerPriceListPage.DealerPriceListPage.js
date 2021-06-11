
define('JHM.DealerPriceListPage.DealerPriceListPage'
,   [
		'JHM.DealerPriceListPage.DealerPriceListPage.View'
	,	'JHM.DealersPriceListPage.DealersPriceListPage.Router'
	,	'underscore'
	,	'jhm_dealerpricelistpage_header_menu_myacct.tpl'

	,	'Utils'
	]
,   function
	(
		DealerPriceListPageView
	,	DealerPriceListPageRouter
	,	_
	,	jhm_dealerpricelistpage_header_menu_myacct_tpl
	)
{
	'use strict';

	var HeaderMenuMyAccountView = require('Header.Menu.MyAccount.View');
	if (HeaderMenuMyAccountView) {

		_.extend(HeaderMenuMyAccountView.prototype, {
			template: jhm_dealerpricelistpage_header_menu_myacct_tpl
		})
	}

	return  {
		mountToApp: function mountToApp(container)
		{
			return new DealerPriceListPageRouter(container);
		}

	,	MenuItems: function(application)
		{
			var returnObj;

			if (SC.ENVIRONMENT.permissions.transactions.tranEstimate >= 2) {

                returnObj = {
                    id: 'dealer-price-list-page'
				,	name: _('Price Lists').translate()
				,	url: 'dealer-price-lists'
				,	index: 10
                }
			}

			return returnObj;
		}
	};
});
