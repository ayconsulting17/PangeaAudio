define('JHM.DealerPriceListPage.DealerPriceListPage.Model'
,   [
        'Backbone.CachedModel'
    ,	'Utils'
    ,	'underscore'
    ]
,   function
    (
        BackboneCachedModel
    ,	Utils
    ,	_
    )
{
    'use strict';

    var DealerPriceListPageModel = BackboneCachedModel.extend({

        urlRoot: Utils.getAbsoluteUrl(getExtensionAssetsPath('services/DealerPriceListPage.Service.ss'))

    ,	initialize: function (options)
        {
            this.options = options;
        }
    });

    return DealerPriceListPageModel;
});