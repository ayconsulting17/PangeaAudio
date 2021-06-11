define('JHM.Dealers.Dealers.Model'
,   [
        'SC.Model'
    ,   'underscore'
    ]
,   function
    (
        SCModel
    ,   _
    )
{
    'use strict';

    return SCModel.extend({

        name: 'JHM.Dealers.Dealers'

    ,   get: function()
        {
            var url
            ,   response
            ,   body = {};

            try {

                url = nlapiResolveURL('SUITELET', 'customscript_jhm_sl_get_dealers', 'customdeploy_jhm_sl_get_dealers', true);

                response = nlapiRequestURL(url, null, {'Content-Type': 'application/json'});
                body = response.getBody();

            } catch(e) {
                nlapiLogExecution('ERROR', 'Dealers.Model: Error retrieving dealers', e);
            }

            return body;
        }
    });
});