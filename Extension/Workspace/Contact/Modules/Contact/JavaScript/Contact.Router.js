define('JHM.Contact.Router'
,   [
        'Backbone'
    ,   'JHM.Contact.View'
    ,   'JHM.Contact.Model'
    ]
,   function
    (
        Backbone
    ,   ContactView
    ,   ContactModel
    )
{
    'use strict';

    return Backbone.Router.extend({

        routes: {
            'contact': 'contact'
        }

    ,	initialize: function (application)
        {
            this.application = application;
        }

    ,   contact: function()
        {
            var view = new ContactView({
                application: this.application
            ,   model: new ContactModel()
            });

            view.showContent();
        }

    });
});