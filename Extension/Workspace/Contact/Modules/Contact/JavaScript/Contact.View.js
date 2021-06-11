define('JHM.Contact.View'
,   [
        'Backbone'
    ,   'jhm_contact.tpl'
    ,   'Backbone.FormView'
    ,   'SC.Configuration'
    ,   'jQuery'
    ]
,   function
    (
        Backbone
    ,   jhm_contact_tpl
    ,   BackboneFormView
    ,   Configuration
    ,   jQuery
    )
{
    'use strict';

    return Backbone.View.extend({

        template: jhm_contact_tpl

    ,   events: {
            'submit form': 'saveForm'
        ,   'click [data-action="reset-form"]': 'resetForm'
        }

    ,   bindings: {
            '[name="firstname"]': 'firstname'
        ,   '[name="lastname"]': 'lastname'
        ,   '[name="email"]': 'email'
        ,   '[name="custevent_jhm_case_departments"]': {
                observe: 'custevent_jhm_case_departments'
            ,   selectOptions: {
                    collection: function() {
                        return [
                            {value: 1, label: 'Sales'}
                        ,   {value: 2, label: 'Tech Support'}
                        ,   {value: 3, label: 'Purchasing'}
                        ]
                    }
                    ,   defaultOption: {
                        label: '-- Select Department --',
                        value: null
                    }
                }
            }
        ,   '[name="title"]': 'title'
        ,   '[name="incomingmessage"]': 'incomingmessage'
        }

    ,   initialize: function(options)
        {
            this.application = options.application;
            BackboneFormView.add(this);
            this.listenTo(this.model, 'saveCompleted', this.afterSuccessfulSubmit);
            this.listenTo(this.model, 'error', this.afterFailedSubmit);
        }

    ,   resetForm: function(e)
        {
            this.model.clear();
            this.validationModel.clear();
            this.render();
        }
    ,   afterSuccessfulSubmit: function()
        {
            this.model.clear();
            this.validationModel.clear();
            this.render();
            this.showConfirmationMessage('Thank you for contacting us! We will respond to your inquiry as quickly as possible.', true);
            jQuery('html').animate({
                scrollTop: 0
            }, 600);
        }

    ,   afterFailedSubmit: function()
        {
            this.showWarningMessage('Sorry, there was an error submitting your inquiry. Please try again.');
        }

    ,   getContext: function()
        {
            var descriptionText = Configuration.get('contactForm.descriptionText', '');

            return {
                descriptionText: descriptionText
            }
        }

    });
});