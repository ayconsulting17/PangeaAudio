define('JHM.DynamicSearchCategory.DynamicSearchCategory.Model'
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

    var DynamicSearchCategoryModel = BackboneCachedModel.extend({

        urlRoot: Utils.getAbsoluteUrl(getExtensionAssetsPath('services/DynamicSearchCategory.Service.ss'))

    ,	initialize: function (options)
        {
            this.options = options;
        }
    });

    return DynamicSearchCategoryModel;
});