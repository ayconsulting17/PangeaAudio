define('JHM.DealersPriceListPage.DealersPriceListPage.Router'
,   [
        'Backbone'
    ,   'JHM.DealerPriceListPage.DealerPriceListPage.View'
    ,   'JHM.DealerPriceListPage.DealerPriceListPage.Model'
    ,   'Profile.Model'
    ]
,   function
    (
        Backbone
    ,   DealerPriceListPageView
    ,   DealerPriceListPageModel
    ,   ProfileModel
    )
{
    'use strict';

    return Backbone.Router.extend({

        routes: {
            'dealer-price-lists': 'dealerPriceLists'
        }

    ,   initialize: function(application) {

            this.application = application;
            this.model = new DealerPriceListPageModel();
            this.profile = ProfileModel.getInstance();
        }

    ,   dealerPriceLists: function() {

           var custId = this.profile.get('internalid')
           ,   data
           ,   view = new DealerPriceListPageView({
                   application: this.application
               ,   model: this.model
               });

           if (SC.ENVIRONMENT.permissions.transactions.tranEstimate >= 2) {

               data = {data: {custId: custId}};

               this.model.fetch(data).then(function() {
                   view.showContent();
               });
           } else {
               Backbone.history.navigate('', { trigger: true });
           }
        }

    })
});