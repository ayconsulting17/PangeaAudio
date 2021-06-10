
define(
	'JHM.CustomLoginFailureMessage.CustomLoginFailureMessage'
,   [

	]
,   function
	(

	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (container)
		{
            try {

                var LoginRegisterLoginView = require('LoginRegister.Login.View')
				,	Configuration = require('SC.Configuration');

                if (LoginRegisterLoginView && Configuration) {

                    _.extend(LoginRegisterLoginView.prototype, {

                        showError: _.wrap(LoginRegisterLoginView.prototype.showError, function(fn) {

                            var message = arguments[1]
                            ,   customMessage = Configuration.get('checkoutApp.customLoginFailureMessage');

                            if (customMessage) {
                                message = customMessage;
                            }

                            fn.call(this, message);
                        })
                    })
                }

            } catch(e) {
                console.log('Couldn\'t load LoginRegisterLoginView. ' +  e);
            }
		}
	};
});
