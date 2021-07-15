define('JHM.Dealers.Dealers.Info.View'
,   [
        'Backbone'
    ,   'jhm_dealers_info.tpl'
    ]
,   function
    (
        Backbone
    ,   jhm_dealers_info_tpl
    )
{
    'use strict';

    return Backbone.View.extend({

        template: jhm_dealers_info_tpl

    ,   initialize: function(options)
        {
            this.dealerType = options.dealerType
        }

    ,   getContext: function()
        {
            return {
                model: this.model
            ,   isInternational: this.dealerType == 'international'
            };
        }

    });
});