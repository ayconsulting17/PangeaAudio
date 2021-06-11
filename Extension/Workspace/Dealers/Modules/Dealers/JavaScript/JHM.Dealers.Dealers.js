
define(
	'JHM.Dealers.Dealers'
,   [
		'JHM.Dealers.Dealers.Router'
	]
,   function (
		DealersRouter
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (container)
		{
			return new DealersRouter(container);
		}
	};
});
