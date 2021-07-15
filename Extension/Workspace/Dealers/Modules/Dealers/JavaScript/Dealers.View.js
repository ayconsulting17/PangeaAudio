// @module JHM.Dealers.Dealers
define('JHM.Dealers.Dealers.View'
,	[
		'jhm_dealers_dealers.tpl'
	,	'Utils'
	,	'Backbone'
	,	'JHM.Dealers.Dealers.Info.View'
	,	'jQuery'
	,	'underscore'
	]
,	function (
		jhm_dealers_dealers_tpl
	,	Utils
	,	Backbone
	,	DealersInfoView
	,	jQuery
	,	_
	)
{
	'use strict';



	// @class JHM.Dealers.Dealers.View @extends Backbone.View
	return Backbone.View.extend({

		template: jhm_dealers_dealers_tpl

	,	events: {
            'click [data-action="show-dealer-info"]': 'showDealerInfo'
		}

	,	initialize: function(options)
		{
			$(".brands-value").text(function(i, val) {
				return val.replace(/,/g, ", ");
			});
		
			this.application = options.application;
		}

		//@method getContext @return JHM.Dealers.Dealers.View.Context
	,	getContext: function getContext()
		{
			var results = this.model.get('results')
			,	international = this.transformBrands(results.international)
			,	domestic = this.transformBrands(results.domestic)
			,	distributor = this.transformBrands(results.distributor)
			,   showOpenedAccordion = Utils.isTabletDevice() || Utils.isDesktopDevice();
			

			return {
				international: international
			,	domestic: domestic
			,   distributor:distributor
			};
		}

        /**
		 * Formats brand names for website display
         * @param dealers
         * @returns {Object}
         */
	,	transformBrands: function(domestic)
		{
			var origBrands
			,	brandArr
			,	brandString
			,	brandTextString;

			_.each(domestic, function(dealer) {

                origBrands = dealer.custentity_dealer_brands;
				brandString = '';
				brandTextString = '';

				if (origBrands && origBrands != '- None -') {

					brandArr = origBrands.split(',');

					_.each(brandArr, function(brand) {

						if (brandString.length) {
							brandString += ', ';
						}
						brandString += brand.charAt(0);

						if (brandTextString.length) {
							brandTextString += ', ';
						}
						brandTextString += brand;
					})
				} else {
					brandString = '- None -';
					brandTextString = '- None -';
				}

				dealer.brandCodes = brandString;
				dealer.brandText = brandTextString;
			});

			return domestic;
		}

	,	showDealerInfo: function(e)
		{
            e.preventDefault();
            e.stopPropagation();

			var infoView
			,	dealerType
			,	id
            ,	results = this.model.get('results')
			,   set
			,	currModel;

			dealerType = jQuery(e.currentTarget).attr('data-dealer-type');
			id = jQuery(e.currentTarget).attr('data-id');
            set = results[dealerType];

            currModel = _.find(set, function(dealer) {
            	return dealer.id == id;
			});

            infoView = new DealersInfoView({
				model: new Backbone.Model(currModel)
			,	dealerType: dealerType
			});

            this.application.getLayout().showInModal(infoView);
		}
	});
});