define('JHM.Dealers.Dealers.Router'
,   [
        'Backbone'
    ,   'JHM.Dealers.Dealers.View'
    ,   'JHM.Dealers.Dealers.Model'
    ]
,   function
    (
        Backbone
    ,   DealersView
    ,   DealersModel
    )
{
    'use strict';

    return Backbone.Router.extend({

        routes: {
            'dealers': 'dealers'
        }

    ,   initialize: function(application) {

            this.application = application;
            this.model = new DealersModel();
        }

    ,   dealers: function() {

            var view = new DealersView({
                application: this.application
            ,   model: this.model
            });

            this.model.fetch().then(function() {
                view.showContent();
            })
        }
    })
});