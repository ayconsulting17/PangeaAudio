define('StateComplianceWarning.View'
,   [
        'Backbone'
    ,   'state_warning_icons_pdp.tpl'
    ,	'SC.Configuration'
    ,   'underscore'

    ,   'Utils'
    ]
,   function
    (
        Backbone
    ,   state_warning_icons_pdp_tpl
    ,	Configuration
    ,   _
    )
{
    'use strict';

    return Backbone.View.extend({

        template: state_warning_icons_pdp_tpl

    ,   initialize: function(options)
        {
            if(options.hasOwnProperty('template') && options.template) {
                this.template = options.template;
            }
        }

    ,   getContext: function()
        {
            var item = this.model
            ,   matrixParent = item.get('_matrixParent')
            ,   matrixChildren = item.get('_matrixChilds')
            ,	showWarnings = false
            ,	message = ''
            ,   icon = ''
            ,   link = ''
            ,   linkText = ''
            ,   showLink = false
            ,   showWarningsFieldVal;

            if(matrixParent && matrixParent.get('_id') && (!matrixChildren || !matrixChildren.length)) {
                item = matrixParent;
            }

            showWarningsFieldVal = item.get('custitem_jhm_display_prop65_warning');
            if(showWarningsFieldVal) {

                showWarnings = true;
                message = Configuration.get('stateWarnings.californiaMessage');
                icon = Configuration.get('stateWarnings.californiaIcon');
                icon = _.getAbsoluteUrl(icon);
                link = Configuration.get('stateWarnings.californiaLink');
                linkText = Configuration.get('stateWarnings.californiaLinkText');

                if(link && linkText) {
                    showLink = true;
                }
            }

            return {
                showWarnings: showWarnings
            ,   icon: icon
            ,   message: message
            ,   showLink: showLink
            ,   link: link
            ,   linkText: linkText
            }
        }
    });
});