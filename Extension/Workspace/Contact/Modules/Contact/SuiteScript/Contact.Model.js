
// Example of basic CRUD operations of JHM.Contact.Contact

define('JHM.Contact.Contact.Model'
,	[
		'SC.Model'
	,	'SC.Models.Init'
	,	'underscore'
	,	'Configuration'
	]
,	function (
		SCModel
	,	ModelsInit
	,	_
	,	Configuration
	)
{
	'use strict';

	return SCModel.extend({
		
		name: 'JHM.Contact.Contact'

	,	successMessage: 'Thanks for contacting us'

	,	validation: {
			title: {required: true, msg: 'Title is required'}
		,	firstname: {required: true, msg: 'First name is required'}
		,	lastname: {required: true, msg: 'Last name is required'}
		,	email: {required: true, msg: 'Email is required'}
		,	incomingmessage: {required: true, msg: 'Message is required'}
		,	custevent_jhm_case_departments: {required: true, msg: 'Department is required'}
		}

	,	create: function (data)
		{
			var url
			,	response
			,	responseCode;

            url = Configuration.get('contactForm.externalUrl');

            data.subsidiary = ModelsInit.session.getShopperSubsidiary();

            try {

            	response = nlapiRequestURL(url, data);
            	responseCode = parseInt(response.getCode(), 10);

                // Just in case someday it accepts the redirect. 206 is netsuite error ('partial content')
                if (responseCode === 200 || responseCode === 302 || responseCode === 201 || responseCode === 404) {
                    return {
                        successMessage: this.successMessage
                    }
                }

			} catch(e) {

                // The 'successful' exception is a redirect error, so let's intercept that
                if (e instanceof nlobjError && e.getCode().toString() === 'ILLEGAL_URL_REDIRECT')
                {
                    return {
                        successMessage: this.successMessage
                    };

                    // Finally, let's catch any other error that may come
                    return {
                        status: 500
					, 	code: 'ERR_FORM'
					, 	message: 'There was an error submitting the form, please try again later'
                    }
                }
			}


		}

	});
});