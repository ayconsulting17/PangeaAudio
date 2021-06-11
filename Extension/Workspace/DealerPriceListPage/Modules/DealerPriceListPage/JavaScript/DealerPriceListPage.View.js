// @module JHM.DealerPriceListPage.DealerPriceListPage
define('JHM.DealerPriceListPage.DealerPriceListPage.View'
,	[
		'jhm_dealerpricelistpage_dealerpricelistpage.tpl'
	,	'Utils'
	,	'Backbone'
	,	'jQuery'
	,	'underscore'
	,   'SC.Configuration'
	]
,	function (
		jhm_dealerpricelistpage_dealerpricelistpage_tpl
	,	Utils
	,	Backbone
	,	jQuery
	,	_
	,	Configuration
	)
{
	'use strict';

	// @class JHM.DealerPriceListPage.DealerPriceListPage.View @extends Backbone.View
	return Backbone.View.extend({

		template: jhm_dealerpricelistpage_dealerpricelistpage_tpl

	,	events: {
			'click [data-action="trigger-custom-tooltip"]': 'triggerTooltip'
		,	'click [data-action="dismiss-tooltip"]': 'dismissTooltip'
		}

	,	fileDisplayArr: [
			{id: 'Pangea Audio'}
		,	{id: 'Record Doctor'}
		,	{id: 'Vincent Audio'}
		]

	,	initialize: function(options) {

			this.listenTo(Backbone, 'afterViewRender', function() {
                $('[data-toggle="popover"]').popover();
			})
		}

	,	getSelectedMenu: function ()
        {
            return 'dealer-price-list-page';
        }

	,	triggerTooltip: function(e)
		{
			var $currTarget
			,	newTarget;

			this.dismissTooltip();
			$currTarget = jQuery(e.currentTarget);
			newTarget = $currTarget.next('.custom-tooltip');

			newTarget.addClass('active');
		}

	,	dismissTooltip: function(e)
		{
			jQuery('.custom-tooltip').removeClass('active');
		}

		//@method getContext @return JHM.DealerPriceListPage.DealerPriceListPage.View.Context
	,	getContext: function getContext()
		{
			var pageText = Configuration.get('dealerPriceListPage.descriptionText')
			,	dealerType = this.model.get('role')
			,	brands = this.model.get('brands')
			,	origFileArr = this.model.get('fileArr')
			,	linkedFile
			,	phone = Configuration.get('footer.phone', '');

			if (phone) {
				phone = phone.replace(/[a-zA-Z]/g, '');
			}

			// Iterate over view's seed object
			_.each(this.fileDisplayArr, function(fileObj) {

				// Get the file from the model that maps to this brand
				linkedFile = _.find(origFileArr, function(origFileObj) {
					return origFileObj.name.indexOf(fileObj.id) >= 0;
				});

				// Decorate seed object
				if (linkedFile) {

					fileObj.size = linkedFile.size;
					fileObj.name = fileObj.id + ' ' + dealerType + ' Pricing';

					// If this customer sells this brand, add the URL
					if (brands.indexOf(fileObj.id) >= 0) {

						fileObj.url = linkedFile.url;
						fileObj.displayLink = true;
					}
				}
			});

			return {
				pageText: pageText
			,	dealerType: dealerType
			,	fileDisplayArr: this.fileDisplayArr
			,	phone: phone
			};
		}
	});
});