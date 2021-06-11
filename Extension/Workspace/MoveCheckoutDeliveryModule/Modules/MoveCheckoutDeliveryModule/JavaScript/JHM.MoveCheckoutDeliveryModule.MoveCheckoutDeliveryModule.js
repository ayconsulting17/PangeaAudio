
define('JHM.MoveCheckoutDeliveryModule.MoveCheckoutDeliveryModule'
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
            var CHECKOUT = container.getComponent('Checkout');

            if (CHECKOUT) {

                try {

                    // Add delivery methods module to billing step
                    CHECKOUT.addModuleToStep({
                        step_url: 'billing'
                        , module: {
                            id: 'order-wizard-shipmethod-module'
                            , index: 1
                            , classname: 'OrderWizard.Module.Shipmethod'
                        }
                    });

                    // Remove delivery module from address step
                    CHECKOUT.removeModuleFromStep({
                        step_url: 'shipping/address'
                        , module_id: 'order_wizard_shipmethod_module'
                    })

                } catch (e) {
                    console.log('Couldn\'t extend checkout wizard: ' + e);
                }
            }
		}
	}
});
