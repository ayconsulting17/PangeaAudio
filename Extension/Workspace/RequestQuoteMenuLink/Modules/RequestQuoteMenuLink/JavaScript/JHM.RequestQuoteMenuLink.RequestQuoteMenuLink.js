
define(
	'JHM.RequestQuoteMenuLink.RequestQuoteMenuLink'
,   [

	]
,   function (

	)
{
	'use strict';

	return  {

        MenuItems: {
            parent: 'orders'
		,	id: 'request-a-quote'
		,	name: _('Request A Quote').translate()
		,	url: 'request-a-quote'
		,	index: 6
		,	permission: 'transactions.tranFind.1,transactions.tranEstimate.1'
        }

	,	mountToApp: function mountToApp (container)
		{

		}
	};
});
