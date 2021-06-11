define('JHM.DealerPriceListPage.DealerPriceListPage.Model'
,   [
        'SC.Model'
    ,	'underscore'
    ]
,   function
    (
        SCModel
    ,	_
    )
{
    'use strict';

    return SCModel.extend({

        name: 'JHM.DealerPriceListPage.DealerPriceListPage'

    ,   get: function(custId) {

            var url
            ,	response
            ,	body = {};

            try {

                url = nlapiResolveURL('SUITELET', 'customscript_jhm_sl_get_dealer_pricelist', 'customdeploy_jhm_sl_get_dealer_pricelist', true);

                if (custId) {
                    url = url + '&custId=' + custId;
                }

                response = nlapiRequestURL(url, null, {'Content-Type': 'application/json'});
                body = response.getBody();

            } catch(e) {
                nlapiLogExecution('ERROR', 'DealerPriceListPage.Model: Error retrieving dealer price lists', e);
            }

            return body;
        }
    })

});