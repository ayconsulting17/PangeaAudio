define('JHM.Dealers.Dealers.Model'
,   [
        'Backbone.CachedModel'
    ,   'Utils'
    ]
,   function
    (
        BackboneCachedModel
    ,   Utils
    )
{
    'use strict';

    return BackboneCachedModel.extend({

        urlRoot: Utils.getAbsoluteUrl(getExtensionAssetsPath('services/Dealers.Service.ss'))

    ,   initialize: function (options)
        {
            this.options = options;
        }
    })
});