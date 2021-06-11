define('JHM.DynamicSearchCategory.DynamicSearchCategory.Model'
,   [
        'SC.Model'
    ,   'underscore'
    ]
,   function
    (
       SCModel
   ,    _
    )
{
    'use strict';

    return SCModel.extend({

        name: 'JHM.DynamicSearchCategory.DynamicSearchCategory'

    ,   get: function(search)
        {
            var url
            ,   response
            ,   body = {};

            try {

                url = nlapiResolveURL('SUITELET', 'customscript_jhm_sl_get_dynamic_cat_item', 'customdeploy_jhm_sl_get_dynamic_cat_item', true);

                if (search) {
                    url = url + '&search=' + search;
                }

                response = nlapiRequestURL(url, null, {'Content-Type': 'application/json'});
                body = response.getBody();

            } catch(e) {
                nlapiLogExecution('ERROR', 'Manuals.Model: Error retrieving manuals', e);
            }

            return body;
        }
    });
});