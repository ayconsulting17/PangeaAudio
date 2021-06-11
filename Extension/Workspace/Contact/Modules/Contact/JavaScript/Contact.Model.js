define('JHM.Contact.Model'
,   [
        'Backbone'
    ,   'underscore'
    ,   'Utils'
    ]
,   function
    (
        Backbone
    ,   _
    ,   Utils
    )
{
    'use strict';

    return Backbone.Model.extend({

        urlRoot: Utils.getAbsoluteUrl(getExtensionAssetsPath('services/Contact.Service.ss'))

    ,   validation: {
            firstname: {required: true, msg: _('First name is required').translate()}
        ,   lastname: {required: true, msg: _('Last name is required').translate()}
        ,   email: [
                {
                    required: true
                ,   msg: _('Email is required').translate()
                },
                {
                    pattern: 'email'
                ,   msg: _('Email is invalid').translate()
                }
            ]
        ,   custevent_jhm_case_departments: {required: true, msg: _('Department is required').translate()}
        ,   title: {required: true, msg: _('Subject is required').translate()}
        ,   incomingmessage: {required: true, msg: _('Message is required').translate()}
        }
    });
});